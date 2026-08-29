(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.HBBAActorProfile=api;
})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
const SCHEMA='HBBA-ACTOR-PROFILE-1';
const VERSION='HBBA-ACTOR-PROFILE-MODULE-1.2';
const EPI=['observed','self_reported','externally_reported','inferred','hypothetical','experimental','unknown'];
const TEMP=['momentary','episode','short_term','long_term','stable_trait','unknown'];
const ACTOR_TYPES=['real_person','hypothetical_person','fictional_person','composite_profile','experimental_agent','unknown'];
const SEX=['male','female','intersex','unknown','not_specified'];
const POWER=['none','low','medium','high','very_high'];
const AUDIENCE=['private','small_group','public','mass_public','unknown'];
const CHANNEL=['face_to_face','text_chat','voice','video','email','social_network','public_comment','group_chat','other'];
const PROX=['remote','distant','conversational','close','physical_contact','unknown'];
const POWER_BALANCE=['actor_much_lower','actor_lower','approximately_equal','actor_higher','actor_much_higher'];
const DEP_DIR=['actor_depends_on_target','target_depends_on_actor','mutual','none'];
const REL_TYPES=['stranger','acquaintance','colleague','subordinate','supervisor','friend','close_friend','romantic_partner','former_partner','family','competitor','adversary','client','authority','dependent','other'];
const STAKES=['negligible','low','medium','high','critical'];
const STAKE_DOMAINS=['status','money','safety','relationship','reputation','employment','access','autonomy','comfort','time','resources','other'];
const ARG=['factual','logical','narrative','emotional','authority_based','pragmatic','rhetorical','unknown'];
const LANG_PROF=['native','fluent','intermediate','limited'];
const SOURCE=['explicitly_defined','observed','inferred','experimental_parameter'];
const PRIORITY=['low','medium','high','critical'];
const ID_RE=/^[A-Za-z0-9][A-Za-z0-9_.:-]{0,127}$/;
const TOP=new Set(['schema','enabled','strict','actor_id','display_name','actor_type','demographics','social','relationship','interaction_history','current_context','goals','stakes','communication_profile','observations','knowledge','preferences','values_and_norms','risk_model','field_meta']);
const NESTED={
 demographics:new Set(['age','age_range','sex','gender_identity','primary_language','language_proficiency']),
 social:new Set(['social_status','social_status_notes','formal_power','informal_influence','occupation','social_role','education','domain_expertise']),
 relationship:new Set(['target_actor_id','relationship_type','relationship_duration','relationship_closeness','trust_level','conflict_level','dependency_level','dependency_direction','power_balance']),
 interaction_history:new Set(['positive_history','conflict_history','recent_interaction','unresolved_conflict','unresolved_conflict_notes','prior_similar_outcomes']),
 current_context:new Set(['fatigue','stress','time_pressure','cognitive_load','reported_arousal','perceived_safety','audience_context','physical_proximity','communication_channel']),
 stakes:new Set(['potential_gain','potential_loss','stakes_level','stakes_domains']),
 communication_profile:new Set(['communication_formality','directness','verbosity','emotional_expressiveness','humor_frequency','profanity_frequency','politeness','argumentation_style']),
 knowledge:new Set(['known_information','unknown_information','beliefs','known_false_beliefs']),
 risk_model:new Set(['risk_tolerance','uncertainty_tolerance','loss_sensitivity'])
};
function clone(x,seen){
 if(x===null||typeof x!=='object')return x;
 seen=seen||new WeakMap();if(seen.has(x))throw new TypeError('CYCLIC_PROFILE_VALUE');
 const out=Array.isArray(x)?[]:{};seen.set(x,out);
 if(Array.isArray(x)){for(const v of x)out.push(clone(v,seen))}else{for(const [k,v] of Object.entries(x))out[k]=clone(v,seen)}
 return out;
}
function plainObj(x){return !!x&&typeof x==='object'&&!Array.isArray(x)}
function emptyVal(v){return v===undefined||v===''||(Array.isArray(v)&&v.length===0)||(plainObj(v)&&Object.keys(v).length===0)}
function prune(v){
 if(Array.isArray(v)){const a=v.map(prune).filter(x=>!emptyVal(x));return a}
 if(plainObj(v)){const o={};for(const [k,x] of Object.entries(v)){if(x===undefined||x==='')continue;const p=prune(x);if(!emptyVal(p))o[k]=p}return o}
 return v;
}
function normalize(p){const x=prune(clone(p===undefined?{}:p));if(x.schema===undefined)x.schema=SCHEMA;if(x.enabled===undefined)x.enabled=true;return x}
function isEmpty(p){const x=normalize(p);const c=clone(x);delete c.schema;delete c.enabled;delete c.strict;delete c.field_meta;return Object.keys(prune(c)).length===0}
function inspectRaw(v,path,errors){
 const at=path||'$';
 if(v===null){errors.push(`NULL_VALUE:${at}`);return}
 if(typeof v==='number'&&!Number.isFinite(v)){errors.push(`NONFINITE_NUMBER:${at}`);return}
 if(Array.isArray(v)){v.forEach((z,i)=>inspectRaw(z,`${at}[${i}]`,errors));return}
 if(plainObj(v)){for(const [k,z] of Object.entries(v))inspectRaw(z,path?`${path}.${k}`:k,errors)}
}
function has(o,k){return Object.prototype.hasOwnProperty.call(o,k)}
function expectType(o,k,type,path,errors){if(!has(o,k))return;const v=o[k],ok=type==='array'?Array.isArray(v):type==='object'?plainObj(v):type==='integer'?typeof v==='number'&&Number.isInteger(v):type==='number'?typeof v==='number'&&Number.isFinite(v):typeof v===type;if(!ok)errors.push(`SCHEMA_TYPE:${path||k}:${type}`)}
function expectStringArray(o,k,path,errors){if(!has(o,k))return;if(!Array.isArray(o[k])){errors.push(`SCHEMA_TYPE:${path}:array`);return}if(o[k].some(v=>typeof v!=='string'))errors.push(`SCHEMA_ITEMS:${path}:string`)}
function validateCanonicalRawShape(p,errors){
 if(!plainObj(p))return;
 if(!has(p,'schema'))errors.push('SCHEMA_REQUIRED:schema');
 if(!has(p,'enabled'))errors.push('SCHEMA_REQUIRED:enabled');
 expectType(p,'enabled','boolean','enabled',errors);expectType(p,'strict','boolean','strict',errors);expectType(p,'actor_id','string','actor_id',errors);expectType(p,'display_name','string','display_name',errors);
 for(const k of ['demographics','social','relationship','interaction_history','current_context','stakes','communication_profile','knowledge','risk_model','field_meta'])expectType(p,k,'object',k,errors);
 for(const k of ['goals','observations','preferences','values_and_norms'])expectType(p,k,'array',k,errors);
 const d=plainObj(p.demographics)?p.demographics:{};
 expectType(d,'age','integer','demographics.age',errors);expectType(d,'age_range','string','demographics.age_range',errors);expectType(d,'gender_identity','string','demographics.gender_identity',errors);expectType(d,'primary_language','string','demographics.primary_language',errors);
 if(has(d,'sex')&&!SEX.includes(d.sex))errors.push('SCHEMA_ENUM:demographics.sex');if(has(d,'language_proficiency')&&!LANG_PROF.includes(d.language_proficiency))errors.push('SCHEMA_ENUM:demographics.language_proficiency');
 const s=plainObj(p.social)?p.social:{};
 for(const k of ['social_status','social_status_notes','occupation','education'])expectType(s,k,'string',`social.${k}`,errors);expectStringArray(s,'social_role','social.social_role',errors);expectStringArray(s,'domain_expertise','social.domain_expertise',errors);if(has(s,'formal_power')&&!POWER.includes(s.formal_power))errors.push('SCHEMA_ENUM:social.formal_power');if(has(s,'informal_influence')&&!POWER.includes(s.informal_influence))errors.push('SCHEMA_ENUM:social.informal_influence');
 const r=plainObj(p.relationship)?p.relationship:{};
 expectType(r,'target_actor_id','string','relationship.target_actor_id',errors);expectStringArray(r,'relationship_type','relationship.relationship_type',errors);expectType(r,'relationship_duration','string','relationship.relationship_duration',errors);for(const k of ['relationship_closeness','trust_level','conflict_level','dependency_level'])expectType(r,k,'number',`relationship.${k}`,errors);for(const k of ['dependency_direction','power_balance'])expectType(r,k,'string',`relationship.${k}`,errors);
 const c=plainObj(p.current_context)?p.current_context:{};
 for(const k of ['fatigue','stress','time_pressure','cognitive_load','reported_arousal','perceived_safety'])expectType(c,k,'number',`current_context.${k}`,errors);for(const k of ['audience_context','physical_proximity','communication_channel'])expectType(c,k,'string',`current_context.${k}`,errors);
}
function val(v){return plainObj(v)&&Object.prototype.hasOwnProperty.call(v,'value')?v.value:v}
function checkMeta(m,path,errors){if(!plainObj(m))return errors.push(`INVALID_META:${path}`);if(m.epistemic_status!==undefined&&!EPI.includes(m.epistemic_status))errors.push(`INVALID_EPISTEMIC_STATUS:${path}`);if(m.temporal_scope!==undefined&&!TEMP.includes(m.temporal_scope))errors.push(`INVALID_TEMPORAL_SCOPE:${path}`);if(m.confidence!==undefined&&(!Number.isFinite(m.confidence)||m.confidence<0||m.confidence>1))errors.push(`INVALID_CONFIDENCE:${path}`);if(m.evidence_refs!==undefined&&(!Array.isArray(m.evidence_refs)||m.evidence_refs.some(x=>typeof x!=='string')))errors.push(`INVALID_EVIDENCE_REFS:${path}`);if(m.experimental_variable!==undefined&&typeof m.experimental_variable!=='boolean')errors.push(`INVALID_EXPERIMENTAL_VARIABLE:${path}`)}
function validate(p){
 const errors=[],warnings=[];
 if(!plainObj(p)){errors.push('INVALID_PROFILE_OBJECT');return {ok:false,errors,warnings,checked_schema:SCHEMA}}
 inspectRaw(p,'',errors);
 validateCanonicalRawShape(p,errors);
 if(p.schema!==SCHEMA)errors.push('INVALID_SCHEMA');
 let x;try{x=normalize(p)}catch(e){errors.push(`NORMALIZATION_ERROR:${e.message}`);return {ok:false,errors,warnings,checked_schema:SCHEMA}}
 for(const k of Object.keys(x))if(!TOP.has(k))errors.push(`UNKNOWN_FIELD:${k}`);
 for(const [sec,allowed] of Object.entries(NESTED)){const o=x[sec];if(o!==undefined){if(!plainObj(o)){errors.push(`INVALID_SECTION:${sec}`);continue}for(const k of Object.keys(o))if(!allowed.has(k))errors.push(`UNKNOWN_FIELD:${sec}.${k}`)}}
 if(x.schema!==SCHEMA&&!errors.includes('INVALID_SCHEMA'))errors.push('INVALID_SCHEMA');
 if(typeof x.enabled!=='boolean')errors.push('INVALID_ENABLED');
 if(x.strict!==undefined&&typeof x.strict!=='boolean')errors.push('INVALID_STRICT');
 if(x.actor_id!==undefined&&(typeof x.actor_id!=='string'||!ID_RE.test(x.actor_id)))errors.push('INVALID_ACTOR_ID');
 if(x.actor_type!==undefined&&!ACTOR_TYPES.includes(x.actor_type))errors.push('INVALID_ACTOR_TYPE');
 const d=x.demographics||{},r=x.relationship||{},c=x.current_context||{},s=x.social||{},st=x.stakes||{},cp=x.communication_profile||{},risk=x.risk_model||{};
 if(d.age!==undefined&&(!Number.isInteger(d.age)||d.age<0||d.age>120))errors.push('INVALID_AGE');
 if(d.sex!==undefined&&!SEX.includes(d.sex))errors.push('INVALID_SEX');
 if(d.language_proficiency!==undefined&&!LANG_PROF.includes(d.language_proficiency))errors.push('INVALID_LANGUAGE_PROFICIENCY');
 if(s.formal_power!==undefined&&!POWER.includes(s.formal_power))errors.push('INVALID_FORMAL_POWER');
 if(s.informal_influence!==undefined&&!POWER.includes(s.informal_influence))errors.push('INVALID_INFORMAL_INFLUENCE');
 if(r.target_actor_id!==undefined&&(typeof r.target_actor_id!=='string'||!ID_RE.test(r.target_actor_id)))errors.push('INVALID_TARGET_ACTOR_ID');
 if(r.relationship_type!==undefined&&(!Array.isArray(r.relationship_type)||r.relationship_type.some(z=>typeof z!=='string'||!REL_TYPES.includes(z))))errors.push('INVALID_RELATIONSHIP_TYPE');
 if(r.dependency_direction!==undefined&&!DEP_DIR.includes(r.dependency_direction))errors.push('INVALID_DEPENDENCY_DIRECTION');
 if(r.power_balance!==undefined&&!POWER_BALANCE.includes(r.power_balance))errors.push('INVALID_POWER_BALANCE');
 if(c.audience_context!==undefined&&!AUDIENCE.includes(c.audience_context))errors.push('INVALID_AUDIENCE_CONTEXT');
 if(c.communication_channel!==undefined&&!CHANNEL.includes(c.communication_channel))errors.push('INVALID_COMMUNICATION_CHANNEL');
 if(c.physical_proximity!==undefined&&!PROX.includes(c.physical_proximity))errors.push('INVALID_PHYSICAL_PROXIMITY');
 if(st.stakes_level!==undefined&&!STAKES.includes(val(st.stakes_level)))errors.push('INVALID_STAKES_LEVEL');
 if(st.stakes_domains!==undefined&&(!Array.isArray(val(st.stakes_domains))||val(st.stakes_domains).some(z=>!STAKE_DOMAINS.includes(z))))errors.push('INVALID_STAKES_DOMAINS');
 if(cp.argumentation_style!==undefined&&(!Array.isArray(val(cp.argumentation_style))||val(cp.argumentation_style).some(z=>!ARG.includes(z))))errors.push('INVALID_ARGUMENTATION_STYLE');
 for(const [path,v] of [['relationship.relationship_closeness',r.relationship_closeness],['relationship.trust_level',r.trust_level],['relationship.conflict_level',r.conflict_level],['relationship.dependency_level',r.dependency_level],['current_context.fatigue',c.fatigue],['current_context.stress',c.stress],['current_context.time_pressure',c.time_pressure],['current_context.cognitive_load',c.cognitive_load],['current_context.reported_arousal',c.reported_arousal],['current_context.perceived_safety',c.perceived_safety],['communication_profile.communication_formality',cp.communication_formality],['communication_profile.directness',cp.directness],['communication_profile.verbosity',cp.verbosity],['communication_profile.emotional_expressiveness',cp.emotional_expressiveness],['communication_profile.humor_frequency',cp.humor_frequency],['communication_profile.profanity_frequency',cp.profanity_frequency],['communication_profile.politeness',cp.politeness],['risk_model.risk_tolerance',risk.risk_tolerance],['risk_model.uncertainty_tolerance',risk.uncertainty_tolerance],['risk_model.loss_sensitivity',risk.loss_sensitivity]]){if(v!==undefined){const n=v;if(typeof n!=='number'||!Number.isFinite(n)||n<0||n>5)errors.push(`INVALID_0_5:${path}`)}}
 if(x.goals!==undefined){if(!Array.isArray(x.goals))errors.push('INVALID_GOALS');else x.goals.forEach((g,i)=>{if(!plainObj(g)||typeof g.description!=='string'||!g.description.trim())errors.push(`INVALID_GOAL:${i}`);if(g.priority!==undefined&&!PRIORITY.includes(g.priority))errors.push(`INVALID_GOAL_PRIORITY:${i}`);if(g.epistemic_status!==undefined&&!EPI.includes(g.epistemic_status))errors.push(`INVALID_GOAL_EPISTEMIC:${i}`);if(g.evidence_refs!==undefined&&(!Array.isArray(g.evidence_refs)||g.evidence_refs.some(z=>typeof z!=='string')))errors.push(`INVALID_GOAL_EVIDENCE:${i}`)})}
 if(x.observations!==undefined){if(!Array.isArray(x.observations))errors.push('INVALID_OBSERVATIONS');else x.observations.forEach((o,i)=>{if(!plainObj(o)||typeof o.description!=='string')errors.push(`INVALID_OBSERVATION:${i}`);if(o.epistemic_status!==undefined&&!EPI.includes(o.epistemic_status))errors.push(`INVALID_OBSERVATION_EPISTEMIC:${i}`);if(o.evidence_refs!==undefined&&(!Array.isArray(o.evidence_refs)||o.evidence_refs.some(z=>typeof z!=='string')))errors.push(`INVALID_OBSERVATION_EVIDENCE:${i}`)})}
 if(x.knowledge?.beliefs!==undefined){if(!Array.isArray(x.knowledge.beliefs))errors.push('INVALID_BELIEFS');else x.knowledge.beliefs.forEach((b,i)=>{if(!plainObj(b)||typeof b.claim!=='string')errors.push(`INVALID_BELIEF:${i}`);if(b.confidence!==undefined&&(typeof b.confidence!=='number'||!Number.isFinite(b.confidence)||b.confidence<0||b.confidence>1))errors.push(`INVALID_BELIEF_CONFIDENCE:${i}`);if(b.epistemic_status!==undefined&&!EPI.includes(b.epistemic_status))errors.push(`INVALID_BELIEF_EPISTEMIC:${i}`)})}
 if(x.field_meta!==undefined){if(!plainObj(x.field_meta))errors.push('INVALID_FIELD_META');else for(const [path,m] of Object.entries(x.field_meta))checkMeta(m,path,errors)}
 // Never derive topology from profile; this module has no graph mutation API by design.
 if(x.actor_type==='real_person')warnings.push('REAL_PERSON_LATENT_STATES_MUST_REMAIN_HYPOTHESES');
 return {ok:errors.length===0,errors,warnings,checked_schema:SCHEMA};
}
function flatten(p){const x=normalize(p),rows=[];function walk(v,path){if(Array.isArray(v)){if(v.length)rows.push([path,v]);return}if(plainObj(v)){for(const [k,z] of Object.entries(v))walk(z,path?path+'.'+k:k);return}if(path&&!['schema','enabled','strict'].includes(path))rows.push([path,v])}walk(x,'');return rows}
function metaFor(p,path){return p.field_meta?.[path]||{}}
function promptLines(p,lang){
 const x=normalize(p);if(isEmpty(x)||x.enabled===false)return [];
 const ru=lang!=='en',out=[];out.push(ru?'## Actor Profile / Person Model':'## Actor Profile / Person Model','');
 out.push(ru?'Этот профиль является дополнительным contextual/modulatory layer. Он НЕ заменяет topology HBBA Behavioral Runtime и НЕ создаёт отсутствующие behaviors, nodes или edges.':'This profile is an additional contextual/modulatory layer. It does NOT replace HBBA Behavioral Runtime topology and does NOT create missing behaviors, nodes, or edges.','');
 out.push(ru?'Используй только явно заданные поля. Отсутствующее поле = нет информации, а не среднее/нейтральное значение. Не восстанавливай характеристики из стереотипов.':'Use only explicitly supplied fields. An absent field means no information, not an average/neutral value. Do not reconstruct characteristics from stereotypes.');
 if(x.strict)out.push(ru?'- Strict Actor Profile = ON: запрещено достраивать biography/personality/status/motives/knowledge/relationships без основания.':'- Strict Actor Profile = ON: do not infer missing biography/personality/status/motives/knowledge/relationships without evidence.');
 if(x.actor_type==='real_person')out.push(ru?'- actor_type=real_person: скрытые состояния и психологические характеристики остаются гипотезами, если они не наблюдаемы/не сообщены напрямую.':'- actor_type=real_person: latent states and psychological attributes remain hypotheses unless directly observed/reported.');
 out.push(ru?'- Демография, пол/гендер, этничность, религия, национальность, инвалидность, сексуальная ориентация, диагнозы и политическая принадлежность не являются behavioral causes. attribute ≠ behavior.':'- Demographics, sex/gender, ethnicity, religion, nationality, disability, sexual orientation, diagnoses, and political affiliation are not behavioral causes. attribute ≠ behavior.');
 out.push(ru?'- Profile может только модулировать выбор между путями, уже существующими в Runtime. Один параметр не активирует ветвь автоматически.':'- The profile may only modulate selection among pathways already present in Runtime. A single parameter never activates a whole branch automatically.');
 out.push(ru?'- При конфликте Profile и topology преимущество имеет topology; при конфликте Profile и наблюдаемого текущего сообщения преимущество имеет текущий наблюдаемый контекст.':'- If Profile conflicts with topology, topology wins; if Profile conflicts with current observed input, current observed context wins.');
 out.push(ru?'- Не генерируй probability/effectiveness, hidden weights или activation likelihood из Profile. confidence относится только к уверенности во входном утверждении.':'- Do not generate probability/effectiveness, hidden weights, or activation likelihood from Profile. confidence applies only to confidence in the input assertion.','');
 out.push(ru?'### Explicit profile fields':'### Explicit profile fields');
 for(const [path,v] of flatten(x)){if(path.startsWith('field_meta.'))continue;const m=metaFor(x,path),bits=[];if(m.epistemic_status)bits.push(`epistemic_status=${m.epistemic_status}`);if(m.temporal_scope)bits.push(`temporal_scope=${m.temporal_scope}`);if(m.confidence!==undefined)bits.push(`confidence=${m.confidence}`);if(m.experimental_variable)bits.push('experimental_variable=true');if(Array.isArray(m.evidence_refs))bits.push(`evidence_refs=${JSON.stringify(m.evidence_refs)}`);out.push(`- ${path}: ${typeof v==='string'?v:JSON.stringify(v)}${bits.length?' | '+bits.join(' | '):''}`)}
 out.push('',ru?'### Profile execution rules':'### Profile execution rules');
 (ru?[
 'Actor Profile — контекст/модуляция, не сценарный движок.',
 'Не создавай отсутствующие nodes/edges/behaviors и не меняй relation_type/audit_grade.',
 'Не выводи мотивацию непосредственно из возраста, пола, профессии, статуса или иных демографических признаков.',
 'Используй характеристику только если она релевантна текущему сообщению и доступному пути Runtime.',
 'context задаёт условия; modulates изменяет выраженность/приоритет доступного процесса; associated_with не причинность; computational_input — только дополнительный вход; updates — изменение во времени.',
 'Для real_person не утверждай «этот человек обязательно поступит так»; формулируй как совместимость реакции с заданной моделью и доступными путями Runtime.'
 ]:[
 'Actor Profile is context/modulation, not a scenario engine.',
 'Do not create missing nodes/edges/behaviors or change relation_type/audit_grade.',
 'Do not infer motivation directly from age, sex, occupation, status, or other demographic attributes.',
 'Use an attribute only when relevant to the current message and an available Runtime pathway.',
 'context sets conditions; modulates changes expression/priority of an available process; associated_with is not causality; computational_input is only an additional input; updates changes future state over time.',
 'For real_person do not state “this person will definitely act this way”; describe compatibility with the supplied model and available Runtime pathways.'
 ]).forEach(s=>out.push('- '+s));return out;
}
function parseShortDescription(text){
 const s=String(text||'').trim(),profile={schema:SCHEMA,enabled:true,field_meta:{}},found=[];if(!s)return {profile,found};
 let m=s.match(/(\d{1,3})\s*(?:лет|года?|years?\s*old|yo)/i);if(m&&+m[1]<=120){profile.demographics={age:+m[1]};profile.field_meta['demographics.age']={epistemic_status:'inferred',evidence_refs:['short_description']};found.push('age')}
 if(/мужчин[аы]?|male/i.test(s)){profile.demographics={...(profile.demographics||{}),sex:'male'};profile.field_meta['demographics.sex']={epistemic_status:'inferred',evidence_refs:['short_description']};found.push('sex')}
 else if(/женщин[аы]?|female/i.test(s)){profile.demographics={...(profile.demographics||{}),sex:'female'};profile.field_meta['demographics.sex']={epistemic_status:'inferred',evidence_refs:['short_description']};found.push('sex')}
 if(/руководител|manager|начальник/i.test(s)){profile.social={occupation:'manager',social_role:['manager']};profile.field_meta['social.occupation']={epistemic_status:'inferred',evidence_refs:['short_description']};found.push('occupation')}
 if(/подчин[её]н|subordinate/i.test(s)){profile.relationship={relationship_type:['supervisor'],power_balance:'actor_higher'};profile.field_meta['relationship.relationship_type']={epistemic_status:'inferred',evidence_refs:['short_description']};found.push('relationship')}
 if(/при других|при сотрудник|small group|не один на один/i.test(s)){profile.current_context={audience_context:'small_group'};profile.field_meta['current_context.audience_context']={epistemic_status:'inferred',evidence_refs:['short_description']};found.push('audience_context')}
 if(/недавно.{0,30}конфликт|recent conflict/i.test(s)){profile.interaction_history={conflict_history:s};profile.field_meta['interaction_history.conflict_history']={epistemic_status:'inferred',evidence_refs:['short_description']};found.push('conflict_history')}
 return {profile:normalize(profile),found};
}
return {SCHEMA,VERSION,EPI,TEMP,ACTOR_TYPES,SEX,POWER,AUDIENCE,CHANNEL,PROX,POWER_BALANCE,DEP_DIR,REL_TYPES,STAKES,STAKE_DOMAINS,ARG,LANG_PROF,SOURCE,PRIORITY,clone,normalize,isEmpty,validate,validateCanonicalRawShape,promptLines,parseShortDescription,flatten};
});
