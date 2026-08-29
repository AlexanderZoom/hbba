from __future__ import annotations
import hashlib, json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
checks=[]
def ck(name, ok, detail=''):
    checks.append({'name':name,'ok':bool(ok),'detail':str(detail)})

def sha(p: Path):
    return hashlib.sha256(p.read_bytes()).hexdigest()

required=[
    'index.html','styles.css','app.js','data.js','behavior-runtime-compiler.js','actor-profile.js',
    'research-results.html','research-results.css','research-results.js',
    'HBBA_PROJECT_STATUS.json','HBBA_RELEASE.json','docs/HBBA_SCIENTIFIC_ACCEPTANCE_STATUS_v0.7.0.24.json',
    'docs/SCIENTIFIC_PROTOCOL.md','docs/SOURCES.md','docs/HBBA_EDGE_AUDIT.json',
    'research/05a_CHALLENGE_FINAL_RESULT.json','research/05b_CHALLENGE_REPORT.md',
    'research/06_COMPOSITION_v1.3.0_EVALUATION_RESULT.json','research/06c_COMPOSITION_STRUCTURAL_ANALYSIS.json',
    'README.md','PUBLIC_SHA256_MANIFEST.txt'
]
for f in required:
    ck(f'required: {f}', (ROOT/f).is_file())

expected_data='e28db04576e9381666582866fbcf1cefc27cca50708fae28d5e81f263e60aa43'
ck('frozen data.js SHA-256', sha(ROOT/'data.js')==expected_data, sha(ROOT/'data.js'))

status=json.loads((ROOT/'HBBA_PROJECT_STATUS.json').read_text(encoding='utf-8'))
ck('product release v1.0.1', status.get('project_release_version')=='1.0.1', status.get('project_release_version'))
ck('scientific core v0.7.0.28', status.get('scientific_core_version')=='0.7.0.28', status.get('scientific_core_version'))
ck('scientific boundary accepted', status.get('scientific_evidence_boundary',{}).get('status')=='INDEPENDENTLY_ACCEPTED')
ck('challenge EVIDENCE_AGAINST', status.get('experiment_1_general_behavioral_reasoning',{}).get('preregistered_interpretation')=='EVIDENCE_AGAINST')
ck('composition NEUTRAL_TOPOLOGY_EFFECT', status.get('experiment_2_composition_representation',{}).get('preregistered_interpretation')=='NEUTRAL_TOPOLOGY_EFFECT')
ck('real-world predictive validity UNTESTED', status.get('final_product_verdict',{}).get('real_world_behavioral_predictive_validity')=='UNTESTED')

challenge=json.loads((ROOT/'research/05a_CHALLENGE_FINAL_RESULT.json').read_text(encoding='utf-8'))
# Keep this check deliberately schema-light: public report is historical output, status JSON is canonical.
ck('challenge result file parseable', isinstance(challenge, dict))
comp=json.loads((ROOT/'research/06_COMPOSITION_v1.3.0_EVALUATION_RESULT.json').read_text(encoding='utf-8'))
ck('composition COMPLETE', comp.get('primary_status')=='COMPLETE', comp.get('primary_status'))
ck('composition FLAT 60/60', comp.get('arms',{}).get('FLAT',{}).get('correct')==60 and comp.get('arms',{}).get('FLAT',{}).get('total')==60)
ck('composition GRAPH 60/60', comp.get('arms',{}).get('GRAPH',{}).get('correct')==60 and comp.get('arms',{}).get('GRAPH',{}).get('total')==60)
ck('composition delta 0', comp.get('paired',{}).get('delta_pp')==0.0)

href_re=re.compile(r'(?:href|src)=["\']([^"\']+)["\']')
for page_name in ['index.html','research-results.html']:
    page=ROOT/page_name
    broken=[]
    for ref in href_re.findall(page.read_text(encoding='utf-8')):
        if ref.startswith(('http://','https://','#','mailto:','data:','javascript:')): continue
        ref=ref.split('#',1)[0].split('?',1)[0]
        if not ref: continue
        if not (page.parent/ref).exists(): broken.append(ref)
    ck(f'local links: {page_name}', not broken, broken)

forbidden_names=[
    'RUN_RANDOMIZATION_SECRET','GENERATION_ID_MAP','RUN_EVALUATION_MAP','MASTER_SECRET',
    'FLAT_GENERATION.zip','GRAPH_GENERATION.zip','EVALUATION_PACKAGE.zip'
]
all_rel=[str(p.relative_to(ROOT)).replace('\\','/') for p in ROOT.rglob('*') if p.is_file()]
for token in forbidden_names:
    ck(f'no private filename marker: {token}', not any(token.lower() in x.lower() for x in all_rel))

# Scan text for high-signal private secret field names. Documentation may discuss hidden truth conceptually,
# but the actual secret-bearing fields must not be present in the public-clean tree.
secret_markers=['master_secret_hex','RUN_RANDOMIZATION_SECRET','new_to_original_option']
hits=[]
for p in ROOT.rglob('*'):
    if not p.is_file() or p.name in {'public_release_check.py','PUBLIC_RELEASE_CHECK_RESULT.json','.gitignore'}: continue
    if p.suffix.lower() not in {'.md','.json','.js','.html','.css','.txt'}: continue
    try: txt=p.read_text(encoding='utf-8')
    except Exception: continue
    for marker in secret_markers:
        if marker in txt:
            hits.append((str(p.relative_to(ROOT)),marker))
ck('no private secret field markers in public content', not hits, hits)

manifest={}
for line in (ROOT/'PUBLIC_SHA256_MANIFEST.txt').read_text(encoding='utf-8').splitlines():
    if not line.strip(): continue
    h,rel=line.split('  ',1); manifest[rel]=h
manifest_bad=[]
for rel,h in manifest.items():
    p=ROOT/rel
    if not p.is_file() or sha(p)!=h: manifest_bad.append(rel)
ck('public manifest hashes', not manifest_bad, manifest_bad)

res={'format':'HBBA-PUBLIC-RELEASE-CHECK-1','ok':all(x['ok'] for x in checks),'passed':sum(x['ok'] for x in checks),'total':len(checks),'checks':checks}
(ROOT/'validation/PUBLIC_RELEASE_CHECK_RESULT.json').write_text(json.dumps(res,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'ok':res['ok'],'passed':res['passed'],'total':res['total']},ensure_ascii=False))
sys.exit(0 if res['ok'] else 1)
