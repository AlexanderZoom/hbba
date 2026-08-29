(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.BehaviorRuntimeCompiler=api;
})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';
  const VERSION='HBBA-BEHAVIOR-RUNTIME-COMPILER-1.1';
  const STAGE_ORDER=['input','internal_model','goal','evaluation','control','output','feedback','adaptation','implementation'];
  const STAGE_LABELS={
    input:{ru:'Вход / контекст',en:'Input / context'},
    internal_model:{ru:'Внутренняя модель',en:'Internal modelling'},
    goal:{ru:'Цели / мотивации',en:'Goals / motivations'},
    evaluation:{ru:'Оценка',en:'Evaluation'},
    control:{ru:'Контроль / выбор',en:'Control / selection'},
    output:{ru:'Стратегия / выход',en:'Strategy / output'},
    feedback:{ru:'Исход / обратная связь',en:'Outcome / feedback'},
    adaptation:{ru:'Адаптация / обучение',en:'Adaptation / learning'},
    implementation:{ru:'Нейронные / физиологические ограничения',en:'Neural / physiology constraints'}
  };
  const TYPE_STAGE={
    context:'input',motivation:'goal',affect:'evaluation',control:'control',motor:'output',strategy:'output',outcome:'feedback',learning:'adaptation'
  };
  function text(v,lang){return (v&&typeof v==='object'?(v[lang]||v.en||v.ru):v)||''}
  function uniq(a){return [...new Set((a||[]).filter(Boolean))]}
  function classify(n){
    const id=n.id||'',layer=n.analysis_layer||'',type=n.type||'';
    if(layer==='neural'||layer==='physiology'||['regulatory','network','network_family','distributed_system','circuit_family','region','neural_system','physiology'].includes(type))return 'implementation';
    if(/^ctx_/.test(id)||['cog_perception','cog_attention'].includes(id)||TYPE_STAGE[type]==='input')return 'input';
    if(/^mot_/.test(id)||TYPE_STAGE[type]==='goal')return 'goal';
    if(/^aff_/.test(id)||['cog_value','cog_threat_appraisal','cog_monitor'].includes(id)||TYPE_STAGE[type]==='evaluation')return 'evaluation';
    if(['cog_exec','cog_inhibit'].includes(id)||TYPE_STAGE[type]==='control')return 'control';
    if(/^act_/.test(id)||id==='cog_language'||TYPE_STAGE[type]==='output')return 'output';
    if(/^out_/.test(id)||TYPE_STAGE[type]==='feedback')return 'feedback';
    if(/^learn_/.test(id)||TYPE_STAGE[type]==='adaptation')return 'adaptation';
    if(['social_cog','cognitive'].includes(type)||/^cog_/.test(id))return 'internal_model';
    return 'internal_model';
  }
  function relationInstruction(rel,s,t,lang){
    const ru=lang==='ru',S=s.name,T=t.name;
    const map={
      may_influence:ru?`Когда «${S}» релевантен контексту, допускай условное влияние на «${T}»; не делай переход обязательным.`:`When “${S}” is contextually relevant, allow a conditional influence on “${T}”; do not make the transition mandatory.`,
      modulates:ru?`Используй «${S}» только как модификатор характера или интенсивности «${T}», а не как автоматический запуск.`:`Use “${S}” only to modify the character or intensity of “${T}”, not to automatically initiate it.`,
      associated_with:ru?`Учитывай совместную релевантность «${S}» и «${T}», но не выводи причинность или обязательный порядок.`:`Treat “${S}” and “${T}” as potentially co-relevant, without inferring causality or mandatory order.`,
      computational_input:ru?`Если активна вычислительная ветвь, используй результат «${S}» как вход для «${T}» только в пределах этой связи.`:`When the computational branch is active, use the result of “${S}” as an input to “${T}” only within this relation.`,
      updates:ru?`Разрешай «${S}» обновлять «${T}» только как межшаговое/временное изменение; не трактуй это как мгновенную петлю.`:`Allow “${S}” to update “${T}” only as an across-step/temporal change; do not read it as an instantaneous loop.`,
      participates_in:ru?`Считай «${S}» компонентом/участником «${T}» только как структурное участие, не как последовательную команду.`:`Treat “${S}” as participating in “${T}” only as structural membership, not as a sequential command.`,
      implemented_by:ru?`Используй «${T}» как общий implementation-level контекст для «${S}»; не превращай его в буквальное внутреннее состояние ИИ.`:`Use “${T}” only as implementation-level context for “${S}”; do not turn it into a literal internal AI state.`,
      produces_output:ru?`Если «${S}» активирован доступным путём, «${T}» может служить его выходом в пределах указанной семантики.`:`If “${S}” is activated by an available path, “${T}” may serve as its output within the stated semantics.`,
      requires_motor_output:ru?`Сохраняй «${T}» как требование реализации действия «${S}», не приписывая моторному выходу социальный смысл сам по себе.`:`Preserve “${T}” only as an implementation requirement for “${S}”, without assigning social meaning to motor output itself.`
    };
    return map[rel]||(ru?`Сохраняй тип связи ${rel} между «${S}» и «${T}» буквально; не усиливай её до причинности.`:`Preserve the literal ${rel} semantics between “${S}” and “${T}”; do not strengthen it into causality.`);
  }
  function fnv1a(str){let h=0x811c9dc5;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0}return ('00000000'+h.toString(16)).slice(-8)}
  function tarjan(ids,edges){
    const adj=new Map(ids.map(id=>[id,[]]));edges.forEach(e=>{if(adj.has(e.source))adj.get(e.source).push(e.target)});
    let index=0;const stack=[],on=new Set(),idx=new Map(),low=new Map(),scc=[];
    function visit(v){idx.set(v,index);low.set(v,index);index++;stack.push(v);on.add(v);for(const w of adj.get(v)||[]){if(!idx.has(w)){visit(w);low.set(v,Math.min(low.get(v),low.get(w)))}else if(on.has(w))low.set(v,Math.min(low.get(v),idx.get(w)))}if(low.get(v)===idx.get(v)){const c=[];let w;do{w=stack.pop();on.delete(w);c.push(w)}while(w!==v);scc.push(c.sort())}}
    ids.slice().sort().forEach(v=>{if(!idx.has(v))visit(v)});return scc;
  }
  function traversalFromScc(ids,edges,scc){
    const comp=new Map();scc.forEach((c,i)=>c.forEach(n=>comp.set(n,i)));const out=scc.map(()=>new Set()),ind=scc.map(()=>0);
    edges.forEach(e=>{const a=comp.get(e.source),b=comp.get(e.target);if(a!==b&&!out[a].has(b)){out[a].add(b);ind[b]++}});
    const q=[];ind.forEach((d,i)=>{if(!d)q.push(i)});q.sort((a,b)=>(scc[a][0]||'').localeCompare(scc[b][0]||''));const order=[];
    while(q.length){const i=q.shift();order.push(scc[i]);for(const j of [...out[i]].sort((a,b)=>(scc[a][0]||'').localeCompare(scc[b][0]||''))){ind[j]--;if(!ind[j]){q.push(j);q.sort((a,b)=>(scc[a][0]||'').localeCompare(scc[b][0]||''))}}}
    if(order.length<scc.length)scc.forEach(c=>{if(!order.includes(c))order.push(c)});return order;
  }
  function compile(input){
    const lang=input.language==='en'?'en':'ru';
    const allNodes=input.nodes||[],allEdges=input.edges||[],allBehaviors=input.behaviors||[],selectedIds=uniq(input.selectedBehaviorIds||[]),relationMeta=input.relationMeta||{};
    const nodeById=new Map(allNodes.map(n=>[n.id,n])),behaviorById=new Map(allBehaviors.map(b=>[b.id,b]));
    const selected=selectedIds.map(id=>behaviorById.get(id)).filter(Boolean);
    const activeIds=uniq(selected.flatMap(b=>b.nodes||[]));const activeSet=new Set(activeIds);
    const nodes=activeIds.map(id=>nodeById.get(id)).filter(Boolean).map(n=>({
      id:n.id,type:n.type||'unknown',analysis_layer:n.analysis_layer||'unknown',claim_kind:n.claim_kind||'unknown',stage:classify(n),
      name:{ru:(n.name?.ru||n.name?.en||n.id),en:(n.name?.en||n.name?.ru||n.id)},description:{ru:(n.description?.ru||n.description?.en||''),en:(n.description?.en||n.description?.ru||'')},behavior_provenance:selected.filter(b=>(b.nodes||[]).includes(n.id)).map(b=>b.id)
    }));
    const nmap=new Map(nodes.map(n=>[n.id,n]));
    const edges=[];allEdges.forEach((e,i)=>{if(!activeSet.has(e.source)||!activeSet.has(e.target))return;const rel=e.relation_type||'unknown';edges.push({
      edge_id:`E${String(i+1).padStart(3,'0')}`,source:e.source,target:e.target,relation_type:rel,audit_grade:e.audit_grade||'X',audit_status:e.audit_status||'unknown',temporal_scope:e.temporal_scope||'unspecified',
      behavior_provenance:selected.filter(b=>(b.nodes||[]).includes(e.source)&&(b.nodes||[]).includes(e.target)).map(b=>b.id)
    })});
    const usedRels=uniq(edges.map(e=>e.relation_type));const relation_semantics={};usedRels.forEach(r=>{const m=relationMeta[r]||{};const ru=(typeof m.ru==='object'?m.ru:{}),en=(typeof m.en==='object'?m.en:{});relation_semantics[r]={ru:{label:ru.label||en.label||r,meaning:ru.meaning||en.meaning||''},en:{label:en.label||ru.label||r,meaning:en.meaning||ru.meaning||''}}});
    const instructions=edges.map((e,i)=>{
      const s=nmap.get(e.source),t=nmap.get(e.target);return {instruction_id:`R${String(i+1).padStart(3,'0')}`,edge_id:e.edge_id,source:e.source,target:e.target,relation_type:e.relation_type,from_stage:s?.stage||'internal_model',to_stage:t?.stage||'internal_model',node_ids:[e.source,e.target],behavior_provenance:e.behavior_provenance,text_ru:relationInstruction(e.relation_type,{name:(nodeById.get(e.source)?.name?.ru)||e.source},{name:(nodeById.get(e.target)?.name?.ru)||e.target},'ru'),text_en:relationInstruction(e.relation_type,{name:(nodeById.get(e.source)?.name?.en)||e.source},{name:(nodeById.get(e.target)?.name?.en)||e.target},'en')}
    });
    const stages={};STAGE_ORDER.forEach(k=>stages[k]=nodes.filter(n=>n.stage===k).map(n=>n.id));
    const scc=tarjan(activeIds,edges);const loops=scc.filter(c=>c.length>1||edges.some(e=>e.source===c[0]&&e.target===c[0])).map((c,i)=>({loop_id:`L${String(i+1).padStart(2,'0')}`,node_ids:c,edge_ids:edges.filter(e=>c.includes(e.source)&&c.includes(e.target)).map(e=>e.edge_id)}));
    const traversal=traversalFromScc(activeIds,edges,scc).map((group,i)=>({order:i+1,node_ids:group,stages:uniq(group.map(id=>nmap.get(id)?.stage))}));
    const feedback_paths=edges.filter(e=>['feedback','adaptation'].includes(nmap.get(e.source)?.stage)||nmap.get(e.target)?.stage==='adaptation'||e.relation_type==='updates').map(e=>e.edge_id);
    const intersections={nodes:nodes.filter(n=>n.behavior_provenance.length>1).map(n=>({id:n.id,behaviors:n.behavior_provenance})),edges:edges.filter(e=>e.behavior_provenance.length>1).map(e=>({id:e.edge_id,behaviors:e.behavior_provenance}))};
    const functionalSource=JSON.stringify({nodes:nodes.map(n=>[n.id,n.type,n.analysis_layer,n.claim_kind,n.stage]).sort(),edges:edges.map(e=>[e.edge_id,e.source,e.target,e.relation_type,e.audit_grade,e.temporal_scope]).sort(),loops:loops.map(l=>[l.node_ids,l.edge_ids])});
    const model={schema:'HBBA-BEHAVIOR-RUNTIME-1',compiler_version:VERSION,atlas_version:input.version||'',language:lang,generated_at:null,selected_behaviors:selected.map(b=>({id:b.id,name:{ru:b.name?.ru||b.id,en:b.name?.en||b.id},node_count:(b.nodes||[]).length,role:'metadata_provenance_only'})),runtime_nodes:nodes,runtime_edges:edges,relation_semantics,stage_order:STAGE_ORDER,stage_labels:STAGE_LABELS,stages,instructions,traversal_order:traversal,feedback_loops:loops,feedback_paths,intersections,functional_fingerprint:`fnv1a:${fnv1a(functionalSource)}`};
    model.validation=validate(model,{allNodes,allEdges,allBehaviors,selectedIds,relationMeta});return model;
  }
  function validate(model,source){
    const errors=[],warnings=[];const allNodeIds=new Set((source.allNodes||[]).map(n=>n.id)),allBehaviorIds=new Set((source.allBehaviors||[]).map(b=>b.id));const selectedSet=new Set(source.selectedIds||[]);
    if(!model.selected_behaviors.length)errors.push('NO_SELECTED_BEHAVIORS');
    (source.selectedIds||[]).forEach(id=>{if(!allBehaviorIds.has(id))errors.push(`UNKNOWN_BEHAVIOR:${id}`)});
    (source.allBehaviors||[]).filter(b=>selectedSet.has(b.id)).forEach(b=>(b.nodes||[]).forEach(id=>{if(!allNodeIds.has(id))errors.push(`BEHAVIOR_REFERENCES_UNKNOWN_NODE:${b.id}:${id}`)}));
    const ids=model.runtime_nodes.map(n=>n.id),idSet=new Set(ids);if(ids.length!==idSet.size)errors.push('DUPLICATE_RUNTIME_NODE');
    ids.forEach(id=>{if(!allNodeIds.has(id))errors.push(`UNKNOWN_RUNTIME_NODE:${id}`)});
    const selectedBehaviors=(source.allBehaviors||[]).filter(b=>selectedSet.has(b.id));
    const expectedNodeIds=uniq(selectedBehaviors.flatMap(b=>b.nodes||[])).filter(id=>allNodeIds.has(id)).sort();
    const actualNodeIds=[...idSet].sort();if(JSON.stringify(expectedNodeIds)!==JSON.stringify(actualNodeIds))errors.push('RUNTIME_NODE_SET_MISMATCH');
    const edgeIds=new Set();model.runtime_edges.forEach(e=>{if(edgeIds.has(e.edge_id))errors.push(`DUPLICATE_EDGE_ID:${e.edge_id}`);edgeIds.add(e.edge_id);if(!idSet.has(e.source)||!idSet.has(e.target))errors.push(`EDGE_ENDPOINT_OUTSIDE_RUNTIME:${e.edge_id}`);if(!e.relation_type)errors.push(`MISSING_RELATION_TYPE:${e.edge_id}`);if(!source.relationMeta?.[e.relation_type])errors.push(`UNKNOWN_RELATION_TYPE:${e.edge_id}:${e.relation_type}`);const n=Number(String(e.edge_id).slice(1)),src=(source.allEdges||[])[n-1];if(!src||src.source!==e.source||src.target!==e.target||(src.relation_type||'unknown')!==e.relation_type)errors.push(`RUNTIME_EDGE_SOURCE_MISMATCH:${e.edge_id}`);e.behavior_provenance.forEach(b=>{if(!selectedSet.has(b))errors.push(`STALE_EDGE_PROVENANCE:${e.edge_id}:${b}`);const bb=(source.allBehaviors||[]).find(x=>x.id===b);if(!bb||(bb.nodes||[]).includes(e.source)===false||(bb.nodes||[]).includes(e.target)===false)errors.push(`INVALID_EDGE_PROVENANCE:${e.edge_id}:${b}`)})});
    const expectedEdgeIds=(source.allEdges||[]).map((e,i)=>({e,i})).filter(x=>idSet.has(x.e.source)&&idSet.has(x.e.target)).map(x=>`E${String(x.i+1).padStart(3,'0')}`).sort();const actualEdgeIds=[...edgeIds].sort();if(JSON.stringify(expectedEdgeIds)!==JSON.stringify(actualEdgeIds))errors.push('RUNTIME_EDGE_SET_MISMATCH');
    model.runtime_nodes.forEach(n=>{n.behavior_provenance.forEach(b=>{if(!selectedSet.has(b))errors.push(`STALE_NODE_PROVENANCE:${n.id}:${b}`);const bb=(source.allBehaviors||[]).find(x=>x.id===b);if(!bb||!(bb.nodes||[]).includes(n.id))errors.push(`INVALID_NODE_PROVENANCE:${n.id}:${b}`)});const should=selectedBehaviors.filter(b=>(b.nodes||[]).includes(n.id)).map(b=>b.id).sort(),got=(n.behavior_provenance||[]).slice().sort();if(JSON.stringify(should)!==JSON.stringify(got))errors.push(`NODE_PROVENANCE_MISMATCH:${n.id}`)});
    if(model.instructions.length!==model.runtime_edges.length)errors.push('INSTRUCTION_EDGE_COUNT_MISMATCH');
    const edgeById=new Map(model.runtime_edges.map(e=>[e.edge_id,e]));model.instructions.forEach(ins=>{const e=edgeById.get(ins.edge_id);if(!e)errors.push(`INSTRUCTION_UNKNOWN_EDGE:${ins.instruction_id}`);else if(ins.source!==e.source||ins.target!==e.target||ins.relation_type!==e.relation_type)errors.push(`INSTRUCTION_EDGE_MISMATCH:${ins.instruction_id}`);if(!ins.node_ids?.length)errors.push(`INSTRUCTION_WITHOUT_NODE_PROVENANCE:${ins.instruction_id}`)});
    model.feedback_loops.forEach(l=>{l.node_ids.forEach(id=>{if(!idSet.has(id))errors.push(`LOOP_UNKNOWN_NODE:${l.loop_id}:${id}`)});l.edge_ids.forEach(id=>{if(!edgeById.has(id))errors.push(`LOOP_UNKNOWN_EDGE:${l.loop_id}:${id}`)})});
    const expectedLoopSets=tarjan([...idSet],model.runtime_edges).filter(c=>c.length>1||model.runtime_edges.some(e=>e.source===c[0]&&e.target===c[0])).map(c=>c.slice().sort().join('|')).sort();
    const actualLoopSets=model.feedback_loops.map(l=>l.node_ids.slice().sort().join('|')).sort();
    if(JSON.stringify(expectedLoopSets)!==JSON.stringify(actualLoopSets))errors.push('FEEDBACK_LOOP_MISMATCH');
    const duplicateTriples=new Set();for(const e of model.runtime_edges){const k=`${e.source}>${e.target}|${e.relation_type}`;if(duplicateTriples.has(k))warnings.push(`DUPLICATE_TYPED_EDGE:${k}`);duplicateTriples.add(k)}
    return {ok:errors.length===0,errors,warnings,checked:{nodes:model.runtime_nodes.length,edges:model.runtime_edges.length,instructions:model.instructions.length,feedback_loops:model.feedback_loops.length}};
  }
  return {VERSION,STAGE_ORDER,STAGE_LABELS,classify,compile,validate};
});
