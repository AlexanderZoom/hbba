(()=>{
const D=window.HBBA_DATA;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const nodeById=new Map(D.nodes.map(n=>[n.id,n]));
const behaviorById=new Map(D.behaviors.map(b=>[b.id,b]));
const sourceById=new Map(D.sources.map(s=>[s.id,s]));
const edgeByKey=new Map(D.edges.map(e=>[e.source+"→"+e.target,e]));

const FINAL_RELEASE_STATUS={
  release:"1.0.1",
  core:D.version,
  scientificCore:"EVIDENCE-AUDIT-1 / INDEPENDENTLY ACCEPTED",
  ru:{
    note:"Scientific Evidence / epistemic boundary независимо принят на границе v0.7.0.24 и сохранён в frozen core v0.7.0.28: reviewed 101/101 базовых рёбер, 78/78 используемых источников и 150/150 source placements; A3/B58/C27/D0/X13. X = reviewed, но evidence недостаточно или claim остаётся underspecified.",
    scope:"Независимо принят статус научного ядра в пределах evidence/epistemic boundary; это не является доказательством поведенческой эффективности HBBA, real-world predictive validity, диагностики или универсального усиления LLM.",
    warning:D.model_status.ru.warning
  },
  en:{
    note:"The Scientific Evidence / epistemic boundary was independently accepted at v0.7.0.24 and is preserved in frozen core v0.7.0.28: 101/101 base edges, 78/78 used sources, and 150/150 source placements reviewed; A3/B58/C27/D0/X13. X = reviewed, but evidence remains insufficient or the claim underspecified.",
    scope:"The scientific core was independently accepted only within the evidence/epistemic boundary; this is not evidence of HBBA behavioral effectiveness, real-world predictive validity, diagnosis, or universal LLM enhancement.",
    warning:D.model_status.en.warning
  }
};

const I={
ru:{
title:"Научный атлас механизмов человеческого поведения",subtitle:"Интерактивная карта механизмов человеческого действия",
prototype:"ИССЛЕДОВАТЕЛЬСКИЙ ПРОТОТИП",combineTitle:"Смешивайте поведения",combineText:"Выберите несколько режимов — общие механизмы загорятся ярче.",
selected:"Выбрано",clear:"Сбросить",actions:"Поведения / действия",waiting:"Ожидание выбора",fit:"Вместить",sharedOnly:"Общие",labels:"Подписи",clearPins:"Снять все",helpLegend:"Как читать карту",evidenceLayer:"Evidence",evidenceTitle:"Доказательность стрелок",evidenceSubtitle:"Фильтр относится к аудиту конкретных рёбер, а не к общему впечатлению от модели.",showScenarioInteractions:"Показывать сценарные связи между участниками",evidenceWarning:`HBBA v0.7.0.28: 101/101 базовых рёбер прошли relation-level review; A 3 · B 58 · C 27 · D 0 · X 13. X = review выполнен, но evidence недостаточно или claim слишком широк. A/B/C/D/X — редакционные статусы конкретных стрелок HBBA, а не вероятность истины, не clinical GRADE и не вывод о конкретном человеке. Evidence/epistemic boundary: INDEPENDENTLY ACCEPTED (v0.7.0.24); это не behavioral-effectiveness PASS.`,
aiExport:"AI-контекст",aiBridge:"AI Bridge",scenarioImport:"Сценарий",director:"Директор",directorTitle:"Команда экскурсовода",directorSubtitle:"Бесплатный мост: вставьте короткую команду от ИИ, и HBBA сам покажет нужную часть графа.",directorShow:"Показать",directorResume:"Вернуться к экскурсии",directorHelp:"Команды ничего не отправляют в интернет. Их исполняет только локальная страница HBBA.",edgeAuditSubtitle:"Показывает статус именно стрелки, а не только двух нод.",tourPrev:"Назад",tourNext:"Следующий",tourOverview:"Вся карта",restartTour:"▶ Экскурсия",
behaviorShift:"Трансформировать",behaviorShiftTitle:"Трансформация поведения",
behaviorShiftSubtitle:"Сравните текущую модель с альтернативной и посмотрите, что придётся сохранить, убрать и добавить.",
shiftPrototypeOpen:"В прототипе слой открыт",shiftContextHint:"Контрфактическое сравнение моделей",
shiftDetails:"Что изменилось",clearShift:"Сбросить подсветку",shiftSource:"Что меняем",
shiftTargets:"Во что можно перестроить",shiftScoreNote:"Graph overlap = структурное перекрытие, НЕ вероятность изменения поведения",
shiftChooseTarget:"Выберите целевое поведение слева",structuralSimilarity:"Перекрытие графов",
shiftKept:"Сохраняется",shiftRemoved:"Уходит из модели",shiftAdded:"Добавляется",
shiftRole:"Меняется смысловая роль",practicalLayer:"Практический слой",
forSelf:"Для себя",forOther:"Для другого человека",forGroup:"Для группы",
shiftApplyMeaning:"Что произойдёт:",shiftApplyText:"исходное поведение будет заменено целевым в текущей комбинации, а граф пересчитается.",
applyTransformation:"Применить трансформацию",scenarioImportTitle:"Импорт сценария от ИИ",scenarioImportSubtitle:"Загрузите готовый .json-файл от Guided Session или вставьте строгий JSON вручную.",loadScenarioFile:"Загрузить JSON-файл",scenarioFileHint:"Файл читается только локально в браузере.",scenarioPasteFallback:"Или вставьте JSON вручную:",scenarioFileLoaded:"Файл загружен",scenarioFileTooLarge:"Файл слишком большой (максимум 2 МБ)",scenarioFileReadError:"Не удалось прочитать файл",validateScenario:"Проверить",applyScenario:"Показать на карте",clearScenario:"Очистить сценарий",scenarioShowBackground:"Показать поведенческий фон",scenarioBackToFocus:"Вернуться к фокусу",scenarioConnected:"связная карта",scenarioComponents:"компонента(ов)",scenarioIsolated:"изолировано",aiExportTitle:"Текстовая модель текущего графа",
aiExportSubtitle:"Готовый контекст для другой нейросети или нового диалога.",
copyAI:"Копировать",downloadAI:"Скачать .md",
aiExportHelp:"Вставьте текст целиком в новую нейросеть. После этого можно приводить собственные примеры и просить разбирать их относительно структуры графа.",
modeLayman:"Обыватель",modeCombined:"Комбо",modeProfessional:"Профи",nodeInspector:"NODE INSPECTOR",
modeLaymanTitle:"Обывательский режим",modeLaymanText:"Профессиональные механизмы объединяются только там, где их действительно можно выразить одним понятным смыслом. Деталей остаётся достаточно, чтобы видеть различия.",
modeCombinedTitle:"Комбинированный режим",modeCombinedText:"Профессиональная схема остаётся основой. Понятные смысловые группы обрамляют только функционально близкие механизмы, не сжимая всё поведение до нескольких общих этапов.",
modeProfessionalTitle:"Профессиональный режим",modeProfessionalText:"Полная схема: психологические гипотезы, наблюдаемое, нейронная реализация, физиология и обучение разделены; разные типы линий не означают одну причинную цепь.",
heroKicker:"НЕ СМОТРЕТЬ НА МОЗГ. СМОТРЕТЬ, КАК ОН РАБОТАЕТ.",emptyTitle:"Соедините действия — увидьте общий механизм",
emptyText:"Наложите агрессию на манипуляцию: общие процессы вспыхнут, уникальные ветви останутся видимыми отдельно.",
preset1:"Агрессия + Манипуляция",preset2:"Страх + Ложь",preset3:"Привязанность + Ревность",
zoomHint:"Колесо — масштаб • Тяните пустое место — карта • Тяните ноду — переставить",evHigh:"выше",evMod:"средне",evLow:"гипотеза",dirOne:"в одном направлении",dirBoth:"в обе стороны",auditedMini:"аудировано",reviewedXMini:"X = проверено, но данных недостаточно / claim слишком широк",xReviewedMini:"review выполнен · evidence недостаточно / claim слишком широк",
details:"Карточка механизма",detailsHelp:"Нажмите на любой узел. Здесь появится простое объяснение: что это, как проявляется, что запускает и с чем связано.",
aboutShort:"О проекте",researchResults:"Исследования",scienceTitle:"Научный статус",confidenceLabel:"Статус научного ядра · evidence boundary",acceptanceScopeTitle:"Граница принятия",acceptanceScopeText:FINAL_RELEASE_STATUS.ru.scope,modelNotFact:"МОДЕЛЬ, НЕ ФАКТ",sourcesTitle:"Научные опоры",
sourceCoverage:`HBBA v0.7.0.28: reviewed ${D.edges.length}/${D.edges.length} рёбер · A 3 · B 58 · C 27 · D 0 · X 13. Evidence/epistemic boundary: INDEPENDENTLY ACCEPTED (v0.7.0.24); это не behavioral-effectiveness PASS.`,
macroContains:"Внутри объединено профессиональных механизмов",
macroIncludes:"Что сюда входит",
macroMeaning:"Простой смысл этапа",
macroHidden:"В обывательском режиме эти механизмы специально собраны в один этап, чтобы не перегружать карту.",
searchPlaceholder:"агрессия, страх, ложь…",nodes:"узлов",shared:"общих",edges:"связей",usedBy:"Участвует в выбранных поведениях",
sharedNode:"Это общий узел: он входит сразу в несколько выбранных моделей.",
brainLinks:"Что связано внутри научной модели",brainNetworks:"Сети мозга",brainRegions:"Структуры мозга",bodySystems:"Физиология",
brainIntro:"В обывательском режиме эти научные компоненты не засоряют карту, но остаются связаны с нодой:",
proVisibleNote:"Переключите «Профи», чтобы увидеть их отдельными нодами на карте.",
what:"Что это",looks:"Как проявляется",trigger:"Что обычно запускает",purpose:"Зачем это нужно",mayLead:"К чему может привести",caveat:"Важно: не делайте вывод по одному признаку",
scienceName:"Научное название",nodeSources:"Научные опоры этой ноды",
types:{context:"Контекст",cognitive:"Когнитивный процесс",social_cog:"Социальное познание",control:"Контроль",affect:"Аффект",motivation:"Мотивация / Positive Valence",regulatory:"Регуляторная система",strategy:"Стратегия (гипотеза)",network:"Каноническая сеть",network_family:"Семейство сетей",distributed_system:"Распределённая система",circuit_family:"Семейство контуров",neural_system:"Нейронная система (абстракция)",region:"Структура мозга",physiology:"Физиология / моторный выход",motor:"Наблюдаемое действие",outcome:"Наблюдаемый/кодируемый исход",learning:"Обучение"},
stages:["КОНТЕКСТ","ПСИХОЛОГИЧЕСКИЕ ГИПОТЕЗЫ","СОСТОЯНИЕ / КОНТРОЛЬ","НЕЙРОННАЯ РЕАЛИЗАЦИЯ","КОМПОНЕНТЫ СЕТЕЙ","ФИЗИОЛОГИЯ / ДЕЙСТВИЕ","ИСХОД / ОБУЧЕНИЕ"],
layStages:["СИТУАЦИЯ","ЧТО ЧЕЛОВЕК ПОНИМАЕТ","СОСТОЯНИЕ / ЦЕЛЬ","ЧТО ДЕЛАЕТ","ЧЕМ ЗАКОНЧИЛОСЬ"],
about:`<p><strong>HBBA</strong> — экспериментальный научно-образовательный атлас.</p>
<p><strong>Это модель, а не установленная истина.</strong> Статус evidence/epistemic boundary научного ядра: ${FINAL_RELEASE_STATUS.scientificCore}.</p>
<p><strong>HBBA Final Release v1.0.1</strong>; научное ядро <strong>v0.7.0.28</strong> остаётся frozen. 101/101 базовых связей прошли Scientific Evidence Audit; evidence/epistemic boundary v0.7.0.24 независимо принята. <strong>Это принятие границы evidence, а не доказательство поведенческой эффективности.</strong></p><p>Финальные исследования: Challenge v1.0.1 — <strong>EVIDENCE_AGAINST</strong> универсального reasoning-усиления; Composition Precision v1.3.0 — <strong>NEUTRAL_TOPOLOGY_EFFECT</strong> (FLAT 60/60, GRAPH 60/60). Реальная predictive validity композиций для поведения человека остаётся <strong>UNTESTED</strong>. <a href="research-results.html">Подробные результаты →</a></p>
<p>${D.model_status.ru.warning}</p><p><strong>${D.author.ru}</strong></p>`
},
en:{
title:"Scientific Atlas of Human Behavioral Mechanisms",subtitle:"Interactive map of human behavioral mechanisms",
prototype:"RESEARCH PROTOTYPE",combineTitle:"Combine behaviors",combineText:"Select several modes — shared mechanisms will glow brighter.",
selected:"Selected",clear:"Clear",actions:"Behaviors / actions",waiting:"Waiting for selection",fit:"Fit",sharedOnly:"Shared",labels:"Labels",clearPins:"Clear pins",helpLegend:"How to read the map",evidenceLayer:"Evidence",evidenceTitle:"Edge evidence",evidenceSubtitle:"The filter applies to per-edge audit status, not to a general impression of the model.",showScenarioInteractions:"Show scenario links between actors",evidenceWarning:`HBBA v0.7.0.28: 101/101 base edges received relation-level review; A 3 · B 58 · C 27 · D 0 · X 13. X = reviewed, but evidence is insufficient or the claim remains too broad. A/B/C/D/X are HBBA editorial statuses for individual edges, not probabilities, not clinical GRADE, and not inferences about a person. Evidence/epistemic boundary: INDEPENDENTLY ACCEPTED (v0.7.0.24); this is not a behavioral-effectiveness PASS.`,
aiExport:"AI context",aiBridge:"AI Bridge",scenarioImport:"Scenario",director:"Director",directorTitle:"Guide command",directorSubtitle:"Free bridge: paste a short AI command and HBBA will focus the requested graph region.",directorShow:"Show",directorResume:"Return to tour",directorHelp:"Commands are executed only by the local HBBA page and are not sent anywhere.",edgeAuditSubtitle:"Shows the status of the edge itself, not just its two nodes.",tourPrev:"Back",tourNext:"Next",tourOverview:"Full map",restartTour:"▶ Tour",
behaviorShift:"Transform",behaviorShiftTitle:"Behavior transformation",
behaviorShiftSubtitle:"Compare the current model with an alternative and see what is preserved, removed, and added.",
shiftPrototypeOpen:"Layer unlocked in prototype",shiftContextHint:"Counterfactual model comparison",
shiftDetails:"What changed",clearShift:"Clear highlight",shiftSource:"Replace",
shiftTargets:"Possible target behaviors",shiftScoreNote:"Graph overlap = structural overlap, NOT a probability of behavior change",
shiftChooseTarget:"Choose a target behavior on the left",structuralSimilarity:"Graph overlap",
shiftKept:"Preserved",shiftRemoved:"Removed from model",shiftAdded:"Added",
shiftRole:"Semantic role changes",practicalLayer:"Practical layer",
forSelf:"For myself",forOther:"For another person",forGroup:"For a group",
shiftApplyMeaning:"What happens:",shiftApplyText:"the source behavior is replaced by the target inside the current combination and the graph is recalculated.",
applyTransformation:"Apply transformation",scenarioImportTitle:"Import AI scenario",scenarioImportSubtitle:"Load the .json file produced by Guided Session, or paste strict JSON manually.",loadScenarioFile:"Load JSON file",scenarioFileHint:"The file is read locally in your browser only.",scenarioPasteFallback:"Or paste JSON manually:",scenarioFileLoaded:"File loaded",scenarioFileTooLarge:"File is too large (2 MB maximum)",scenarioFileReadError:"Could not read file",validateScenario:"Validate",applyScenario:"Show on map",clearScenario:"Clear scenario",scenarioShowBackground:"Show behavior background",scenarioBackToFocus:"Return to scenario focus",scenarioConnected:"connected map",scenarioComponents:"component(s)",scenarioIsolated:"isolated",aiExportTitle:"Text model of the current graph",
aiExportSubtitle:"Ready-to-use context for another AI system or a new conversation.",
copyAI:"Copy",downloadAI:"Download .md",
aiExportHelp:"Paste the full text into a new AI conversation. You can then provide your own examples and ask for analysis grounded in the graph structure.",
modeLayman:"Layman",modeCombined:"Combined",modeProfessional:"Pro",nodeInspector:"NODE INSPECTOR",
modeLaymanTitle:"Layman mode",modeLaymanText:"Professional mechanisms are merged only when they can genuinely be expressed by one understandable concept. Enough detail remains to preserve meaningful differences.",
modeCombinedTitle:"Combined mode",modeCombinedText:"The professional graph remains the base. Plain-language semantic groups enclose only functionally close mechanisms instead of collapsing the whole behavior into a few generic stages.",
modeProfessionalTitle:"Professional mode",modeProfessionalText:"Full scheme: psychological hypotheses, observations, neural implementation, physiology, and learning are separated; different line types do not form one causal chain.",
heroKicker:"DON'T JUST LOOK AT THE BRAIN. WATCH HOW IT WORKS.",emptyTitle:"Combine actions — reveal the shared mechanism",
emptyText:"Overlay aggression with manipulation: shared processes flare up while unique branches remain visible.",
preset1:"Aggression + Manipulation",preset2:"Fear + Deception",preset3:"Attachment + Jealousy",
zoomHint:"Wheel — zoom • Drag empty space — pan • Drag a node — move it",evHigh:"higher",evMod:"moderate",evLow:"hypothesis",dirOne:"one direction",dirBoth:"both directions",auditedMini:"audited",reviewedXMini:"X = reviewed, but evidence insufficient / claim too broad",xReviewedMini:"reviewed · evidence insufficient / claim too broad",
details:"Mechanism card",detailsHelp:"Click any node for a plain-language explanation: what it is, how it appears, what triggers it, and what it connects to.",
aboutShort:"About",researchResults:"Research",scienceTitle:"Scientific status",confidenceLabel:"Scientific core · evidence boundary status",acceptanceScopeTitle:"Acceptance boundary",acceptanceScopeText:FINAL_RELEASE_STATUS.en.scope,modelNotFact:"MODEL, NOT FACT",sourcesTitle:"Scientific foundations",
sourceCoverage:`HBBA v0.7.0.28: reviewed ${D.edges.length}/${D.edges.length} edges · A 3 · B 58 · C 27 · D 0 · X 13. Evidence/epistemic boundary: INDEPENDENTLY ACCEPTED (v0.7.0.24); this is not a behavioral-effectiveness PASS.`,
macroContains:"Professional mechanisms combined inside",
macroIncludes:"What is included",
macroMeaning:"Plain meaning of this stage",
macroHidden:"In layman mode these mechanisms are intentionally merged into one stage so the map stays readable.",
searchPlaceholder:"aggression, fear, deception…",nodes:"nodes",shared:"shared",edges:"links",usedBy:"Used by selected behaviors",
sharedNode:"Shared node: it belongs to more than one selected model.",
brainLinks:"What is linked inside the scientific model",brainNetworks:"Brain networks",brainRegions:"Brain regions",bodySystems:"Physiology",
brainIntro:"In layman mode these scientific components stay off the map but remain linked to the node:",
proVisibleNote:"Switch to Pro to show them as explicit graph nodes.",
what:"What it is",looks:"How it appears",trigger:"What usually triggers it",purpose:"What it is for",mayLead:"What it may lead to",caveat:"Important: do not infer from one sign",
scienceName:"Scientific name",nodeSources:"Scientific foundations for this node",
types:{context:"Context",cognitive:"Cognitive process",social_cog:"Social cognition",control:"Control",affect:"Affect",motivation:"Motivation / Positive Valence",regulatory:"Regulatory system",strategy:"Strategy (hypothesis)",network:"Canonical network",network_family:"Network family",distributed_system:"Distributed system",circuit_family:"Circuit family",neural_system:"Neural system (abstraction)",region:"Brain region",physiology:"Physiology / motor output",motor:"Observable action",outcome:"Observable/coded outcome",learning:"Learning"},
stages:["CONTEXT","PSYCHOLOGICAL HYPOTHESES","STATE / CONTROL","NEURAL IMPLEMENTATION","NETWORK COMPONENTS","PHYSIOLOGY / ACTION","OUTCOME / LEARNING"],
layStages:["SITUATION","WHAT THE PERSON INFERS","STATE / GOAL","WHAT THEY DO","WHAT HAPPENS NEXT"],
about:`<p><strong>HBBA</strong> is an experimental scientific/educational atlas.</p>
<p><strong>This is a model, not established truth.</strong> Scientific-core evidence/epistemic boundary status: ${FINAL_RELEASE_STATUS.scientificCore}.</p>
<p><strong>HBBA Final Release v1.0.1</strong>; scientific core <strong>v0.7.0.28</strong> remains frozen. 101/101 base relations are covered by the Scientific Evidence Audit; the v0.7.0.24 evidence/epistemic boundary is independently accepted. <strong>This boundary acceptance is not evidence of behavioral effectiveness.</strong></p><p>Final research: Challenge v1.0.1 — <strong>EVIDENCE_AGAINST</strong> universal reasoning enhancement; Composition Precision v1.3.0 — <strong>NEUTRAL_TOPOLOGY_EFFECT</strong> (FLAT 60/60, GRAPH 60/60). Real-world predictive validity of compositions remains <strong>UNTESTED</strong>. <a href="research-results.html">Detailed results →</a></p>
<p>${D.model_status.en.warning}</p><p><strong>${D.author.en}</strong></p>`
}};

let lang="ru",selected=new Set(),domain="all",sharedOnly=false,showLabels=true,activeNode=null,viewMode="layman";
const pinnedKeys=new Set();
let hoverConnectionKey=null;
let transform={x:0,y:0,k:1},dragging=false,last={x:0,y:0};
let nodeDragging=false;
let currentGraphPositions=new Map();
let currentGraphKind=null;
let currentClusterMembers=new Map();
let currentClusterOffsets=new Map();
let lastDetailTitle="HBBA";
let activeScenario=null;
let validatedScenario=null;
let scenarioFocusMode=true;
let guidedTourSteps=[];
let guidedTourIndex=0;
let guidedTourActive=false;
let guidedTourOverview=false;
let guidedTourAnimationFrame=null;
let directorActive=false;
let directorResumeState=null;
let evidenceGradesVisible=new Set(["A","B","C","D","X"]);
let showScenarioInteractions=true;
let behaviorShiftSource=null;
let behaviorShiftTarget=null;
let behaviorShiftAudience="self";
let behaviorShiftDiff=null;
let appliedShiftDiff=null;

const typeStage={context:0,cognitive:1,social_cog:1,control:2,affect:2,motivation:2,regulatory:2,strategy:2,network:3,network_family:3,distributed_system:3,circuit_family:3,neural_system:4,region:4,physiology:5,motor:5,outcome:6,learning:6};
const legendTypes=["context","cognitive","affect","motivation","regulatory","strategy","network","distributed_system","circuit_family","region","physiology","motor","outcome","learning"];
const professionalTypes=new Set(["network","network_family","distributed_system","circuit_family","neural_system","region","physiology"]);

const macroDefs=[
  {id:"context",icon:"01",name:{ru:"Что происходит вокруг",en:"What is happening around them"},description:{ru:"Внешняя ситуация: угроза, возможность, конкуренция, оценка окружающих и другие условия, которые задают исходную задачу.",en:"External conditions: threat, opportunity, competition, social evaluation, and other circumstances that define the initial problem."}},
  {id:"notice",icon:"02",name:{ru:"Что человек замечает",en:"What the person notices"},description:{ru:"Какие сигналы человек выделяет из происходящего и чему отдаёт приоритет во внимании.",en:"Which signals the person extracts from the situation and prioritizes in attention."}},
  {id:"memory",icon:"03",name:{ru:"Сравнивает с прошлым",en:"Compares with past experience"},description:{ru:"Подтягивает предыдущий опыт и знакомый контекст, чтобы понять, на что похоже происходящее сейчас.",en:"Retrieves prior experience and familiar context to understand what the current situation resembles."}},
  {id:"other_model",icon:"04",name:{ru:"Понимает другого",en:"Builds a model of the other person"},description:{ru:"Пытается представить, что знает, хочет и собирается сделать другой человек, а также как он видит ситуацию.",en:"Tries to infer what another person knows, wants, intends to do, and how they see the situation."}},
  {id:"threat",icon:"05",name:{ru:"Оценивает опасность",en:"Assesses danger"},description:{ru:"Определяет, есть ли угроза и насколько она серьёзна: физически, социально или для текущей цели.",en:"Estimates whether there is a threat and how serious it is."}},
  {id:"value",icon:"06",name:{ru:"Считает выгоду и цену",en:"Weighs benefit and cost"},description:{ru:"Сравнивает ожидаемую выгоду, риск, цену ошибки и допустимость разных вариантов.",en:"Compares expected benefit, risk, cost of error, and acceptability."}},
  {id:"predict",icon:"07",name:{ru:"Прогнозирует, что будет дальше",en:"Predicts what happens next"},description:{ru:"Мысленно проверяет возможные варианты развития событий и вероятные реакции окружающих.",en:"Mentally tests possible futures and likely reactions."}},
  {id:"emotion",icon:"08",name:{ru:"Эмоционально реагирует",en:"Emotional reaction"},description:{ru:"Аффективные состояния — например острый страх, тревожное ожидание, гнев, стыд или ревность — могут менять приоритеты поведения. Привязанность и ожидание награды вынесены в другие классы.",en:"Affective states such as acute fear, anxious anticipation, anger, shame, or jealousy can shift behavioral priorities. Attachment and reward anticipation are modeled in other classes."}},
  {id:"body",icon:"09",name:{ru:"Тело готовится к действию",en:"Body prepares for action"},description:{ru:"Меняются возбуждение, сердечный ритм, мышечная готовность и другие телесные параметры.",en:"Arousal, heart rate, muscle readiness, and other bodily parameters change."}},
  {id:"goal",icon:"10",name:{ru:"Определяет, чего хочет",en:"Defines the goal"},description:{ru:"Формируется направленность: приблизиться, избежать, сохранить связь, получить контроль, статус, выгоду или ответить на ущерб.",en:"The direction of action is formed."}},
  {id:"control",icon:"11",name:{ru:"Удерживает себя и цель",en:"Maintains control and the goal"},description:{ru:"Не даёт импульсу автоматически стать действием, удерживает цель, правила и последовательность шагов.",en:"Maintains the goal and regulates impulses."}},
  {id:"strategy",icon:"12",name:{ru:"Выбирает способ действия",en:"Chooses how to act"},description:{ru:"Из доступных вариантов выбирает конкретную стратегию воздействия или поведения.",en:"Selects a concrete behavioral strategy."}},
  {id:"message",icon:"13",name:{ru:"Формирует сигнал другому",en:"Forms a signal to the other person"},description:{ru:"Подбирает слова, интонацию и невербальные сигналы.",en:"Selects words, tone, and nonverbal signals."}},
  {id:"action",icon:"14",name:{ru:"Делает выбранное",en:"Executes the chosen action"},description:{ru:"Наблюдаемая часть поведения: говорит, приближается, отходит, атакует, помогает или действует иначе.",en:"The observable part of behavior."}},
  {id:"feedback",icon:"15",name:{ru:"Смотрит на реакцию",en:"Monitors the response"},description:{ru:"Отслеживает, как изменилось поведение другого человека и сама ситуация после действия.",en:"Tracks how the other person and situation respond."}},
  {id:"result",icon:"16",name:{ru:"Проверяет результат",en:"Checks the outcome"},description:{ru:"Сравнивает реальный итог с целью: получилось ли желаемое и какой ценой.",en:"Compares the actual outcome with the goal."}},
  {id:"learning",icon:"17",name:{ru:"Запоминает, что сработало",en:"Learns what worked"},description:{ru:"Обновляет ожидания и прошлый опыт для следующей похожей ситуации.",en:"Updates expectations and experience for the next similar situation."}}
];
const macroById=new Map(macroDefs.map(m=>[m.id,m]));
let lastMacroModel=null;

const baseMacroMap={
ctx_social_threat:"context",ctx_physical_threat:"context",ctx_opportunity:"context",ctx_uncertainty:"context",ctx_competition:"context",ctx_social_eval:"context",
cog_expected_social_eval:"other_model",obs_signal_available:"message",
cog_perception:"notice",cog_attention:"notice",net_attention:"notice",net_salience:"notice",
cog_memory:"memory",reg_hippocampus:"memory",net_default:"memory",
cog_tom:"other_model",cog_perspective:"other_model",net_social:"other_model",reg_tpj:"other_model",reg_mpfc:"other_model",
cog_threat_appraisal:"threat",net_threat:"threat",reg_amygdala:"threat",reg_pag:"threat",
cog_value:"value",cog_moral:"value",reg_vmpfc:"value",reg_ofc:"value",reg_striatum:"value",net_reward:"value",
cog_prediction:"predict",
aff_fear:"emotion",aff_anxiety:"emotion",aff_anger:"emotion",aff_disgust:"emotion",aff_empathy:"emotion",aff_shame:"emotion",aff_social_rejection:"emotion",aff_jealousy:"emotion",reg_insula:"emotion",
aff_attachment:"goal",aff_reward:"goal",aff_arousal:"body",
reg_hypothalamus:"body",reg_brainstem:"body",phy_sns:"body",phy_hpa:"body",phy_hr:"body",phy_tension:"body",phy_pupil:"body",phy_somatic_motor:"body",
mot_approach:"goal",mot_avoid:"goal",mot_dominance:"goal",mot_affiliation:"goal",mot_retaliation:"goal",mot_goal:"goal",mot_status:"goal",
cog_exec:"control",cog_inhibit:"control",cog_reappraise:"control",cog_monitor:"control",net_frontoparietal:"control",reg_dlpfc:"control",reg_acc:"control",
cog_language:"message",act_speech:"message",act_face:"message",
act_conceal:"strategy",
act_approach:"action",act_withdraw:"action",act_attack:"action",act_help:"action",reg_motor:"action",
out_target:"feedback",out_social:"result",out_goal:"result",out_reward:"result",
learn_pe:"learning",learn_rl:"learning",learn_memory:"learning"
};


function edgeAuditGrade(e){
  const g=String(e?.audit_grade||"X").toUpperCase();
  return ["A","B","C","D","X"].includes(g)?g:"X";
}
function edgePassesEvidence(e){return evidenceGradesVisible.has(edgeAuditGrade(e))}
function edgeAuditClass(e){return `audit-${edgeAuditGrade(e)}`}
function edgeRelationType(e){
  const r=String(e?.relation_type||"associated_with");
  return D.relation_meta?.[r]?r:"associated_with";
}
function edgeRelationClass(e){return `relation-${edgeRelationType(e)}`}
function relationMeta(e){return D.relation_meta?.[edgeRelationType(e)]||null}
function relationLabel(e){
  const m=relationMeta(e);return m?.[lang]?.label||edgeRelationType(e);
}
function relationMeaning(e){
  const m=relationMeta(e);return m?.[lang]?.meaning||"";
}
function edgeWorkingPrior(e){return e?.working_prior||"moderate"}
function nodeLayerLabel(n){
  const layer=n?.analysis_layer||"psychological";
  const ru={context:"КОНТЕКСТ",observed:"НАБЛЮДАЕМОЕ",psychological:"ПСИХОЛОГИЧЕСКАЯ ГИПОТЕЗА",neural:"НЕЙРОННАЯ РЕАЛИЗАЦИЯ",physiology:"ФИЗИОЛОГИЯ / НУЖНО ИЗМЕРЕНИЕ",learning:"ОБУЧЕНИЕ ВО ВРЕМЕНИ"};
  const en={context:"CONTEXT",observed:"OBSERVED",psychological:"PSYCHOLOGICAL HYPOTHESIS",neural:"NEURAL IMPLEMENTATION",physiology:"PHYSIOLOGY / MEASUREMENT REQUIRED",learning:"LEARNING ACROSS TIME"};
  return (lang==="ru"?ru:en)[layer]||layer;
}
function nodeLayerCaveat(n){
  const layer=n?.analysis_layer||"psychological";
  const ru={
    context:"Контекст можно наблюдать или кодировать, но его субъективное значение для человека всё равно требует отдельной оценки.",
    observed:"Этот уровень описывает наблюдаемое/кодируемое. Намерение и скрытый мотив не следуют автоматически из действия.",
    psychological:"Этот узел — скрытый механизм-гипотеза. Поведение само по себе не доказывает, что механизм присутствовал.",
    neural:"Это общий уровень научной реализации конструкта, а не утверждение, что данная сеть/область была измеренно активна у конкретного человека.",
    physiology:"Физиологическое состояние нельзя надёжно приписать человеку без соответствующего измерения; внешние признаки неспецифичны.",
    learning:"Обучение разворачивается во времени и требует сравнения ожиданий, исходов и последующего изменения поведения/модели."
  };
  const en={
    context:"Context can be observed/coded, but its subjective meaning for the person still requires separate appraisal.",
    observed:"This layer describes observable/coded events. Intention and hidden motive do not automatically follow from an action.",
    psychological:"This node is a latent mechanism hypothesis. Behavior alone does not prove the mechanism was present.",
    neural:"This is a general implementation level for a construct, not a claim that this network/region was measured as active in this individual.",
    physiology:"Physiological state should not be assigned to an individual without relevant measurement; outward signs are nonspecific.",
    learning:"Learning unfolds across time and requires comparison of expectations, outcomes, and later change in behavior/model."
  };
  return (lang==="ru"?ru:en)[layer]||"";
}
function defaultClaimScopeForNodeId(id){
  const n=nodeById.get(id),layer=n?.analysis_layer;
  if(layer==="observed"||layer==="context")return "observed";
  if(layer==="neural")return "general_implementation";
  if(layer==="physiology")return "model_mapping";
  return "individual_hypothesis";
}
function auditedEdgeStats(){
  const by={A:0,B:0,C:0,D:0,X:0};
  let audited=0;
  for(const e of D.edges){
    by[edgeAuditGrade(e)]++;
    if(e?.audit_status==="audited") audited++;
  }
  return {by,audited,total:D.edges.length};
}
function scenarioNodeBaseId(item){return item?.node_id||item?.id||null}
function scenarioNodeKey(item){
  const base=scenarioNodeBaseId(item);if(!base)return null;
  return item?.instance_id||(item?.actor?`${item.actor}:${base}`:base);
}
function scenarioActorId(item){return item?.actor||"_shared"}
function scenarioActorMap(obj=activeScenario){
  const m=new Map();
  for(const a of (Array.isArray(obj?.actors)?obj.actors:[]))if(a?.id)m.set(a.id,a);
  return m;
}
function scenarioInstanceMap(obj=activeScenario){
  const m=new Map();
  for(const n of (Array.isArray(obj?.active_nodes)?obj.active_nodes:[])){
    const key=scenarioNodeKey(n);if(key)m.set(key,n);
  }
  return m;
}
function scenarioResolveInstance(key,obj=activeScenario){return scenarioInstanceMap(obj).get(key)||null}
function scenarioInstanceBaseId(key,obj=activeScenario){
  const item=scenarioResolveInstance(key,obj);return item?scenarioNodeBaseId(item):(nodeById.has(key)?key:null);
}
function hasMultiActorScenario(obj=activeScenario){
  const actors=Array.isArray(obj?.actors)?obj.actors:[];
  const actorNodes=(Array.isArray(obj?.active_nodes)?obj.active_nodes:[]).filter(n=>n?.actor);
  return actors.length>1 || new Set(actorNodes.map(n=>n.actor)).size>1;
}
function scenarioBasePair(edge,obj=activeScenario){
  const s=scenarioInstanceBaseId(edge?.source,obj),t=scenarioInstanceBaseId(edge?.target,obj);
  return {source:s,target:t};
}
function scenarioInteractionLinks(obj=activeScenario){return Array.isArray(obj?.interaction_links)?obj.interaction_links:[]}
function interactionKey(e){return `${e?.source}→${e?.target}`}
function actorColor(id,index=0){
  const colors=["#78cfff","#7ce0ad","#d5aaef","#e5be70","#ee91a9","#93b7ff","#94d8d0"];
  if(id==="_shared")return "#8197a4";
  let h=0;for(const ch of String(id))h=(h*31+ch.charCodeAt(0))>>>0;
  return colors[h%colors.length];
}

function directMacroForNode(n){return n?baseMacroMap[n.id]||"strategy":null}

function buildMacroModel(activeIds,counts){
  const activeSet=new Set(activeIds),assignment=new Map();
  for(const id of activeIds)assignment.set(id,directMacroForNode(nodeById.get(id)));

  const groups=new Map(macroDefs.map(m=>[m.id,{...m,members:[],behaviorCount:0,shared:false,sources:new Set()}]));
  for(const id of activeIds){
    const g=groups.get(assignment.get(id));if(!g)continue;
    g.members.push(id);
    const n=nodeById.get(id);for(const sid of (n?.source_ids||[]))g.sources.add(sid);
  }
  for(const bid of selected){
    const b=behaviorById.get(bid);if(!b)continue;
    const seen=new Set();
    for(const id of b.nodes)if(activeSet.has(id))seen.add(assignment.get(id));
    for(const mid of seen)if(groups.has(mid))groups.get(mid).behaviorCount++;
  }
  for(const g of groups.values())g.shared=g.behaviorCount>1;

  const macroEdges=new Map();
  const macroSourceEdges=(activeScenario&&scenarioFocusMode)?scenarioFocusedBaseEdges():D.edges;
  for(const e of macroSourceEdges){
    if(!edgePassesEvidence(e))continue;
    if(!activeSet.has(e.source)||!activeSet.has(e.target))continue;
    const a=assignment.get(e.source),b=assignment.get(e.target);if(!a||!b||a===b)continue;
    const key=a+"→"+b;
    if(!macroEdges.has(key))macroEdges.set(key,{source:a,target:b,count:0,relations:new Set()});
    const x=macroEdges.get(key);x.count++;x.relations.add(edgeRelationType(e));
  }
  const aggregatedEdges=[...macroEdges.values()].map(e=>{
    const rs=[...e.relations];
    return {...e,relation_type:rs.length===1?rs[0]:"associated_with",audit_grade:"X",audit_status:"pending",aggregated_relation_types:rs};
  });
  return {assignment,groups,activeGroups:macroDefs.map(m=>groups.get(m.id)).filter(g=>g.members.length),edges:aggregatedEdges};
}

function macroDisplayName(g){
  const bs=new Set([...selected]);
  const S={
    manipulation:{
      other_model:{ru:"Понимает, на что реагирует другой",en:"Understands what the other reacts to"},
      goal:{ru:"Определяет, чего хочет добиться от другого",en:"Defines what they want from the other"},
      predict:{ru:"Предугадывает реакцию другого",en:"Anticipates the other's reaction"},
      strategy:{ru:"Выбирает способ воздействия",en:"Chooses a way to influence"},
      message:{ru:"Подбирает слова и сигналы",en:"Chooses words and signals"},
      feedback:{ru:"Следит, сработало ли воздействие",en:"Watches whether the influence worked"}
    },
    deception:{
      value:{ru:"Оценивает риск разоблачения",en:"Assesses the risk of exposure"},
      strategy:{ru:"Решает, что скрыть",en:"Decides what to conceal"},
      message:{ru:"Строит правдоподобное сообщение",en:"Builds a plausible message"},
      feedback:{ru:"Следит, поверили ли ему",en:"Watches whether they believed it"}
    },
    fear:{
      threat:{ru:"Проверяет: это действительно опасно?",en:"Checks: is this actually dangerous?"},
      goal:{ru:"Ищет безопасный вариант",en:"Looks for a safer option"},
      control:{ru:"Решает: уходить, замереть или действовать",en:"Decides whether to withdraw, freeze, or act"},
      result:{ru:"Проверяет, стало ли безопаснее",en:"Checks whether things became safer"}
    },
    self_defense:{
      threat:{ru:"Определяет источник опасности",en:"Identifies the source of danger"},
      goal:{ru:"Хочет остановить угрозу",en:"Wants to stop the threat"},
      strategy:{ru:"Выбирает способ защиты",en:"Chooses a defensive strategy"}
    },
    dominance:{
      goal:{ru:"Хочет получить больше контроля",en:"Wants more control"},
      other_model:{ru:"Оценивает положение других",en:"Assesses others' positions"},
      strategy:{ru:"Выбирает, как усилить влияние",en:"Chooses how to increase influence"}
    }
  };
  for(const bid of ["manipulation","deception","fear","self_defense","dominance"]){
    if(bs.has(bid)&&S[bid]?.[g.id])return S[bid][g.id][lang];
  }
  return g.name[lang];
}


function t(k){return I[lang][k]??k}

function humanizeHBBAIds(text){
  if(text==null)return "";
  let out=String(text);
  // Visible tour prose must follow the UI language. Internal IDs remain in JSON and data attributes.
  const pairs=D.nodes
    .map(n=>[n.id,(n.name&&n.name[lang])||n.id])
    .sort((a,b)=>b[0].length-a[0].length);
  for(const [id,label] of pairs){
    const rx=new RegExp("`?"+id.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"`?","g");
    out=out.replace(rx,label);
  }
  // Remove accidental markdown code ticks around already-humanized labels.
  out=out.replace(/`([^`]+)`/g,"$1");
  return out;
}
function tourNodeLabel(id){
  const n=nodeById.get(id);
  return n ? (n.name?.[lang] || n.layman?.[lang]?.name || id) : id;
}
function tourEdgeLabel(e){
  if(!e)return "";
  return `${tourNodeLabel(e.source)} → ${tourNodeLabel(e.target)}`;
}

function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function cssColor(type){const alias={network_family:"network",distributed_system:"network",circuit_family:"network",neural_system:"region"}[type]||type;return getComputedStyle(document.documentElement).getPropertyValue("--"+alias).trim()||"#7ca7c2"}
function short(s,n=34){return s.length>n?s.slice(0,n-1)+"…":s}
function splitLabel(s,max=26){
  s=String(s);
  if(s.length<=max)return [s];
  const words=s.split(/\s+/), lines=[""];
  for(const w of words){
    const cur=lines[lines.length-1];
    if((cur+" "+w).trim().length<=max){lines[lines.length-1]=(cur+" "+w).trim();}
    else if(lines.length<2){lines.push(w);}
    else {lines[1]=(lines[1]+" "+w).trim();break;}
  }
  if(lines[1] && lines[1].length>max+6) lines[1]=lines[1].slice(0,max+3)+"…";
  return lines.slice(0,2);
}
function svgLabel(n,p){
  if(!showLabels)return "";
  const max=viewMode==="combined"?18:26;
  const lines=splitLabel(nodeLabel(n),max);
  if(lines.length===1){
    return `<text x="${p.x}" y="${p.y+24}" text-anchor="middle">${esc(lines[0])}</text>`;
  }
  return `<text x="${p.x}" y="${p.y+23}" text-anchor="middle"><tspan x="${p.x}" dy="0">${esc(lines[0])}</tspan><tspan x="${p.x}" dy="${viewMode==="combined"?11:13}">${esc(lines[1])}</tspan></text>`;
}
function comboOverlayLabel(n,p){return "";}
function nodeLabel(n){
  if(viewMode==="professional" || viewMode==="combined") return n.name[lang];
  return n.layman?.[lang]?.name || n.name[lang];
}
function applyLanguage(){
  document.documentElement.lang=lang;
  $$("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(I[lang][k])el.textContent=I[lang][k]});
  $("#searchInput").placeholder=t("searchPlaceholder");
  $$(".lang-btn").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
  $("#authorLine").textContent=D.author[lang];
  $("#confidenceValue").textContent=FINAL_RELEASE_STATUS.scientificCore;
  $("#confidenceNote").textContent=FINAL_RELEASE_STATUS[lang].note;
  $("#modelWarningText").textContent=FINAL_RELEASE_STATUS[lang].warning;
  renderCategories();
  renderBehaviors();
  renderSelection();
  renderSources();
  renderModeBanner();
  renderLegend();
  renderGraph();
  renderEvidenceUI();
  if(activeNode && !String(activeNode).startsWith("macro:")) showDetails(activeNode);
}
function renderModeBanner(){
  document.body.classList.toggle("mode-combined",viewMode==="combined");
  document.body.classList.toggle("mode-professional",viewMode==="professional");
  document.body.classList.toggle("mode-layman",viewMode==="layman");
  const map={
    layman:["◉","modeLaymanTitle","modeLaymanText"],
    combined:["◫","modeCombinedTitle","modeCombinedText"],
    professional:["⌬","modeProfessionalTitle","modeProfessionalText"]
  }[viewMode];
  $("#modeBanner").className="mode-banner "+viewMode;
  $("#modeBannerIcon").textContent=map[0];
  $("#modeBannerTitle").textContent=t(map[1]);
  $("#modeBannerText").textContent=t(map[2]);
  $$(".mode-btn").forEach(b=>b.classList.toggle("active",b.dataset.viewMode===viewMode));
}
function renderSources(){
  $("#sources").innerHTML=D.sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${esc(s.title)} ↗<small>${esc(s.scope?.[lang]||"")}</small></a>`).join("");
}
function relationVisualGlyph(r){return ({may_influence:"━━▶",modulates:"┄┄▷",inhibits:"━━⊣",computational_input:"···▷",implemented_by:"┄┄▷",participates_in:"···○",component_of:"···○",produces_output:"━━▶",requires_motor_output:"┄┄▷",updates:"┄·┄▷",associated_with:"····"})[r]||"—"}
function relationSampleSvg(r,extraClass=""){return `<svg class="mini-edge-sample" viewBox="0 0 54 16" aria-hidden="true"><path class="edge ${extraClass||`relation-${esc(r)}`}" d="M3 8 L48 8"></path></svg>`}
function renderQuickRelationLegend(){
  const box=$("#quickLegendItems");if(!box)return;const used=[...new Set(D.edges.map(edgeRelationType))];
  $("#quickLegendTitle").textContent=lang==="ru"?"Легенда линий — как читать стрелки":"Line legend — how to read arrows";
  box.innerHTML=used.map(r=>{const m=D.relation_meta[r]?.[lang]||D.relation_meta[r]?.en;return `<button type="button" class="quick-rel" data-help-rel="${esc(r)}">${relationSampleSvg(r)}<span>${esc(m?.label||r)}</span></button>`}).join("")+`<span class="quick-rel special">${relationSampleSvg("interaction","interaction-edge")}<span>${lang==="ru"?"сценарное взаимодействие":"scenario interaction"}</span></span><span class="quick-rel special"><code>↔</code><span>${lang==="ru"?"взаимная динамика":"reciprocal dynamic"}</span></span><span class="quick-rel special"><code>X</code><span>${lang==="ru"?"проверено · данных недостаточно / claim слишком широк":"reviewed · insufficient evidence / claim too broad"}</span></span>`;
  $("#openFullHelpBtn").textContent=lang==="ru"?"ⓘ Все обозначения и полный гайд":"ⓘ All symbols & full guide";
  $$("#quickLegendItems [data-help-rel]").forEach(btn=>btn.addEventListener("click",()=>{renderHelpLegend(btn.dataset.helpRel);$("#helpDialog")?.showModal()}));
}
function renderLegend(){
  const arr=viewMode==="layman"?legendTypes.filter(x=>!professionalTypes.has(x)):legendTypes;
  $("#legend").innerHTML=arr.map(type=>`<span class="legend-item"><i class="legend-swatch" style="--c:${cssColor(type)}"></i>${esc(I[lang].types[type])}</span>`).join("");
  renderQuickRelationLegend();
}
function renderCategories(){
  $("#categoryFilters").innerHTML=Object.entries(D.domains).map(([id,n])=>`<button class="category-btn ${id===domain?"active":""}" data-domain="${id}">${esc(n[lang])}</button>`).join("");
  $$("#categoryFilters .category-btn").forEach(b=>b.addEventListener("click",()=>{domain=b.dataset.domain;renderCategories();renderBehaviors()}));
}
function renderBehaviors(){
  const q=$("#searchInput").value.trim().toLowerCase(),alt=lang==="ru"?"en":"ru";
  const list=D.behaviors.filter(b=>(domain==="all"||b.domain===domain)&&(!q||b.name[lang].toLowerCase().includes(q)||b.name[alt].toLowerCase().includes(q)));
  $("#actionCount").textContent=`${list.length}/${D.behaviors.length}`;
  $("#behaviorList").innerHTML=list.map(b=>`<button class="behavior-item ${selected.has(b.id)?"selected":""}" data-id="${b.id}">
    <span class="behavior-icon">${b.icon}</span>
    <span><div class="behavior-name">${esc(b.name[lang])}</div><div class="behavior-domain">${esc(D.domains[b.domain]?.[lang]||b.domain)}</div></span>
    <span class="selection-mark">●</span></button>`).join("");
  $$("#behaviorList .behavior-item").forEach(el=>{
    el.addEventListener("click",()=>toggleBehavior(el.dataset.id));
    el.addEventListener("contextmenu",e=>{
      e.preventDefault();
      const id=el.dataset.id;
      if(!selected.has(id)){
        selected.add(id);
        renderBehaviors();renderSelection();renderGraph();
      }
      openBehaviorShift(id);
    });
  });
}
function renderSelection(){
  const arr=[...selected].map(id=>behaviorById.get(id)).filter(Boolean),wrap=$("#selectionChips");
  wrap.classList.toggle("empty",!arr.length);
  wrap.innerHTML=arr.map(b=>`<span class="chip">${b.icon} ${esc(b.name[lang])}<button data-remove="${b.id}">×</button></span>`).join("");
  $$("[data-remove]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();selected.delete(b.dataset.remove);refresh()}));
}
function toggleBehavior(id){
  selected.has(id)?selected.delete(id):selected.add(id);
  refresh();
}
function refresh(){
  activeNode=null;
  $("#detailCard").classList.add("hidden");
  $("#detailEmpty").classList.remove("hidden");
  clearDetailReady();
  renderBehaviors();
  renderSelection();
  renderGraph();
}



function setJaccard(a,b){
  const A=new Set(a),B=new Set(b);
  const union=new Set([...A,...B]);
  if(!union.size)return 1;
  let common=0;
  for(const x of A)if(B.has(x))common++;
  return common/union.size;
}
function behaviorGraphSignature(bid){
  const b=behaviorById.get(bid);
  if(!b)return {nodes:new Set(),edges:new Set(),macros:new Set()};
  const nodes=new Set(b.nodes);
  const edges=new Set(D.edges.filter(e=>nodes.has(e.source)&&nodes.has(e.target)).map(e=>e.source+"→"+e.target));
  const macros=new Set(b.nodes.map(id=>directMacroForNode(nodeById.get(id))).filter(Boolean));
  return {nodes,edges,macros};
}
function behaviorSimilarity(aid,bid){
  const A=behaviorGraphSignature(aid),B=behaviorGraphSignature(bid);
  const nodeJ=setJaccard(A.nodes,B.nodes);
  const macroJ=setJaccard(A.macros,B.macros);
  const edgeJ=setJaccard(A.edges,B.edges);
  return Math.round(100*(nodeJ*.50+macroJ*.30+edgeJ*.20));
}
function semanticLabelForBehavior(mid,bid){
  const g=macroById.get(mid);
  if(!g)return mid;
  const old=selected;
  try{
    selected=new Set([bid]);
    return macroDisplayName(g);
  }finally{
    selected=old;
  }
}
function computeBehaviorShift(sourceId,targetId){
  const A=behaviorGraphSignature(sourceId),B=behaviorGraphSignature(targetId);
  const kept=[...A.nodes].filter(x=>B.nodes.has(x));
  const removed=[...A.nodes].filter(x=>!B.nodes.has(x));
  const added=[...B.nodes].filter(x=>!A.nodes.has(x));

  const keptEdges=[...A.edges].filter(x=>B.edges.has(x));
  const removedEdges=[...A.edges].filter(x=>!B.edges.has(x));
  const addedEdges=[...B.edges].filter(x=>!A.edges.has(x));

  const roleChanged=[];
  for(const id of kept){
    const mid=directMacroForNode(nodeById.get(id));
    if(!mid)continue;
    const from=semanticLabelForBehavior(mid,sourceId);
    const to=semanticLabelForBehavior(mid,targetId);
    if(from!==to)roleChanged.push({id,mid,from,to});
  }

  const macroOf=ids=>{
    const m=new Map();
    for(const id of ids){
      const mid=directMacroForNode(nodeById.get(id));
      if(!mid)continue;
      if(!m.has(mid))m.set(mid,[]);
      m.get(mid).push(id);
    }
    return m;
  };

  return {
    sourceId,targetId,
    score:behaviorSimilarity(sourceId,targetId),
    kept,removed,added,roleChanged,
    keptEdges,removedEdges,addedEdges,
    keptMacros:macroOf(kept),
    removedMacros:macroOf(removed),
    addedMacros:macroOf(added)
  };
}
function nodeMiniName(id){
  const n=nodeById.get(id);
  return n ? (n.layman?.[lang]?.name||n.name[lang]) : id;
}
function behaviorName(id){
  const b=behaviorById.get(id);
  return b?.name?.[lang]||id;
}
function behaviorIcon(id){
  return behaviorById.get(id)?.icon||"◉";
}
function rankedShiftTargets(sourceId){
  return D.behaviors
    .filter(b=>b.id!==sourceId)
    .map(b=>({id:b.id,score:behaviorSimilarity(sourceId,b.id)}))
    .sort((a,b)=>b.score-a.score||behaviorName(a.id).localeCompare(behaviorName(b.id)));
}
function shiftScoreClass(score){
  if(score>=72)return "near";
  if(score>=52)return "mid";
  return "far";
}
function shiftScoreLabel(score){
  if(lang==="ru")return score>=72?"высокое":score>=52?"среднее":"низкое";
  return score>=72?"high":score>=52?"medium":"low";
}
function shiftNarrative(diff){
  const s=behaviorName(diff.sourceId),tgt=behaviorName(diff.targetId);
  const common=diff.kept.length,add=diff.added.length,remove=diff.removed.length;
  if(lang==="ru"){
    if(diff.score>=72)return `${s} → ${tgt}: модели близки. Большая часть функциональной основы сохраняется; перестройка в основном затрагивает ${add+remove} сущностей и часть связей.`;
    if(diff.score>=52)return `${s} → ${tgt}: переход требует заметной перестройки, но сохраняет ${common} общих профессиональных механизмов. Меняется не весь «мозг», а конфигурация целей, контроля, действий и обратной связи.`;
    return `${s} → ${tgt}: это структурно далёкие модели. Для целевой конфигурации придётся заменить значительную часть уникальных механизмов и связей; такую разницу нельзя трактовать как простой психологический «переключатель».`;
  }
  if(diff.score>=72)return `${s} → ${tgt}: the models are structurally close. Much of the functional base is preserved.`;
  if(diff.score>=52)return `${s} → ${tgt}: a meaningful reconfiguration is required, while ${common} professional mechanisms remain shared.`;
  return `${s} → ${tgt}: these are structurally distant models. A substantial part of the unique mechanisms and links changes.`;
}

const practiceMap={
  context:{
    self:{add:"Сначала уточните фактическую ситуацию: что реально происходит, какие ограничения и какие сигналы относятся к делу.",reduce:"Не подменяйте контекст одной автоматической интерпретацией."},
    other:{add:"Меняйте прежде всего наблюдаемые условия взаимодействия: дистанцию, ясность правил, доступные варианты и уровень неопределённости.",reduce:"Не усиливайте неоднозначность и ощущение ловушки."},
    group:{add:"Сделайте общий контекст явным: правила, роли, ресурсы, ограничения и критерии результата.",reduce:"Сократите скрытые правила и противоречивые сигналы среды."}
  },
  notice:{
    self:{add:"Осознанно соберите несколько релевантных сигналов, прежде чем выбирать действие.",reduce:"Не фиксируйтесь только на одном раздражающем признаке."},
    other:{add:"Давайте короткие, различимые сигналы и не перегружайте взаимодействие лишними стимулами.",reduce:"Не рассчитывайте, что человек заметит скрытый намёк или сложную цепочку сигналов."},
    group:{add:"Сделайте ключевую информацию заметной всем участникам и отделите её от шума.",reduce:"Не создавайте информационный шум вокруг главной задачи."}
  },
  memory:{
    self:{add:"Сравните ситуацию минимум с двумя прошлыми случаями, включая тот, где исход был другим.",reduce:"Не позволяйте одному яркому прошлому эпизоду автоматически определять текущий."},
    other:{add:"Опирайтесь на понятный человеку предыдущий опыт и заранее проговаривайте, чем новая ситуация отличается.",reduce:"Не активируйте без необходимости ассоциации с прошлыми конфликтами."},
    group:{add:"Фиксируйте историю решений и результатов, чтобы группа могла учиться на общей памяти.",reduce:"Не заставляйте группу каждый раз заново спорить о том, что уже происходило."}
  },
  other_model:{
    self:{add:"Сформулируйте минимум две версии того, что другой человек знает, хочет или понимает; не выбирайте одну как факт.",reduce:"Не считайте свою интерпретацию чужих намерений доказанной."},
    other:{add:"Задавайте проверяемые вопросы о позиции человека вместо догадок о его мотивах.",reduce:"Не приписывайте ему намерение в форме обвинения."},
    group:{add:"Разделяйте позиции сторон и делайте их явными: кто что знает, чего хочет и чего опасается.",reduce:"Не допускайте, чтобы одна сторона говорила за всех остальных."}
  },
  threat:{
    self:{add:"Отдельно оцените непосредственную угрозу, вероятность эскалации и цену ошибки.",reduce:"Не поддерживайте высокий уровень угрозы там, где появились признаки безопасного выхода."},
    other:{add:"Если цель — снизить конфронтацию, оставляйте безопасный выход, дистанцию и понятные границы.",reduce:"Не загоняйте человека в ситуацию, где отступление выглядит невозможным."},
    group:{add:"Снижайте системные источники угрозы: непредсказуемое наказание, публичное унижение и борьбу за базовые ресурсы.",reduce:"Не превращайте каждую ошибку в статусную угрозу."}
  },
  value:{
    self:{add:"Перед действием сравните хотя бы два варианта по выгоде, риску, цене ошибки и долгосрочному результату.",reduce:"Не оценивайте вариант только по немедленному эмоциональному выигрышу."},
    other:{add:"Делайте последствия вариантов понятными и оставляйте реальный выбор.",reduce:"Не маскируйте цену решения и не создавайте ложную безальтернативность."},
    group:{add:"Настройте стимулы так, чтобы индивидуальная выгода не разрушала общий результат.",reduce:"Уберите награды за поведение, которое группе формально запрещено, но фактически поощряется."}
  },
  predict:{
    self:{add:"Мысленно прогоните 2–3 вероятных ответа другой стороны и подготовьте следующий шаг для каждого.",reduce:"Не исходите из единственного сценария будущего."},
    other:{add:"Делайте собственные реакции более предсказуемыми: понятные границы и последовательные последствия.",reduce:"Не меняйте правила в зависимости от настроения."},
    group:{add:"Используйте сценарии «если → то» для типичных развилок и заранее обсуждайте последствия.",reduce:"Не оставляйте критические ситуации без общего представления о следующем шаге."}
  },
  emotion:{
    self:{add:"Признайте эмоциональную реакцию как данные о состоянии, но отделите её от выбора действия.",reduce:"Не позволяйте эмоции автоматически определять следующий шаг."},
    other:{add:"Не пытайтесь «выключить» эмоцию другого; уменьшайте стимулы эскалации и дайте время на изменение состояния.",reduce:"Не усиливайте стыд, унижение или провокацию ради немедленной реакции."},
    group:{add:"Создайте способы безопасно обозначать напряжение до того, как оно превращается в конфликт.",reduce:"Не поощряйте эмоциональное заражение и публичное раскручивание конфликта."}
  },
  body:{
    self:{add:"Используйте паузу, изменение дистанции и темпа, чтобы телесная мобилизация не стала автоматическим действием.",reduce:"Не ускоряйте действие только потому, что тело уже мобилизовалось."},
    other:{add:"Снижайте физическое давление: дистанция, пространство для выхода, менее резкие стимулы.",reduce:"Не сокращайте дистанцию и не усиливайте сенсорное давление без необходимости."},
    group:{add:"Учитывайте усталость, шум, тесноту и перегрузку как факторы, меняющие поведение группы.",reduce:"Не строьте критические взаимодействия на фоне хронической перегрузки."}
  },
  goal:{
    self:{add:"Сформулируйте измеримую конечную цель: что должно измениться после вашего действия.",reduce:"Не подменяйте результат желанием просто «выиграть момент»."},
    other:{add:"Ищите совместимую с его интересами формулировку результата, не требуя принять ваши мотивы.",reduce:"Не делайте сохранение статуса несовместимым с конструктивным выходом."},
    group:{add:"Создайте общий результат, который понятен участникам и не сводится к победе одной стороны.",reduce:"Не оставляйте конкурирующие цели скрытыми."}
  },
  control:{
    self:{add:"Вставьте контрольную точку между импульсом и действием: пауза → цель → два варианта → выбор.",reduce:"Не действуйте в первой доступной стратегии, если цена ошибки высока."},
    other:{add:"Дайте человеку время и варианты, чтобы контролируемое решение было вообще возможно.",reduce:"Не требуйте мгновенного ответа под давлением, если хотите более управляемого поведения."},
    group:{add:"Добавьте процедуры, которые замедляют импульсивные решения: второй взгляд, чек-лист, правило паузы.",reduce:"Не делайте скорость единственным критерием хорошего решения."}
  },
  strategy:{
    self:{add:"Сгенерируйте минимум два способа достижения цели и сравните их по последствиям.",reduce:"Не отождествляйте цель с единственным способом её достижения."},
    other:{add:"Предлагайте несколько приемлемых путей, а не один навязанный сценарий.",reduce:"Не используйте скрытое давление как основной механизм смены стратегии."},
    group:{add:"Дайте группе несколько легитимных стратегий и критерии выбора между ними.",reduce:"Не превращайте несогласие со способом в несогласие с общей целью."}
  },
  message:{
    self:{add:"Сформулируйте сообщение так, чтобы отдельно были факт, ваша оценка и желаемое действие.",reduce:"Не смешивайте наблюдение с обвинением в скрытых мотивах."},
    other:{add:"Используйте короткие проверяемые формулировки и вопросы, на которые можно предметно ответить.",reduce:"Не перегружайте сообщение угрозами, намёками и двойными смыслами."},
    group:{add:"Создайте общий формат коммуникации: факт → проблема → вариант → решение.",reduce:"Не позволяйте ключевым решениям жить только в неформальных слухах."}
  },
  action:{
    self:{add:"Выберите действие, которое максимально соответствует цели и оставляет возможность корректировки.",reduce:"Не делайте необратимый шаг там, где можно сначала проверить реакцию меньшим действием."},
    other:{add:"Оценивайте изменение по наблюдаемому действию, а не по предположению о внутреннем состоянии.",reduce:"Не провоцируйте действие ради проверки человека, если есть безопасный способ получить информацию."},
    group:{add:"Определите, какое конкретное совместное действие будет признаком перехода к новой модели.",reduce:"Не ограничивайтесь декларациями без изменения реального поведения."}
  },
  feedback:{
    self:{add:"После действия смотрите, что реально изменилось у другой стороны и в ситуации.",reduce:"Не оценивайте успех только по собственному ощущению."},
    other:{add:"Давайте понятную обратную связь на конкретные действия, а не глобальную оценку личности.",reduce:"Не используйте неопределённое наказание или похвалу, из которых нельзя понять причину."},
    group:{add:"Сделайте результат действий видимым группе и быстро возвращайте обратную связь.",reduce:"Не отделяйте решение от его последствий так далеко, что группа перестаёт видеть связь."}
  },
  result:{
    self:{add:"Сравните итог с исходной целью и отдельно запишите побочные последствия.",reduce:"Не объявляйте успехом результат, который решил одну проблему и создал более дорогую другую."},
    other:{add:"Оценивайте результат по наблюдаемым изменениям, а не по тому, «понял ли человек урок».",reduce:"Не приписывайте внутреннее изменение без признаков в поведении."},
    group:{add:"Определите общие критерии результата до действия и сравнивайте с ними фактический исход.",reduce:"Не меняйте критерий успеха после того, как результат уже известен."}
  },
  learning:{
    self:{add:"После эпизода зафиксируйте: что сработало, что нет и какой сигнал в следующий раз заметить раньше.",reduce:"Не превращайте единичный исход в универсальное правило."},
    other:{add:"Поддерживайте последовательную связь между действиями и последствиями.",reduce:"Не создавайте хаотичную обратную связь, из которой невозможно понять закономерность."},
    group:{add:"Проводите короткий разбор после важных эпизодов и сохраняйте решения как общую память.",reduce:"Не повторяйте один и тот же конфликт без изменения правил и процедур."}
  }
};

function macroPractice(mid,audience,kind){
  const x=practiceMap[mid]?.[audience];
  if(!x)return "";
  return kind==="reduce"?x.reduce:x.add;
}
function uniqueMacroEntries(map){
  return [...map.entries()].map(([mid,ids])=>({mid,ids,label:semanticLabelForBehavior(mid,behaviorShiftTarget||behaviorShiftSource)}));
}
function targetObservableNodes(targetId){
  const b=behaviorById.get(targetId);
  if(!b)return [];
  const preferred=b.nodes.map(id=>nodeById.get(id)).filter(n=>n&&["motor","outcome"].includes(n.type));
  return preferred.slice(0,5);
}
function buildPracticeAdvice(diff,audience){
  const rows=[];
  const keptPriority=["goal","control","predict","other_model","value","feedback"];
  const keptEntries=uniqueMacroEntries(diff.keptMacros).sort((a,b)=>{
    const ai=keptPriority.indexOf(a.mid),bi=keptPriority.indexOf(b.mid);
    return (ai<0?99:ai)-(bi<0?99:bi);
  }).slice(0,3);

  if(keptEntries.length){
    rows.push({
      kind:"keep",
      title:lang==="ru"?"Что сохранить":"What to preserve",
      items:keptEntries.map(x=>{
        const txt=macroPractice(x.mid,audience,"add");
        return {label:x.label,text:txt||x.label};
      })
    });
  }

  const removed=uniqueMacroEntries(diff.removedMacros).slice(0,4);
  if(removed.length){
    rows.push({
      kind:"reduce",
      title:lang==="ru"?"Что перестать усиливать":"What to stop reinforcing",
      items:removed.map(x=>({
        label:semanticLabelForBehavior(x.mid,diff.sourceId),
        text:macroPractice(x.mid,audience,"reduce")||x.label
      }))
    });
  }

  const added=uniqueMacroEntries(diff.addedMacros).slice(0,5);
  if(added.length){
    rows.push({
      kind:"add",
      title:lang==="ru"?"Что добавить или усилить":"What to add or strengthen",
      items:added.map(x=>({
        label:semanticLabelForBehavior(x.mid,diff.targetId),
        text:macroPractice(x.mid,audience,"add")||x.label
      }))
    });
  }

  const obs=targetObservableNodes(diff.targetId);
  if(obs.length){
    rows.push({
      kind:"observe",
      title:lang==="ru"?"По каким признакам смотреть на переход":"Observable signs of the shift",
      items:obs.map(n=>({
        label:n.layman?.[lang]?.name||n.name[lang],
        text:n.layman?.[lang]?.looks || n.description[lang]
      }))
    });
  }
  return rows;
}
function renderPractice(diff){
  const audience=behaviorShiftAudience;
  const warning=$("#shiftPracticeWarning");
  if(lang==="ru"){
    warning.textContent=audience==="self"
      ?"Советы относятся к управлению собственным поведением. Они не гарантируют конкретный исход."
      : audience==="other"
        ?"Для другого человека HBBA предлагает менять условия и наблюдать поведение — не «переключать» его внутренние состояния."
        :"Для группы советы относятся к правилам, стимулам, информации и среде, а не к диагностике участников.";
  }else{
    warning.textContent=audience==="self"
      ?"These suggestions concern your own behavior and do not guarantee a specific outcome."
      : audience==="other"
        ?"For another person, HBBA changes conditions and observes behavior rather than claiming to switch internal states."
        :"For groups, recommendations concern rules, incentives, information, and environment rather than diagnosing members.";
  }

  const rows=buildPracticeAdvice(diff,audience);
  $("#shiftPracticeContent").innerHTML=rows.map(r=>`
    <section class="practice-section ${r.kind}">
      <h4>${esc(r.title)}</h4>
      <div class="practice-items">
        ${r.items.map(it=>`<div class="practice-item"><b>${esc(it.label)}</b><p>${esc(it.text)}</p></div>`).join("")}
      </div>
    </section>`).join("");
}
function renderDiffList(target,ids,max=7){
  const arr=ids.slice(0,max);
  target.innerHTML=arr.map(id=>`<span class="shift-node-chip">${esc(nodeMiniName(id))}</span>`).join("")
    +(ids.length>max?`<span class="shift-node-more">+${ids.length-max}</span>`:"");
}
function renderRoleList(items,max=5){
  $("#shiftRoleList").innerHTML=items.slice(0,max).map(x=>`
    <div class="shift-role-item">
      <span>${esc(nodeMiniName(x.id))}</span>
      <small>${esc(x.from)} → ${esc(x.to)}</small>
    </div>`).join("")
    +(items.length>max?`<span class="shift-node-more">+${items.length-max}</span>`:"");
}
function renderBehaviorShiftAnalysis(){
  if(!behaviorShiftSource||!behaviorShiftTarget){
    $("#shiftEmptyAnalysis").classList.remove("hidden");
    $("#shiftAnalysisContent").classList.add("hidden");
    return;
  }
  const diff=computeBehaviorShift(behaviorShiftSource,behaviorShiftTarget);
  behaviorShiftDiff=diff;

  $("#shiftEmptyAnalysis").classList.add("hidden");
  $("#shiftAnalysisContent").classList.remove("hidden");
  $("#shiftPairTitle").textContent=`${behaviorIcon(diff.sourceId)} ${behaviorName(diff.sourceId)} → ${behaviorIcon(diff.targetId)} ${behaviorName(diff.targetId)}`;
  $("#shiftScoreValue").textContent=shiftScoreLabel(diff.score);
  $("#shiftScoreValue").className=shiftScoreClass(diff.score);
  $("#shiftNarrative").textContent=shiftNarrative(diff);

  $("#shiftKeptCount").textContent=diff.kept.length;
  $("#shiftRemovedCount").textContent=diff.removed.length;
  $("#shiftAddedCount").textContent=diff.added.length;
  $("#shiftRoleCount").textContent=diff.roleChanged.length;

  renderDiffList($("#shiftKeptList"),diff.kept);
  renderDiffList($("#shiftRemovedList"),diff.removed);
  renderDiffList($("#shiftAddedList"),diff.added);
  renderRoleList(diff.roleChanged);

  renderPractice(diff);
}
function renderShiftTargets(){
  if(!behaviorShiftSource)return;
  const ranked=rankedShiftTargets(behaviorShiftSource);
  $("#shiftTargetList").innerHTML=ranked.map((x,i)=>{
    const b=behaviorById.get(x.id);
    const cls=shiftScoreClass(x.score);
    return `<button class="shift-target ${behaviorShiftTarget===x.id?"active":""}" data-target="${x.id}">
      <span class="shift-target-icon">${b.icon}</span>
      <span class="shift-target-main"><b>${esc(b.name[lang])}</b><small>${i<6?(lang==="ru"?"ближайший вариант":"nearby option"):""}</small></span>
      <span class="shift-target-score ${cls}">${esc(shiftScoreLabel(x.score))}</span>
    </button>`;
  }).join("");
  $$("#shiftTargetList .shift-target").forEach(el=>el.addEventListener("click",()=>{
    behaviorShiftTarget=el.dataset.target;
    renderShiftTargets();
    renderBehaviorShiftAnalysis();
  }));
}
function fillShiftSourceSelect(preferred=null){
  const ids=[...selected].filter(id=>behaviorById.has(id));
  if(!ids.length){
    $("#shiftSourceSelect").innerHTML="";
    behaviorShiftSource=null;
    return false;
  }
  behaviorShiftSource=(preferred&&ids.includes(preferred))?preferred:(behaviorShiftSource&&ids.includes(behaviorShiftSource)?behaviorShiftSource:ids[0]);
  $("#shiftSourceSelect").innerHTML=ids.map(id=>`<option value="${id}" ${id===behaviorShiftSource?"selected":""}>${behaviorIcon(id)} ${esc(behaviorName(id))}</option>`).join("");
  $("#shiftComboContext").textContent=ids.length>1
    ? (lang==="ru"?`Остальные ${ids.length-1} поведения останутся в комбинации.`:`The other ${ids.length-1} behaviors remain in the combination.`)
    : (lang==="ru"?"Будет заменено текущее поведение.":"The current behavior will be replaced.");
  return true;
}
function openBehaviorShift(preferredSource=null){
  if(!selected.size){
    return;
  }
  if(!fillShiftSourceSelect(preferredSource))return;
  behaviorShiftTarget=null;
  behaviorShiftAudience="self";
  $$(".audience-tab").forEach(x=>x.classList.toggle("active",x.dataset.audience==="self"));
  renderShiftTargets();
  renderBehaviorShiftAnalysis();
  $("#behaviorShiftDialog").showModal();
}
function applyBehaviorTransformation(){
  if(!behaviorShiftDiff)return;
  const diff=behaviorShiftDiff;
  selected.delete(diff.sourceId);
  selected.add(diff.targetId);
  appliedShiftDiff=diff;
  activeScenario=null;
  renderScenarioBanner();
  $("#behaviorShiftDialog").close();
  refresh();
  renderShiftBanner();
  applyShiftVisuals();
}
function renderShiftBanner(){
  const b=$("#shiftBanner");
  if(!appliedShiftDiff){b.classList.add("hidden");return}
  b.classList.remove("hidden");
  $("#shiftBannerTitle").textContent=`${behaviorName(appliedShiftDiff.sourceId)} → ${behaviorName(appliedShiftDiff.targetId)}`;
  $("#shiftBannerSummary").textContent=lang==="ru"
    ? `перекрытие графов: ${shiftScoreLabel(appliedShiftDiff.score)} • сохранено ${appliedShiftDiff.kept.length} • добавлено ${appliedShiftDiff.added.length} • убрано ${appliedShiftDiff.removed.length}`
    : `graph overlap: ${shiftScoreLabel(appliedShiftDiff.score)} • kept ${appliedShiftDiff.kept.length} • added ${appliedShiftDiff.added.length} • removed ${appliedShiftDiff.removed.length}`;
}
function applyShiftVisuals(){
  $$(".shift-added,.shift-kept,.shift-role-changed").forEach(el=>el.classList.remove("shift-added","shift-kept","shift-role-changed"));
  if(!appliedShiftDiff)return;

  const added=new Set(appliedShiftDiff.added);
  const kept=new Set(appliedShiftDiff.kept);
  const role=new Set(appliedShiftDiff.roleChanged.map(x=>x.id));

  $$("#nodes .node").forEach(el=>{
    const id=el.dataset.node;
    if(added.has(id))el.classList.add("shift-added");
    else if(role.has(id))el.classList.add("shift-role-changed");
    else if(kept.has(id))el.classList.add("shift-kept");
  });

  // Layman view: project the same diff onto semantic macro-nodes.
  const sourceSig=behaviorGraphSignature(appliedShiftDiff.sourceId);
  const targetSig=behaviorGraphSignature(appliedShiftDiff.targetId);
  const roleMacros=new Set(appliedShiftDiff.roleChanged.map(x=>x.mid));

  $$("#nodes .macro-node").forEach(el=>{
    const mid=el.dataset.macro;
    if(targetSig.macros.has(mid)&&!sourceSig.macros.has(mid))el.classList.add("shift-added");
    else if(roleMacros.has(mid))el.classList.add("shift-role-changed");
    else if(targetSig.macros.has(mid)&&sourceSig.macros.has(mid))el.classList.add("shift-kept");
  });
}
function clearAppliedShift(){
  appliedShiftDiff=null;
  renderShiftBanner();
  applyShiftVisuals();
}
function showShiftContext(x,y,preferredSource=null){
  if(!selected.size)return;
  behaviorShiftSource=preferredSource&&selected.has(preferredSource)?preferredSource:null;
  const menu=$("#shiftContextMenu");
  const wrap=$("#graphWrap").getBoundingClientRect();
  menu.style.left=Math.min(wrap.width-230,Math.max(8,x-wrap.left))+"px";
  menu.style.top=Math.min(wrap.height-80,Math.max(8,y-wrap.top))+"px";
  menu.classList.remove("hidden");
}
function hideShiftContext(){
  $("#shiftContextMenu")?.classList.add("hidden");
}
function edgeBoundaryPoint(from,to,halfW,halfH,gap=3){
  const dx=to.x-from.x,dy=to.y-from.y;
  if(Math.abs(dx)<0.001 && Math.abs(dy)<0.001)return {x:from.x,y:from.y};

  const hw=halfW+gap,hh=halfH+gap;
  const denom=Math.max(Math.abs(dx)/hw,Math.abs(dy)/hh,0.0001);
  const t=1/denom;
  return {x:from.x+dx*t,y:from.y+dy*t};
}

function edgePath(a,b){
  // Layman nodes are cards; professional/combined nodes are circular.
  const lay=currentGraphKind==="layman";
  const halfW=lay?75:12;
  const halfH=lay?51:12;

  const start=edgeBoundaryPoint(a,b,halfW,halfH,lay?5:4);
  const end=edgeBoundaryPoint(b,a,halfW,halfH,lay?8:6);

  const horizontal=end.x-start.x;
  const dir=horizontal>=0?1:-1;
  const curve=Math.max(28,Math.abs(horizontal)*.42);

  return `M${start.x},${start.y} C${start.x+dir*curve},${start.y} ${end.x-dir*curve},${end.y} ${end.x},${end.y}`;
}

function workingPriorRank(v){
  return ({exploratory:1,moderate:2,high:3})[v]||0;
}

function collapseReciprocalEdges(edges){
  const byKey=new Map();
  for(const e of edges)byKey.set(e.source+"→"+e.target,e);

  const used=new Set(),out=[];
  const reciprocalAllowed=new Set(["may_influence","modulates","associated_with"]);
  for(const e of edges){
    const key=e.source+"→"+e.target;
    if(used.has(key))continue;

    const reverseKey=e.target+"→"+e.source;
    const reverse=byKey.get(reverseKey);
    const sameRelation=reverse&&edgeRelationType(reverse)===edgeRelationType(e);
    if(reverse && reverse!==e && sameRelation && reciprocalAllowed.has(edgeRelationType(e))){
      used.add(key);used.add(reverseKey);
      const merged={...e,bidirectional:true};
      merged.working_prior=workingPriorRank(edgeWorkingPrior(reverse))>workingPriorRank(edgeWorkingPrior(e))
        ? edgeWorkingPrior(reverse):edgeWorkingPrior(e);
      if("count" in e || "count" in reverse)merged.count=(e.count||0)+(reverse.count||0);
      out.push(merged);
    }else{
      used.add(key);
      out.push({...e,bidirectional:false});
    }
  }
  return out;
}

function updateVisibleEdges(){
  $$("#edges .edge[data-source][data-target]").forEach(path=>{
    const a=currentGraphPositions.get(path.dataset.source);
    const b=currentGraphPositions.get(path.dataset.target);
    if(a&&b)path.setAttribute("d",edgePath(a,b));
  });
}

function setNodeVisualPosition(el,key,x,y){
  const baseX=Number(el.dataset.baseX||0);
  const baseY=Number(el.dataset.baseY||0);
  el.setAttribute("transform",`translate(${x-baseX} ${y-baseY})`);
  const p=currentGraphPositions.get(key);
  if(p){p.x=x;p.y=y}
}

function visiblePinKeys(){
  const out=new Set();
  $$("#nodes [data-key]").forEach(n=>n.dataset.key&&out.add(n.dataset.key));
  $$("#conceptOverlay .macro-cluster[data-macro]").forEach(n=>out.add("macro:"+n.dataset.macro));
  return out;
}
function updatePinStatus(){
  const count=pinnedKeys.size,el=$("#pinStatus"),btn=$("#clearPinsBtn");
  if(el){el.textContent=count?(lang==="ru"?`📌 ${count} закреплено`:`📌 ${count} pinned`):(lang==="ru"?"📌 нет закреплений":"📌 no pins");el.classList.toggle("has-pins",count>0);el.setAttribute("aria-live","polite");}
  if(btn)btn.disabled=count===0;
}
function clearPinClasses(){
  $$("#edges .edge").forEach(e=>e.classList.remove("edge-pin-focus","edge-pin-dim"));
  $$("#nodes .node, #nodes .macro-node").forEach(n=>n.classList.remove("pin-focus","pin-neighbor","pin-dim"));
  $$("#conceptOverlay .macro-cluster").forEach(n=>n.classList.remove("pin-focus","pin-dim"));
  $$(".pin-handle").forEach(n=>n.classList.remove("active"));
}
function pinFocusMembers(key){
  if(key?.startsWith("macro:") && currentGraphKind==="combined"){
    const mid=key.slice(6);return new Set(currentClusterMembers.get(mid)||[]);
  }
  return new Set(key?[key]:[]);
}
function applyPinnedVisuals(){
  clearPinClasses();
  if(!pinnedKeys.size){updatePinStatus();return}
  const focus=new Set(),near=new Set();
  for(const key of pinnedKeys)for(const x of pinFocusMembers(key)){focus.add(x);near.add(x)}
  $$("#edges .edge[data-source][data-target]").forEach(e=>{
    const hit=focus.has(e.dataset.source)||focus.has(e.dataset.target);
    e.classList.toggle("edge-pin-focus",hit);e.classList.toggle("edge-pin-dim",!hit);
    if(hit){near.add(e.dataset.source);near.add(e.dataset.target)}
  });
  $$("#nodes .node[data-key], #nodes .macro-node[data-key]").forEach(n=>{
    const k=n.dataset.key,primary=focus.has(k),neighbor=!primary&&near.has(k);
    n.classList.toggle("pin-focus",primary);n.classList.toggle("pin-neighbor",neighbor);n.classList.toggle("pin-dim",!primary&&!neighbor);
  });
  $$("#conceptOverlay .macro-cluster[data-macro]").forEach(n=>{
    const k="macro:"+n.dataset.macro,on=pinnedKeys.has(k);n.classList.toggle("pin-focus",on);n.classList.toggle("pin-dim",!on&&currentGraphKind==="combined");
  });
  $$(".pin-handle[data-pin-key]").forEach(n=>n.classList.toggle("active",pinnedKeys.has(n.dataset.pinKey)));
  updatePinStatus();
}
function prunePins(){
  const valid=visiblePinKeys();
  for(const key of [...pinnedKeys])if(!valid.has(key))pinnedKeys.delete(key);
  applyPinnedVisuals();
}
function togglePin(key){
  if(!key)return false;
  if(pinnedKeys.has(key))pinnedKeys.delete(key);else pinnedKeys.add(key);
  applyPinnedVisuals();return pinnedKeys.has(key);
}
function clearPins(){pinnedKeys.clear();applyPinnedVisuals()}
function bindPinHandles(){
  $$(".pin-handle[data-pin-key]").forEach(h=>{
    if(h.dataset.pinBound==="1")return; h.dataset.pinBound="1";
    h.setAttribute("role","button");h.setAttribute("tabindex","0");
    const run=e=>{e.preventDefault();e.stopPropagation();togglePin(h.dataset.pinKey)};
    h.addEventListener("click",run);h.addEventListener("pointerdown",e=>e.stopPropagation());
    h.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")run(e)});
  });
  prunePins();
}
function clearConnectionHighlight(){
  hoverConnectionKey=null;
  $$("#edges .edge").forEach(e=>e.classList.remove("edge-focus","edge-dim"));
  $$("#nodes .node, #nodes .macro-node").forEach(n=>n.classList.remove("connection-focus","connection-dim"));
  applyPinnedVisuals();
}

function highlightConnections(key){
  hoverConnectionKey=key;
  const connected=new Set([key]);
  let matched=0;
  $$("#edges .edge[data-source][data-target]").forEach(e=>{
    const hit=e.dataset.source===key||e.dataset.target===key;
    e.classList.toggle("edge-focus",hit);
    e.classList.toggle("edge-dim",!hit);
    if(hit){
      matched++;
      connected.add(e.dataset.source);
      connected.add(e.dataset.target);
    }
  });
  if(!matched)return;
  $$("#nodes .node[data-key], #nodes .macro-node[data-key]").forEach(n=>{
    const hit=connected.has(n.dataset.key);
    n.classList.toggle("connection-focus",hit);
    n.classList.toggle("connection-dim",!hit);
  });
}

function bindDraggableNode(el,key,onOpen){
  el.classList.add("draggable-node");
  el.dataset.key=key;
  let dragState=null;

  el.addEventListener("pointerdown",e=>{
    if(e.target?.closest?.(".pin-handle"))return;
    if(e.button!==0)return;
    e.preventDefault();
    e.stopPropagation();
    const p=currentGraphPositions.get(key);
    if(!p)return;
    nodeDragging=true;
    dragState={
      pointerId:e.pointerId,
      startClientX:e.clientX,
      startClientY:e.clientY,
      startX:p.x,
      startY:p.y,
      moved:false
    };
    el.classList.add("is-dragging");
    try{el.setPointerCapture(e.pointerId)}catch(_){}
  });

  el.addEventListener("pointermove",e=>{
    if(!dragState||e.pointerId!==dragState.pointerId)return;
    const svgRect=$("#graph").getBoundingClientRect();
    const dx=(e.clientX-dragState.startClientX)/svgRect.width*1280/transform.k;
    const dy=(e.clientY-dragState.startClientY)/svgRect.height*780/transform.k;
    if(Math.hypot(e.clientX-dragState.startClientX,e.clientY-dragState.startClientY)>4)dragState.moved=true;
    setNodeVisualPosition(el,key,dragState.startX+dx,dragState.startY+dy);
    updateVisibleEdges();
  });

  const finish=e=>{
    if(!dragState||e.pointerId!==dragState.pointerId)return;
    const wasMoved=dragState.moved;
    dragState=null;
    nodeDragging=false;
    el.classList.remove("is-dragging");
    try{el.releasePointerCapture(e.pointerId)}catch(_){}
    if(wasMoved){
      el.dataset.suppressClick="1";
      setTimeout(()=>{el.dataset.suppressClick="0"},0);
    }
  };
  el.addEventListener("pointerup",finish);
  el.addEventListener("pointercancel",finish);

  el.addEventListener("click",e=>{
    e.preventDefault();
    e.stopPropagation();
    if(el.dataset.suppressClick==="1")return;
    onOpen?.();
  });

  el.addEventListener("mouseenter",()=>highlightConnections(key));
  el.addEventListener("mouseleave",clearConnectionHighlight);
}

function bindDraggableCluster(el,macroId){
  const members=currentClusterMembers.get(macroId)||[];
  if(!members.length)return;
  let dragState=null;

  el.classList.add("draggable-cluster");
  el.addEventListener("pointerdown",e=>{
    if(e.target?.closest?.(".pin-handle"))return;
    if(e.button!==0)return;
    e.preventDefault();e.stopPropagation();
    nodeDragging=true;
    const starts=new Map();
    members.forEach(id=>{
      const p=currentGraphPositions.get(id);
      if(p)starts.set(id,{x:p.x,y:p.y});
    });
    const startOffset=currentClusterOffsets.get(macroId)||{x:0,y:0};
    dragState={pointerId:e.pointerId,startClientX:e.clientX,startClientY:e.clientY,starts,startOffset,moved:false};
    el.classList.add("is-dragging");
    try{el.setPointerCapture(e.pointerId)}catch(_){}
  });
  el.addEventListener("pointermove",e=>{
    if(!dragState||e.pointerId!==dragState.pointerId)return;
    const r=$("#graph").getBoundingClientRect();
    const dx=(e.clientX-dragState.startClientX)/r.width*1280/transform.k;
    const dy=(e.clientY-dragState.startClientY)/r.height*780/transform.k;
    if(Math.hypot(e.clientX-dragState.startClientX,e.clientY-dragState.startClientY)>4)dragState.moved=true;
    members.forEach(id=>{
      const st=dragState.starts.get(id),nodeEl=document.querySelector(`#nodes .node[data-key="${CSS.escape(id)}"]`);
      if(st&&nodeEl)setNodeVisualPosition(nodeEl,id,st.x+dx,st.y+dy);
    });
    el.setAttribute("transform",`translate(${dragState.startOffset.x+dx} ${dragState.startOffset.y+dy})`);
    updateVisibleEdges();
  });
  const finish=e=>{
    if(!dragState||e.pointerId!==dragState.pointerId)return;
    const r=$("#graph").getBoundingClientRect();
    const dx=(e.clientX-dragState.startClientX)/r.width*1280/transform.k;
    const dy=(e.clientY-dragState.startClientY)/r.height*780/transform.k;
    currentClusterOffsets.set(macroId,{x:dragState.startOffset.x+dx,y:dragState.startOffset.y+dy});
    dragState=null;nodeDragging=false;el.classList.remove("is-dragging");
    try{el.releasePointerCapture(e.pointerId)}catch(_){}
  };
  el.addEventListener("pointerup",finish);
  el.addEventListener("pointercancel",finish);
}

function setDetailReady(title){
  lastDetailTitle=title||"HBBA";
  const btn=$("#expandDetailBtn");
  if(btn)btn.classList.remove("hidden");
}

function clearDetailReady(){
  const btn=$("#expandDetailBtn");
  if(btn)btn.classList.add("hidden");
}

function openDetailLarge(){
  const card=$("#detailCard"),dlg=$("#detailDialog"),content=$("#detailDialogContent");
  if(!card||!dlg||!content||card.classList.contains("hidden"))return;
  $("#detailDialogTitle").textContent=lastDetailTitle;
  content.innerHTML=card.innerHTML;
  dlg.showModal();
}

function scenarioFocusedBaseEdges(){
  if(!activeScenario)return [];
  const out=[],seen=new Set();
  for(const item of (activeScenario.active_edges||[])){
    const pair=scenarioBasePair(item,activeScenario);
    if(!pair.source||!pair.target)continue;
    const key=pair.source+"→"+pair.target;
    if(seen.has(key))continue;
    const base=edgeByKey.get(key);
    if(base&&edgePassesEvidence(base)){out.push({...base,synthetic:false});seen.add(key)}
  }
  return out;
}
function scenarioIntegrityReport(obj=activeScenario){
  const entries=Array.isArray(obj?.active_nodes)?obj.active_nodes:[];
  const keys=entries.map(scenarioNodeKey).filter(Boolean);
  const keySet=new Set(keys),instances=scenarioInstanceMap(obj);
  const validEdges=[];
  for(const e of (Array.isArray(obj?.active_edges)?obj.active_edges:[])){
    if(keySet.has(e?.source)&&keySet.has(e?.target)){
      const pair=scenarioBasePair(e,obj);
      if(pair.source&&pair.target&&edgeByKey.has(pair.source+"→"+pair.target))validEdges.push({source:e.source,target:e.target});
    }
  }
  const interactions=[];
  for(const e of scenarioInteractionLinks(obj))if(keySet.has(e?.source)&&keySet.has(e?.target))interactions.push(e);
  const adj=new Map([...keySet].map(id=>[id,new Set()]));
  for(const e of [...validEdges,...interactions]){adj.get(e.source)?.add(e.target);adj.get(e.target)?.add(e.source)}
  const visited=new Set();let components=0;
  for(const start of keySet){
    if(visited.has(start))continue;components++;
    const stack=[start];visited.add(start);
    while(stack.length){const cur=stack.pop();for(const n of (adj.get(cur)||[]))if(!visited.has(n)){visited.add(n);stack.push(n)}}
  }
  const isolated=keySet.size>1?[...keySet].filter(id=>(adj.get(id)?.size||0)===0):[];
  const usedObs=new Set();for(const n of entries)for(const ref of (Array.isArray(n?.based_on)?n.based_on:[]))usedObs.add(ref);
  const obs=(Array.isArray(obj?.observations)?obj.observations:[]).map(o=>o?.id).filter(Boolean);
  const unusedObservations=obs.filter(id=>!usedObs.has(id));
  const background=new Set(entries.map(scenarioNodeBaseId).filter(Boolean));
  for(const bid of (Array.isArray(obj?.behaviors)?obj.behaviors:[])){const b=behaviorById.get(bid);if(b)for(const id of b.nodes)background.add(id)}
  return {activeNodes:keySet.size,activeEdges:validEdges.length,interactionLinks:interactions.length,backgroundNodes:background.size,components:keySet.size?components:0,isolated,unusedObservations,actors:scenarioActorMap(obj).size};
}
function scenarioSharedFilterEnabled(){
  return sharedOnly&&selected.size>1&&!(activeScenario&&scenarioFocusMode);
}
function getActive(){
  const counts=new Map();

  if(activeScenario&&scenarioFocusMode){
    // Scenario Focus: show only the mechanisms explicitly selected for this concrete case.
    for(const item of (activeScenario.active_nodes||[])){
      const base=scenarioNodeBaseId(item);if(base&&nodeById.has(base))counts.set(base,1);
    }
  }else{
    // Behavior background: full ontology of every selected behavior plus scenario hits.
    for(const bid of selected){
      const b=behaviorById.get(bid);if(!b)continue;
      for(const id of b.nodes)counts.set(id,(counts.get(id)||0)+1);
    }
    for(const item of (activeScenario?.active_nodes||[])){
      const base=scenarioNodeBaseId(item);if(base&&nodeById.has(base)&&!counts.has(base))counts.set(base,1);
    }
  }

  const allIds=[...counts.keys()];
  let ids=allIds.slice();
  if(viewMode!=="layman" && scenarioSharedFilterEnabled()){
    ids=ids.filter(id=>(counts.get(id)||0)>1);
  }

  const visible=new Set(ids);
  const sourceEdges=(activeScenario&&scenarioFocusMode)?scenarioFocusedBaseEdges():D.edges;
  const edges=sourceEdges
    .filter(edgePassesEvidence)
    .filter(e=>visible.has(e.source)&&visible.has(e.target))
    .map(e=>({...e,synthetic:false}));

  return {counts,ids,edges,allIds};
}

function layoutGraph(ids,counts){
  if(viewMode==="combined"){
    const model=buildMacroModel(ids,counts);lastMacroModel=model;
    let groups=model.activeGroups;
    if(scenarioSharedFilterEnabled())groups=groups.filter(g=>g.shared);

    const colMap={context:0,notice:1,memory:1,other_model:2,threat:2,value:3,predict:3,emotion:3,body:4,goal:4,control:4,strategy:5,message:5,action:5,feedback:6,result:6,learning:6};
    const xs=[85,270,455,640,825,1010,1195],pos=new Map(),groupBox=new Map(),byCol=new Map();

    for(const g of groups){
      const c=colMap[g.id]??5;if(!byCol.has(c))byCol.set(c,[]);byCol.get(c).push(g);
    }
    for(const [c,colGroups] of byCol.entries()){
      const total=colGroups.reduce((s,g)=>s+g.members.length,0);
      let cursor=78;const available=645,gap=14,usable=available-gap*(colGroups.length-1);
      for(const g of colGroups){
        const gh=Math.max(110,Math.min(245,usable*(g.members.length/Math.max(total,1))));
        const members=g.members.map(id=>nodeById.get(id)).filter(Boolean).sort((a,b)=>(typeStage[a.type]??0)-(typeStage[b.type]??0)||a.name[lang].localeCompare(b.name[lang]));
        const top=cursor+38,bottom=cursor+gh-20;
        const step=members.length>1?Math.min(38,(bottom-top)/(members.length-1)):0;
        const used=step*(members.length-1),startY=top+Math.max(0,(bottom-top-used)/2);
        members.forEach((n,i)=>pos.set(n.id,{x:xs[c],y:startY+i*step,shared:(counts.get(n.id)||0)>1,macro:g.id}));
        groupBox.set(g.id,{x:xs[c],top:cursor,height:gh});cursor+=gh+gap;
      }
    }
    const allowed=new Set(groups.map(g=>g.id)),visibleIds=ids.filter(id=>allowed.has(model.assignment.get(id)));
    return {pos,xs,labels:[],visibleIds,macroModel:model,macroGroups:groups,groupBox};
  }

  const stages=Array.from({length:7},()=>[]);
  ids.forEach(id=>{const n=nodeById.get(id);if(n)stages[typeStage[n.type]??1].push(n)});
  stages.forEach(arr=>arr.sort((a,b)=>(counts.get(b.id)||0)-(counts.get(a.id)||0)||nodeLabel(a).localeCompare(nodeLabel(b))));
  const xs=[72,270,456,650,826,1005,1180],pos=new Map();
  stages.forEach((arr,s)=>{
    const step=arr.length>1?Math.min(62,650/(arr.length-1)):0,start=390-step*(arr.length-1)/2;
    arr.forEach((n,i)=>pos.set(n.id,{x:xs[s],y:start+i*step,shared:(counts.get(n.id)||0)>1}));
  });
  return {pos,xs,labels:I[lang].stages,visibleIds:ids};
}

function renderMacroLayman(counts,allIds){
  const model=buildMacroModel(allIds,counts);lastMacroModel=model;
  let groups=model.activeGroups;
  if(scenarioSharedFilterEnabled())groups=groups.filter(g=>g.shared);

  const allowed=new Set(groups.map(g=>g.id));
  const edges=collapseReciprocalEdges(model.edges.filter(e=>allowed.has(e.source)&&allowed.has(e.target)));
  const colMap={context:0,notice:1,memory:1,other_model:2,threat:2,value:3,predict:3,emotion:3,body:4,goal:4,control:4,strategy:5,message:5,action:5,feedback:6,result:6,learning:6};
  const xs=[105,285,465,645,825,1005,1175],cols=new Map(),pos=new Map();

  for(const g of groups){const c=colMap[g.id]??5;if(!cols.has(c))cols.set(c,[]);cols.get(c).push(g)}
  for(const [c,arr] of cols.entries()){
    const step=arr.length>1?Math.min(175,610/(arr.length-1)):0,start=390-step*(arr.length-1)/2;
    arr.forEach((g,i)=>pos.set(g.id,{x:xs[c],y:start+i*step}));
  }

  $("#stageLabels").innerHTML="";$("#conceptOverlay").innerHTML="";
  currentGraphKind="layman";
  currentGraphPositions=new Map([...pos.entries()].map(([id,p])=>["macro:"+id,{x:p.x,y:p.y}]));
  currentClusterMembers=new Map();
  currentClusterOffsets=new Map();

  $("#edges").innerHTML=edges.map(e=>{
    const a=pos.get(e.source),b=pos.get(e.target);if(!a||!b)return"";
    const strong=(e.count||1)>1;
    const rels=(e.aggregated_relation_types||[edgeRelationType(e)]).join(", ");
    const aggregateTip=`${lang==="ru"?"Агрегированное отображение":"Aggregate mapping"} · ${e.count||1} ${lang==="ru"?"проф. связей":"professional links"} · ${rels}`;
    return `<path class="edge macro-edge ${edgeRelationClass(e)} ${strong?"shared-edge":""} ${e.bidirectional?"bidirectional":""}"
      data-source="macro:${e.source}" data-target="macro:${e.target}" data-relation-type="${edgeRelationType(e)}"
      data-aggregate-count="${e.count||1}" data-aggregate-relations="${esc(rels)}"
      data-direction="${e.bidirectional?"both":"forward"}"
      d="${edgePath(a,b)}"><title>${esc(aggregateTip)}</title></path>`;
  }).join("");

  $("#nodes").innerHTML=groups.map(g=>{
    const p=pos.get(g.id),w=150,h=102,x=p.x-w/2,y=p.y-h/2,title=macroDisplayName(g);
    return `<g class="macro-node ${g.shared?"shared":""}" data-macro="${g.id}" data-key="macro:${g.id}" data-base-x="${p.x}" data-base-y="${p.y}">
      <rect class="macro-node-hit" x="${x-7}" y="${y-7}" width="${w+14}" height="${h+14}" rx="19"/>
      <rect class="macro-node-box" x="${x}" y="${y}" width="${w}" height="${h}" rx="16"/>
      <text class="macro-node-step" x="${x+12}" y="${y+16}">${esc(g.icon)}</text>
      <text class="macro-node-title" x="${p.x}" y="${y+36}" text-anchor="middle">${splitLabel(title,22).map((line,j)=>`<tspan x="${p.x}" dy="${j?13:0}">${esc(line)}</tspan>`).join("")}</text>
      <text class="macro-node-count" x="${p.x}" y="${y+h-15}" text-anchor="middle">${g.members.length} ${lang==="ru"?"проф. механизмов":"pro mechanisms"}</text>
      ${g.shared?`<text class="macro-node-shared" x="${p.x}" y="${y+h-4}" text-anchor="middle">✦ ${lang==="ru"?"общее":"shared"}</text>`:""}
      <text class="pin-handle" data-pin-key="macro:${g.id}" x="${x+w-13}" y="${y+18}" text-anchor="middle"><title>${lang==="ru"?"Закрепить фокус":"Pin focus"}</title>📌</text>
    </g>`;
  }).join("");

  $$("#nodes .macro-node").forEach(el=>{
    const mid=el.dataset.macro;
    bindDraggableNode(el,"macro:"+mid,()=>{
      activeNode="macro:"+mid;
      showMacroDetails(mid);
    });
  });
  bindPinHandles();

  const sharedCount=groups.filter(g=>g.shared).length;
  $("#metrics").innerHTML=`<span class="metric"><b>${groups.length}</b> ${lang==="ru"?"понятных нод":"plain-language nodes"}</span><span class="metric"><b>${sharedCount}</b> ${t("shared")}</span><span class="metric"><b>${allIds.length}</b> ${lang==="ru"?"проф. сущностей внутри":"professional entities inside"}</span>`;
}

function renderComboClusters(groups,pos,groupBox){
  return groups.map(g=>{
    const box=groupBox?.get(g.id);if(!box)return"";
    const x=box.x,width=116,left=x-width/2,top=box.top,h=box.height,title=macroDisplayName(g);
    return `<g class="macro-cluster ${g.shared?"shared":""}" data-macro="${g.id}">
      <rect class="macro-cluster-box" x="${left}" y="${top}" width="${width}" height="${h}" rx="16"/>
      <rect class="macro-cluster-head cluster-drag-handle" x="${left+6}" y="${top+6}" width="${width-12}" height="28" rx="9"/>
      <text class="macro-cluster-title" x="${x}" y="${top+18}" text-anchor="middle">${splitLabel(title,18).map((line,j)=>`<tspan x="${x}" dy="${j?10:0}">${esc(line)}</tspan>`).join("")}</text>
      <text class="macro-cluster-count" x="${x}" y="${top+h-7}" text-anchor="middle">${g.members.filter(id=>pos.has(id)).length}</text>
      <text class="pin-handle macro-pin-handle" data-pin-key="macro:${g.id}" x="${left+width-12}" y="${top+24}" text-anchor="middle"><title>${lang==="ru"?"Закрепить смысловой блок":"Pin macro concept"}</title>📌</text>
    </g>`;
  }).join("");
}

function showMacroDetails(mid){
  const model=lastMacroModel;if(!model)return;
  const g=model.groups.get(mid);if(!g)return;
  const card=$("#detailCard");
  $("#detailEmpty").classList.add("hidden");
  card.classList.remove("hidden");

  const members=g.members.map(id=>nodeById.get(id)).filter(Boolean);
  const sourceIds=new Set();
  members.forEach(n=>(n.source_ids||[]).forEach(s=>sourceIds.add(s)));
  const sources=[...sourceIds].map(id=>sourceById.get(id)).filter(Boolean);

  const typeOrder=["context","cognitive","social_cog","control","affect","motivation","regulatory","strategy","motor","outcome","learning","network","network_family","distributed_system","circuit_family","neural_system","region","physiology"];
  members.sort((a,b)=>typeOrder.indexOf(a.type)-typeOrder.indexOf(b.type)||a.name[lang].localeCompare(b.name[lang]));

  setDetailReady(macroDisplayName(g));
  card.innerHTML=`<h3>${esc(macroDisplayName(g))}${g.shared?' <span style="color:#77f4bf;font-size:12px">✦</span>':""}</h3>
    <span class="type-badge"><i style="background:var(--accent)"></i>${lang==="ru"?"Обывательский макромеханизм":"Layman macro mechanism"}</span>

    <div class="card-section">
      <h4>${esc(t("macroMeaning"))}</h4>
      <p>${esc(g.description[lang])}</p>
    </div>

    <div class="shared-callout">${esc(t("macroHidden"))}</div>

    <div class="detail-section">
      <span class="label">${esc(t("macroContains"))}</span>
      <div class="viz-stat-value" style="font-size:26px;margin-top:4px">${members.length}</div>
    </div>

    <div class="detail-section">
      <span class="label">${esc(t("macroIncludes"))}</span>
      <div class="used-list">
        ${members.map(n=>`<span class="mini-chip">${esc(n.name[lang])}</span>`).join("")}
      </div>
    </div>

    ${sources.length?`<div class="card-section"><h4>${esc(t("nodeSources"))}</h4><div class="source-card-links">${sources.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${esc(s.title)} ↗</a>`).join("")}</div></div>`:""}
  `;
}
function renderActorLegend(){
  const box=$("#actorLegend");if(!box)return;
  if(!activeScenario||!hasMultiActorScenario(activeScenario)){box.classList.add("hidden");box.innerHTML="";return}
  const actors=scenarioActorMap(activeScenario);
  box.classList.remove("hidden");
  box.innerHTML=[...actors.values()].map((a,i)=>`<span class="actor-chip"><i style="background:${actorColor(a.id,i)}"></i><b>${esc(a.name||a.id)}</b><small>${esc(a.type||"person")}</small></span>`).join("")+`<span class="actor-chip interaction-legend">⇢ ${lang==="ru"?"пунктир = сценарное взаимодействие, не научное ребро":"dashed = scenario interaction, not a scientific edge"}</span>`;
}
function renderMultiActorScenario(){
  const entries=(activeScenario?.active_nodes||[]).map((item,i)=>({item,key:scenarioNodeKey(item),base:scenarioNodeBaseId(item),actor:scenarioActorId(item),i})).filter(x=>x.key&&nodeById.has(x.base));
  const actorsMap=scenarioActorMap(activeScenario);
  const actorIds=[];
  for(const x of entries)if(!actorIds.includes(x.actor))actorIds.push(x.actor);
  for(const id of actorsMap.keys())if(!actorIds.includes(id))actorIds.push(id);
  if(!actorIds.length)actorIds.push("_shared");
  const xs=[105,285,465,645,825,1005,1180],top=70,bottom=745,laneH=(bottom-top)/actorIds.length,pos=new Map();
  const lanes=[];
  actorIds.forEach((aid,ai)=>{
    const y0=top+ai*laneH,y1=top+(ai+1)*laneH,center=(y0+y1)/2;
    const a=actorsMap.get(aid)||{id:aid,name:aid==="_shared"?(lang==="ru"?"Общее / без участника":"Shared / unassigned"):aid,type:"shared"};
    const color=actorColor(aid,ai);lanes.push({aid,a,color,y0,y1,center});
    const groups=new Map();
    for(const x of entries.filter(z=>z.actor===aid)){const st=typeStage[nodeById.get(x.base)?.type]??1;if(!groups.has(st))groups.set(st,[]);groups.get(st).push(x)}
    for(const [st,arr] of groups){const gap=Math.min(34,Math.max(18,(laneH-32)/Math.max(1,arr.length)));const start=center-gap*(arr.length-1)/2;arr.forEach((x,j)=>pos.set(x.key,{x:xs[st],y:start+j*gap,actor:aid,color}))}
  });
  currentGraphKind="multi-actor";currentGraphPositions=new Map([...pos.entries()].map(([k,v])=>[k,{x:v.x,y:v.y}]));currentClusterMembers=new Map();currentClusterOffsets=new Map();
  $("#stageLabels").innerHTML=xs.map((x,i)=>`<g><text class="stage-label" x="${x}" y="28" text-anchor="middle">${I[lang].stages[i]||""}</text><line class="stage-line" x1="${x}" y1="44" x2="${x}" y2="754"/></g>`).join("");
  $("#conceptOverlay").innerHTML=lanes.map(l=>`<g class="actor-lane"><rect x="8" y="${l.y0+3}" width="1260" height="${Math.max(38,l.y1-l.y0-6)}" rx="12"/><circle cx="25" cy="${l.y0+20}" r="5" fill="${l.color}"/><text class="actor-name" x="38" y="${l.y0+23}" fill="${l.color}">${esc(l.a.name||l.a.id)}</text><text class="actor-type" x="38" y="${l.y0+35}">${esc(l.a.type||"")}</text></g>`).join("");
  const sci=[];
  for(const e of (activeScenario.active_edges||[])){
    if(!pos.has(e.source)||!pos.has(e.target))continue;const pair=scenarioBasePair(e,activeScenario);const base=edgeByKey.get(pair.source+"→"+pair.target);if(!base||!edgePassesEvidence(base))continue;sci.push({scenario:e,base});
  }
  const interactions=showScenarioInteractions?scenarioInteractionLinks(activeScenario).filter(e=>pos.has(e.source)&&pos.has(e.target)):[];
  $("#edges").innerHTML=sci.map(({scenario:e,base})=>{const a=pos.get(e.source),b=pos.get(e.target);return `<path class="edge ${edgeRelationClass(base)} ${edgeAuditClass(base)}" data-source="${esc(e.source)}" data-target="${esc(e.target)}" data-base-source="${base.source}" data-base-target="${base.target}" data-direction="forward" data-relation-type="${edgeRelationType(base)}" data-audit-grade="${edgeAuditGrade(base)}" d="${edgePath(a,b)}"/>`}).join("")+
    interactions.map(e=>{const a=pos.get(e.source),b=pos.get(e.target);return `<path class="edge interaction-edge" data-interaction="1" data-source="${esc(e.source)}" data-target="${esc(e.target)}" data-relation="${esc(e.relation||"interaction")}" data-reason="${esc(e.reason||"")}" d="${edgePath(a,b)}"/>`}).join("");
  $("#nodes").innerHTML=entries.map(x=>{const n=nodeById.get(x.base),p=pos.get(x.key),c=cssColor(n.type),actor=actorsMap.get(x.actor),ac=actorColor(x.actor);const r=9;return `<g class="node multi-actor-node" data-node="${x.base}" data-key="${esc(x.key)}" data-instance="${esc(x.key)}" data-actor="${esc(x.actor)}" data-base-x="${p.x}" data-base-y="${p.y}"><circle class="node-hit" cx="${p.x}" cy="${p.y}" r="19"/><circle class="halo" cx="${p.x}" cy="${p.y}" r="18" fill="${c}"/><circle class="main-circle" cx="${p.x}" cy="${p.y}" r="10.2" fill="${c}" fill-opacity=".86"/><circle class="actor-ring" cx="${p.x}" cy="${p.y}" r="14" stroke="${ac}"/>${svgLabel(n,p)}<text class="pin-handle node-pin-handle" data-pin-key="${esc(x.key)}" x="${p.x+18}" y="${p.y-14}" text-anchor="middle"><title>${lang==="ru"?"Закрепить этот экземпляр":"Pin this instance"}</title>📌</text></g>`}).join("");
  $$("#nodes .node").forEach(el=>{const key=el.dataset.key,base=el.dataset.node;bindDraggableNode(el,key,()=>{activeNode=base;showDetails(base);appendScenarioInfoToDetail(key)});el.addEventListener("mouseenter",e=>{const item=scenarioResolveInstance(key),a=actorsMap.get(item?.actor);const tip=$("#hoverTip"),n=nodeById.get(base);tip.innerHTML=`<b>${esc(n?.name?.[lang]||base)}</b><br><span style="color:${actorColor(item?.actor)}">${esc(a?.name||item?.actor||"")}</span>`;tip.classList.remove("hidden");moveTip(e)});el.addEventListener("mousemove",moveTip);el.addEventListener("mouseleave",()=>$("#hoverTip").classList.add("hidden"))});
  bindPinHandles();
  $("#metrics").innerHTML=`<span class="metric"><b>${entries.length}</b> ${lang==="ru"?"экземпляров":"instances"}</span><span class="metric"><b>${actorIds.filter(x=>x!=="_shared").length}</b> ${lang==="ru"?"участников":"actors"}</span><span class="metric"><b>${sci.length}</b> ${lang==="ru"?"научных связей":"scientific links"}</span><span class="metric"><b>${interactions.length}</b> ${lang==="ru"?"взаимодействий":"interactions"}</span>`;
  renderActorLegend();applyTransform();applyScenarioVisuals();applyShiftVisuals();applyGuidedTourVisuals();applyPinnedVisuals();
}
function renderGraph(){
  const hasScenarioNodes=Array.isArray(activeScenario?.active_nodes)&&activeScenario.active_nodes.length>0;
  const scenarioInsufficient=!!(activeScenario&&scenarioFocusMode&&!hasScenarioNodes);
  renderScenarioInsufficientState();
  if(scenarioInsufficient){
    $("#emptyState").classList.add("hidden");
    $("#stageLabels").innerHTML="";$("#edges").innerHTML="";$("#nodes").innerHTML="";$("#conceptOverlay").innerHTML="";
    $("#metrics").innerHTML=`<span class="metric"><b>0</b> ${lang==="ru"?"скрытых механизмов выбрано":"latent mechanisms selected"}</span>`;
    currentGraphPositions=new Map();renderActorLegend();return;
  }
  $("#scenarioInsufficientState")?.classList.add("hidden");
  const empty=selected.size===0&&!hasScenarioNodes;
  $("#emptyState").classList.toggle("hidden",!empty);
  const names=[...selected].map(id=>behaviorById.get(id)?.name[lang]).filter(Boolean);
  $("#activeTitle").textContent=names.length?names.join(" × "):(hasScenarioNodes?(activeScenario.title||"HBBA Scenario"):t("waiting"));

  if(empty){
    $("#stageLabels").innerHTML="";
    $("#edges").innerHTML="";
    $("#nodes").innerHTML="";
    $("#conceptOverlay").innerHTML="";
    $("#metrics").innerHTML="";
    return;
  }

  const {counts,ids,edges,allIds}=getActive();

  if(activeScenario&&scenarioFocusMode&&viewMode==="professional"&&hasMultiActorScenario(activeScenario)){
    renderMultiActorScenario();
    return;
  }
  renderActorLegend();

  // LAYMAN: show only aggregated macro mechanisms.
  if(viewMode==="layman"){
    renderMacroLayman(counts,allIds);
    applyTransform();
    applyScenarioVisuals();
    applyShiftVisuals();
    applyGuidedTourVisuals();
    applyPinnedVisuals();
    return;
  }

  const layout=layoutGraph(ids,counts);
  const {pos,xs,labels,visibleIds}=layout;
  const visibleSet=new Set(visibleIds);

  $("#stageLabels").innerHTML=xs.map((x,i)=>`<g>
    <text class="stage-label" x="${x}" y="28" text-anchor="middle">${labels[i]||""}</text>
    <line class="stage-line" x1="${x}" y1="44" x2="${x}" y2="744"/>
  </g>`).join("");

  const visibleEdges=collapseReciprocalEdges(edges.filter(e=>visibleSet.has(e.source)&&visibleSet.has(e.target)));
  currentGraphKind=viewMode;
  currentGraphPositions=new Map(visibleIds.map(id=>[id,{x:pos.get(id).x,y:pos.get(id).y}]));
  currentClusterMembers=new Map();
  currentClusterOffsets=new Map();

  $("#edges").innerHTML=visibleEdges.map(e=>{
    const a=pos.get(e.source),b=pos.get(e.target);if(!a||!b)return"";
    const shared=(counts.get(e.source)||0)>1&&(counts.get(e.target)||0)>1;
    return `<path class="edge ${edgeRelationClass(e)} ${edgeAuditClass(e)} ${shared?"shared-edge":""} ${e.bidirectional?"bidirectional":""}"
      data-source="${e.source}" data-target="${e.target}" data-base-source="${e.source}" data-base-target="${e.target}" data-audit-grade="${edgeAuditGrade(e)}" data-relation-type="${edgeRelationType(e)}"
      data-direction="${e.bidirectional?"both":"forward"}"
      d="${edgePath(a,b)}"/>`;
  }).join("");

  if(viewMode==="combined"){
    currentClusterMembers=new Map(layout.macroGroups.map(g=>[g.id,g.members.filter(id=>visibleSet.has(id))]));
    $("#conceptOverlay").innerHTML=renderComboClusters(layout.macroGroups,pos,layout.groupBox);
  }else{
    $("#conceptOverlay").innerHTML="";
  }

  $("#nodes").innerHTML=visibleIds.map(id=>{
    const n=nodeById.get(id),p=pos.get(id),c=cssColor(n.type);
    const r=p.shared?10.5:8;
    const pro=professionalTypes.has(n.type);
    const cls=`node ${p.shared?"shared":""} ${pro?"pro-layer":"lay-layer"} ${viewMode==="combined"?"combo-base-node":""}`;
    return `<g class="${cls}" data-node="${id}" data-key="${id}" data-base-x="${p.x}" data-base-y="${p.y}">
      <circle class="node-hit" cx="${p.x}" cy="${p.y}" r="${Math.max(18,r+8)}"/>
      <circle class="halo" cx="${p.x}" cy="${p.y}" r="${r+9}" fill="${c}"/>
      <circle class="main-circle" cx="${p.x}" cy="${p.y}" r="${r+1.2}" fill="${c}" fill-opacity="${p.shared?.96:.82}"/>
      <circle cx="${p.x+5.5}" cy="${p.y-5.5}" r="2.2" fill="#f4fbff" opacity="${p.shared?.8:.42}"/>
      ${svgLabel(n,p)}
      <text class="pin-handle node-pin-handle" data-pin-key="${id}" x="${p.x+18}" y="${p.y-14}" text-anchor="middle"><title>${lang==="ru"?"Закрепить фокус":"Pin focus"}</title>📌</text>
    </g>`;
  }).join("");

  $$("#nodes .node").forEach(el=>{
    const id=el.dataset.node;
    bindDraggableNode(el,id,()=>{
      activeNode=id;
      showDetails(id);
    });
    el.addEventListener("mouseenter",e=>showTip(e,id,counts));
    el.addEventListener("mousemove",moveTip);
    el.addEventListener("mouseleave",()=>$("#hoverTip").classList.add("hidden"));
  });
  bindPinHandles();

  if(viewMode==="combined"){
    $$("#conceptOverlay .macro-cluster").forEach(el=>{
      bindDraggableCluster(el,el.dataset.macro);
    });
    bindPinHandles();
  }

  const sh=visibleIds.filter(id=>(counts.get(id)||0)>1).length;
  $("#metrics").innerHTML=`<span class="metric"><b>${visibleIds.length}</b> ${t("nodes")}</span><span class="metric"><b>${sh}</b> ${t("shared")}</span><span class="metric"><b>${visibleEdges.length}</b> ${t("edges")}</span>`;
  applyTransform();
  applyScenarioVisuals();
  applyShiftVisuals();
  applyGuidedTourVisuals();
  applyPinnedVisuals();
}

function showTip(e,id,counts){
  const n=nodeById.get(id),tip=$("#hoverTip");if(!n)return;
  tip.innerHTML=`<b>${esc(nodeLabel(n))}</b><br><span style="color:#6f8da1">${esc(I[lang].types[n.type])}${(counts.get(id)||0)>1?` • ✦ ${counts.get(id)}`:""}</span>`;
  tip.classList.remove("hidden");moveTip(e);
}
function moveTip(e){
  const r=$("#graphWrap").getBoundingClientRect(),tip=$("#hoverTip");
  tip.style.left=Math.min(r.width-210,e.clientX-r.left+12)+"px";tip.style.top=Math.min(r.height-65,e.clientY-r.top+12)+"px";
}

function linkedScientificNodes(id,maxDepth=2){
  const selectedIds=new Set();
  for(const bid of selected){const b=behaviorById.get(bid);if(b)for(const nid of b.nodes)selectedIds.add(nid)}
  const allowed=new Set(["network","network_family","distributed_system","circuit_family","neural_system","region","physiology"]),seen=new Set([id]),queue=[{id,depth:0}],found=new Map();
  while(queue.length){
    const cur=queue.shift();if(cur.depth>=maxDepth)continue;
    for(const e of D.edges){
      let next=null;
      if(e.source===cur.id)next=e.target;else if(e.target===cur.id)next=e.source;
      if(!next||seen.has(next)||!selectedIds.has(next))continue;
      seen.add(next);const n=nodeById.get(next);if(!n)continue;
      if(allowed.has(n.type))found.set(next,n);
      queue.push({id:next,depth:cur.depth+1});
    }
  }
  return [...found.values()];
}
function scientificLinksHtml(id){
  const items=linkedScientificNodes(id,2);if(!items.length)return"";
  const groups=[["network","brainNetworks"],["network_family","brainNetworks"],["distributed_system","brainNetworks"],["circuit_family","brainNetworks"],["neural_system","brainRegions"],["region","brainRegions"],["physiology","bodySystems"]];
  return `<div class="brain-links"><div class="brain-links-title"><span>⌁</span>${esc(t("brainLinks"))}</div>
    <p class="brain-intro">${esc(t("brainIntro"))}</p>
    ${groups.map(([tp,label])=>{
      const arr=items.filter(n=>n.type===tp);if(!arr.length)return"";
      return `<div class="brain-link-group"><span class="brain-link-label">${esc(t(label))}</span><div class="brain-link-list">${arr.map(n=>`<span class="brain-link"><i style="background:${cssColor(n.type)}"></i>${esc(n.name[lang])}</span>`).join("")}</div></div>`;
    }).join("")}
    ${viewMode==="layman"?`<div class="pro-note">${esc(t("proVisibleNote"))}</div>`:""}
  </div>`;
}
function nodeSourcesHtml(n){
  const src=(n.source_ids||[]).map(id=>sourceById.get(id)).filter(Boolean);
  if(!src.length)return"";
  return `<div class="card-section"><h4>${esc(t("nodeSources"))}</h4><div class="source-card-links">${src.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${esc(s.title)} ↗</a>`).join("")}</div></div>`;
}
function showDetails(id){
  const n=nodeById.get(id);if(!n)return;
  const {counts}=getActive(),used=[...selected].map(x=>behaviorById.get(x)).filter(b=>b?.nodes.includes(id));
  $("#detailEmpty").classList.add("hidden");
  const card=$("#detailCard"),color=cssColor(n.type),shared=(counts.get(id)||0)>1,l=n.layman?.[lang];
  card.classList.remove("hidden");
  setDetailReady(viewMode==="professional" ? n.name[lang] : (l?.name||n.name[lang]));

  if(viewMode==="professional"){
    card.innerHTML=`<h3>${esc(n.name[lang])}${shared?' <span style="color:#77f4bf;font-size:12px">✦</span>':""}</h3>
      <span class="type-badge"><i style="background:${color};box-shadow:0 0 8px ${color}"></i>${esc(I[lang].types[n.type]||n.type)}</span>
      <span class="layer-badge layer-${esc(n.analysis_layer||"psychological")}">${esc(nodeLayerLabel(n))}</span>
      <p>${esc(n.description[lang])}</p>
      <div class="layer-caveat">${esc(nodeLayerCaveat(n))}</div>
      ${shared?`<div class="shared-callout">✦ ${esc(t("sharedNode"))}</div>`:""}
      <div class="detail-section"><span class="label">${esc(t("usedBy"))}</span><div class="used-list">${used.map(b=>`<span class="mini-chip">${b.icon} ${esc(b.name[lang])}</span>`).join("")||"—"}</div></div>
      ${nodeSourcesHtml(n)}`;
    appendScenarioInfoToDetail(id);
    return;
  }

  card.innerHTML=`<h3>${esc(l?.name||n.name[lang])}${shared?' <span style="color:#77f4bf;font-size:12px">✦</span>':""}</h3>
    <span class="science-name">${esc(t("scienceName"))}: ${esc(n.name[lang])}</span>
    <span class="type-badge"><i style="background:${color};box-shadow:0 0 8px ${color}"></i>${esc(I[lang].types[n.type]||n.type)}</span>
    <span class="layer-badge layer-${esc(n.analysis_layer||"psychological")}">${esc(nodeLayerLabel(n))}</span>
    <div class="layer-caveat">${esc(nodeLayerCaveat(n))}</div>
    <div class="card-section"><h4>${esc(t("what"))}</h4><p>${esc(l.what)}</p></div>
    <div class="card-section"><h4>${esc(t("looks"))}</h4><p>${esc(l.looks)}</p></div>
    <div class="card-section"><h4>${esc(t("trigger"))}</h4><p>${esc(l.trigger)}</p></div>
    <div class="card-section"><h4>${esc(t("purpose"))}</h4><p>${esc(l.purpose)}</p></div>
    <div class="card-section"><h4>${esc(t("mayLead"))}</h4><p>${esc(l.may_lead)}</p></div>
    <div class="card-section caveat"><h4>${esc(t("caveat"))}</h4><p>${esc(l.caveat)}</p></div>
    ${shared?`<div class="shared-callout">✦ ${esc(t("sharedNode"))}</div>`:""}
    ${!professionalTypes.has(n.type)?scientificLinksHtml(id):""}
    <div class="detail-section"><span class="label">${esc(t("usedBy"))}</span><div class="used-list">${used.map(b=>`<span class="mini-chip">${b.icon} ${esc(b.name[lang])}</span>`).join("")||"—"}</div></div>
    ${nodeSourcesHtml(n)}`;
  appendScenarioInfoToDetail(id);
}


function fit(){transform={x:0,y:0,k:1};applyTransform()}
function applyTransform(){$("#viewport").setAttribute("transform",`translate(${transform.x} ${transform.y}) scale(${transform.k})`)}

$("#searchInput").addEventListener("input",renderBehaviors);
$("#clearBtn").addEventListener("click",()=>{selected.clear();refresh()});
$("#fitBtn").addEventListener("click",fit);
$("#sharedBtn").addEventListener("click",e=>{sharedOnly=!sharedOnly;e.currentTarget.classList.toggle("active",sharedOnly);renderGraph()});
$("#labelsBtn").addEventListener("click",e=>{showLabels=!showLabels;e.currentTarget.classList.toggle("active",showLabels);renderGraph()});
$("#clearPinsBtn")?.addEventListener("click",clearPins);
$$(".lang-btn").forEach(b=>b.addEventListener("click",()=>{lang=b.dataset.lang;applyLanguage()}));
$$(".preset").forEach(b=>b.addEventListener("click",()=>{selected=new Set(b.dataset.preset.split(","));refresh()}));
$$(".mode-btn").forEach(b=>b.addEventListener("click",()=>{
  viewMode=b.dataset.viewMode;activeNode=null;lastMacroModel=null;pinnedKeys.clear();$("#detailCard").classList.add("hidden");$("#detailEmpty").classList.remove("hidden");clearDetailReady();
  renderModeBanner();renderLegend();renderGraph();
}));

const svg=$("#graph");
svg.addEventListener("wheel",e=>{
  e.preventDefault();const r=svg.getBoundingClientRect(),mx=(e.clientX-r.left)/r.width*1280,my=(e.clientY-r.top)/r.height*780;
  const old=transform.k,nk=Math.max(.45,Math.min(2.6,old*(e.deltaY<0?1.12:.89)));
  transform.x=mx-(mx-transform.x)*(nk/old);transform.y=my-(my-transform.y)*(nk/old);transform.k=nk;applyTransform();
},{passive:false});
svg.addEventListener("pointerdown",e=>{
  if(nodeDragging)return;
  if(e.target.closest && e.target.closest(".draggable-node, .draggable-cluster")) return;
  dragging=true;
  last={x:e.clientX,y:e.clientY};
  svg.setPointerCapture(e.pointerId);
});
svg.addEventListener("pointermove",e=>{if(!dragging)return;const r=svg.getBoundingClientRect();transform.x+=(e.clientX-last.x)/r.width*1280;transform.y+=(e.clientY-last.y)/r.height*780;last={x:e.clientX,y:e.clientY};applyTransform()});
svg.addEventListener("pointerup",()=>dragging=false);svg.addEventListener("pointercancel",()=>dragging=false);





function clearDirectorClasses(){
  $$("#nodes .node").forEach(el=>el.classList.remove("director-focus","director-anchor","director-dim"));
  $$("#edges .edge").forEach(el=>el.classList.remove("director-edge-focus","director-edge-dim"));
}
function directorEdgeExists(a,b){
  if(edgeByKey.has(a+"→"+b))return true;
  const ia=scenarioInstanceBaseId(a),ib=scenarioInstanceBaseId(b);
  if(ia&&ib&&edgeByKey.has(ia+"→"+ib))return true;
  return scenarioInteractionLinks(activeScenario).some(e=>e.source===a&&e.target===b);
}
function directorFocus(nodes,edges=[],anchor=null){
  const ids=[...new Set((nodes||[]).filter(id=>nodeById.has(id)||scenarioResolveInstance(id)))];
  if(!ids.length)throw new Error(lang==="ru"?"Не найдено ни одной допустимой ноды.":"No valid nodes found.");
  if(!directorActive){
    directorResumeState={tourActive:guidedTourActive,tourIndex:guidedTourIndex,tourOverview:guidedTourOverview};
  }
  directorActive=true;
  guidedTourActive=false;guidedTourOverview=false;
  renderGuidedTourPanel();
  clearGuidedTourClasses();clearDirectorClasses();
  const set=new Set(ids);
  $$("#nodes .node").forEach(el=>{
    const visualKey=el.dataset.instance||el.dataset.key||el.dataset.node;
    const hit=set.has(visualKey)||set.has(el.dataset.node);
    el.classList.add(hit?"director-focus":"director-dim");
    if(anchor===visualKey||anchor===el.dataset.node)el.classList.add("director-anchor");
  });
  const edgeSet=new Set((edges||[]).map(e=>e.source+"→"+e.target));
  $$("#edges .edge").forEach(el=>{
    const key=el.dataset.source+"→"+el.dataset.target;
    const rev=el.dataset.target+"→"+el.dataset.source;
    const hit=edgeSet.has(key)||(el.classList.contains("bidirectional")&&edgeSet.has(rev));
    el.classList.add(hit?"director-edge-focus":"director-edge-dim");
  });
  if(anchor&&nodeById.has(anchor)){activeNode=anchor;showDetails(anchor)}
  else if(ids[0]){activeNode=ids[0];showDetails(ids[0])}
  focusGraphOnNodes(ids);
}
function directorPath(ids){
  const nodes=(ids||[]).filter(Boolean);
  if(nodes.length<2)throw new Error(lang==="ru"?"PATH требует минимум две ноды.":"PATH requires at least two nodes.");
  const bad=nodes.filter(id=>!nodeById.has(id));
  if(bad.length)throw new Error((lang==="ru"?"Неизвестные ноды: ":"Unknown nodes: ")+bad.join(", "));
  const edges=[];
  for(let i=0;i<nodes.length-1;i++){
    const source=nodes[i],target=nodes[i+1];
    if(!directorEdgeExists(source,target))throw new Error((lang==="ru"?"В HBBA нет направленной связи: ":"HBBA has no directed edge: ")+source+" → "+target);
    edges.push({source,target});
  }
  directorFocus(nodes,edges,nodes[Math.min(1,nodes.length-1)]);
}
function directorResume(){
  clearDirectorClasses();directorActive=false;
  if(directorResumeState?.tourActive&&guidedTourSteps.length){
    guidedTourIndex=Math.max(0,Math.min(guidedTourSteps.length-1,directorResumeState.tourIndex||0));
    guidedTourActive=true;guidedTourOverview=!!directorResumeState.tourOverview;
    renderGuidedTourPanel();
    if(guidedTourOverview)showGuidedTourOverview(); else goGuidedTourStep(guidedTourIndex);
  }else{
    guidedTourActive=false;renderGuidedTourPanel();applyScenarioVisuals();fit();
  }
  directorResumeState=null;
}
function directorClear(){
  clearDirectorClasses();directorActive=false;directorResumeState=null;applyScenarioVisuals();
}
function parseDirectorCommand(text){
  const raw=String(text||"").trim();
  if(!raw)throw new Error(lang==="ru"?"Вставьте команду.":"Paste a command.");
  if(raw.startsWith("{")){
    const o=JSON.parse(raw),act=String(o.action||"").toLowerCase();
    if(act==="focus_path")return {type:"path",nodes:o.nodes||[]};
    if(act==="focus_nodes")return {type:"focus",nodes:o.nodes||[],anchor:o.focus||null};
    if(act==="show_node")return {type:"node",id:o.id};
    if(act==="tour_next")return {type:"next"};
    if(act==="tour_prev")return {type:"back"};
    if(act==="tour_go")return {type:"step",step:o.step};
    if(act==="overview"||act==="show_all")return {type:"overview"};
    if(act==="resume_tour")return {type:"resume"};
    if(act==="clear_focus")return {type:"clear"};
    throw new Error(lang==="ru"?"Неизвестное поле action.":"Unknown action.");
  }
  const m=raw.match(/^HBBA\s*:\s*([A-Z_]+)(?:\s+([\s\S]*))?$/i);
  if(!m)throw new Error(lang==="ru"?"Формат команды не распознан. Используйте HBBA:PATH ..., HBBA:NODE ..., HBBA:STEP N.":"Command format not recognized.");
  const cmd=m[1].toUpperCase(),arg=(m[2]||"").trim();
  if(cmd==="PATH")return {type:"path",nodes:arg.split(/\s*>\s*/).filter(Boolean)};
  if(cmd==="FOCUS")return {type:"focus",nodes:arg.split(/[\s,]+/).filter(Boolean)};
  if(cmd==="NODE")return {type:"node",id:arg};
  if(cmd==="STEP")return {type:"step",step:Number(arg)};
  if(cmd==="NEXT")return {type:"next"};
  if(cmd==="BACK"||cmd==="PREV")return {type:"back"};
  if(cmd==="OVERVIEW"||cmd==="ALL")return {type:"overview"};
  if(cmd==="RESUME")return {type:"resume"};
  if(cmd==="CLEAR")return {type:"clear"};
  throw new Error((lang==="ru"?"Неизвестная команда: ":"Unknown command: ")+cmd);
}
function runDirectorCommand(text){
  const c=parseDirectorCommand(text);
  if(c.type==="path")directorPath(c.nodes);
  else if(c.type==="focus")directorFocus(c.nodes,[],c.anchor||c.nodes?.[0]||null);
  else if(c.type==="node"){
    if(!nodeById.has(c.id)&&!scenarioResolveInstance(c.id))throw new Error((lang==="ru"?"Неизвестная нода/экземпляр: ":"Unknown node/instance: ")+c.id);
    directorFocus([c.id],[],c.id);
  }
  else if(c.type==="step"){
    if(!guidedTourSteps.length)throw new Error(lang==="ru"?"В текущем сценарии нет экскурсии.":"Current scenario has no tour.");
    clearDirectorClasses();directorActive=false;goGuidedTourStep(Math.max(0,Number(c.step||1)-1));
  }
  else if(c.type==="next"){
    if(!guidedTourSteps.length)throw new Error(lang==="ru"?"В текущем сценарии нет экскурсии.":"Current scenario has no tour.");
    clearDirectorClasses();directorActive=false;goGuidedTourStep(Math.min(guidedTourSteps.length-1,guidedTourIndex+1));
  }
  else if(c.type==="back"){
    if(!guidedTourSteps.length)throw new Error(lang==="ru"?"В текущем сценарии нет экскурсии.":"Current scenario has no tour.");
    clearDirectorClasses();directorActive=false;goGuidedTourStep(Math.max(0,guidedTourIndex-1));
  }
  else if(c.type==="overview"){clearDirectorClasses();directorActive=false;showGuidedTourOverview()}
  else if(c.type==="resume")directorResume();
  else if(c.type==="clear")directorClear();
  return c;
}
function edgeEvidenceLabel(v){
  if(lang==="ru")return ({high:"выше",moderate:"средне",exploratory:"исследовательская гипотеза"})[v]||v;
  return ({high:"higher",moderate:"moderate",exploratory:"exploratory hypothesis"})[v]||v;
}
function auditBool(v){return v===true?(lang==="ru"?"да":"yes"):v===false?(lang==="ru"?"нет":"no"):"—"}
function showEdgeAudit(source,target){
  const e=edgeByKey.get(source+"→"+target);if(!e)return;
  const a=nodeById.get(source),b=nodeById.get(target),an=a?.name?.[lang]||source,bn=b?.name?.[lang]||target,g=edgeAuditGrade(e),pending=(e.audit_status||"pending")!=="audited",reviewedX=g==="X"&&!pending;
  const relation=edgeRelationType(e),relLabel=relationLabel(e),relMeaning=relationMeaning(e);
  $("#edgeAuditTitle").textContent=`${an} → ${bn}`;
  const srcs=Array.isArray(e.sources)?e.sources:[];
  const priorCard=`<div class="edge-audit-card muted"><span class="k">${lang==="ru"?"Внутренний working_prior":"Internal working_prior"}</span><b>${lang==="ru"?"НЕ ПОКАЗЫВАЕТСЯ КАК EVIDENCE":"NOT SHOWN AS EVIDENCE"}</b></div>`;
  $("#edgeAuditBody").innerHTML=`<div class="edge-audit-route"><span class="edge-node">${esc(an)}</span><span class="arrow">→</span><span class="edge-node">${esc(bn)}</span></div>
    <div class="relation-explainer relation-${esc(relation)}"><b>${esc(relLabel)}</b><span>${esc(relMeaning)}</span></div>
    <div class="edge-audit-grid">
      <div class="edge-audit-card"><span class="k">RELATION TYPE</span><b>${esc(relation)}</b></div>
      <div class="edge-audit-card"><span class="k">AUDIT GRADE</span><b><span class="edge-audit-grade">${g}</span></b></div>
      <div class="edge-audit-card"><span class="k">${lang==="ru"?"Статус аудита":"Audit status"}</span><b>${esc(e.audit_status||"pending")}</b></div>
      ${priorCard}
      <div class="edge-audit-card"><span class="k">${lang==="ru"?"Причинность":"Causal status"}</span><b>${esc(e.causal_status||"not_audited")}</b></div>
      <div class="edge-audit-card"><span class="k">HUMAN</span><b>${auditBool(e.human_evidence)}</b></div>
      <div class="edge-audit-card"><span class="k">META-ANALYSIS</span><b>${auditBool(e.meta_analysis)}</b></div>
      <div class="edge-audit-card"><span class="k">SOURCE ID</span><b>${esc(source)}</b></div>
      <div class="edge-audit-card"><span class="k">TARGET ID</span><b>${esc(target)}</b></div>
    </div>
    ${e.grade_rationale?.[lang]?`<div class="edge-audit-pending"><b>${lang==="ru"?"Почему такой grade":"Grade rationale"}:</b> ${esc(e.grade_rationale[lang])}</div>`:""}
    ${srcs.length?`<div class="edge-audit-sources">${srcs.map(x=>`<div class="edge-source-record"><b>${esc((x.supports_relation||"source").toUpperCase())}</b>${x.url?`<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.title||x.doi||x.pmid||x.url)} ↗</a>`:`<span>${esc(x.title||x.doi||x.pmid||JSON.stringify(x))}</span>`}${x.doi?`<small>DOI ${esc(x.doi)}</small>`:""}${x.pmid?`<small>PMID ${esc(x.pmid)}</small>`:""}</div>`).join("")}</div>`:""}
    ${Array.isArray(e.limitations)&&e.limitations.length?`<div class="edge-audit-pending"><b>${lang==="ru"?"Ограничения":"Limitations"}:</b><ul>${e.limitations.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`:""}
    <div class="edge-audit-pending"><b>${lang==="ru"?"Статус доказательности":"Evidence status"}:</b> ${pending?(lang==="ru"?"Pending: эта конкретная связь ещё не прошла содержательный review.":"Pending: this exact relation has not passed substantive review."):reviewedX?(lang==="ru"?"Reviewed X: содержательный review выполнен, но evidence недостаточно или typed claim остаётся слишком широким. X не является подтверждением.":"Reviewed X: substantive review was completed, but evidence is insufficient or the typed claim remains too broad. X is not confirmation."):(lang==="ru"?"Reviewed edge. Grade относится только к этой typed edge; evidence/epistemic boundary: INDEPENDENTLY ACCEPTED at v0.7.0.24. Это не behavioral-effectiveness verdict.":"Reviewed edge. The grade applies only to this typed edge; evidence/epistemic boundary: INDEPENDENTLY ACCEPTED at v0.7.0.24. This is not a behavioral-effectiveness verdict.")}</div>
    <div class="edge-audit-caveat">${lang==="ru"?"Тип линии задаёт семантику отношения. Даже Grade A для associated_with не превращает ассоциацию в причинную цепочку и не разрешает reverse inference о конкретном человеке.":"The line type defines relation semantics. Even Grade A for associated_with does not turn association into a causal chain or license reverse inference about an individual."}</div>`;
  $("#edgeAuditDialog").showModal();
}
function showInteractionAudit(source,target,relation,reason){
  const s=scenarioResolveInstance(source),t=scenarioResolveInstance(target),sa=scenarioActorMap(activeScenario).get(s?.actor),ta=scenarioActorMap(activeScenario).get(t?.actor);
  $("#edgeAuditTitle").textContent=`${sa?.name||source} ⇢ ${ta?.name||target}`;
  $("#edgeAuditBody").innerHTML=`<div class="edge-audit-route"><span class="edge-node">${esc(source)}</span><span class="arrow">⇢</span><span class="edge-node">${esc(target)}</span></div><div class="edge-audit-pending"><b>${lang==="ru"?"Сценарная связь":"Scenario interaction"}:</b> ${esc(relation||"interaction")}</div>${reason?`<div class="edge-audit-caveat">${esc(reason)}</div>`:""}<div class="edge-audit-caveat"><b>${lang==="ru"?"Важно":"Important"}:</b> ${lang==="ru"?"Пунктирная связь соединяет участников конкретной ситуации и не считается базовым научным ребром онтологии HBBA.":"A dashed interaction connects actors in this specific scenario and is not a base scientific ontology edge."}</div>`;
  $("#edgeAuditDialog").showModal();
}

function renderEvidenceUI(){
  const st=auditedEdgeStats(),btn=$("#evidenceBtn"),badge=$("#evidenceCountBadge");if(badge)badge.textContent=`${st.audited}/${st.total}`;btn?.classList.toggle("has-audit",st.audited>0);
  const box=$("#evidenceStats");if(box)box.innerHTML=`<b>${lang==="ru"?"Аудировано":"Audited"}: ${st.audited}/${st.total}</b> · A ${st.by.A} · B ${st.by.B} · C ${st.by.C} · D ${st.by.D} · X ${st.by.X}<br>${lang==="ru"?"A/B/C/D/X = редакционный статус конкретной стрелки HBBA; X означает reviewed-but-insufficient/underspecified. Это не вероятность, не clinical GRADE и не individual inference. Evidence/epistemic boundary: INDEPENDENTLY ACCEPTED (v0.7.0.24); это не behavioral-effectiveness PASS.":"A/B/C/D/X = an HBBA editorial status for this edge; X means reviewed-but-insufficient/underspecified. It is not a probability, not clinical GRADE, and not individual inference. Evidence/epistemic boundary: INDEPENDENTLY ACCEPTED (v0.7.0.24); this is not a behavioral-effectiveness PASS."}`;
  $$('[data-evidence-grade]').forEach(ch=>ch.checked=evidenceGradesVisible.has(ch.dataset.evidenceGrade));const inter=$("#showInteractionsCheck");if(inter)inter.checked=showScenarioInteractions;
}
function existingDirectedEdge(a,b){
  return D.edges.some(e=>e.source===a&&e.target===b);
}
function validateOntologySemantics(){
  const errors=[],warnings=[],allowed=new Set(Object.keys(D.relation_meta||{}));
  const systemTypes=new Set(["network","network_family","distributed_system","circuit_family","neural_system"]);
  for(const e of D.edges){
    const s=nodeById.get(e.source),t=nodeById.get(e.target),r=edgeRelationType(e),key=`${e.source} → ${e.target}`;
    if(!s||!t){errors.push(`Missing node in edge: ${key}`);continue}
    if(!allowed.has(r))errors.push(`Unknown relation_type ${r}: ${key}`);
    if(e.audit_grade==="X"&&e.audit_status==="audited"&&(!e.x_reason||e.graph_decision!=="RETAIN_AS_UNRESOLVED_X"))errors.push(`Reviewed Grade X requires x_reason and RETAIN_AS_UNRESOLVED_X: ${key}`);
    if(r==="participates_in" && !(s.type==="region"&&t.type==="network"))errors.push(`participates_in is reserved for region → canonical network: ${key}`);
    if(r==="component_of" && !(s.analysis_layer==="neural"&&["distributed_system","circuit_family","network_family","neural_system"].includes(t.type)))errors.push(`component_of must map a neural component → distributed system/circuit family: ${key}`);
    if(r==="implemented_by" && !["neural","physiology"].includes(t.analysis_layer))errors.push(`implemented_by target must be an implementation layer: ${key}`);
    if(r==="requires_motor_output" && !(s.analysis_layer==="observed"&&s.type==="motor"&&t.analysis_layer==="physiology"))errors.push(`requires_motor_output must be observable action → physiology/motor output: ${key}`);
    if(r==="produces_output" && !["observed","physiology"].includes(t.analysis_layer))errors.push(`produces_output target must be observed/physiology: ${key}`);
    if(r==="updates"){
      if(s.analysis_layer!=="learning")errors.push(`updates source must be learning layer: ${key}`);
      if(e.temporal_scope!=="across_trial"&&e.temporal_scope!=="long_term")errors.push(`updates must carry across-time temporal_scope: ${key}`);
    }
    if(systemTypes.has(s.type)&&t.type==="region"&&!["associated_with"].includes(r))errors.push(`Neural system → region cannot be represented as a causal/membership arrow: ${key}`);
    if(s.type==="region"&&["cognitive","social_cog","control","affect","motivation","regulatory","strategy"].includes(t.type)&&r!=="associated_with")errors.push(`Region → psychological function must be noncausal association, not ${r}: ${key}`);
  }
  const peInputs=D.edges.filter(e=>e.target==="learn_pe"&&edgeRelationType(e)==="computational_input");
  if(!peInputs.some(e=>e.source==="cog_prediction"&&e.computation_role==="expectation_input"))errors.push("Prediction error catalog is missing expectation_input from cog_prediction.");
  if(!peInputs.some(e=>e.source==="out_reward"&&e.computation_role==="actual_outcome_value_input"))errors.push("Prediction error catalog is missing actual_outcome_value_input from out_reward.");
  if(D.help_meta?.must_match_app_version&&D.help_meta.version!==D.version)errors.push(`Help/Legend version mismatch: ${D.help_meta?.version} != ${D.version}`);
  const duplicates=new Set();
  for(const e of D.edges){const k=`${e.source}|${e.target}|${edgeRelationType(e)}`;if(duplicates.has(k))errors.push(`Duplicate typed edge: ${k}`);duplicates.add(k)}
  for(const r of new Set(D.edges.map(edgeRelationType))){if(!D.relation_meta?.[r]?.ru?.meaning||!D.relation_meta?.[r]?.en?.meaning)errors.push(`Missing RU/EN help for relation: ${r}`)}
  return {ok:errors.length===0,errors,warnings,total:D.edges.length,used_relation_types:[...new Set(D.edges.map(edgeRelationType))]};
}

function normalizeScenarioCompat(raw){
  // v0.6.4.3: forbidden raw Cc/Cf/invisible characters are rejected BEFORE
  // any trim/canonicalization can erase them. Safe IDs may be NFC/space-normalized.
  // Compatibility normalization may GENERATE a missing instance_id, but an
  // explicitly supplied semantically conflicting instance_id is never silently rewritten to actor:node_id.
  const rawIdErrors=[];
  for(const {value,path} of scenarioIdFields(raw||{})){
    if(typeof value==="string"&&idHasForbiddenUnicode(value)){
      rawIdErrors.push(`${lang==="ru"?"Исходный ID содержит запрещённый Unicode control/format/invisible символ":"Raw ID contains a forbidden Unicode control/format/invisible character"}: ${path}`);
    }
  }
  const obj=JSON.parse(JSON.stringify(raw||{})),conversions=[];
  const norm=(holder,key,path)=>{if(holder&&typeof holder[key]==="string"){const before=holder[key];if(idHasForbiddenUnicode(before))return;const after=canonicalId(before);if(before!==after){holder[key]=after;conversions.push(`canonicalized ${path}`)}}};
  const normIdValue=x=>typeof x==="string"&&!idHasForbiddenUnicode(x)?canonicalId(x):x;
  if(Array.isArray(obj.behaviors))obj.behaviors=obj.behaviors.map(normIdValue);
  for(const [i,a] of (obj.actors||[]).entries())norm(a,"id",`actors[${i}].id`);
  for(const [i,o] of (obj.observations||[]).entries()){norm(o,"id",`observations[${i}].id`);norm(o,"actor",`observations[${i}].actor`);if(Array.isArray(o.observed_node_ids))o.observed_node_ids=o.observed_node_ids.map(normIdValue)}
  for(const [i,n] of (obj.active_nodes||[]).entries()){
    const rawActor=n.actor,rawNode=n.node_id,rawInstance=n.instance_id;
    const hadInstance=Object.prototype.hasOwnProperty.call(n,"instance_id")&&n.instance_id!==undefined&&n.instance_id!==null&&n.instance_id!=="";
    const rawIdentityComparable=hadInstance&&typeof rawActor==="string"&&typeof rawNode==="string"&&typeof rawInstance==="string"&&!idHasForbiddenUnicode(rawActor)&&!idHasForbiddenUnicode(rawNode)&&!idHasForbiddenUnicode(rawInstance);
    // v0.6.4.3: explicit identity is checked BEFORE destructive outer-space trimming.
    // Safe NFC equivalence is allowed, but an explicit instance_id may not acquire
    // consistency merely because trim() erased leading/trailing spaces from it.
    const rawIdentityConsistent=rawIdentityComparable&&rawInstance.normalize("NFC")===`${rawActor.normalize("NFC")}:${rawNode.normalize("NFC")}`;
    if(rawIdentityComparable&&!rawIdentityConsistent){
      rawIdErrors.push(`${lang==="ru"?"Явно заданный instance_id противоречит исходным actor:node_id и не может быть исправлен нормализацией":"Explicit instance_id contradicts the raw actor:node_id identity and cannot be repaired by normalization"}: active_nodes[${i}].instance_id`);
    }
    // Canonicalize actor/node/id first. instance_id is handled separately so a raw
    // semantic conflict can never disappear before validation.
    for(const k of ["id","node_id","actor"])norm(n,k,`active_nodes[${i}].${k}`);
    if(n.actor&&n.node_id){
      const expected=`${n.actor}:${n.node_id}`;
      if(!hadInstance){
        n.instance_id=expected;
        conversions.push(`generated missing active_nodes[${i}].instance_id`);
      }else if(rawIdentityConsistent){
        n.instance_id=expected;
        if(rawInstance!==expected)conversions.push(`canonicalized semantically consistent active_nodes[${i}].instance_id`);
      }
      // On raw semantic conflict, preserve the explicit raw value. The public
      // validation result already contains a raw identity error and strict
      // canonical/identity checks can report additional detail.
    }
    if(Array.isArray(n.based_on))n.based_on=n.based_on.map(normIdValue);
    if(n.temporal_context){norm(n.temporal_context,"episode_id",`active_nodes[${i}].temporal_context.episode_id`);norm(n.temporal_context,"trial_id",`active_nodes[${i}].temporal_context.trial_id`)}
    if(n.measurement){for(const k of ["measurement_id","subject_actor","measured_node_id","episode_id","trial_id","computation_id"])norm(n.measurement,k,`active_nodes[${i}].measurement.${k}`)}
  }
  for(const [i,e] of (obj.active_edges||[]).entries()){norm(e,"source",`active_edges[${i}].source`);norm(e,"target",`active_edges[${i}].target`)}
  for(const [i,e] of (obj.interaction_links||[]).entries()){norm(e,"source",`interaction_links[${i}].source`);norm(e,"target",`interaction_links[${i}].target`)}
  for(const key of ["supports_observation_ids","contradicts_observation_ids","inference_claim_keys"])if(Array.isArray(obj[key]))obj[key]=obj[key].map(normIdValue);
  for(const [i,t] of (obj.tour_steps||[]).entries()){norm(t,"id",`tour_steps[${i}].id`);norm(t,"look_at",`tour_steps[${i}].look_at`);norm(t,"focus_node",`tour_steps[${i}].focus_node`);if(Array.isArray(t.nodes))t.nodes=t.nodes.map(normIdValue);for(const e of (t.edges||[])){norm(e,"source",`tour_steps[${i}].edges.source`);norm(e,"target",`tour_steps[${i}].edges.target`)}}
  return {obj,conversions,rawIdErrors};
}

const SCENARIO_INFERENCE_STATUSES=new Set(["observations_consistent_with_model","ambiguous","insufficient_data","contradicted_by_observation"]);
const CLAIM_SCOPE_MATRIX={
  context:new Set(["observed"]),
  observed:new Set(["observed"]),
  psychological:new Set(["individual_hypothesis","measurement_supported"]),
  neural:new Set(["general_implementation","measurement_supported"]),
  physiology:new Set(["model_mapping","measurement_supported"]),
  learning:new Set(["individual_hypothesis","model_mapping","measurement_supported"])
};
function nodeScenarioLayer(id){return nodeById.get(id)?.analysis_layer||"psychological"}
function isHiddenScenarioLayer(layer){return ["psychological","neural","physiology","learning"].includes(layer)}
const OBSERVATION_KINDS=new Set(["direct_observation","self_report","measurement_record","documented_event","task_result","documented_context"]);
const DEPRECATED_IMPORT_FIELDS=new Set(["confidence","group_compatible","environment_compatible","system_compatible","global_outcome","global_implementation"]);
function canonicalId(x){
  if(typeof x!=="string")return "";
  return x.normalize("NFC").trim();
}
function idHasForbiddenUnicode(x){
  return typeof x!=="string"||/[\p{Cc}\p{Cf}]/u.test(x);
}
function isCanonicalId(x){
  return typeof x==="string"&&x.length>0&&x===x.trim()&&x===x.normalize("NFC")&&!idHasForbiddenUnicode(x);
}
function scenarioIdFields(obj){
  const out=[],add=(value,path)=>{if(value!==undefined&&value!==null)out.push({value,path})},addArray=(arr,path)=>{if(Array.isArray(arr))arr.forEach((v,i)=>add(v,`${path}[${i}]`))};
  addArray(obj?.behaviors,"behaviors");
  (obj?.actors||[]).forEach((a,i)=>add(a?.id,`actors[${i}].id`));
  (obj?.observations||[]).forEach((o,i)=>{add(o?.id,`observations[${i}].id`);add(o?.actor,`observations[${i}].actor`);addArray(o?.observed_node_ids,`observations[${i}].observed_node_ids`)});
  (obj?.active_nodes||[]).forEach((n,i)=>{for(const k of ["id","instance_id","node_id","actor"])add(n?.[k],`active_nodes[${i}].${k}`);addArray(n?.based_on,`active_nodes[${i}].based_on`);if(n?.temporal_context){add(n.temporal_context.episode_id,`active_nodes[${i}].temporal_context.episode_id`);add(n.temporal_context.trial_id,`active_nodes[${i}].temporal_context.trial_id`)}if(n?.measurement){for(const k of ["measurement_id","subject_actor","measured_node_id","episode_id","trial_id","computation_id"])add(n.measurement[k],`active_nodes[${i}].measurement.${k}`)}});
  (obj?.active_edges||[]).forEach((e,i)=>{add(e?.source,`active_edges[${i}].source`);add(e?.target,`active_edges[${i}].target`)});
  (obj?.interaction_links||[]).forEach((e,i)=>{add(e?.source,`interaction_links[${i}].source`);add(e?.target,`interaction_links[${i}].target`)});
  addArray(obj?.supports_observation_ids,"supports_observation_ids");addArray(obj?.contradicts_observation_ids,"contradicts_observation_ids");addArray(obj?.inference_claim_keys,"inference_claim_keys");
  (obj?.tour_steps||[]).forEach((t,i)=>{add(t?.id,`tour_steps[${i}].id`);add(t?.look_at,`tour_steps[${i}].look_at`);add(t?.focus_node,`tour_steps[${i}].focus_node`);addArray(t?.nodes,`tour_steps[${i}].nodes`);(t?.edges||[]).forEach((e,j)=>{add(e?.source,`tour_steps[${i}].edges[${j}].source`);add(e?.target,`tour_steps[${i}].edges[${j}].target`)})});
  return out;
}
function validateAllScenarioIds(obj,err){for(const {value,path} of scenarioIdFields(obj))if(!isCanonicalId(value))err(`${lang==="ru"?"ID должен быть Unicode NFC, без внешних пробелов и невидимых/control символов":"ID must be Unicode NFC, without surrounding whitespace or invisible/control characters"}: ${path}`)}
function nonBlankArray(v){return Array.isArray(v)&&v.length>0&&v.every(x=>typeof x==="string"&&x.trim().length>0)}
function uniqueNonBlankArray(v){return nonBlankArray(v)&&new Set(v).size===v.length&&v.every(isCanonicalId)}
function validIsoTimestamp(x){
  if(typeof x!=="string"||x!==x.trim()||!x)return false;
  const m=x.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(Z|[+-]\d{2}:\d{2})$/);
  if(!m)return false;
  const y=Number(m[1]),mo=Number(m[2]),d=Number(m[3]),hh=Number(m[4]),mm=Number(m[5]),ss=Number(m[6]);
  if(mo<1||mo>12||d<1||hh>23||mm>59||ss>59)return false;
  const days=new Date(Date.UTC(y,mo,0)).getUTCDate();if(d>days)return false;
  const zone=m[8];if(zone!=="Z"){const zh=Number(zone.slice(1,3)),zm=Number(zone.slice(4,6));if(zh>23||zm>59)return false;}
  return Number.isFinite(Date.parse(x));
}
function measurementContract(modality){return D.measurement_registry?.[modality]||null}
function modalityCompatible(nodeId,layer,modality){
  const c=measurementContract(modality);if(!c)return false;
  if(Array.isArray(c.compatible_nodes)&&c.compatible_nodes.includes(nodeId))return true;
  return Array.isArray(c.compatible_layers)&&c.compatible_layers.includes(layer);
}
function measurementSourceCompatible(contract,sourceType,provenance){return !!contract?.sources?.[sourceType]?.includes(provenance)}
function measurementPayloadErrors(m,contract,key){
  const errors=[],ru=lang==="ru";
  const hasValue=Object.prototype.hasOwnProperty.call(m,"value"),hasResult=Object.prototype.hasOwnProperty.call(m,"result");
  if(hasValue&&typeof m.value!=="number")errors.push(`${ru?"measurement value должен быть конечным числом; текстовые/boolean значения запрещены":"measurement value must be a finite number; string/boolean values are not allowed"}: ${key}`);
  if(hasValue&&(!Number.isFinite(m.value)))errors.push(`${ru?"measurement value должен быть finite":"measurement value must be finite"}: ${key}`);
  if(hasResult&&(typeof m.result!=="string"||!m.result.trim()))errors.push(`${ru?"measurement result должен быть непустой строкой":"measurement result must be a non-empty string"}: ${key}`);
  if(contract?.payload==="number"&&!hasValue)errors.push(`${ru?"эта modality требует числовой value":"this modality requires numeric value"}: ${key}`);
  if(contract?.payload==="number"&&hasResult)errors.push(`${ru?"эта modality не принимает qualitative result вместо числа":"this modality does not accept a qualitative result instead of a number"}: ${key}`);
  if(contract?.payload==="result_or_number"&&!hasValue&&!hasResult)errors.push(`${ru?"measurement требует numeric value или qualitative result":"measurement requires numeric value or qualitative result"}: ${key}`);
  if(contract?.payload==="result_or_number"&&hasValue&&hasResult)errors.push(`${ru?"measurement result_or_number требует ровно одно поле: value XOR result":"measurement result_or_number requires exactly one field: value XOR result"}: ${key}`);
  if(hasValue){
    if(typeof m.unit!=="string"||!m.unit.trim())errors.push(`${ru?"числовое measurement требует unit":"numeric measurement requires unit"}: ${key}`);
    else if(Array.isArray(contract?.units)&&contract.units.length&&!contract.units.includes(m.unit))errors.push(`${ru?"unit несовместим с modality":"unit is incompatible with modality"}: ${m.unit} @ ${key}`);
    if(Array.isArray(contract?.range)&&contract.range.length===2&&Number.isFinite(m.value)&&(m.value<contract.range[0]||m.value>contract.range[1]))errors.push(`${ru?"measurement value вне допустимого sanity-range":"measurement value is outside the allowed sanity range"}: ${m.value} @ ${key}`);
  }
  return errors;
}
function measurementValidation(item,key,actors){
  const errors=[],ru=lang==="ru",m=item?.measurement,base=scenarioNodeBaseId(item),layer=nodeScenarioLayer(base);
  if(!m||typeof m!=="object"||Array.isArray(m)){errors.push(`${ru?"measurement_supported требует объект measurement":"measurement_supported requires a measurement object"}: ${key}`);return errors}
  for(const f of ["measurement_id","subject_actor","measured_node_id","episode_id","modality","timestamp","source_type","provenance"]){if(!isCanonicalId(m[f]))errors.push(`${ru?"measurement требует непустое каноническое поле":"measurement requires a non-empty canonical field"} ${f}: ${key}`)}
  for(const f of ["trial_id","computation_id"]){if(m[f]!==undefined&&!isCanonicalId(m[f]))errors.push(`${ru?"measurement id-поле содержит пробелы/пустое значение":"measurement id field contains whitespace/blank value"} ${f}: ${key}`)}
  const contract=measurementContract(m.modality);
  if(!contract)errors.push(`${ru?"неподдерживаемая modality":"unsupported modality"}: ${key} = ${m.modality}`);
  if(contract&&!measurementSourceCompatible(contract,m.source_type,m.provenance))errors.push(`${ru?"несовместимая комбинация modality × source_type × provenance":"incompatible modality × source_type × provenance combination"}: ${m.modality} × ${m.source_type} × ${m.provenance}`);
  if(m.timestamp&&!validIsoTimestamp(m.timestamp))errors.push(`${ru?"measurement timestamp должен быть ISO date-time":"measurement timestamp must be an ISO date-time"}: ${key}`);
  if(contract)errors.push(...measurementPayloadErrors(m,contract,key));
  if(m.measured_node_id&&m.measured_node_id!==base)errors.push(`${ru?"measurement measured_node_id не совпадает с claim node":"measurement measured_node_id does not match claim node"}: ${m.measured_node_id} ≠ ${base}`);
  if(m.modality&&!modalityCompatible(base,layer,m.modality))errors.push(`${ru?"modality несовместима с измеряемой нодой":"modality is incompatible with the measured node"}: ${m.modality} → ${base}`);
  if(item.actor){if(m.subject_actor!==item.actor)errors.push(`${ru?"measurement subject_actor не совпадает с actor ноды":"measurement subject_actor does not match the node actor"}: ${key}`)}
  else if(Array.isArray(actors)&&actors.length&&m.subject_actor&&!actors.some(a=>a.id===m.subject_actor))errors.push(`${ru?"measurement ссылается на неизвестного actor":"measurement references unknown actor"}: ${key} = ${m.subject_actor}`);
  const tc=item?.temporal_context;
  if(!tc||typeof tc!=="object"||!isCanonicalId(tc.episode_id)||!["within_episode","across_trial","long_term"].includes(tc.time_scope))errors.push(`${ru?"measurement-supported claim требует temporal_context {episode_id,time_scope[,trial_id]}":"measurement-supported claim requires temporal_context {episode_id,time_scope[,trial_id]}"}: ${key}`);
  else{
    if(m.episode_id!==tc.episode_id)errors.push(`${ru?"measurement и claim должны иметь один episode_id":"measurement and claim must share the same episode_id"}: ${m.episode_id} ≠ ${tc.episode_id}`);
    const mt=m.trial_id||"",ct=tc.trial_id||"";if(mt!==ct)errors.push(`${ru?"measurement и claim должны иметь один trial_id":"measurement and claim must share the same trial_id"}: ${mt||"—"} ≠ ${ct||"—"}`);
  }
  if(contract?.trial_required&&(!isCanonicalId(m.trial_id)||!isCanonicalId(tc?.trial_id)))errors.push(`${ru?"эта modality требует trial_id в measurement и temporal_context":"this modality requires trial_id in both measurement and temporal_context"}: ${key}`);
  if(contract?.computation_id_required&&!isCanonicalId(m.computation_id))errors.push(`${ru?"эта modality требует computation_id":"this modality requires computation_id"}: ${key}`);
  return errors;
}
function nodeIsObservableEndpoint(item){const layer=nodeScenarioLayer(scenarioNodeBaseId(item));return item?.claim_scope==="observed"&&["observed","context"].includes(layer)}
function nodeIsContextEndpoint(item){return item?.claim_scope==="observed"&&nodeScenarioLayer(scenarioNodeBaseId(item))==="context"}
function nodeIsObservedAction(item){const n=nodeById.get(scenarioNodeBaseId(item));return item?.claim_scope==="observed"&&n?.analysis_layer==="observed"&&n?.type==="motor"}
function actorCanOwn(actor,node){
  if(!actor)return true;
  if(actor.type==="person")return true;
  return node?.analysis_layer==="context";
}
function isGlobalScenarioItem(item){
  if(!item||item.actor)return false;const layer=nodeScenarioLayer(scenarioNodeBaseId(item));
  // Scenario-level actorless items are intentionally narrow. General neural implementation
  // may describe a framework-level mapping; person-specific physiology/learning mappings
  // require actor ownership in multi-actor scenarios and belong to the base ontology when generic.
  if(layer==="context"&&item.claim_scope==="observed")return true;
  if(layer==="neural"&&item.claim_scope==="general_implementation")return true;
  return false;
}
function scenarioClaimScopeLabel(scope){
  const ru=lang==="ru";
  const map={observed:ru?"наблюдаемая структура":"observed structure",individual_hypothesis:ru?"индивидуальная гипотеза":"individual hypothesis",general_implementation:ru?"общая реализация":"general implementation",model_mapping:ru?"модельное отображение":"model mapping",measurement_supported:ru?"поддержано измерением":"measurement-supported"};
  return map[scope]||scope;
}
function narrativeIsUnvalidated(){return true}
function validateScenarioObject(obj){
  const errors=[],warnings=[],err=x=>errors.push(x),warn=x=>warnings.push(x);
  if(!obj||typeof obj!=="object"||Array.isArray(obj))err(lang==="ru"?"Корень должен быть JSON-объектом.":"Root must be a JSON object.");
  if(obj&&typeof obj==="object"&&!Array.isArray(obj))validateAllScenarioIds(obj,err);
  if(obj?.format!=="HBBA-SCENARIO-3")err(lang==="ru"?"Scientific/Public mode v0.7.0.28 принимает только HBBA-SCENARIO-3. SCENARIO-1/2 сначала явно мигрируйте через Guided Session MASTER Prompt.":"Scientific/Public mode v0.7.0.28 accepts only HBBA-SCENARIO-3. Explicitly migrate SCENARIO-1/2 through the Guided Session MASTER Prompt first.");
  if(!obj?.title||typeof obj.title!=="string"||!obj.title.trim())err(lang==="ru"?"Отсутствует title.":"Missing title.");
  if(!obj?.summary||typeof obj.summary!=="string"||!obj.summary.trim())err(lang==="ru"?"Отсутствует summary.":"Missing summary.");
  const inferenceStatus=obj?.inference_status;
  if(!SCENARIO_INFERENCE_STATUSES.has(inferenceStatus))err(lang==="ru"?"SCENARIO-3 требует inference_status: observations_consistent_with_model | ambiguous | insufficient_data | contradicted_by_observation.":"SCENARIO-3 requires inference_status: observations_consistent_with_model | ambiguous | insufficient_data | contradicted_by_observation.");
  for(const field of ["behaviors","observations","active_nodes","active_edges","alternatives","unknowns"]){if(!Array.isArray(obj?.[field]))err(`${lang==="ru"?"Обязательное поле должно быть массивом":"Required field must be an array"}: ${field}`)}
  const behaviorIds=new Set(D.behaviors.map(b=>b.id)),nodeIds=new Set(D.nodes.map(n=>n.id));
  const behaviors=Array.isArray(obj?.behaviors)?obj.behaviors:[],behaviorSeen=new Set();
  for(const id of behaviors){if(!behaviorIds.has(id))err(`${lang==="ru"?"Неизвестное поведение":"Unknown behavior"}: ${id}`);if(behaviorSeen.has(id))err(`${lang==="ru"?"Повторяющееся поведение":"Duplicate behavior"}: ${id}`);behaviorSeen.add(id)}

  const actors=Array.isArray(obj?.actors)?obj.actors:[],actorIds=new Set();
  for(let i=0;i<actors.length;i++){
    const a=actors[i];if(!a||typeof a!=="object"){err(`${lang==="ru"?"Участник должен быть объектом":"Actor must be an object"}: ${i+1}`);continue}
    if(!isCanonicalId(a.id)){err(`${lang==="ru"?"Actor id должен быть непустым и без внешних пробелов":"Actor id must be non-empty and canonical"}: ${i+1}`);continue}
    if(actorIds.has(a.id))err(`${lang==="ru"?"Повтор actor id":"Duplicate actor id"}: ${a.id}`);actorIds.add(a.id);
    if(!a.name||typeof a.name!=="string"||!a.name.trim())err(`${lang==="ru"?"У участника нет name":"Actor missing name"}: ${a.id}`);
    if(!["person","group","environment","system"].includes(a.type))err(`${lang==="ru"?"Недопустимый actor type":"Invalid actor type"}: ${a.type}`);
  }
  const multiActor=actors.length>1;
  const actorById=new Map(actors.map(a=>[a.id,a]));

  const observations=Array.isArray(obj?.observations)?obj.observations:[];
  if(!observations.length)err(lang==="ru"?"observations пуст: нужны наблюдаемые факты.":"observations is empty: observed facts are required.");
  const obsIds=new Set();
  for(let i=0;i<observations.length;i++){
    const o=observations[i];if(!o||typeof o!=="object"){err(`${lang==="ru"?"Наблюдение должно быть объектом":"Observation must be an object"}: ${i+1}`);continue}
    if(!o.id||typeof o.id!=="string"||!o.id.trim()){err(`${lang==="ru"?"Наблюдение без id":"Observation without id"}: ${i+1}`);continue}
    if(obsIds.has(o.id))err(`${lang==="ru"?"Повторяющийся observation id":"Duplicate observation id"}: ${o.id}`);obsIds.add(o.id);
    if(!o.text||typeof o.text!=="string"||!o.text.trim())err(`${lang==="ru"?"Наблюдение без текста":"Observation without text"}: ${o.id}`);
    if(!OBSERVATION_KINDS.has(o.kind))err(`${lang==="ru"?"Недопустимый observation kind":"Invalid observation kind"}: ${o.kind??"—"}`);
    if(o.id&&!isCanonicalId(o.id))err(`${lang==="ru"?"Observation id должен быть каноническим (без внешних пробелов)":"Observation id must be canonical (no surrounding whitespace)"}: ${o.id}`);
    if(o.actor!==undefined&&!isCanonicalId(o.actor))err(`${lang==="ru"?"Observation actor id некорректен":"Observation actor id is not canonical"}: ${o.id}`);
    if(o.actor&&!actorIds.has(o.actor))err(`${lang==="ru"?"Observation ссылается на неизвестного actor":"Observation references unknown actor"}: ${o.id} = ${o.actor}`);
    if(multiActor&&o.kind!=="documented_context"&&!o.actor)err(`${lang==="ru"?"В multi-actor сценарии observation (кроме documented_context) требует actor":"In a multi-actor scenario, every observation except documented_context requires actor"}: ${o.id}`);
    if(o.kind==="direct_observation"&&Array.isArray(o.observed_node_ids)){for(const nid of o.observed_node_ids){const bn=nodeById.get(nid);if(!bn||!["observed","context"].includes(bn.analysis_layer))err(`${lang==="ru"?"direct_observation может структурно ссылаться только на observed/context nodes":"direct_observation may structurally reference observed/context nodes only"}: ${o.id} → ${nid}`)}}

  }

  const activeNodes=Array.isArray(obj?.active_nodes)?obj.active_nodes:[];
  if(!activeNodes.length&&inferenceStatus!=="insufficient_data")err(lang==="ru"?"active_nodes пуст: используйте inference_status=insufficient_data, если данных действительно недостаточно.":"active_nodes is empty: use inference_status=insufficient_data when evidence is genuinely insufficient.");
  if(inferenceStatus==="insufficient_data"&&!activeNodes.length&&!(Array.isArray(obj?.alternatives)&&obj.alternatives.length)&&!(Array.isArray(obj?.unknowns)&&obj.unknowns.length))err(lang==="ru"?"insufficient_data должен объяснять неопределённость через alternatives или unknowns.":"insufficient_data must explain uncertainty through alternatives or unknowns.");
  const activeKeys=new Set(),baseByKey=new Map(),usedObs=new Set(),itemsByKey=new Map();
  let directNeuralMeasurements=0,directPhysMeasurements=0;
  for(let i=0;i<activeNodes.length;i++){
    const item=activeNodes[i];if(!item||typeof item!=="object"){err(`${lang==="ru"?"Элемент active_nodes должен быть объектом":"active_nodes item must be an object"}: ${i+1}`);continue}
    const base=scenarioNodeBaseId(item),key=scenarioNodeKey(item),n=nodeById.get(base),layer=n?.analysis_layer||"psychological";
    if(!base||!nodeIds.has(base))err(`${lang==="ru"?"Неизвестная/отсутствующая node_id":"Unknown/missing node_id"}: ${base||key||i+1}`);
    if(!key)err(`${lang==="ru"?"Нода без id/instance_id":"Node missing id/instance_id"}: ${i+1}`);else{if(activeKeys.has(key))err(`${lang==="ru"?"Повторяющийся экземпляр active node":"Duplicate active node instance"}: ${key}`);activeKeys.add(key);baseByKey.set(key,base);itemsByKey.set(key,item)}
    if(item.actor&&!actorIds.has(item.actor))err(`${lang==="ru"?"Нода ссылается на неизвестного участника":"Node references unknown actor"} ${key}: ${item.actor}`);
    if(item.actor){if(!item.instance_id||!item.node_id)err(`${lang==="ru"?"Actor-нода должна иметь instance_id и node_id":"Actor node must have instance_id and node_id"}: ${key}`);else if(item.instance_id!==`${item.actor}:${item.node_id}`)err(`${lang==="ru"?"instance_id должен точно соответствовать actor:node_id":"instance_id must exactly match actor:node_id"}: ${key}`)}
    for(const f of DEPRECATED_IMPORT_FIELDS)if(Object.prototype.hasOwnProperty.call(item,f))err(`${lang==="ru"?"Импорт не может сам присваивать confidence/capability/global flags":"Import cannot self-assign confidence/capability/global flags"}: ${f} @ ${key}`);
    if(item.id!==undefined&&!isCanonicalId(item.id))err(`${lang==="ru"?"active node id должен быть каноническим":"active node id must be canonical"}: ${key}`);
    if(item.actor!==undefined&&!isCanonicalId(item.actor))err(`${lang==="ru"?"active node actor id должен быть каноническим":"active node actor id must be canonical"}: ${key}`);
    if(item.instance_id!==undefined&&!isCanonicalId(item.instance_id))err(`${lang==="ru"?"instance_id должен быть каноническим":"instance_id must be canonical"}: ${key}`);
    if(item.actor&&actorById.has(item.actor)&&n&&!actorCanOwn(actorById.get(item.actor),n))err(`${lang==="ru"?"actor type несовместим с этой нодой/layer по онтологии HBBA":"actor type is incompatible with this node/layer according to HBBA ontology"}: ${item.actor}(${actorById.get(item.actor).type}) → ${base}`);
    const allowedScopes=CLAIM_SCOPE_MATRIX[layer]||new Set();
    if(!item.claim_scope)err(`${lang==="ru"?"SCENARIO-3 требует claim_scope для active node":"SCENARIO-3 requires claim_scope for active node"}: ${key}`);
    else if(!allowedScopes.has(item.claim_scope))err(`${lang==="ru"?"claim_scope несовместим с analysis_layer":"claim_scope is incompatible with analysis_layer"} ${key}: ${layer} × ${item.claim_scope}`);
    if(item.claim_scope==="measurement_supported"){
      for(const x of measurementValidation(item,key,actors))err(x);
      if(layer==="neural")directNeuralMeasurements++;
      if(layer==="physiology")directPhysMeasurements++;
    }else if(item.measurement)err(`${lang==="ru"?"measurement задан, но claim_scope не measurement_supported":"measurement is present but claim_scope is not measurement_supported"}: ${key}`);
    if(multiActor){
      const personSpecific=(layer==="psychological"||layer==="physiology"||layer==="learning"||item.claim_scope==="measurement_supported"||(n?.analysis_layer==="observed"&&n?.type!=="context"));
      if(personSpecific&&!item.actor)err(`${lang==="ru"?"В multi-actor сценарии person-specific claim/action/outcome требует actor":"In a multi-actor scenario, a person-specific claim/action/outcome requires actor"}: ${key}`);
      if(!item.actor&&!personSpecific&&!isGlobalScenarioItem(item))err(`${lang==="ru"?"Actorless item не соответствует безопасной global semantics онтологии":"Actorless item does not match safe global ontology semantics"}: ${key}`);
    }
    if(!item.role||typeof item.role!=="string"||!item.role.trim())err(`${lang==="ru"?"У ноды отсутствует role":"Node is missing role"}: ${key}`);
    if(!item.reason||typeof item.reason!=="string"||!item.reason.trim())err(`${lang==="ru"?"У ноды отсутствует reason":"Node is missing reason"}: ${key}`);
    if(!Array.isArray(item.based_on)||!item.based_on.length)err(`${lang==="ru"?"Нода не привязана к наблюдению":"Node is not grounded in observations"}: ${key}`);else{const local=new Set();for(const ref of item.based_on){if(!isCanonicalId(ref))err(`${lang==="ru"?"based_on id должен быть каноническим":"based_on id must be canonical"} ${key}: ${ref}`);if(local.has(ref))err(`${lang==="ru"?"Повтор observation в based_on":"Duplicate observation in based_on"} ${key}: ${ref}`);local.add(ref);usedObs.add(ref);if(!obsIds.has(ref))err(`${lang==="ru"?"Нода ссылается на неизвестное наблюдение":"Node references unknown observation"} ${key}: ${ref}`)}}
  }
  const measurementIds=new Set();
  for(const item of activeNodes.filter(x=>x?.claim_scope==="measurement_supported")){const mid=item?.measurement?.measurement_id;if(mid){if(measurementIds.has(mid))err(`${lang==="ru"?"measurement_id переиспользован":"measurement_id is reused"}: ${mid}`);measurementIds.add(mid)}}
  for(const o of observations)if(o?.id&&!usedObs.has(o.id))warn(`${lang==="ru"?"Наблюдение не используется ни одной active node":"Observation is not used by any active node"}: ${o.id}`);

  const activeEdges=Array.isArray(obj?.active_edges)?obj.active_edges:[],activeEdgeKeys=new Set();
  for(let i=0;i<activeEdges.length;i++){
    const e=activeEdges[i];if(!e||typeof e!=="object"){err(`${lang==="ru"?"Элемент active_edges должен быть объектом":"active_edges item must be an object"}: ${i+1}`);continue}
    const key=e.source+"→"+e.target;if(activeEdgeKeys.has(key))err(`${lang==="ru"?"Повторяющееся active edge":"Duplicate active edge"}: ${key}`);activeEdgeKeys.add(key);
    if(!activeKeys.has(e.source))err(`${lang==="ru"?"source ребра отсутствует в active_nodes":"Edge source is missing from active_nodes"}: ${e.source}`);
    if(!activeKeys.has(e.target))err(`${lang==="ru"?"target ребра отсутствует в active_nodes":"Edge target is missing from active_nodes"}: ${e.target}`);
    const bs=baseByKey.get(e.source),bt=baseByKey.get(e.target),si=itemsByKey.get(e.source),ti=itemsByKey.get(e.target);
    if(si&&ti){
      const sa=si.actor||null,ta=ti.actor||null;
      if(sa!==ta){err(`${lang==="ru"?"Научное active_edge должно оставаться внутри одного actor или целиком внутри global layer; межactor связь оформляется interaction_links":"Scientific active_edge must remain within one actor or entirely within a global layer; cross-actor links use interaction_links"}: ${key}`)}
      if(!sa&&!ta&&multiActor){const globalOK=isGlobalScenarioItem(si)&&isGlobalScenarioItem(ti);if(!globalOK)err(`${lang==="ru"?"Actorless scientific edge в multi-actor сценарии не является безопасным global mapping по онтологии":"Actorless scientific edge in a multi-actor scenario is not a safe ontology-defined global mapping"}: ${key}`)}
    }
    if(bs&&bt&&!existingDirectedEdge(bs,bt))err(`${lang==="ru"?"В базовой онтологии нет связи":"Base ontology has no directed edge"} ${bs} → ${bt} (${key})`);
    if(Object.prototype.hasOwnProperty.call(e,"confidence"))err(`${lang==="ru"?"confidence у active_edge запрещён: это некалиброванная самооценка импорта":"confidence on active_edge is forbidden: it is an uncalibrated importer self-rating"}: ${key}`);
    if(!e.reason||typeof e.reason!=="string"||!e.reason.trim())err(`${lang==="ru"?"У связи отсутствует reason":"Edge is missing reason"}: ${key}`);
  }

  const allowedRelations=new Set(["observed_signal","action_on_other","shared_context","feedback","coordination","communication","environmental_change"]),interactionKeys=new Set();
  for(const e of scenarioInteractionLinks(obj)){
    const key=interactionKey(e);if(interactionKeys.has(key))err(`${lang==="ru"?"Повтор сценарной связи":"Duplicate scenario interaction"}: ${key}`);interactionKeys.add(key);
    const si=itemsByKey.get(e?.source),ti=itemsByKey.get(e?.target);
    if(!si||!ti){err(`${lang==="ru"?"Сценарная связь ссылается на неизвестный экземпляр":"Scenario interaction references unknown instance"}: ${key}`);continue}
    if(!allowedRelations.has(e?.relation))err(`${lang==="ru"?"Недопустимый relation у interaction_links":"Invalid interaction relation"}: ${e?.relation}`);
    if(Object.prototype.hasOwnProperty.call(e,"confidence"))err(`${lang==="ru"?"confidence у interaction запрещён: это некалиброванная самооценка импорта":"confidence on interaction is forbidden: it is an uncalibrated importer self-rating"}: ${key}`);
    if(!e?.reason||typeof e.reason!=="string"||!e.reason.trim())err(`${lang==="ru"?"У interaction отсутствует reason":"Interaction is missing reason"}: ${key}`);
    const sObs=nodeIsObservableEndpoint(si),tObs=nodeIsObservableEndpoint(ti),sCtx=nodeIsContextEndpoint(si),tCtx=nodeIsContextEndpoint(ti),sAction=nodeIsObservedAction(si);
    const interpersonal=["observed_signal","communication","action_on_other","feedback","coordination"].includes(e.relation);
    if(interpersonal&&!(sObs&&tObs))err(`${lang==="ru"?"межакторная interaction relation требует наблюдаемые endpoints; скрытое состояние нельзя передавать между людьми":"interpersonal interaction relation requires observable endpoints; hidden states cannot be transferred between actors"}: ${key}`);
    if(interpersonal&&(!si.actor||!ti.actor))err(`${lang==="ru"?"межакторная interaction relation требует actor ownership у обоих endpoints":"interpersonal interaction relation requires actor ownership on both endpoints"}: ${key}`);
    if(interpersonal&&si.actor&&ti.actor&&si.actor===ti.actor)err(`${lang==="ru"?"межакторная interaction relation требует двух разных actors; same-actor связь оформляйте внутри сценарной/научной структуры":"interpersonal interaction relation requires two different actors; represent same-actor relations inside scenario/scientific structure"}: ${key}`);
    if(e.relation==="action_on_other"&&!sAction)err(`${lang==="ru"?"action_on_other требует наблюдаемое действие как source":"action_on_other requires an observable action as source"}: ${key}`);
    if(e.relation==="shared_context"&&!(sCtx&&tCtx))err(`${lang==="ru"?"shared_context требует context→context observed endpoints":"shared_context requires context→context observed endpoints"}: ${key}`);
    if(e.relation==="environmental_change"&&!(sAction&&(tCtx||tObs)))err(`${lang==="ru"?"environmental_change требует observable action → context/observed":"environmental_change requires observable action → context/observed"}: ${key}`);
  }
  if(activeKeys.size>1&&!activeEdges.length&&!interactionKeys.size)warn(lang==="ru"?"В сценарии несколько нод, но нет active_edges/interaction_links: карта будет разорвана.":"Scenario has multiple nodes but no active_edges/interaction_links; the map will be disconnected.");

  const latent=activeNodes.filter(x=>{const layer=nodeScenarioLayer(scenarioNodeBaseId(x));return (layer==="psychological"&&x.claim_scope!=="measurement_supported")||(layer==="learning"&&x.claim_scope!=="measurement_supported")}).length;
  if(latent&&!nonBlankArray(obj?.alternatives))err(lang==="ru"?"Для скрытых психологических/learning гипотез alternatives должны содержать непустые конкурирующие объяснения.":"alternatives for latent psychological/learning hypotheses must contain non-empty competing explanations.");
  if(Array.isArray(obj?.unknowns)&&obj.unknowns.length&&!nonBlankArray(obj.unknowns))err(lang==="ru"?"unknowns содержит пустое значение.":"unknowns contains a blank value.");
  if(Array.isArray(obj?.discriminating_observations)&&obj.discriminating_observations.length&&!nonBlankArray(obj.discriminating_observations))err(lang==="ru"?"discriminating_observations содержит пустое значение.":"discriminating_observations contains a blank value.");
  const supports=Array.isArray(obj?.supports_observation_ids)?obj.supports_observation_ids:[];
  const contradicts=Array.isArray(obj?.contradicts_observation_ids)?obj.contradicts_observation_ids:[];
  const claimRefs=Array.isArray(obj?.inference_claim_keys)?obj.inference_claim_keys:[];
  for(const [name,arr] of [["supports_observation_ids",supports],["contradicts_observation_ids",contradicts],["inference_claim_keys",claimRefs]]){
    if(arr.length&&!uniqueNonBlankArray(arr))err(`${lang==="ru"?"Inference refs должны быть непустыми, уникальными и каноническими":"Inference refs must be non-empty, unique, and canonical"}: ${name}`);
  }
  for(const ref of [...supports,...contradicts])if(!obsIds.has(ref))err(`${lang==="ru"?"Inference status ссылается на неизвестное observation":"Inference status references unknown observation"}: ${ref}`);
  for(const ref of claimRefs)if(!activeKeys.has(ref))err(`${lang==="ru"?"inference_claim_keys ссылается на неизвестный active node":"inference_claim_keys references unknown active node"}: ${ref}`);
  const overlap=supports.filter(x=>contradicts.includes(x));if(overlap.length)err(`${lang==="ru"?"Одно observation не может одновременно поддерживать и противоречить модели":"The same observation cannot simultaneously support and contradict the model"}: ${overlap.join(", ")}`);
  const evaluatedClaims=claimRefs.map(k=>itemsByKey.get(k)).filter(Boolean);
  for(const c of evaluatedClaims){const layer=nodeScenarioLayer(scenarioNodeBaseId(c));if(["observed","context"].includes(layer))err(`${lang==="ru"?"inference_claim_keys должен указывать на hypothesis/model claim, а не observed/context":"inference_claim_keys must reference a hypothesis/model claim, not observed/context"}: ${scenarioNodeKey(c)}`)}
  const relevantObs=new Set(evaluatedClaims.flatMap(c=>Array.isArray(c.based_on)?c.based_on:[]));
  if((supports.length||contradicts.length)&&!claimRefs.length)err(lang==="ru"?"supports/contradicts требуют inference_claim_keys, чтобы evidence относилось к конкретным claims.":"supports/contradicts require inference_claim_keys so evidence is tied to specific claims.");
  for(const ref of [...supports,...contradicts])if(claimRefs.length&&!relevantObs.has(ref))err(`${lang==="ru"?"Inference evidence не связано через based_on с оцениваемыми claims":"Inference evidence is not linked via based_on to the evaluated claims"}: ${ref}`);
  if(inferenceStatus==="observations_consistent_with_model"){
    if(!supports.length)err(lang==="ru"?"observations_consistent_with_model требует supports_observation_ids.":"observations_consistent_with_model requires supports_observation_ids.");
    if(contradicts.length)err(lang==="ru"?"observations_consistent_with_model не может одновременно содержать contradicts_observation_ids.":"observations_consistent_with_model cannot simultaneously contain contradicts_observation_ids.");
    if(!claimRefs.length)err(lang==="ru"?"observations_consistent_with_model требует inference_claim_keys.":"observations_consistent_with_model requires inference_claim_keys.");
    if(latent){if(!nonBlankArray(obj?.unknowns))err(lang==="ru"?"observations_consistent_with_model со скрытыми гипотезами требует непустые unknowns.":"observations_consistent_with_model with latent hypotheses requires non-empty unknowns.");if(!nonBlankArray(obj?.discriminating_observations))err(lang==="ru"?"observations_consistent_with_model со скрытыми гипотезами требует непустимые discriminating_observations.":"observations_consistent_with_model with latent hypotheses requires non-empty discriminating_observations.");}
  }
  if(inferenceStatus==="contradicted_by_observation"){
    if(!contradicts.length)err(lang==="ru"?"contradicted_by_observation требует contradicts_observation_ids.":"contradicted_by_observation requires contradicts_observation_ids.");
    if(!claimRefs.length)err(lang==="ru"?"contradicted_by_observation требует inference_claim_keys.":"contradicted_by_observation requires inference_claim_keys.");
  }

  // Prediction-error completeness: model-derived PE requires expectation + actual reinforcement value and explicit temporal context.
  for(const pe of activeNodes.filter(x=>scenarioNodeBaseId(x)==="learn_pe"&&x.claim_scope!=="measurement_supported")){
    const peKey=scenarioNodeKey(pe),actor=pe.actor||null;
    const findLocal=base=>activeNodes.find(x=>scenarioNodeBaseId(x)===base&&(x.actor||null)===actor);
    const pred=findLocal("cog_prediction"),actual=findLocal("out_reward");
    if(!pred||!actual)err(`${lang==="ru"?"Prediction Error требует в том же actor оба входа: expectation (cog_prediction) и actual reinforcement value (out_reward)":"Prediction Error requires both inputs in the same actor: expectation (cog_prediction) and actual reinforcement value (out_reward)"}: ${peKey}`);
    else{
      const pKey=scenarioNodeKey(pred),aKey=scenarioNodeKey(actual);
      if(!activeEdgeKeys.has(`${pKey}→${peKey}`)||!activeEdgeKeys.has(`${aKey}→${peKey}`))err(`${lang==="ru"?"Prediction Error требует оба computational_input ребра к PE":"Prediction Error requires both computational_input edges into PE"}: ${peKey}`);
    }
    const tc=pe.temporal_context;
    if(!tc||typeof tc!=="object"||!isCanonicalId(tc.episode_id)||(tc.trial_id!==undefined&&!isCanonicalId(tc.trial_id))||!["within_episode","across_trial","long_term"].includes(tc.time_scope))err(`${lang==="ru"?"Prediction Error требует канонический temporal_context {episode_id,time_scope[,trial_id]}":"Prediction Error requires canonical temporal_context {episode_id,time_scope[,trial_id]}"}: ${peKey}`);
    if(pred&&actual&&tc){for(const input of [pred,actual]){const itc=input.temporal_context;if(!itc||itc.episode_id!==tc.episode_id||String(itc.trial_id||"")!==String(tc.trial_id||""))err(`${lang==="ru"?"Prediction Error и оба input должны иметь один episode_id/trial_id":"Prediction Error and both inputs must share the same episode_id/trial_id"}: ${scenarioNodeKey(input)} ↔ ${peKey}`)}}

  }

  const tour=Array.isArray(obj?.tour_steps)?obj.tour_steps:[],stepIds=new Set();
  for(let i=0;i<tour.length;i++){
    const st=tour[i];if(!st||typeof st!=="object"){err(`${lang==="ru"?"Шаг экскурсии должен быть объектом":"Tour step must be an object"}: ${i+1}`);continue}
    const sid=st.id||`step${i+1}`;if(st.id!==undefined&&!isCanonicalId(st.id))err(`${lang==="ru"?"Tour step id должен быть каноническим":"Tour step id must be canonical"}: ${sid}`);if(stepIds.has(sid))err(`${lang==="ru"?"Повторяющийся id шага":"Duplicate tour step id"}: ${sid}`);stepIds.add(sid);
    if(!st.title||typeof st.title!=="string"||!st.title.trim())err(`${lang==="ru"?"У шага нет title":"Tour step has no title"}: ${sid}`);
    if(!st.narration||typeof st.narration!=="string"||!st.narration.trim())err(`${lang==="ru"?"У шага нет narration":"Tour step has no narration"}: ${sid}`);
    const stepNodes=Array.isArray(st.nodes)?st.nodes:[];if(!stepNodes.length)err(`${lang==="ru"?"Шаг не содержит nodes":"Tour step has no nodes"}: ${sid}`);
    const seen=new Set();for(const id of stepNodes){if(seen.has(id))warn(`${lang==="ru"?"Повтор ноды внутри шага":"Duplicate node inside tour step"} ${sid}: ${id}`);seen.add(id);if(!activeKeys.has(id))err(`${lang==="ru"?"Нода экскурсии отсутствует в active_nodes":"Tour node is missing from active_nodes"} ${sid}: ${id}`)}
    if(st.focus_node&&!activeKeys.has(st.focus_node))err(`${lang==="ru"?"focus_node отсутствует в active_nodes":"focus_node is missing from active_nodes"}: ${st.focus_node}`);
    for(const e of (Array.isArray(st.edges)?st.edges:[])){const key=e?.source+"→"+e?.target;if(!activeKeys.has(e?.source)||!activeKeys.has(e?.target))err(`${lang==="ru"?"Ребро экскурсии выходит за active_nodes":"Tour edge references node outside active_nodes"}: ${key}`);else if(!activeEdgeKeys.has(key)&&!interactionKeys.has(key))err(`${lang==="ru"?"Ребро экскурсии отсутствует и в active_edges, и в interaction_links":"Tour edge is missing from active_edges and interaction_links"}: ${key}`)}
  }
  if(!tour.length)warn(lang==="ru"?"tour_steps отсутствует: карта загрузится без пошаговой экскурсии.":"tour_steps is missing: scenario will load without a guided tour.");

  // Free text is never promoted to validated scientific content. It is rendered as UNVALIDATED NARRATIVE; structural claims above are the validated layer.

  const integrity=scenarioIntegrityReport(obj);if(integrity.components>1)warn(`${lang==="ru"?"Граф сценария разорван":"Scenario graph is disconnected"}: ${integrity.components} ${lang==="ru"?"компонента(ов)":"component(s)"}.`);if(integrity.isolated.length)warn(`${lang==="ru"?"Изолированные active nodes":"Isolated active nodes"}: ${integrity.isolated.join(", ")}`);
  return {ok:errors.length===0,errors,warnings,integrity};
}
function normalizeTourSteps(obj){
  return (Array.isArray(obj?.tour_steps)?obj.tour_steps:[]).map((s,i)=>({
    id:s.id||`step${i+1}`,
    title:s.title||`${lang==="ru"?"Шаг":"Step"} ${i+1}`,
    narration:s.narration||"",
    look_at:s.look_at||"",
    nodes:Array.isArray(s.nodes)?s.nodes:[],
    edges:Array.isArray(s.edges)?s.edges:[],
    focus_node:s.focus_node||null
  }));
}
function clearGuidedTourClasses(){
  $$("#nodes .node").forEach(el=>el.classList.remove("tour-focus","tour-anchor","tour-dim"));
  $$("#edges .edge").forEach(el=>el.classList.remove("tour-edge-focus","tour-edge-dim"));
}
function animateGraphTo(target,duration=520){
  if(guidedTourAnimationFrame)cancelAnimationFrame(guidedTourAnimationFrame);
  const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if(reduced){transform={...target};applyTransform();return}
  const start={...transform},t0=performance.now();
  const ease=t=>1-Math.pow(1-t,3);
  const frame=now=>{
    const p=Math.min(1,(now-t0)/duration),q=ease(p);
    transform={
      x:start.x+(target.x-start.x)*q,
      y:start.y+(target.y-start.y)*q,
      k:start.k+(target.k-start.k)*q
    };
    applyTransform();
    if(p<1)guidedTourAnimationFrame=requestAnimationFrame(frame);
    else guidedTourAnimationFrame=null;
  };
  guidedTourAnimationFrame=requestAnimationFrame(frame);
}
function focusGraphOnNodes(ids){
  const pts=(ids||[]).map(id=>currentGraphPositions.get(id)).filter(Boolean);
  if(!pts.length){fit();return}
  const xs=pts.map(p=>p.x),ys=pts.map(p=>p.y);
  const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
  const w=Math.max(1,maxX-minX),h=Math.max(1,maxY-minY);
  const cx=(minX+maxX)/2,cy=(minY+maxY)/2;
  let k=pts.length===1?2.15:Math.min(2.15,Math.max(.78,Math.min(760/(w+180),500/(h+180))));
  const targetCenterX=505,targetCenterY=390;
  animateGraphTo({x:targetCenterX-cx*k,y:targetCenterY-cy*k,k});
}
function tourStepEdges(step){
  const explicit=Array.isArray(step?.edges)?step.edges:[];
  if(explicit.length)return explicit;
  const set=new Set(step?.nodes||[]),out=[];
  if(activeScenario&&hasMultiActorScenario(activeScenario)){for(const e of [...(activeScenario.active_edges||[]),...scenarioInteractionLinks(activeScenario)])if(set.has(e.source)&&set.has(e.target))out.push({source:e.source,target:e.target});return out;}
  for(const e of D.edges)if(set.has(e.source)&&set.has(e.target))out.push({source:e.source,target:e.target});
  return out;
}
function renderGuidedTourPanel(){
  const panel=$("#guidedTourPanel"),restart=$("#restartTourBtn");
  restart?.classList.toggle("hidden",!guidedTourSteps.length);
  if(!guidedTourActive||!guidedTourSteps.length){panel.classList.add("hidden");return}
  panel.classList.remove("hidden");
  const step=guidedTourSteps[guidedTourIndex];
  $("#guidedTourCounter").textContent=lang==="ru"?`Шаг ${guidedTourIndex+1} / ${guidedTourSteps.length}`:`Step ${guidedTourIndex+1} / ${guidedTourSteps.length}`;
  $("#guidedTourNarrativeBadge").textContent=lang==="ru"?"AI NARRATIVE · UNVALIDATED — текст экскурсии не валидируется как научный claim":"AI NARRATIVE · UNVALIDATED — tour prose is not validated as a scientific claim";
  $("#guidedTourTitle").textContent=humanizeHBBAIds(step.title);
  $("#guidedTourNarration").textContent=humanizeHBBAIds(step.narration);
  const look=$("#guidedTourLookAt");
  look.textContent=humanizeHBBAIds(step.look_at)?`${lang==="ru"?"UNVALIDATED LOOK-AT · Смотрите":"UNVALIDATED LOOK-AT · Look at"}: ${step.look_at}`:"";
  look.classList.toggle("hidden",!step.look_at);
  $("#guidedTourSteps").innerHTML=guidedTourSteps.map((s,i)=>`<button type="button" class="guided-tour-step ${i===guidedTourIndex?"active":""}" data-tour-index="${i}" title="${esc(s.title)}">${i+1}</button>`).join("");
  $$("#guidedTourSteps .guided-tour-step").forEach(btn=>btn.addEventListener("click",()=>goGuidedTourStep(Number(btn.dataset.tourIndex))));
  $("#guidedTourPrev").disabled=guidedTourIndex===0;
  const next=$("#guidedTourNext");
  next.disabled=guidedTourIndex===guidedTourSteps.length-1;
  next.querySelector("span").textContent=guidedTourIndex===guidedTourSteps.length-1?(lang==="ru"?"Готово":"Done"):t("tourNext");
}
function applyGuidedTourVisuals(){
  clearGuidedTourClasses();
  if(!guidedTourActive||guidedTourOverview||!guidedTourSteps.length)return;
  const step=guidedTourSteps[guidedTourIndex],focusSet=new Set(step.nodes||[]);
  $$("#nodes .node").forEach(el=>{
    const visualKey=el.dataset.instance||el.dataset.key||el.dataset.node;
    const hit=focusSet.has(visualKey)||focusSet.has(el.dataset.node);
    el.classList.add(hit?"tour-focus":"tour-dim");
    if(step.focus_node===visualKey||step.focus_node===el.dataset.node)el.classList.add("tour-anchor");
  });
  const edgeSet=new Set(tourStepEdges(step).map(e=>e.source+"→"+e.target));
  $$("#edges .edge").forEach(el=>{
    const key=el.dataset.source+"→"+el.dataset.target;
    const reverse=el.dataset.target+"→"+el.dataset.source;
    const hit=edgeSet.has(key)||(el.classList.contains("bidirectional")&&edgeSet.has(reverse));
    el.classList.add(hit?"tour-edge-focus":"tour-edge-dim");
  });
}
function goGuidedTourStep(index,{focus=true}={}){
  if(!guidedTourSteps.length)return;
  guidedTourIndex=Math.max(0,Math.min(guidedTourSteps.length-1,index));
  guidedTourActive=true;guidedTourOverview=false;
  if(viewMode!=="professional"){
    viewMode="professional";
    renderModeBanner();renderLegend();renderGraph();
  }
  renderGuidedTourPanel();
  applyScenarioVisuals();applyGuidedTourVisuals();
  const step=guidedTourSteps[guidedTourIndex];
  const anchor=step.focus_node||(step.nodes||[])[0];
  if(anchor){const base=scenarioInstanceBaseId(anchor)||anchor;if(nodeById.has(base)){activeNode=base;showDetails(base);appendScenarioInfoToDetail(anchor)}}
  if(focus)focusGraphOnNodes(step.nodes||[]);
}
function startGuidedTour(){
  if(!guidedTourSteps.length)return;
  guidedTourIndex=0;guidedTourActive=true;guidedTourOverview=false;
  goGuidedTourStep(0);
}
function exitGuidedTour(){
  guidedTourActive=false;guidedTourOverview=false;
  clearGuidedTourClasses();renderGuidedTourPanel();applyScenarioVisuals();fit();
}
function showGuidedTourOverview(){
  guidedTourOverview=true;clearGuidedTourClasses();applyScenarioVisuals();fit();
  setTimeout(()=>{if(guidedTourActive)renderGuidedTourPanel()},0);
}
function scenarioNodeMap(){return scenarioInstanceMap(activeScenario)}
function scenarioEdgeMap(){return new Map((activeScenario?.active_edges||[]).map(x=>[x.source+"→"+x.target,x]))}
function scenarioInferenceLabel(status){
  const ru={observations_consistent_with_model:"НАБЛЮДЕНИЯ СОВМЕСТИМЫ С МОДЕЛЬЮ",ambiguous:"НЕСКОЛЬКО ОБЪЯСНЕНИЙ",insufficient_data:"ДАННЫХ НЕДОСТАТОЧНО",contradicted_by_observation:"МОДЕЛЬ ПРОТИВОРЕЧИТ НАБЛЮДЕНИЮ"};
  const en={observations_consistent_with_model:"OBSERVATIONS CONSISTENT WITH MODEL",ambiguous:"MULTIPLE EXPLANATIONS",insufficient_data:"INSUFFICIENT DATA",contradicted_by_observation:"MODEL CONTRADICTED BY OBSERVATION"};
  return (lang==="ru"?ru:en)[status]||String(status||"ambiguous");
}
function renderScenarioBanner(){
  const banner=$("#scenarioBanner"),focusBtn=$("#scenarioFocusBtn"),badge=$("#scenarioIntegrityBadge"),infBadge=$("#scenarioInferenceBadge"),epi=$("#scenarioEpistemicSummary");
  if(!activeScenario){
    banner.classList.add("hidden");focusBtn?.classList.add("hidden");badge?.classList.add("hidden");infBadge?.classList.add("hidden");if(epi)epi.textContent="";renderActorLegend();return
  }
  banner.classList.remove("hidden");
  $("#scenarioTitle").textContent=activeScenario.title||"HBBA Scenario";
  $("#scenarioSummary").textContent=activeScenario.summary||"";
  $("#restartTourBtn")?.classList.toggle("hidden",!guidedTourSteps.length);
  const status=activeScenario.inference_status||"ambiguous";
  if(infBadge){infBadge.classList.remove("hidden","supported","observations_consistent_with_model","ambiguous","insufficient_data","contradicted_by_observation");infBadge.classList.add(status);infBadge.textContent=scenarioInferenceLabel(status)}
  if(epi){
    const obs=(activeScenario.observations||[]).length,hyp=(activeScenario.active_nodes||[]).filter(x=>["psychological","learning"].includes(nodeById.get(scenarioNodeBaseId(x))?.analysis_layer)).length,alt=(activeScenario.alternatives||[]).length,unk=(activeScenario.unknowns||[]).length;
    epi.textContent=lang==="ru"?`OBSERVED ${obs} · HYPOTHESES ${hyp} · ALTERNATIVES ${alt} · UNKNOWNS ${unk}`:`OBSERVED ${obs} · HYPOTHESES ${hyp} · ALTERNATIVES ${alt} · UNKNOWNS ${unk}`;
  }
  const r=scenarioIntegrityReport(activeScenario);
  if(badge){
    badge.classList.remove("hidden","ok","warning");
    if(r.activeNodes===0){
      badge.classList.add("warning");badge.textContent=lang==="ru"?"⊘ карта не строится: недостаточно данных":"⊘ no map: insufficient data";
      badge.title=lang==="ru"?"Отсутствие скрытой карты — допустимый успешный результат, когда наблюдений недостаточно.":"No latent map is a valid successful result when observations are insufficient.";
    }else{
      const connected=r.components<=1;badge.classList.add(connected?"ok":"warning");
      badge.textContent=connected?`✓ ${lang==="ru"?"связная карта":"connected"}`:`⚠ ${r.components} ${lang==="ru"?"компонента(ов)":"components"}${r.isolated.length?` • ${lang==="ru"?"изолировано":"isolated"} ${r.isolated.length}`:""}`;
      badge.title=connected?(lang==="ru"?"Все экземпляры сценария связаны типизированными научными или явно помеченными сценарными связями.":"All scenario instances are connected through typed scientific or explicit scenario links."):(lang==="ru"?"Несвязанные части — предупреждение о полноте модели, а не повод придумывать связи.":"Disconnected parts warn about model coverage; do not invent links.");
    }
  }
  if(focusBtn){focusBtn.classList.remove("hidden");const ratio=`${r.activeNodes}/${r.backgroundNodes}`;focusBtn.textContent=scenarioFocusMode?`◌ ${t("scenarioShowBackground")} · ${ratio}`:`🎯 ${t("scenarioBackToFocus")} · ${r.activeNodes}`;focusBtn.classList.toggle("active",scenarioFocusMode)}
  renderActorLegend();
}
function renderScenarioInsufficientState(){
  const box=$("#scenarioInsufficientState");if(!box)return;
  if(!activeScenario||!scenarioFocusMode||(activeScenario.active_nodes||[]).length){box.classList.add("hidden");box.innerHTML="";return}
  const obs=(activeScenario.observations||[]),alts=(activeScenario.alternatives||[]),unknowns=(activeScenario.unknowns||[]);
  box.classList.remove("hidden");
  box.innerHTML=`<div class="insufficient-card"><span class="eyebrow">EPISTEMIC STOP</span><h2>${lang==="ru"?"Данных недостаточно для выбора скрытой модели":"Insufficient data to select a latent model"}</h2><p>${lang==="ru"?"HBBA не обязана строить красивую причинную историю. Наблюдаемое сохранено, а конкурирующие объяснения остаются открытыми.":"HBBA is not required to invent a coherent causal story. Observations are preserved while competing explanations remain open."}</p>
    <div class="insufficient-grid"><div><b>${lang==="ru"?"Наблюдаемое":"Observed"}</b><ul>${obs.map(o=>`<li><small>UNVALIDATED SOURCE TEXT · ${esc(o.kind||"?")}</small><br>${esc(o.text||o.id)}</li>`).join("")||"<li>—</li>"}</ul></div><div><b>${lang==="ru"?"Альтернативы":"Alternatives"}</b><ul>${alts.map(x=>`<li>${esc(x)}</li>`).join("")||"<li>—</li>"}</ul></div><div><b>${lang==="ru"?"Что неизвестно":"Unknowns"}</b><ul>${unknowns.map(x=>`<li>${esc(x)}</li>`).join("")||"<li>—</li>"}</ul></div></div>
    <small>${lang==="ru"?"Это считается корректным результатом, а не ошибкой карты.":"This is a valid result, not a graph failure."}</small></div>`;
}
function applyScenarioVisuals(){
  $$(".scenario-hit,.scenario-edge-hit").forEach(el=>el.classList.remove("scenario-hit","scenario-edge-hit"));if(!activeScenario)return;
  const nodes=scenarioNodeMap();for(const [key,item] of nodes){const base=scenarioNodeBaseId(item);const els=$$("#nodes .node").filter(el=>el.dataset.instance===key||(!el.dataset.instance&&el.dataset.node===base));for(const el of els){el.classList.add("scenario-hit");el.dataset.scenarioRole=item.role||""}}
  const edges=scenarioEdgeMap();for(const [key,item] of edges){const [a,b]=key.split("→");const el=document.querySelector(`#edges .edge[data-source="${CSS.escape(a)}"][data-target="${CSS.escape(b)}"]`)||(()=>{const pa=scenarioInstanceBaseId(a),pb=scenarioInstanceBaseId(b);return pa&&pb?document.querySelector(`#edges .edge[data-source="${CSS.escape(pa)}"][data-target="${CSS.escape(pb)}"]`):null})();if(el)el.classList.add("scenario-edge-hit")}
}
function applyScenario(obj){activeScenario=obj;validatedScenario=null;scenarioFocusMode=true;guidedTourSteps=normalizeTourSteps(obj);guidedTourIndex=0;guidedTourActive=false;guidedTourOverview=false;selected=new Set((obj.behaviors||[]).filter(id=>behaviorById.has(id)));viewMode="professional";renderModeBanner();renderLegend();renderBehaviors();renderSelection();renderGraph();renderScenarioBanner();applyScenarioVisuals();$("#scenarioImportDialog").close();if(guidedTourSteps.length&&(obj.active_nodes||[]).length)startGuidedTour()}
function clearScenario(){activeScenario=null;validatedScenario=null;scenarioFocusMode=true;guidedTourSteps=[];guidedTourIndex=0;guidedTourActive=false;guidedTourOverview=false;pinnedKeys.clear();clearGuidedTourClasses();renderGuidedTourPanel();renderScenarioBanner();renderGraph();updatePinStatus()}
function appendScenarioInfoToDetail(keyOrBase){
  if(!activeScenario)return;const map=scenarioNodeMap();let item=map.get(keyOrBase);if(!item){item=[...map.values()].find(x=>scenarioNodeBaseId(x)===keyOrBase)}if(!item)return;const card=$("#detailCard");if(!card||card.classList.contains("hidden"))return;
  card.querySelectorAll(".scenario-detail").forEach(x=>x.remove());const obsMap=new Map((activeScenario.observations||[]).map(o=>[o.id,o])),based=(item.based_on||[]).map(x=>obsMap.get(x)).filter(Boolean),actor=scenarioActorMap(activeScenario).get(item.actor);
  const block=document.createElement("div");block.className="scenario-detail";
  const scope=item.claim_scope||defaultClaimScopeForNodeId(scenarioNodeBaseId(item));
  const m=item.measurement,contract=m?measurementContract(m.modality):null;
  const measurementHtml=scope==="measurement_supported"&&m?`<div class="measurement-meta"><div class="measurement-meta-head"><b>${lang==="ru"?"MEASUREMENT-SUPPORTED · метаданные измерения":"MEASUREMENT-SUPPORTED · measurement metadata"}</b><span>${esc(m.modality||"—")}</span></div><dl><dt>ID</dt><dd>${esc(m.measurement_id||"—")}</dd><dt>${lang==="ru"?"Узел":"Node"}</dt><dd>${esc(m.measured_node_id||scenarioNodeBaseId(item))}</dd><dt>Actor</dt><dd>${esc(m.subject_actor||"—")}</dd><dt>Episode</dt><dd>${esc(m.episode_id||"—")}</dd><dt>Trial</dt><dd>${esc(m.trial_id||"—")}</dd><dt>Source</dt><dd>${esc(m.source_type||"—")}</dd><dt>Provenance</dt><dd>${esc(m.provenance||"—")}</dd><dt>Time</dt><dd>${esc(m.timestamp||"—")}</dd><dt>${lang==="ru"?"Результат":"Result"}</dt><dd>${esc([Object.prototype.hasOwnProperty.call(m,"value")?`${m.value} ${m.unit||""}`:"",Object.prototype.hasOwnProperty.call(m,"result")?m.result:""].filter(Boolean).join(" · ")||"—")}</dd></dl>${contract?`<p class="measurement-caveat">${esc(contract[lang==="ru"?"note_ru":"note_en"]||"")}</p>`:""}</div>`:"";
  block.innerHTML=`${actor?`<div class="actor-detail"><b>${esc(actor.name||actor.id)}</b><span>${lang==="ru"?"Экземпляр механизма у этого участника":"Mechanism instance for this actor"} · ${esc(scenarioNodeKey(item))}</span></div>`:""}<div class="scenario-detail-head"><span>VALIDATED STRUCTURE · ${esc(scenarioClaimScopeLabel(scope))}</span></div><p class="validated-boundary-note">${lang==="ru"?"Validator подтвердил структуру и совместимость полей, а не научную истинность скрытого содержания.":"Validator confirmed structural consistency, not the scientific truth of hidden content."}</p>${measurementHtml}${item.role?`<p class="unvalidated-narrative"><strong>AI NARRATIVE · UNVALIDATED:</strong> ${esc(item.role)}</p>`:""}${item.reason?`<p class="unvalidated-narrative"><strong>${lang==="ru"?"Комментарий (не научный claim)":"Comment (not a scientific claim)"}:</strong> ${esc(item.reason)}</p>`:""}${based.length?`<div><strong>${lang==="ru"?"Источник / observation (текст не валидируется как научный claim)":"Source / observation (text is not validated as a scientific claim)"}:</strong><ul>${based.map(o=>`<li><small>UNVALIDATED SOURCE TEXT · ${esc(o.kind||"?")}</small><br>${esc(o.text||o.id)}</li>`).join("")}</ul></div>`:""}`;card.prepend(block)
}

function aiText(v){
  return String(v??"").replace(/\r/g,"").trim();
}

function aiNodeTitle(n){
  const plain=n.layman?.[lang]?.name;
  const science=n.name?.[lang];
  if(plain && science && plain!==science)return `${plain} [${science}]`;
  return plain||science||n.id;
}

function evidenceLabel(ev){
  const map=lang==="ru"
    ? {high:"выше",moderate:"средняя",exploratory:"гипотеза"}
    : {high:"higher",moderate:"moderate",exploratory:"hypothesis"};
  return map[ev]||ev||"—";
}

function relationArrow(edge,bidirectional){
  if(bidirectional)return "↔";
  const r=edgeRelationType(edge);
  return ({may_influence:"→",modulates:"↝",inhibits:"⊣",computational_input:"⇒",implemented_by:"⇢",participates_in:"∈",produces_output:"→",requires_motor_output:"⇢",updates:"↻",associated_with:"—"})[r]||"→";
}

function buildAIContextPack(){
  if(!selected.size){
    return lang==="ru"
      ? "# HBBA — AI Context Pack\n\nВыберите хотя бы одно поведение в атласе, чтобы сформировать граф."
      : "# HBBA — AI Context Pack\n\nSelect at least one behavior in the atlas to generate a graph.";
  }

  const {counts,allIds}=getActive();
  const atomicIds=allIds.slice();
  const activeSet=new Set(atomicIds);

  const rawEdges=D.edges.filter(e=>activeSet.has(e.source)&&activeSet.has(e.target));
  const collapsed=collapseReciprocalEdges(rawEdges);

  const macroModel=buildMacroModel(atomicIds,counts);
  const macros=macroModel.activeGroups;
  const macroEdges=collapseReciprocalEdges(macroModel.edges);

  const behaviors=[...selected].map(id=>behaviorById.get(id)).filter(Boolean);
  const sourceIds=new Set();
  atomicIds.forEach(id=>{
    const n=nodeById.get(id);
    (n?.source_ids||[]).forEach(s=>sourceIds.add(s));
  });
  const sources=[...sourceIds].map(id=>sourceById.get(id)).filter(Boolean);

  const out=[];
  const push=(s="")=>out.push(s);

  if(lang==="ru"){
    push("# HBBA — AI Context Pack");
    push("");
    push("## ИНСТРУКЦИЯ ДЛЯ НЕЙРОСЕТИ");
    push("");
    push("Этот AI Context Pack предназначен для объяснения уже выбранной части атласа. Это НЕ полный Scenario-промпт и НЕ разрешение импровизировать HBBA-SCENARIO-3.");
    push("");
    push("Обязательные правила:");
    push("1. Считай текущий экспорт единственным авторитетным описанием выбранного графа; не подмешивай старые HBBA IDs/grades из памяти.");
    push("2. Не придумывай отсутствующие node/edge/path. Используй только literal IDs и directed links, перечисленные ниже.");
    push("3. `A → B` означает типизированную направленную связь модели; `A ↔ B` означает наличие двух направленных base edges, а не автоматическую причинность.");
    push("4. Audit A/B/C/D/X — редакционный статус конкретного base edge, не вероятность и не вывод о человеке. X = reviewed but unresolved/insufficient/underspecified.");
    push("5. Отделяй наблюдаемые факты пользователя от hidden hypotheses. Никакого индивидуального neural/physiology reverse inference без допустимого measurement scope.");
    push("6. Если факты допускают несколько объяснений, перечисли реально отличающиеся альтернативы и данные, которые могли бы их различить. Не выбирай ‘наиболее вероятный’ путь без калиброванной вероятностной модели.");
    push("7. Не диагностируй личность и не устанавливай скрытые намерения по одному внешнему признаку.");
    push("8. Если пользователь просит СОЗДАТЬ импортируемый HBBA Scenario, не импровизируй его из этого сокращённого Context Pack: используй отдельный Guided Session MASTER Prompt.");
    push("9. Если предлагаешь Director-команду, используй только существующий literal ID/path и не утверждай, что команда уже выполнена локально.");
    push("10. Для высокорисковых медицинских/юридических/диагностических выводов не расширяй HBBA за пределы источников и профильной проверки.");
    push("");
    push("Формат разбора примера:");
    push("- Наблюдаемые факты");
    push("- Совместимые узлы/связи текущего графа");
    push("- Альтернативные объяснения");
    push("- Что неизвестно / что различило бы версии");
    push("- Ограничения relation grades и individual inference");
    push("");
    push("## НАУЧНЫЙ СТАТУС");
    push("");
    push(`HBBA Final Release: v${FINAL_RELEASE_STATUS.release}`);
    push(`Scientific Core: v${FINAL_RELEASE_STATUS.core} · FROZEN`);
    push(`Статус evidence/epistemic boundary научного ядра: ${FINAL_RELEASE_STATUS.scientificCore}`);
    push(aiText(FINAL_RELEASE_STATUS.ru.note));
    push(aiText(FINAL_RELEASE_STATUS.ru.scope));
    push(aiText(FINAL_RELEASE_STATUS.ru.warning));
    push("");
    push("Финальные эксперименты: Challenge v1.0.1 = EVIDENCE_AGAINST универсального reasoning enhancement; Composition v1.3.0 = NEUTRAL_TOPOLOGY_EFFECT (FLAT 60/60, GRAPH 60/60). Real-world predictive validity композиций = UNTESTED.");
    push("");
    push("## ВЫБРАННЫЕ ПОВЕДЕНИЯ");
    push("");
    behaviors.forEach((b,i)=>push(`${i+1}. ${b.name.ru} [${b.name.en}] (id: ${b.id})`));
    push("");
    push("## ОБЫВАТЕЛЬСКАЯ КАРТА — СМЫСЛОВЫЕ ГРУППЫ");
    push("");
    macros.forEach((g,i)=>{
      push(`### L${i+1}. ${macroDisplayName(g)}  {${g.id}}`);
      push(aiText(g.description.ru));
      push(`Внутри профессиональных сущностей: ${g.members.length}.`);
      push("Состав:");
      g.members.forEach(id=>{
        const n=nodeById.get(id);
        if(n)push(`- ${aiNodeTitle(n)} {${n.id}}`);
      });
      push("");
    });
    push("### Связи между смысловыми группами");
    push("");
    macroEdges.forEach(e=>{
      const a=macroModel.groups.get(e.source),b=macroModel.groups.get(e.target);
      if(!a||!b)return;
      const rels=e.relations?[...e.relations].join(", "):"mixed";
      push(`- ${macroDisplayName(a)} ${relationArrow(e,e.bidirectional)} ${macroDisplayName(b)} | агрегированных проф. связей: ${e.count||1} | типы отношений: ${rels}`);
    });
    push("");
    push("## ПРОФЕССИОНАЛЬНЫЕ СУЩНОСТИ");
    push("");
    atomicIds.forEach((id,i)=>{
      const n=nodeById.get(id);if(!n)return;
      const l=n.layman?.ru;
      push(`### P${i+1}. ${n.name.ru} [${n.name.en}] {${n.id}}`);
      push(`Тип: ${I.ru.types[n.type]||n.type}`);push(`Уровень утверждения: ${nodeLayerLabel(n)} | claim_kind: ${n.claim_kind||"—"}`);
      push(`Простое название: ${l?.name||n.name.ru}`);
      push(`Что это: ${aiText(l?.what||n.description.ru)}`);
      if(l?.looks)push(`Как проявляется: ${aiText(l.looks)}`);
      if(l?.trigger)push(`Что обычно запускает: ${aiText(l.trigger)}`);
      if(l?.purpose)push(`Функциональный смысл: ${aiText(l.purpose)}`);
      if(l?.may_lead)push(`К чему может привести: ${aiText(l.may_lead)}`);
      if(l?.caveat)push(`Ограничение интерпретации: ${aiText(l.caveat)}`);
      push("");
    });
    push("## НАПРАВЛЕННЫЕ СВЯЗИ ПРОФЕССИОНАЛЬНОГО ГРАФА");
    push("");
    collapsed.forEach((e,i)=>{
      const a=nodeById.get(e.source),b=nodeById.get(e.target);
      if(!a||!b)return;
      push(`${i+1}. ${a.name.ru} {${a.id}} ${relationArrow(e,e.bidirectional)} ${b.name.ru} {${b.id}} | relation_type: ${edgeRelationType(e)} | audit: ${edgeAuditGrade(e)}`);
    });
    push("");
    push("## СЕМАНТИКА ТИПОВ СВЯЗЕЙ");
    push("");
    Object.entries(D.relation_meta||{}).forEach(([id,m])=>push(`- ${id}: ${m.ru?.label||id} — ${m.ru?.meaning||""}`));
    push("");
    push("## ИСТОЧНИКИ / НАУЧНЫЕ РАМКИ");
    push("");
    sources.forEach((s,i)=>{
      push(`${i+1}. ${s.title}`);
      if(s.scope?.ru)push(`   Роль: ${s.scope.ru}`);
      push(`   ${s.url}`);
    });
    push("");
    push("## ОГРАНИЧЕНИЯ ЭТОГО ЭКСПОРТА");
    push("");
    push("- Это модель механизмов, а не описание конкретного человека.");
    push("- Групповая научная закономерность не позволяет автоматически сделать вывод о конкретном человеке.");
    push("- Наличие узла в поведении не означает, что он обязательно активен в каждом эпизоде.");
    push("- Семантика линии задаётся relation_type: implemented_by / participates_in / associated_with не являются временной причинностью; X означает reviewed-but-unresolved/insufficient/underspecified relation.");
    push("- Если какая-то нода изолирована, это может означать незавершённую связность базы, а не реальную изоляцию механизма.");
    push("- Relation grade относится только к конкретному типизированному ребру; не переносите grade на соседние constructs или индивидуальный эпизод.");
    push("");
    push("## НАЧАЛО ДИАЛОГА");
    push("");
    push("Подтверди, что структура прочитана. Кратко назови выбранные поведения и смысловые группы. Затем жди конкретного примера или вопроса; не придумывай эпизод сам. Для importable Scenario используй отдельный Guided Session MASTER Prompt.");
  }else{
    push("# HBBA — AI Context Pack");
    push("");
    push("## INSTRUCTIONS FOR THE AI SYSTEM");
    push("");
    push("This AI Context Pack is for explaining the already selected atlas subgraph. It is NOT the full Scenario prompt and does NOT authorize improvising HBBA-SCENARIO-3.");
    push("");
    push("Mandatory rules:");
    push("1. Treat this export as the authoritative description of the selected graph; do not mix in older HBBA IDs/grades from memory.");
    push("2. Do not invent missing nodes, edges, or paths. Use only literal IDs and directed links listed below.");
    push("3. `A → B` is a typed directed model relation; `A ↔ B` means two directed base edges exist, not automatic causality.");
    push("4. Audit A/B/C/D/X is an editorial status of that typed base edge, not a probability or an inference about a person. X = reviewed but unresolved/insufficient/underspecified.");
    push("5. Separate user observations from hidden hypotheses. Do not make individual neural/physiology reverse inferences without an allowed measurement scope.");
    push("6. When facts allow multiple explanations, list genuinely distinct alternatives and discriminating data. Do not choose a ‘most probable’ path without a calibrated probabilistic model.");
    push("7. Do not diagnose personality or establish hidden intent from one outward sign.");
    push("8. If the user asks to CREATE an importable HBBA Scenario, do not improvise it from this abbreviated Context Pack: use the separate Guided Session MASTER Prompt.");
    push("9. If you suggest a Director command, use only verified literal IDs/paths and never claim the command was already executed locally.");
    push("10. For high-stakes medical/legal/diagnostic conclusions, do not extend HBBA beyond its sources and appropriate professional verification.");
    push("");
    push("Example-analysis format:");
    push("- Observable facts");
    push("- Compatible nodes/relations in the current graph");
    push("- Alternative explanations");
    push("- Unknowns / discriminating observations");
    push("- Limits of relation grades and individual inference");
    push("");
    push("## SCIENTIFIC STATUS");
    push("");
    push(`HBBA Final Release: v${FINAL_RELEASE_STATUS.release}`);
    push(`Scientific Core: v${FINAL_RELEASE_STATUS.core} · FROZEN`);
    push(`Scientific-core evidence/epistemic boundary status: ${FINAL_RELEASE_STATUS.scientificCore}`);
    push(aiText(FINAL_RELEASE_STATUS.en.note));
    push(aiText(FINAL_RELEASE_STATUS.en.scope));
    push(aiText(FINAL_RELEASE_STATUS.en.warning));
    push("");
    push("Final experiments: Challenge v1.0.1 = EVIDENCE_AGAINST universal reasoning enhancement; Composition v1.3.0 = NEUTRAL_TOPOLOGY_EFFECT (FLAT 60/60, GRAPH 60/60). Real-world predictive validity of compositions = UNTESTED.");
    push("");
    push("## SELECTED BEHAVIORS");
    push("");
    behaviors.forEach((b,i)=>push(`${i+1}. ${b.name.en} [${b.name.ru}] (id: ${b.id})`));
    push("");
    push("## PLAIN-LANGUAGE SEMANTIC MAP");
    push("");
    macros.forEach((g,i)=>{
      push(`### L${i+1}. ${macroDisplayName(g)}  {${g.id}}`);
      push(aiText(g.description.en));
      push(`Professional entities inside: ${g.members.length}.`);
      push("Contains:");
      g.members.forEach(id=>{
        const n=nodeById.get(id);
        if(n)push(`- ${aiNodeTitle(n)} {${n.id}}`);
      });
      push("");
    });
    push("### Links between semantic groups");
    push("");
    macroEdges.forEach(e=>{
      const a=macroModel.groups.get(e.source),b=macroModel.groups.get(e.target);
      if(!a||!b)return;
      const rels=e.relations?[...e.relations].join(", "):"mixed";
      push(`- ${macroDisplayName(a)} ${relationArrow(e,e.bidirectional)} ${macroDisplayName(b)} | aggregated professional links: ${e.count||1} | relation types: ${rels}`);
    });
    push("");
    push("## PROFESSIONAL ENTITIES");
    push("");
    atomicIds.forEach((id,i)=>{
      const n=nodeById.get(id);if(!n)return;
      const l=n.layman?.en;
      push(`### P${i+1}. ${n.name.en} [${n.name.ru}] {${n.id}}`);
      push(`Type: ${I.en.types[n.type]||n.type}`);push(`Claim layer: ${nodeLayerLabel(n)} | claim_kind: ${n.claim_kind||"—"}`);
      push(`Plain name: ${l?.name||n.name.en}`);
      push(`What it is: ${aiText(l?.what||n.description.en)}`);
      if(l?.looks)push(`How it appears: ${aiText(l.looks)}`);
      if(l?.trigger)push(`Typical trigger: ${aiText(l.trigger)}`);
      if(l?.purpose)push(`Functional role: ${aiText(l.purpose)}`);
      if(l?.may_lead)push(`May lead to: ${aiText(l.may_lead)}`);
      if(l?.caveat)push(`Interpretation caveat: ${aiText(l.caveat)}`);
      push("");
    });
    push("## DIRECTED PROFESSIONAL LINKS");
    push("");
    collapsed.forEach((e,i)=>{
      const a=nodeById.get(e.source),b=nodeById.get(e.target);
      if(!a||!b)return;
      push(`${i+1}. ${a.name.en} {${a.id}} ${relationArrow(e,e.bidirectional)} ${b.name.en} {${b.id}} | relation_type: ${edgeRelationType(e)} | audit: ${edgeAuditGrade(e)}`);
    });
    push("");
    push("## RELATION SEMANTICS");
    push("");
    Object.entries(D.relation_meta||{}).forEach(([id,m])=>push(`- ${id}: ${m.en?.label||id} — ${m.en?.meaning||""}`));
    push("");
    push("## SOURCES / SCIENTIFIC FRAMEWORKS");
    push("");
    sources.forEach((s,i)=>{
      push(`${i+1}. ${s.title}`);
      if(s.scope?.en)push(`   Role: ${s.scope.en}`);
      push(`   ${s.url}`);
    });
    push("");
    push("## EXPORT LIMITATIONS");
    push("");
    push("- This is a mechanism model, not a description of a specific person.");
    push("- Group-level findings do not automatically justify individual inference.");
    push("- Presence of a node does not mean it is active in every episode.");
    push("- Line semantics are defined by relation_type: implemented_by / participates_in / associated_with are not temporal causality; X means reviewed-but-unresolved/insufficient/underspecified.");
    push("- An isolated node may indicate incomplete graph connectivity rather than a truly isolated mechanism.");
    push("- A relation grade applies only to that typed edge; do not transfer it to neighboring constructs or an individual episode.");
    push("");
    push("## START OF DIALOGUE");
    push("");
    push("Confirm that you have read the structure. Briefly name the selected behaviors and semantic groups. Then wait for a concrete example or question; do not invent an episode. Use the separate Guided Session MASTER Prompt for an importable Scenario.");
  }

  return out.join("\n");
}

function buildBehaviorRuntimeModel(){
  if(!window.BehaviorRuntimeCompiler){
    return {schema:"HBBA-BEHAVIOR-RUNTIME-1",validation:{ok:false,errors:["COMPILER_NOT_LOADED"],warnings:[]}};
  }
  return window.BehaviorRuntimeCompiler.compile({
    version:D.version,language:lang,nodes:D.nodes,edges:D.edges,behaviors:D.behaviors,
    selectedBehaviorIds:[...selected],relationMeta:D.relation_meta||{}
  });
}

function buildStructuralGraphContext(){
  if(!selected.size){
    return lang==="ru"
      ? "# HBBA — Structural Graph Context\n\nГраф не выбран."
      : "# HBBA — Structural Graph Context\n\nNo graph is selected.";
  }
  const {allIds}=getActive();
  const activeSet=new Set(allIds);
  const edges=D.edges.filter(e=>activeSet.has(e.source)&&activeSet.has(e.target));
  const usedRelationTypes=[...new Set(edges.map(edgeRelationType))];
  const out=[],push=(s="")=>out.push(s);
  push("# HBBA — STRUCTURAL GRAPH CONTEXT");
  push("");
  push(`HBBA version: ${D.version}`);
  push(`Language: ${lang}`);
  push("Selection labels: intentionally omitted. Derive all analysis/behavior from the graph structure below, never from behavior names.");
  push("");
  push("## NODES");
  push("");
  allIds.forEach(id=>{
    const n=nodeById.get(id); if(!n)return;
    const name=n.name?.[lang]||n.name?.en||id;
    const desc=n.description?.[lang]||n.description?.en||"";
    const caveat=n.layman?.[lang]?.caveat||n.layman?.en?.caveat||"";
    push(`- ${id} | type=${n.type||"unknown"} | layer=${n.analysis_layer||"unknown"} | claim_kind=${n.claim_kind||"unknown"} | name=${name}`);
    if(desc)push(`  description: ${aiText(desc)}`);
    if(caveat)push(`  caveat: ${aiText(caveat)}`);
  });
  push("");
  push("## DIRECTED EDGES");
  push("");
  edges.forEach((e,i)=>{
    push(`${i+1}. ${e.source} > ${e.target} | relation_type=${edgeRelationType(e)} | audit_grade=${edgeAuditGrade(e)} | audit_status=${e.audit_status||"audited"} | temporal_scope=${e.temporal_scope||"unspecified"}`);
  });
  push("");
  push("## RELATION SEMANTICS");
  push("");
  usedRelationTypes.forEach(id=>{
    const m=D.relation_meta?.[id]?.[lang]||D.relation_meta?.[id]?.en;
    push(`- ${id}: ${m?.label||id} — ${m?.meaning||""}`);
  });
  push("");
  push("## EPISTEMIC CONSTRAINTS");
  push("");
  push("- Use only the literal nodes and directed edges listed above.");
  push("- Behavior-selection names are deliberately absent and must not be reconstructed or used as persona instructions.");
  push("- A/B/C/D/X are editorial evidence statuses of typed edges, not probabilities or response-intensity weights. X means reviewed but unresolved/insufficient/underspecified.");
  push("- associated_with does not provide causal direction; graph membership does not imply temporal order.");
  push("- Neural/physiology nodes are model constructs or measurement-supported claims, not proof of a real hidden state in a person or in the AI.");
  push("- Do not invent missing transitions, paths, actors, measurements, motives, or outcomes.");
  return out.join("\n");
}

function transferCurrentGraphToTool(url){
  const target=String(url||"");
  try{sessionStorage.setItem("hbba_ui_lang",lang)}catch(_e){}
  const behavioral=/^(?:ai-behavioral-runtime|ai-graph-runtime|ai-behavior)\.html(?:[?#]|$)/.test(target);
  const structural=/^ai-bridge\.html(?:[?#]|$)/.test(target);
  if(!selected.size){alert(lang==="ru"?"Сначала выберите хотя бы одно поведение, чтобы сформировать граф.":"Select at least one behavior to build a graph first.");return false;}
  const payload={hbba_graph_version:D.version,created_at:new Date().toISOString()};
  try{
    if(behavioral){
      const model=buildBehaviorRuntimeModel();
      if(!model?.validation?.ok){
        const msg=(model?.validation?.errors||[]).join("; ")||"unknown runtime compiler error";
        alert((lang==="ru"?"Behavioral Runtime не прошёл integrity validation: ":"Behavioral Runtime failed integrity validation: ")+msg);
        return false;
      }
      const json=JSON.stringify(model);
      payload.hbba_behavior_runtime=model;
      sessionStorage.setItem("hbba_behavior_runtime",json);
      sessionStorage.setItem("hbba_graph_version",D.version);
    }else if(structural){
      const context=buildStructuralGraphContext();
      payload.hbba_graph_context=context;
      sessionStorage.setItem("hbba_graph_context",context);
      sessionStorage.setItem("hbba_graph_version",D.version);
    }else{
      const context=buildAIContextPack();
      payload.hbba_graph_context=context;
      sessionStorage.setItem("hbba_graph_context",context);
      sessionStorage.setItem("hbba_graph_version",D.version);
    }
  }catch(_e){}
  try{window.name=JSON.stringify(payload)}catch(_e){}
  window.location.href=target;return true;
}

function fillAIExport(){
  const text=buildAIContextPack();
  const area=$("#aiExportText");
  area.value=text;
  const lines=text.split("\n").length;
  const chars=text.length;
  $("#aiExportStats").textContent=lang==="ru"
    ? `${lines} строк • ${chars.toLocaleString("ru-RU")} знаков`
    : `${lines} lines • ${chars.toLocaleString("en-US")} characters`;
}

async function copyAIExportText(){
  const area=$("#aiExportText");
  const text=area.value;
  let ok=false;

  try{
    if(navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(text);
      ok=true;
    }
  }catch(_){}

  if(!ok){
    area.focus();
    area.select();
    try{ok=document.execCommand("copy")}catch(_){}
    area.setSelectionRange(0,0);
  }

  const btn=$("#copyAIExport");
  const original=btn.querySelector("b").textContent;
  btn.querySelector("b").textContent=ok
    ? (lang==="ru"?"Скопировано":"Copied")
    : (lang==="ru"?"Выделите и скопируйте":"Select and copy");
  setTimeout(()=>btn.querySelector("b").textContent=original,1400);
}

function downloadAIExportText(){
  const text=$("#aiExportText").value;
  const names=[...selected].map(id=>behaviorById.get(id)?.name.en||id).filter(Boolean)
    .map(s=>s.toLowerCase().replace(/[^a-z0-9а-яё]+/gi,"-").replace(/^-|-$/g,""))
    .slice(0,4);
  const base=names.join("_")||"graph";
  const blob=new Blob([text],{type:"text/markdown;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download=`HBBA_${base}_AI_Context.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

const aiExportDialog=$("#aiExportDialog");
$("#aiExportBtn").addEventListener("click",()=>{
  fillAIExport();
  aiExportDialog.showModal();
});
$("#closeAIExport").addEventListener("click",()=>aiExportDialog.close());
aiExportDialog.addEventListener("click",e=>{if(e.target===aiExportDialog)aiExportDialog.close()});
$("#copyAIExport").addEventListener("click",copyAIExportText);
$("#downloadAIExport").addEventListener("click",downloadAIExportText);



$("#guidedTourPrev").addEventListener("click",()=>goGuidedTourStep(guidedTourIndex-1));
$("#guidedTourNext").addEventListener("click",()=>{
  if(guidedTourIndex<guidedTourSteps.length-1)goGuidedTourStep(guidedTourIndex+1);
});
$("#guidedTourOverview").addEventListener("click",showGuidedTourOverview);
$("#guidedTourExit").addEventListener("click",exitGuidedTour);
$("#restartTourBtn").addEventListener("click",()=>{if(guidedTourSteps.length&&(activeScenario?.active_nodes||[]).length)startGuidedTour()});


function renderHelpLegend(focusRelation=null){
  const body=$("#helpBody");if(!body)return;const ru=lang==="ru",used=[...new Set(D.edges.map(edgeRelationType))],allRelations=Object.keys(D.relation_meta||{});
  const relations=allRelations.map(r=>{const m=D.relation_meta[r]?.[lang]||D.relation_meta[r]?.en;const nonMeaning=({may_influence:ru?"Не означает, что A всегда вызывает B или что B доказывает A.":"Does not mean A always causes B or that B proves A.",modulates:ru?"Не означает запуск B или достаточность A.":"Does not mean A initiates B or is sufficient for B.",computational_input:ru?"Не является сама по себе временной причинной стрелкой.":"Is not by itself a temporal causal arrow.",participates_in:ru?"Не означает, что компонент исключительно принадлежит только этой сети.":"Does not mean the component belongs exclusively to this network.",produces_output:ru?"Не приписывает выходу скрытый мотив или социальный смысл.":"Does not assign hidden motive or social meaning to the output.",requires_motor_output:ru?"Не означает, что моторный выход кодирует смысл атаки/помощи/ухода.":"Does not mean motor output encodes attack/help/withdrawal semantics.",updates:ru?"Не читать как мгновенную петлю: это t→t+1 / across-time.":"Do not read as an instantaneous loop: this is t→t+1 / across-time.",associated_with:ru?"Не задаёт причинного направления.":"Does not specify causal direction."})[r]||(ru?"Не считать доказанной причинностью без отдельного evidence audit.":"Do not treat as proven causality without dedicated evidence audit.");return `<article id="help-rel-${esc(r)}" class="help-rel-card"><div class="help-rel">${relationSampleSvg(r)}<b>${esc(r)}</b><em>${used.includes(r)?(ru?"используется":"used"):(ru?"reserved · сейчас 0 рёбер":"reserved · 0 current edges")}</em></div><h4>${esc(m?.label||r)}</h4><p><b>${ru?"Что означает":"Meaning"}:</b> ${esc(m?.meaning||"")}</p><p><b>${ru?"Чего НЕ означает":"Does NOT mean"}:</b> ${esc(nonMeaning)}</p><small>${ru?"Evidence grade относится только к этой стрелке; evidence/epistemic boundary: INDEPENDENTLY ACCEPTED at v0.7.0.24; это не effectiveness verdict.":"Evidence grade applies only to this edge; evidence/epistemic boundary: INDEPENDENTLY ACCEPTED at v0.7.0.24; this is not an effectiveness verdict."}</small></article>`}).join("");
  const measurements=Object.entries(D.measurement_registry||{}).map(([id,c])=>`<details class="measurement-help-card"><summary><code>${esc(id)}</code><span>${esc(c[ru?"ru":"en"]||"")}</span></summary><div class="measurement-help-grid"><p><b>${ru?"Совместимость":"Compatibility"}</b><br>${esc((c.compatible_nodes||c.compatible_layers||[]).join(", "))}</p><p><b>Units</b><br>${esc((c.units||[]).join(", ")||"—")}</p><p class="wide"><b>Source → provenance</b><br>${esc(Object.entries(c.sources||{}).map(([k,v])=>`${k} → ${v.join("/")}`).join("; "))}</p><p class="wide"><b>${ru?"Граница интерпретации":"Interpretation boundary"}</b><br>${esc(c[ru?"note_ru":"note_en"]||"")}</p>${c.computation_id_required?`<p class="wide computation-note"><b>computation_id</b><br>${ru?"Заявленный идентификатор вычисления; сам по себе не доказывает существование или корректность внешнего computation record.":"Declared computation identifier; by itself it does not verify an external computation record or its correctness."}</p>`:""}</div></details>`).join("");
  const sections=[
    ["quick_start",ru?"1. Быстрый старт: как читать одну карту":"1. Quick start: reading a map",ru?`Начинайте с <b>наблюдаемого</b>, затем смотрите на гипотезы и только потом на общие neural/physiology mappings. Красивый путь по графу не является доказанной причинной реконструкцией. Тип линии задаёт смысл связи; Evidence grade показывает reviewed evidence status конкретной стрелки, а не вероятность истины.`:`Start with <b>observed</b> facts, then hypotheses, then general neural/physiology mappings. A visually coherent graph path is not a proven causal reconstruction. Line type defines semantics; Evidence grade is a reviewed evidence status for a specific edge, not a probability of truth.`],
    ["modes",ru?"2. Режимы Обыватель / Комбо / Профи":"2. Layman / Combined / Professional modes",ru?`<b>Обыватель:</b> понятные смысловые контейнеры, которые агрегируют профессиональные сущности. <b>Комбо:</b> профессиональный граф плюс смысловые контейнеры. <b>Профи:</b> атомарная онтология. Макроузел и макроребро не создают новую доказанную причинность.`:`<b>Layman:</b> understandable semantic containers aggregating professional entities. <b>Combined:</b> professional graph plus semantic containers. <b>Professional:</b> atomic ontology. Macro nodes/edges do not create new proven causality.`],
    ["nodes_layers",ru?"3. Ноды и уровни анализа":"3. Nodes and analysis layers",ru?`<b>Context</b> — внешняя/кодируемая ситуация. <b>Observed</b> — действие/исход, который можно операционализировать. <b>Psychological</b> — латентная гипотеза, если нет подходящего измерения. <b>Neural</b> — общая реализация или measurement-supported claim. <b>Physiology</b> — model mapping либо measurement-supported. <b>Learning</b> — вычислительные/временные переменные. Нода мозга не означает, что эта область была активна у конкретного человека.`:`<b>Context</b> — external/codable situation. <b>Observed</b> — operationalizable action/outcome. <b>Psychological</b> — latent hypothesis unless supported by an appropriate measurement. <b>Neural</b> — general implementation or measurement-supported claim. <b>Physiology</b> — model mapping or measurement-supported. <b>Learning</b> — computational/temporal variables. A brain node does not mean that region was active in a specific person.`],
    ["reciprocal_time",ru?"5. Взаимная динамика и время":"5. Reciprocal dynamics and time",ru?`Пары вроде perception ↔ attention и threat appraisal ↔ jealousy имеют metadata <b>reciprocal_dynamic</b>. Их нельзя читать как «A мгновенно вызывает B, а B мгновенно вызывает A». <b>updates</b> всегда показывает изменение через время, например Value(t) → learning → Value(t+1).`:`Pairs such as perception ↔ attention and threat appraisal ↔ jealousy carry <b>reciprocal_dynamic</b> metadata. Do not read them as instantaneous circular causation. <b>updates</b> denotes change across time, e.g. Value(t) → learning → Value(t+1).`],
    ["evidence",ru?"6. Evidence A–D / X":"6. Evidence A–D / X",ru?`В v0.7.0.28 <b>101/101 базовых рёбер прошли relation-level review</b>: A 3 · B 58 · C 27 · D 0 · X 13. X здесь означает reviewed-but-insufficient/underspecified, а не «не проверено». Это редакционные статусы конкретных стрелок HBBA, не вероятность истины и не clinical GRADE. Scientific Evidence / epistemic boundary независимо принят в v0.7.0.24; scientific core frozen. Это не behavioral-effectiveness verdict. Финальные benchmark-результаты: Challenge v1.0.1 = EVIDENCE_AGAINST универсального reasoning-усиления; Composition v1.3.0 = NEUTRAL_TOPOLOGY_EFFECT (60/60 FLAT и 60/60 GRAPH).`:`In v0.7.0.28 <b>101/101 base edges received relation-level review</b>: A 3 · B 58 · C 27 · D 0 · X 13. Here X means reviewed-but-insufficient/underspecified, not “not reviewed”. These are HBBA editorial statuses for specific edges, not probabilities and not clinical GRADE. The Scientific Evidence / epistemic boundary was independently accepted in v0.7.0.24 and the scientific core is frozen. This is not a behavioral-effectiveness verdict. Final benchmark results: Challenge v1.0.1 = EVIDENCE_AGAINST universal reasoning enhancement; Composition v1.3.0 = NEUTRAL_TOPOLOGY_EFFECT (60/60 FLAT and 60/60 GRAPH).`],
    ["scenario",ru?"7. Scenario-3 и inference status":"7. Scenario-3 and inference status",ru?`Validator 4.4.3 проверяет ids, actor ownership, claim_scope, base edges, measurement contracts и evidence refs. <b>observations_consistent_with_model</b> означает только структурную совместимость выбранной модели с указанными наблюдениями; <b>ambiguous</b> — остаются альтернативы; <b>insufficient_data</b> — данных недостаточно; <b>contradicted_by_observation</b> требует конкретных contradict refs. Статус не является диагнозом или вычисленной вероятностью.`:`Validator 4.4.3 checks IDs, actor ownership, claim scope, base edges, measurement contracts, and evidence refs. <b>observations_consistent_with_model</b> means only structural compatibility of the selected model with referenced observations; <b>ambiguous</b> preserves alternatives; <b>insufficient_data</b> means insufficient data; <b>contradicted_by_observation</b> requires explicit contradict refs. Status is not a diagnosis or computed probability.`],
    ["measurement",ru?"8. Measurement-supported claims — Contract 3.1":"8. Measurement-supported claims — Contract 3.1",ru?`Термин <b>measurement-supported</b> означает: claim привязан к типизированному измерению. Это не означает, что измеряется весь скрытый механизм напрямую. Validator проверяет modality × source_type × provenance, measured_node_id, subject_actor, episode/trial, timestamp, payload и unit. BOLD/PET остаются modality-specific proxies, а HR/pupil не доказывают конкретную эмоцию. computation_id — только заявленный идентификатор вычисления (declared provenance handle), а не независимо проверенный computation record. Сам объект measurement является структурированной записью импортированного сценария: Validator проверяет её внутреннюю согласованность, но не подтверждает независимо существование внешнего прибора, файла, лабораторной записи или dataset.`:`<b>Measurement-supported</b> means a claim is tied to a typed measurement. It does not mean the entire hidden mechanism is measured directly. Validator checks modality × source_type × provenance, measured_node_id, subject_actor, episode/trial, timestamp, payload and unit. BOLD/PET remain modality-specific proxies, while HR/pupil do not prove a specific emotion. computation_id is only a declared computation provenance handle, not an independently verified computation record. The measurement object itself is a structured record supplied by the imported scenario: the Validator checks internal consistency but does not independently verify that an external device, file, laboratory record, or dataset actually existed.`],
    ["multi_actor",ru?"9. Multi-Actor и interaction links":"9. Multi-Actor and interaction links",ru?`Индивидуальные actions/outcomes/hidden claims должны принадлежать actor. Между людьми базовые scientific edges не телепортируют скрытые состояния. Межакторные relations communication / observed_signal / action_on_other / feedback / coordination требуют двух наблюдаемых endpoints, actor ownership на обоих концах и двух разных actors. Actorless context не является communication: для него используются shared_context / environmental_change по отдельным правилам. Same-actor interpersonal link запрещён и должен быть оформлен внутри структуры одного actor. Capability non-person actors определяется самой онтологией HBBA, а не флагом импорта.`:`Individual actions/outcomes/hidden claims must belong to an actor. Base scientific edges do not teleport hidden states between people. Interpersonal communication / observed_signal / action_on_other / feedback / coordination require two observable endpoints, actor ownership on both ends, and two different actors. Actorless context is not communication; shared_context / environmental_change follow separate contracts. Same-actor interpersonal links are rejected and belong inside a single actor's scenario structure. Non-person actor capabilities are defined by HBBA ontology, not importer flags.`],
    ["validated_vs_narrative",ru?"10. VALIDATED STRUCTURE vs UNVALIDATED NARRATIVE":"10. VALIDATED STRUCTURE vs UNVALIDATED NARRATIVE",ru?`<b>VALIDATED STRUCTURE</b> означает только, что структурные поля прошли Validator. <b>AI NARRATIVE · UNVALIDATED</b> — Scenario title/summary, role, reason, Tour title/narration/look-at и другой свободный язык. Текст может быть полезным объяснением, но сам по себе не получает научный статус.`:`<b>VALIDATED STRUCTURE</b> means only that structural fields passed Validator. <b>AI NARRATIVE · UNVALIDATED</b> includes Scenario title/summary, role, reason, Tour title/narration/look-at, and other free language. Narrative may be useful, but it does not acquire scientific status by itself.`],
    ["guided_tour",ru?"11. Guided Tour":"11. Guided Tour",ru?`Экскурсия фокусирует ноды и рёбра, но её текст всегда помечен <b>AI NARRATIVE · UNVALIDATED</b>. Фокус ноды не означает, что claim доказан. Кнопка Restart Tour запускает текущие tour_steps сценария.`:`The tour focuses nodes and edges, but its prose is always marked <b>AI NARRATIVE · UNVALIDATED</b>. Focusing a node does not prove its claim. Restart Tour runs the current scenario tour_steps.`],
    ["director",ru?"12. Director":"12. Director",ru?`Director — локальная навигация по уже существующим literal ID/рёбрам. Допустимы только команды из grammar, указанной в MASTER Prompt; NODE/FOCUS требуют существующий ID, PATH — существующую направленную base edge. ИИ может <b>предложить</b> команду, но не должен утверждать, что локальная страница её уже выполнила, если у него нет реального UI-tool/API.`:`Director is local navigation over existing literal IDs/edges. Only commands from the MASTER Prompt grammar are valid; NODE/FOCUS require an existing ID and PATH requires an existing directed base edge. An AI may <b>suggest</b> a command but must not claim the local page already executed it without a real UI tool/API.`],
    ["behavior_shift",ru?"13. Behavior Shift":"13. Behavior Shift",ru?`Graph overlap = только структурное сходство наборов нод/макроузлов/рёбер. Это <b>не вероятность изменения</b>, не effectiveness, не рекомендация «что сработает» и не прогноз/гарантия реакции другого человека. Любая AI-интерпретация Behavior Shift обязана описывать structural diff и ограничения, а не превращать overlap в causal intervention score.`:`Graph overlap is only structural similarity of node/macro/edge sets. It is <b>not a probability of change</b>, effectiveness estimate, a claim about “what will work”, or a prediction/guarantee of another person's response. Any AI interpretation of Behavior Shift must describe the structural diff and its limits rather than convert overlap into a causal intervention score.`],
    ["macro_aggregation",ru?"14. Macro aggregation":"14. Macro aggregation",ru?`Обывательское макроребро агрегирует несколько professional edges. Если underlying relation types различаются, aggregate консервативно становится associated_with. Даже однородная may_influence aggregation остаётся агрегатом нескольких отношений, а не одной новой причинной закономерностью.`:`A layman macro edge aggregates multiple professional edges. If underlying relation types differ, the aggregate is conservatively associated_with. Even homogeneous may_influence aggregation remains an aggregate of several relations, not a new causal law.`],
    ["controls",ru?"15. Элементы интерфейса":"15. Interface controls",ru?`<b>Вместить</b> — вписать граф; <b>Общие</b> — выделить общие механизмы выбранных behaviors; <b>Подписи</b> — показать/скрыть названия; <b>Evidence</b> — фильтр по grade; <b>📌 Снять все</b> — очистить закреплённый фокус; <b>Как читать карту</b> — этот manual; <b>AI-контекст</b> — экспорт графа; <b>Сценарий</b> — загрузка .json или ручной импорт SCENARIO-3; <b>Директор</b> — локальный фокус; <b>Трансформировать</b> — structural Behavior Shift.`:`<b>Fit</b> — fit graph; <b>Shared</b> — highlight shared mechanisms across selected behaviors; <b>Labels</b> — show/hide labels; <b>Evidence</b> — grade filter; <b>📌 Clear pins</b> — clear persistent focus; <b>How to read the map</b> — this manual; <b>AI context</b> — graph export; <b>Scenario</b> — load a .json file or paste SCENARIO-3; <b>Director</b> — local focus; <b>Transform</b> — structural Behavior Shift.`],
    ["ai_bridge",ru?"16. AI Bridge / Guided Session / AI Behavioral Runtime":"16. AI Bridge / Guided Session / AI Behavioral Runtime",ru?`<b>AI Bridge</b> получает фактический текущий граф из Atlas и создаёт Prompt для анализа выбранной пользователем темы строго через этот граф; Single/Multi-Actor examples удалены. <b>Guided Session</b> остаётся отдельным state machine для Scenario: факты → .json → локальный импорт → STOP → «загрузил» → ровно один tour_step за ответ. <b>AI Behavioral Runtime</b> детерминированно компилирует текущий граф в runtime policy: functional layers, literal edges, relation semantics, traversal, feedback loops и provenance. Названия behaviors остаются только metadata/provenance и не управляют policy.`:`<b>AI Bridge</b> receives the actual current graph from Atlas and builds a prompt for analyzing a user-chosen topic strictly through that graph; Single/Multi-Actor examples are removed. <b>Guided Session</b> remains the separate Scenario state machine: facts → .json → local import → STOP → “loaded” → exactly one tour_step per response. <b>AI Behavioral Runtime</b> deterministically compiles the current graph into a runtime policy: functional layers, literal edges, relation semantics, traversal, feedback loops, and provenance. Behavior names remain metadata/provenance only and do not control the policy.`],
    ["import_export",ru?"17. Импорт / экспорт":"17. Import / export",ru?`Экспорт описывает текущую модель и audit status. Scenario Import принимает локальный .json-файл или ручную вставку; файл не отправляется в сеть. Импорт не имеет права сам назначать capability flags или confidence/likely. Legacy Scenario-1/2 не выполняются напрямую в Scientific/Public mode.`:`Export describes the current model and audit status. Scenario Import accepts a local .json file or manual paste; the file is not uploaded to a server. Import cannot self-assign capability flags or confidence/likely. Legacy Scenario-1/2 are not executed directly in Scientific/Public mode.`],
    ["misinterpretations",ru?"18. Типичные ошибки интерпретации":"18. Common interpretation errors",ru?`Нельзя читать: «ушёл → боялся», «зрачок расширился → SNS/тревога доказаны», «в карте есть amygdala → у человека она активна», «associated_with → вызывает», «X-edge → научно подтверждено», «graph overlap high → человек с высокой вероятностью изменится». Правильная HBBA сохраняет альтернативы и умеет остановиться на insufficient_data.`:`Do not read: “withdrew → was afraid”, “pupil dilated → SNS/anxiety proven”, “amygdala is on the map → it was active in this person”, “associated_with → causes”, “X edge → scientifically confirmed”, or “high graph overlap → high probability of behavior change”. Proper HBBA preserves alternatives and can stop at insufficient_data.`]
  ];
  body.innerHTML=`<div class="help-toc"><div><span class="eyebrow">HBBA USER MANUAL · ${ru?"RU":"EN"} · v${esc(D.help_meta?.version||D.version)}</span><h2>${ru?"Как читать HBBA":"How to read HBBA"}</h2><p>${ru?"Легенда открывается поверх карты и не уменьшает рабочую область; здесь — полный справочник по интерфейсу и научной семантике.":"The legend opens as an overlay without shrinking the graph; this is the full guide to interface and scientific semantics."}</p></div><div class="help-toc-links">${sections.map(([id,title])=>`<a href="#help-${id}">${esc(title)}</a>`).join("")}<a href="#help-relations">${ru?"4. Все типы линий":"4. All line types"}</a></div></div>`+
  sections.slice(0,3).map(([id,title,html])=>`<section id="help-${id}" class="help-section manual"><h3>${title}</h3><div>${html}</div></section>`).join("")+
  `<section id="help-relations" class="help-section manual"><h3>${ru?"4. Все типы линий / стрелок":"4. All line / arrow types"}</h3><p>${ru?"Образец слева соответствует визуальной семантике графа. Наконечник и штриховка имеют смысл; обычная стрелка не равна автоматически доказанной причинности.":"The sample at left matches graph semantics. Arrowheads and dash patterns carry meaning; an arrow is not automatically proven causality."}</p><div class="help-grid">${relations}</div></section>`+
  sections.slice(3,7).map(([id,title,html])=>`<section id="help-${id}" class="help-section manual"><h3>${title}</h3><div>${html}</div></section>`).join("")+
  `<section class="help-section manual"><h3>${ru?"Measurement registry — допустимые контракты":"Measurement registry — allowed contracts"}</h3><p>${ru?"Нажмите на modality, чтобы раскрыть совместимость, provenance, единицы и границы интерпретации.":"Open a modality to see compatibility, provenance, units, and interpretation boundaries."}</p><div class="measurement-help-list">${measurements}</div></section>`+
  sections.slice(7).map(([id,title,html])=>`<section id="help-${id}" class="help-section manual"><h3>${title}</h3><div>${html}</div></section>`).join("");
  if(focusRelation){requestAnimationFrame(()=>document.getElementById(`help-rel-${focusRelation}`)?.scrollIntoView({block:"center"}))}
}
$("#helpBtn")?.addEventListener("click",()=>{renderHelpLegend();$("#helpDialog")?.showModal()});
$("#openFullHelpBtn")?.addEventListener("click",()=>{renderHelpLegend();$("#helpDialog")?.showModal()});
$("#closeHelp")?.addEventListener("click",()=>$("#helpDialog")?.close());
window.HBBA_LIVE={
  version:"HBBA-LIVE-1",validatorVersion:"4.4.3",
  tourGo(stepNumber){goGuidedTourStep(Math.max(0,Number(stepNumber)-1));},
  tourNext(){if(guidedTourIndex<guidedTourSteps.length-1)goGuidedTourStep(guidedTourIndex+1);},
  tourPrev(){if(guidedTourIndex>0)goGuidedTourStep(guidedTourIndex-1);},
  tourOverview:showGuidedTourOverview,
  tourExit:exitGuidedTour,
  focusNodes(ids){directorFocus(Array.isArray(ids)?ids:[],[],Array.isArray(ids)?ids[0]:null);},
  focusPath(ids){directorPath(Array.isArray(ids)?ids:[]);},
  showNode(id){if(nodeById.has(id)||scenarioResolveInstance(id))directorFocus([id],[],id);},
  resumeTour:directorResume,
  clearFocus:directorClear,
  togglePin(key){return togglePin(String(key||""));},
  clearPins,
  command(text){return runDirectorCommand(text);},
  validateScenario(obj){const n=normalizeScenarioCompat(obj),r=validateScenarioObject(n.obj),errors=[...n.rawIdErrors,...r.errors];return {normalized:n.obj,conversions:n.conversions,...r,ok:errors.length===0,errors};},
  validateOntology(){return validateOntologySemantics();},
  structuralGraphContext(){return buildStructuralGraphContext();},
  behaviorRuntimeModel(){return buildBehaviorRuntimeModel();},
  state(){return {scenario:activeScenario?.title||null,tourActive:guidedTourActive,directorActive,step:guidedTourIndex+1,total:guidedTourSteps.length,viewMode,multiActor:hasMultiActorScenario(activeScenario),pinKeys:[...pinnedKeys],evidenceGrades:[...evidenceGradesVisible],measurementModalities:Object.keys(D.measurement_registry||{}),helpVersion:D.help_meta?.version,ontology:validateOntologySemantics()};}
};

const scenarioImportDialog=$("#scenarioImportDialog");
$("#scenarioImportBtn").addEventListener("click",()=>{
  $("#scenarioValidation").innerHTML="";
  $("#applyScenarioBtn").disabled=true;
  validatedScenario=null;
  const fi=$("#scenarioFileInput");if(fi)fi.value="";
  const fs=$("#scenarioFileStatus");if(fs){fs.className="scenario-file-status";fs.textContent=t("scenarioFileHint");}
  scenarioImportDialog.showModal();
});
$("#closeScenarioImport").addEventListener("click",()=>scenarioImportDialog.close());
scenarioImportDialog.addEventListener("click",e=>{if(e.target===scenarioImportDialog)scenarioImportDialog.close()});
const SCENARIO_FILE_MAX_BYTES=2*1024*1024;
function resetScenarioValidationState(){
  $("#scenarioValidation").innerHTML="";
  $("#applyScenarioBtn").disabled=true;
  validatedScenario=null;
}
async function loadScenarioJsonFile(file){
  const status=$("#scenarioFileStatus");
  if(!file)return false;
  resetScenarioValidationState();
  if(file.size>SCENARIO_FILE_MAX_BYTES){
    status.className="scenario-file-status err";status.textContent=t("scenarioFileTooLarge");return false;
  }
  try{
    let text=await file.text();
    if(text.charCodeAt(0)===0xFEFF)text=text.slice(1); // top-level UTF-8 BOM only; raw-ID guards still apply inside JSON.
    $("#scenarioImportText").value=text;
    status.className="scenario-file-status ok";status.textContent=`${t("scenarioFileLoaded")}: ${file.name} · ${file.size.toLocaleString()} B`;
    return true;
  }catch(err){
    status.className="scenario-file-status err";status.textContent=`${t("scenarioFileReadError")}: ${err?.message||err}`;return false;
  }
}
$("#scenarioFileInput").addEventListener("change",async e=>{const file=e.target.files?.[0];await loadScenarioJsonFile(file)});
$("#scenarioImportText").addEventListener("input",()=>{
  if(validatedScenario||!$("#applyScenarioBtn").disabled)resetScenarioValidationState();
});
$("#validateScenarioBtn").addEventListener("click",()=>{
  const out=$("#scenarioValidation");let obj;
  try{obj=JSON.parse($("#scenarioImportText").value)}
  catch(err){
    out.className="scenario-validation invalid";
    out.textContent=(lang==="ru"?"Ошибка JSON: ":"JSON error: ")+err.message;
    $("#applyScenarioBtn").disabled=true;validatedScenario=null;return;
  }
  const normalized=normalizeScenarioCompat(obj);
  obj=normalized.obj;
  const semanticResult=validateScenarioObject(obj);
  const result={...semanticResult,errors:[...normalized.rawIdErrors,...semanticResult.errors],ok:normalized.rawIdErrors.length===0&&semanticResult.ok};
  if(result.ok){
    validatedScenario=obj;$("#applyScenarioBtn").disabled=false;
    out.className="scenario-validation valid";
    const compat=normalized.conversions.length
      ? `<div class="scenario-compat-note"><b>${lang==="ru"?"Совместимость:":"Compatibility:"}</b> ${esc(normalized.conversions.join(", "))}</div>`
      : "";
    const ir=result.integrity||scenarioIntegrityReport(obj);
    const integrity=`<div class="scenario-integrity-summary ${ir.components>1?"warning":"ok"}"><b>${lang==="ru"?"Целостность карты":"Map integrity"}:</b> ${ir.activeNodes} ${lang==="ru"?"нод":"nodes"} · ${ir.activeEdges} ${lang==="ru"?"рёбер":"edges"} · ${ir.components} ${lang==="ru"?"компонента(ов)":"component(s)"}${ir.isolated.length?` · ${lang==="ru"?"изолировано":"isolated"}: ${ir.isolated.length}`:""}</div>`;
    out.innerHTML=`<b>${lang==="ru"?"Структура корректна.":"Structure is valid."}</b>`+compat+integrity+
      (result.warnings.length?`<ul>${result.warnings.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`:"");
  }else{
    validatedScenario=null;$("#applyScenarioBtn").disabled=true;
    out.className="scenario-validation invalid";
    const ir=result.integrity||scenarioIntegrityReport(obj);
    out.innerHTML=`<b>${lang==="ru"?"Импорт отклонён Validator 4.4.3.":"Import rejected by Validator 4.4.3."}</b><ul>${result.errors.map(x=>`<li>${esc(x)}</li>`).join("")}</ul>`+
      (result.warnings.length?`<div class="scenario-validation-warnings"><b>${lang==="ru"?"Дополнительные предупреждения":"Additional warnings"}:</b><ul>${result.warnings.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div>`:"");
  }
});
$("#applyScenarioBtn").addEventListener("click",()=>{if(validatedScenario)applyScenario(validatedScenario)});
$("#clearScenarioBtn").addEventListener("click",clearScenario);
$("#scenarioFocusBtn").addEventListener("click",()=>{
  if(!activeScenario)return;
  scenarioFocusMode=!scenarioFocusMode;
  renderScenarioBanner();
  renderGraph();
  if(guidedTourActive)applyGuidedTourVisuals();
});


const behaviorShiftDialog=$("#behaviorShiftDialog");
$("#behaviorShiftBtn").addEventListener("click",()=>openBehaviorShift());
$("#closeBehaviorShift").addEventListener("click",()=>behaviorShiftDialog.close());
behaviorShiftDialog.addEventListener("click",e=>{if(e.target===behaviorShiftDialog)behaviorShiftDialog.close()});
$("#shiftSourceSelect").addEventListener("change",e=>{
  behaviorShiftSource=e.target.value;
  behaviorShiftTarget=null;
  renderShiftTargets();
  renderBehaviorShiftAnalysis();
});
$$(".audience-tab").forEach(btn=>btn.addEventListener("click",()=>{
  behaviorShiftAudience=btn.dataset.audience;
  $$(".audience-tab").forEach(x=>x.classList.toggle("active",x===btn));
  if(behaviorShiftDiff)renderPractice(behaviorShiftDiff);
}));
$("#applyBehaviorShift").addEventListener("click",applyBehaviorTransformation);
$("#clearShiftBtn").addEventListener("click",clearAppliedShift);
$("#reopenShiftBtn").addEventListener("click",()=>{
  if(appliedShiftDiff){
    behaviorShiftSource=appliedShiftDiff.sourceId;
    behaviorShiftTarget=appliedShiftDiff.targetId;
    // Reconstruct the source temporarily in selector context only.
    const current=[...selected];
    const targetWasSelected=selected.has(appliedShiftDiff.targetId);
    if(targetWasSelected)selected.delete(appliedShiftDiff.targetId);
    selected.add(appliedShiftDiff.sourceId);
    openBehaviorShift(appliedShiftDiff.sourceId);
    selected=new Set(current);
    behaviorShiftTarget=appliedShiftDiff.targetId;
    renderShiftTargets();renderBehaviorShiftAnalysis();
  }
});
$("#shiftContextOpen").addEventListener("click",()=>{
  hideShiftContext();
  openBehaviorShift(behaviorShiftSource);
});

$("#graphWrap").addEventListener("contextmenu",e=>{
  if(e.target.closest?.(".behavior-item"))return;
  e.preventDefault();
  showShiftContext(e.clientX,e.clientY,null);
});
document.addEventListener("click",e=>{
  if(!e.target.closest?.("#shiftContextMenu"))hideShiftContext();
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")hideShiftContext()});


const directorDialog=$("#directorDialog");
$("#directorBtn").addEventListener("click",()=>{directorDialog.showModal();$("#directorCommand").focus()});
$("#closeDirector").addEventListener("click",()=>directorDialog.close());
directorDialog.addEventListener("click",e=>{if(e.target===directorDialog)directorDialog.close()});
$$(".director-examples button").forEach(btn=>btn.addEventListener("click",()=>{$("#directorCommand").value=btn.dataset.command||""}));
$("#directorRun").addEventListener("click",()=>{
  const out=$("#directorResult");
  try{
    const c=runDirectorCommand($("#directorCommand").value);
    out.className="director-result ok";
    out.textContent=lang==="ru"?`Команда выполнена: ${c.type}. Карта перевела внимание на нужный участок.`:`Command executed: ${c.type}.`;
  }catch(err){out.className="director-result err";out.textContent=err.message||String(err)}
});
$("#directorResume").addEventListener("click",()=>{
  directorResume();const out=$("#directorResult");out.className="director-result ok";out.textContent=lang==="ru"?"Возвращено состояние экскурсии.":"Tour state restored.";
});

const evidenceDialog=$("#evidenceDialog");
$("#evidenceBtn").addEventListener("click",()=>{renderEvidenceUI();evidenceDialog.showModal()});
$("#closeEvidence").addEventListener("click",()=>evidenceDialog.close());
evidenceDialog.addEventListener("click",e=>{if(e.target===evidenceDialog)evidenceDialog.close()});
$$('[data-evidence-grade]').forEach(ch=>ch.addEventListener("change",()=>{const g=ch.dataset.evidenceGrade;if(ch.checked)evidenceGradesVisible.add(g);else evidenceGradesVisible.delete(g);renderGraph();renderEvidenceUI()}));
$("#showInteractionsCheck").addEventListener("change",e=>{showScenarioInteractions=e.target.checked;renderGraph();renderEvidenceUI()});
renderEvidenceUI();

const edgeAuditDialog=$("#edgeAuditDialog");
$("#closeEdgeAudit").addEventListener("click",()=>edgeAuditDialog.close());
edgeAuditDialog.addEventListener("click",e=>{if(e.target===edgeAuditDialog)edgeAuditDialog.close()});
$("#edges").addEventListener("pointerdown",e=>{if(e.target?.classList?.contains("edge"))e.stopPropagation()});
$("#edges").addEventListener("click",e=>{
  const el=e.target?.closest?.(".edge[data-source][data-target]");if(!el)return;e.stopPropagation();
  if(el.dataset.interaction==="1")showInteractionAudit(el.dataset.source,el.dataset.target,el.dataset.relation,el.dataset.reason);
  else showEdgeAudit(el.dataset.baseSource||el.dataset.source,el.dataset.baseTarget||el.dataset.target);
});

const detailDialog=$("#detailDialog");
$("#expandDetailBtn").addEventListener("click",openDetailLarge);
$("#closeDetailDialog").addEventListener("click",()=>detailDialog.close());
detailDialog.addEventListener("click",e=>{if(e.target===detailDialog)detailDialog.close()});

const dialog=$("#aboutDialog");
$("#aboutBtn").addEventListener("click",()=>{$("#aboutContent").innerHTML=I[lang].about;dialog.showModal()});
$("#closeAbout").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});

function ambient(){
  const c=$("#ambientCanvas"),ctx=c.getContext("2d"),wrap=$("#graphWrap");let pts=[];
  function resize(){const dpr=Math.min(devicePixelRatio||1,2),r=wrap.getBoundingClientRect();c.width=r.width*dpr;c.height=r.height*dpr;c.style.width=r.width+"px";c.style.height=r.height+"px";ctx.setTransform(dpr,0,0,dpr,0,0);pts=Array.from({length:42},()=>({x:Math.random()*r.width,y:Math.random()*r.height,vx:(Math.random()-.5)*.08,vy:(Math.random()-.5)*.08}))}
  function frame(){const r=wrap.getBoundingClientRect();ctx.clearRect(0,0,r.width,r.height);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>r.width)p.vx*=-1;if(p.y<0||p.y>r.height)p.vy*=-1}
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<105){ctx.strokeStyle=`rgba(74,145,185,${(1-d/105)*.08})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}
    for(const p of pts){ctx.fillStyle="rgba(99,203,255,.18)";ctx.beginPath();ctx.arc(p.x,p.y,1,0,Math.PI*2);ctx.fill()}requestAnimationFrame(frame)}
  resize();window.addEventListener("resize",resize);frame()
}

$$('.hbba-graph-transfer').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();transferCurrentGraphToTool(link.getAttribute('href'));}));

ambient();renderSources();renderModeBanner();renderLegend();renderCategories();applyLanguage();
})();