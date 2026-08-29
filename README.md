# HBBA — Human Behavioral Mechanisms Atlas

**Final Release v1.0.1 · Scientific Core v0.7.0.28 (frozen)**  
**Интерактивный научно-образовательный атлас и workbench для формализации, композиции, сравнения и анализа моделей человеческого поведения.**

[Русский](#русский) · [English](#english) · [Открыть интерфейс / Open interface](index.html) · [Исследования / Research](research-results.html)

---

## Русский

### Коротко

HBBA — это не «детектор лжи», не система чтения мыслей и не диагностический ИИ. Это **формальная графовая среда**, в которой поведенческие механизмы представлены как явные узлы, типизированные связи, evidence-grades и композиции. Цель проекта — заменить свободное рассуждение вида «мне кажется, человек делает X потому что Y» на более проверяемую конструкцию:

> **наблюдаемое поведение → выбранные механизмы → явные связи → композиция → возможные пути влияния → проверяемые гипотезы и ограничения**

Главная идея HBBA возникла из практического вопроса: **что происходит, если несколько поведенческих механизмов не рассматривать по отдельности, а собрать в одну систему и посмотреть, какая новая структура возникает между ними?**

Проект постепенно превратился из визуальной карты в двуязычный исследовательский инструмент с замороженным научным ядром, provenance для связей, Scenario/Actor-моделью, AI-интеграцией и двумя крупными экспериментальными программами.

### Текущий научный статус

| Область | Статус |
|---|---|
| Scientific evidence / epistemic boundary | **EVIDENCE-AUDIT-1 / INDEPENDENTLY ACCEPTED** |
| Scientific Core | **v0.7.0.28 · FROZEN** |
| Топология | **81 узел / 101 canonical edge / 39 behaviors** |
| Evidence distribution | **A3 / B58 / C27 / D0 / X13** |
| Универсальное усиление behavioral reasoning LLM | **EVIDENCE_AGAINST** |
| GRAPH против эквивалентного FLAT | **NEUTRAL_TOPOLOGY_EFFECT** |
| Формальная композиция behavior-графов | **SUPPORTED AS STRUCTURAL CAPABILITY** |
| Реальная predictive/causal validity для поведения людей | **UNTESTED** |

**Важно:** `EVIDENCE-AUDIT-1 / INDEPENDENTLY ACCEPTED` означает, что независимо принят именно scientific-evidence / epistemic boundary научного ядра. Это **не** означает, что доказана поведенческая эффективность HBBA, диагностическая валидность, причинное объяснение конкретного человека или универсальное улучшение LLM.

Полная двуязычная страница результатов находится здесь: **[`research-results.html`](research-results.html)**.

---

## 1. Зачем появился HBBA

Исходная проблема была простой: при анализе поведения человеческий мозг и LLM легко перескакивают от наблюдения к истории.

Например:

- наблюдается действие;
- ему мгновенно приписывается мотив;
- мотив превращается в «причину»;
- несколько слабых предположений складываются в уверенную историю;
- граница между фактом, гипотезой и интерпретацией исчезает.

HBBA задумывался как **инструмент против этой когнитивной расплывчатости**.

Вместо длинной свободной интерпретации система заставляет работать с явными объектами:

1. Что действительно наблюдалось?
2. Какие механизмы выбраны как рабочие гипотезы?
3. Какие связи между ними вообще существуют в модели?
4. Какой тип у каждой связи?
5. Насколько сильно она поддержана evidence?
6. Что появляется только при композиции нескольких behaviors?
7. Какие выводы допустимы, а какие модель не позволяет делать?

Изначально проект строился вокруг визуального представления поведения — в том числе агрессии, доминирования, социального давления, убеждения, мотивации, оценки угрозы, Theory of Mind, executive control и других механизмов. По мере развития стало понятно, что полезнее не делать «каталог ярлыков», а построить **явную relational model**, где можно видеть путь от входных условий к оценке, мотивации, когнитивным процессам и действию.

---

## 2. Основная идея

HBBA рассматривает behavior не как одну метку, а как **подграф**.

Условно:

```text
Поведение A ─┐
             ├─> общие / связанные механизмы ─> оценка ─> мотивация ─> решение
Поведение B ─┘
```

Когда behaviors объединяются, система не просто рисует две схемы рядом. Она позволяет увидеть **canonical cross-behavior relations**, которые становятся релевантными только в объединённой конструкции.

Это и есть compositional hypothesis проекта:

> **сочетание нескольких behavior-подграфов может создавать формально новые маршруты и связи, отсутствующие в отдельных компонентах.**

Важно различать два утверждения:

- **формальное:** новая структура действительно появляется в графе;
- **эмпирическое:** такая структура действительно предсказывает состояние или решение реального человека.

Первое для HBBA подтверждено структурным анализом. Второе пока не доказано и остаётся будущей исследовательской задачей.

---

## 3. Что находится внутри Scientific Core

Scientific Core `v0.7.0.28` заморожен и является базой финального релиза.

### 3.1. Узлы

Узлы представляют механизмы и функциональные конструкты: perception, attention, threat appraisal, value, motivation, social cognition, prediction, executive control, motor/action outputs и другие элементы.

HBBA не утверждает, что каждый узел — отдельный «модуль мозга». Узел — **рабочая формализованная единица модели**.

### 3.2. Связи

Связи типизированы. Тип relation имеет смысл сам по себе и не должен автоматически усиливаться из-за высокого evidence-grade.

Например, `associated_with` не превращается в причинное утверждение только потому, что relation имеет Grade A.

### 3.3. Evidence grades

Grade относится **к конкретной типизированной связи**, а не к «истинности поведения» и не к вероятности того, что конкретный человек находится в определённом состоянии.

- **A** — сильная и достаточно прямая поддержка для узкой типизированной связи;
- **B** — хорошая поддержка, но с существенными ограничениями по причинности, задаче, популяции или обобщению;
- **C** — ограниченная, смешанная, частично косвенная или сильно контекстная поддержка;
- **D** — зарезервированная слабая/проблемная категория; в финальном frozen core таких отношений нет;
- **X** — связь сохранена после review как структурно/концептуально полезная, но relation-level evidence недостаточно или конструкция слишком широкая для A–D.

Итоговое распределение:

```text
A = 3
B = 58
C = 27
D = 0
X = 13
```

### 3.4. Provenance

Для научной части сохранены:

- source registry;
- relation-level evidence mapping;
- source placements;
- review notes;
- ограничения generalization;
- научный acceptance status.

Публичные файлы находятся в [`docs/`](docs/).

---

## 4. Что умеет интерфейс

HBBA — локальное статическое web-приложение. Серверная часть для основной работы не требуется.

Основные возможности:

- интерактивная графовая карта;
- русский и английский интерфейс;
- режимы **Обывательский / Профи / Комбинированный**;
- выбор behavior-подграфов;
- подробности по узлам и связям;
- отображение evidence status и provenance;
- фильтрация и фокусировка;
- **Pin / Закрепить фокус** — удержание выбранного смыслового блока и соседних связей;
- Scenario import/export;
- multi-actor scenarios с разделением ownership;
- Actor Profile schema;
- Guided Session;
- AI Bridge;
- AI Behavioral Runtime;
- работа с формализованным AI Context вместо свободного пересказа графа;
- двуязычная страница результатов исследований.

---

## 5. Основные режимы работы

### Обывательский режим

Скрывает часть технической детализации и показывает крупные смысловые механизмы. Подходит для изучения общей логики карты.

### Профи

Показывает больше узлов, relation types, evidence и provenance. Предназначен для детального разбора.

### Комбинированный

Позволяет одновременно удерживать понятную макроструктуру и видеть технические элементы.

---

## 6. Scenario и Actor-модель

HBBA поддерживает отдельные сценарии, чтобы не превращать общую карту в утверждение о конкретном человеке.

Scenario описывает, какие узлы/связи активированы **в рамках конкретной аналитической постановки**. Multi-actor режим разделяет экземпляры механизмов между участниками и не должен смешивать ownership одного человека с другим.

Правильная логика:

```text
Canonical Atlas
      ↓
выбор релевантных механизмов
      ↓
Scenario instances
      ↓
Actor ownership / interaction links
      ↓
гипотезы, которые можно проверить
```

Неправильная логика:

```text
Человек сделал X
      ↓
HBBA показывает Y
      ↓
значит человек точно думал Y
```

HBBA не разрешает такой переход.

---

## 7. AI Bridge, Guided Session и Behavioral Runtime

### AI Bridge

AI Bridge предназначен для передачи модели **формализованного контекста карты**, а не для запроса «угадай, что происходит с человеком».

Он помогает ограничить свободу LLM:

- перечисляет выбранные графовые факты;
- отделяет observation от inference;
- сохраняет epistemic status;
- требует ссылаться на конкретные graph elements;
- ограничивает недопустимые причинные/диагностические выводы.

### Guided Session

Guided Session проводит пользователя по структурированному workflow: от описания ситуации к выбору механизмов и формированию проверяемой модели.

### AI Behavioral Runtime

Runtime использует frozen graph и контрактные правила для формирования model-facing bundle. Он не заменяет научную проверку и не превращает LLM в ground truth.

Подробные prompt contracts находятся в [`docs/`](docs/).

---

## 8. История разработки

HBBA был создан итеративно в августе 2026 года.

### Этап 1 — визуальная карта поведения

Первоначальная задача была практической: сделать понятную интерактивную карту, где несколько поведенческих механизмов можно увидеть не как список терминов, а как связанную систему.

### Этап 2 — переход от красивой схемы к формальной модели

Очень быстро выяснилось, что визуальная правдоподобность ничего не доказывает. Проект начал обрастать:

- relation types;
- evidence grades;
- source registry;
- validator;
- scientific protocol;
- scenario schema;
- provenance;
- правилами допустимого inference.

### Этап 3 — независимые критические аудиты

Вместо одного «финального теста» проект проходил серию re-audit циклов. Найденные дефекты исправлялись, после чего новый кандидат снова проверялся как потенциально неправильный.

В результате scientific-evidence / epistemic boundary был закрыт и независимо принят на `v0.7.0.24`.

### Этап 4 — frozen core v0.7.0.28

После последующих технических исправлений core был заморожен на `v0.7.0.28`:

- 81 node;
- 101 canonical edge;
- 39 behaviors;
- 78 used sources;
- 150 evidence placements.

После freeze проект запрещалось подгонять под результаты benchmark.

### Этап 5 — проверка сильной гипотезы

Затем был поставлен вопрос: **делает ли HBBA сильную LLM в целом точнее при behavioral reasoning?**

Для этого использовался Challenge Benchmark.

Результат оказался отрицательным для сильной универсальной гипотезы — и был сохранён как отрицательный, без перенастройки core под желаемый исход.

### Этап 6 — возврат к исходной composition hypothesis

После этого была отдельно проверена более узкая исходная идея: **даёт ли явный GRAPH преимущество над FLAT-представлением тех же самых relational facts?**

Composition Precision Benchmark `v1.3.0` был предварительно независимо валидирован, затем FLAT и GRAPH выполнялись в изолированных generation sessions.

Обе стороны решили 60/60 задач правильно.

Итог: `NEUTRAL_TOPOLOGY_EFFECT` из-за полного ceiling effect.

### Этап 7 — Final Release

Финальный продукт зафиксирован как:

> **специализированный behavioral graph atlas / workbench, а не универсальный усилитель reasoning и не система диагностики человека.**

---

## 9. Большой эксперимент №1 — Challenge Benchmark

### Исследовательский вопрос

Улучшает ли HBBA общий behavioral reasoning сильной LLM по сравнению с обычным анализом без HBBA-графа?

### Финальный запуск

- 420 generation iterations;
- 120 blind semantic evaluations;
- paired comparison;
- stability checks;
- graph-reference validation;
- preregistered interpretation rules.

### Результат

| Метрика | PLAIN | HBBA |
|---|---:|---:|
| Core score | **85.01** | **84.75** |

```text
HBBA − PLAIN = −0.26
95% bootstrap CI = [−1.13; +0.62]
Cohen's dz = −0.053
Core W/T/L = 59 / 3 / 58
Blind semantic W/T/L = 39 / 8 / 73
Stability = PASS
Graph refs = 302/302 valid and relevant
```

### Интерпретация

**EVIDENCE_AGAINST** универсального/general reasoning enhancement в протестированной frozen configuration.

Это не означает «HBBA ничего не делает». Это означает более узкое утверждение:

> добавление HBBA не показало общего прироста качества сильной LLM на этом типе behavioral benchmark.

Подробности: [`research/05b_CHALLENGE_REPORT.md`](research/05b_CHALLENGE_REPORT.md).

---

## 10. Большой эксперимент №2 — Composition Precision Benchmark

### Исследовательский вопрос

Если GRAPH и FLAT получают **одинаковые relational facts**, даёт ли само явное graph representation прирост accuracy?

### Почему это важно

Такой дизайн отделяет:

- **содержание HBBA**

от

- **формы представления HBBA**.

FLAT не был обычным свободным текстом. Он содержал те же факты в строгой текстовой сериализации. GRAPH содержал те же факты в структурированном графовом представлении.

### Независимая validation benchmark

Перед запуском были проверены:

- frozen-source provenance;
- hidden truth;
- GRAPH↔FLAT factual parity;
- randomization;
- generation isolation;
- public-surface leakage;
- multiple-testing calibration;
- scorer mathematics;
- reproducibility.

Benchmark получил **PASS** до реального запуска arms.

### Результат

| Метрика | FLAT | GRAPH |
|---|---:|---:|
| Accuracy | **60/60 = 100%** | **60/60 = 100%** |

```text
GRAPH − FLAT = 0.00 pp
95% bootstrap CI = [0.00; 0.00] pp
GRAPH W/T/L = 0 / 60 / 0
Exact McNemar p = 1.000000
Interpretation = NEUTRAL_TOPOLOGY_EFFECT
```

### Почему это не доказывает отсутствие пользы GRAPH

Возник полный **ceiling effect**. FLAT уже получил 100%, поэтому GRAPH физически не мог улучшить accuracy.

Корректный вывод:

> **на этом 60-case benchmark явное GRAPH representation не показало измеримого преимущества над эквивалентной строгой FLAT-сериализацией.**

Некорректный вывод:

> «доказано, что граф никогда не нужен».

Подробности: [`research/06b_COMPOSITION_v1.3.0_FINAL_SUMMARY.md`](research/06b_COMPOSITION_v1.3.0_FINAL_SUMMARY.md).

---

## 11. Structural Composition Scan

До/вокруг Composition Benchmark была отдельно исследована сама формальная композиция frozen HBBA.

### Все пары behaviors

Всего unordered pairs:

**741**

Из них:

- **632 / 741 = 85.29%** имеют emergent cross-behavior edge;
- **594 / 741 = 80.16%** — emergent non-X pair;
- **430 / 741 = 58.03%** создают новую reachability к `cog_exec`;
- **394 / 741 = 53.17%** — такие routes без X-relations.

### Все тройки behaviors

Всего:

**9,139**

Из них:

- **8,588 / 9,139 = 93.97%** имеют emergent structure;
- **7,467 / 9,139 = 81.70%** создают новую `cog_exec` reachability;
- **6,608** — non-X triple decision/control routes;
- **1,753 / 9,139 = 19.18%** создают triple-only control reachability, отсутствующую в составляющих парах.

### Что это доказывает

Это подтверждает, что composition engine не сводится к визуальному сложению двух карт. Формальная топология действительно порождает новые структуры.

### Чего это не доказывает

Это **не** доказывает, что эти новые маршруты реально активируются в мозге конкретного человека или причинно определяют его решение.

Полный structural report: [`research/06d_COMPOSITION_STRUCTURAL_REPORT.md`](research/06d_COMPOSITION_STRUCTURAL_REPORT.md).

---

## 12. Что HBBA сегодня действительно поддерживает

### Поддержано

- HBBA работает как формальный специализированный graph atlas/workbench;
- frozen scientific core имеет явно ограниченный independently accepted evidence boundary;
- graph composition создаёт нетривиальные emergent structures;
- Scenario/Actor/Runtime слои позволяют переносить canonical atlas в конкретную формализованную аналитическую постановку;
- строгая формализация relational facts может быть успешно прочитана LLM как в GRAPH, так и в эквивалентной FLAT-сериализации.

### Не поддержано результатами

- тезис, что HBBA универсально улучшает behavioral reasoning сильной LLM;
- тезис, что GRAPH-format сам по себе превосходит эквивалентный FLAT по accuracy.

### Пока не проверено эмпирически

- предсказывают ли HBBA-compositions реальные решения людей;
- соответствуют ли emergent graph routes реальным причинным механизмам;
- как хорошо HBBA переносится между популяциями и контекстами;
- даёт ли граф преимущество людям или моделям на более сложных задачах без ceiling effect.

---

## 13. Для кого может быть полезен HBBA

### Исследователям и студентам

Для визуализации гипотез, evidence boundaries и различий между association, modulation, update, causal-like и другими relation semantics.

### Специалистам по LLM / AI evaluation

Как пример формализованного domain representation и исследовательской среды для сравнения structured vs serialized reasoning context.

### Преподавателям

Как интерактивная карта, позволяющая показывать, почему «связано с» не означает «вызывает», почему evidence grade не является вероятностью истины и почему вывод о конкретном человеке требует отдельной evidence chain.

### Аналитикам поведения

Как workbench для построения **гипотез**, сравнения нескольких объяснений и фиксации того, какие именно механизмы были предположены.

### Разработчикам исследовательских инструментов

Как пример проекта, где UI, scientific provenance, schemas, runtime, LLM bridge и benchmark methodology объединены в один локальный пакет.

### Независимым аудиторам

Для попытки найти ошибки в evidence mapping, composition semantics, benchmark methodology или implementation.

---

## 14. Как использовать HBBA правильно

Рекомендуемый workflow:

1. **Сначала отделите наблюдения от интерпретаций.**
2. Сформулируйте конкретный исследовательский вопрос.
3. Выберите behavior только как рабочую гипотезу.
4. Посмотрите, какие узлы и typed relations реально входят в выбранную структуру.
5. Проверьте evidence grade и ограничения конкретных edges.
6. Если behaviors несколько — изучите composition, а не просто список behaviors.
7. Отмечайте альтернативные пути.
8. Для конкретной ситуации используйте Scenario, а не переписывайте canonical atlas.
9. Для нескольких участников используйте actor ownership/isolation.
10. При передаче в LLM используйте AI Bridge / Runtime и сохраняйте distinction между evidence и inference.
11. Формулируйте вывод как проверяемую гипотезу, если данных недостаточно.
12. Не повышайте уверенность только потому, что граф выглядит убедительно.

Хороший итог:

> «В этой формализации наблюдения совместимы с механизмами A и B; их композиция создаёт путь X→Y→Z. Связь Y→Z имеет Grade C и контекстные ограничения. Поэтому путь следует рассматривать как гипотезу, а не установленную причину поведения человека.»

Плохой итог:

> «HBBA показал, что человек точно хочет X».

---

## 15. Как HBBA использовать нельзя

HBBA не предназначен для:

- постановки медицинских или психиатрических диагнозов;
- определения лжи;
- установления вины;
- чтения скрытых мотивов как факта;
- предсказания преступности;
- оценки «опасности человека» без независимых данных;
- принятия кадровых, юридических или медицинских решений как автономный scoring system;
- превращения broad population evidence в утверждение о конкретном индивиде;
- выдачи графовой reachability за доказанную биологическую причинность.

---

## 16. Почему отрицательный результат оставлен в проекте

Одна из принципиальных особенностей HBBA Final Release — проект **не переписан под красивую историю**.

Challenge Benchmark дал отрицательный результат для универсальной гипотезы. Он не был удалён.

Composition Benchmark дал нейтральный результат. Он не был объявлен победой GRAPH.

Это важно: HBBA позиционируется исходя из фактических результатов, а не из первоначальных ожиданий.

---

## 17. Почему Scientific Core заморожен

После `v0.7.0.28` core не должен изменяться только потому, что benchmark показал неудобный результат.

Иначе возникает исследовательская подгонка:

```text
тест → неудобный результат → изменить модель → тест → изменить модель → ...
```

Вместо этого политика HBBA:

```text
Frozen core
   ↓
заранее заданный эксперимент
   ↓
результат сохраняется как есть
   ↓
новая научная гипотеза = новая research branch/version
```

---

## 18. Структура публичного репозитория

```text
HBBA/
├── index.html                     # основной интерфейс
├── styles.css
├── app.js
├── data.js                        # frozen Scientific Core v0.7.0.28
├── behavior-runtime-compiler.js
├── actor-profile.js
│
├── ai-bridge.html
├── guided-session.html
├── ai-behavioral-runtime.html
├── research-results.html
│
├── HBBA_PROJECT_STATUS.json       # канонический текущий статус
├── HBBA_RELEASE.json
│
├── docs/                          # schemas, evidence, prompts, protocol, frozen acceptance record
├── research/                      # опубликованные финальные результаты
├── validation/                    # выбранные финальные проверки
│
├── CONTRIBUTING.md
├── SECURITY.md
└── README.md
```

Публичный пакет намеренно не содержит промежуточную рабочую свалку из десятков historical build artifacts.

---

## 19. Что намеренно НЕ опубликовано

Чтобы сохранить возможность будущих blind-проверок, public release **не включает** закрытые материалы Composition Benchmark, позволяющие восстановить case-level hidden reference:

- hidden truth;
- evaluation map;
- randomization master secret;
- generation ID maps;
- private generation packages;
- полный model-facing case/answer corpus, если его публикация раскрывает reference answers.

Агрегированные результаты, методология и structural analysis опубликованы.

Если benchmark будет окончательно выведен из blind use, private reproducibility package можно опубликовать отдельно как архив.

---

## 20. Быстрый запуск

HBBA — статический web-проект.

### Вариант 1 — открыть напрямую

Можно открыть `index.html` в современном браузере.

### Вариант 2 — локальный HTTP server

```bash
python -m http.server 8000
```

Затем открыть:

```text
http://localhost:8000/
```

Этот вариант обычно удобнее для browser security policies и будущих расширений.

---

## 21. GitHub Pages

Репозиторий можно публиковать как статический сайт через GitHub Pages, так как основной интерфейс не требует backend.

Для Pages достаточно использовать root repository как source и оставить `index.html` в корне.

---

## 22. Reproducibility и проверка

В [`validation/`](validation/) оставлены финальные публичные QA-проверки, относящиеся к frozen core и final status layer.

В [`research/`](research/) находятся агрегированные результаты двух основных research programs.

Canonical machine-readable state:

[`HBBA_PROJECT_STATUS.json`](HBBA_PROJECT_STATUS.json)

Canonical human-readable research page:

[`research-results.html`](research-results.html)

---

## 23. Версионирование

У HBBA специально разделены две версии.

### Product release

**v1.0.1**

Это версия финального публичного продукта, UI, documentation/status presentation.

### Scientific Core

**v0.7.0.28 · FROZEN**

Это версия научной graph/evidence/runtime основы.

Такое разделение предотвращает ложное впечатление, что обновление README или UI автоматически изменило научную модель.

---

## 24. Что было самым важным результатом проекта

Самый важный итог HBBA — не число узлов и не красивый graph.

Проект показал необходимость разделять четыре уровня:

1. **Software correctness** — делает ли программа то, что заявлено спецификацией?
2. **Formal model capability** — создаёт ли модель осмысленные формальные структуры?
3. **Benchmark utility** — помогает ли такая структура решать определённые задачи?
4. **Real-world validity** — соответствует ли структура поведению и причинным механизмам реальных людей?

HBBA имеет сильные результаты на первых двух уровнях, смешанные/нейтральные результаты на третьем и пока не имеет достаточной эмпирической проверки четвёртого.

Это и является текущей честной границей проекта.

---

## 25. Куда проект логично развивать дальше

Если HBBA когда-либо будет разморожен как новая research branch, наиболее полезный следующий шаг — не добавление новых красивых behaviors, а **external empirical validation**.

Например:

- preregistered human study;
- независимый behavioral dataset;
- prediction made before outcome observation;
- external replication другим исследователем;
- сравнение нескольких LLM/provider families;
- harder composition set без ceiling effect;
- ablation: raw narrative vs formalized FLAT vs GRAPH;
- проверка, какие relation classes действительно несут predictive value.

Это должно быть новым исследованием, а не ретроактивным изменением frozen `v0.7.0.28`.

---

## 26. Разработка и происхождение кода

**Автор идеи, постановки задачи, продуктового направления и финальных исследовательских решений: Alexander.**

Проект был разработан итеративно в режиме **vibe coding**: автор формулировал задачу, проверял поведение продукта, задавал требования, принимал или отклонял решения и многократно запускал независимые validation/re-audit циклы.

Основная программная реализация, рефакторинг, генерация тестов, документация, scientific QA tooling и benchmark engineering выполнялись в диалоге с **ChatGPT от OpenAI**.

**Основная модель разработки финальной стадии: GPT-5.6 Sol · reasoning mode High.**

Важное уточнение: использование отдельных новых ChatGPT-сессий как независимых критических аудиторов повышало независимость конкретных проверок от рабочего контекста, но **не эквивалентно внешнему peer review независимой научной группой**.

### Development provenance

```text
Project concept / research direction / acceptance decisions:
Alexander

AI-assisted implementation / refactoring / QA / documentation / benchmark engineering:
ChatGPT (OpenAI)
GPT-5.6 Sol
Reasoning mode: High

Development method:
Iterative vibe coding + repeated independent validation sessions
```

---

## 27. Лицензия

В этой public-clean сборке лицензия намеренно **не назначена автоматически**. Публичная видимость репозитория сама по себе не означает разрешение на свободное коммерческое или производное использование.

Перед тем как принимать внешние contributions или разрешать широкое переиспользование, владелец проекта должен отдельно выбрать подходящую лицензию.

---

## 28. Финальная позиция проекта

HBBA следует воспринимать как:

> **визуальный научно-образовательный behavioral graph atlas и исследовательский workbench для формализации, композиции, сравнения и трансформации моделей человеческого поведения.**

Не как:

> систему, которая знает, что думает человек.

Именно эта граница является частью дизайна HBBA, а не оговоркой мелким шрифтом.

---

# English

## Short version

HBBA — **Human Behavioral Mechanisms Atlas** — is a local, bilingual scientific/educational graph atlas and workbench for formalizing, composing, comparing, and inspecting models of human behavior.

It is **not** a mind reader, lie detector, diagnostic engine, guilt detector, or calibrated predictor of an individual.

The project was built around a simple question:

> **What happens when multiple behavioral mechanisms are explicitly combined into one relational graph, and what new structure emerges from that composition?**

Instead of relying on unconstrained narrative reasoning, HBBA represents behavioral hypotheses as explicit nodes, typed relations, evidence grades, provenance, actor ownership, scenarios, and compositional paths.

### Current status

| Area | Status |
|---|---|
| Scientific evidence / epistemic boundary | **EVIDENCE-AUDIT-1 / INDEPENDENTLY ACCEPTED** |
| Scientific Core | **v0.7.0.28 · FROZEN** |
| Topology | **81 nodes / 101 canonical edges / 39 behaviors** |
| Evidence distribution | **A3 / B58 / C27 / D0 / X13** |
| Universal LLM behavioral-reasoning enhancement | **EVIDENCE_AGAINST** |
| GRAPH vs equivalent FLAT | **NEUTRAL_TOPOLOGY_EFFECT** |
| Formal behavior composition | **SUPPORTED AS STRUCTURAL CAPABILITY** |
| Real-world behavioral predictive/causal validity | **UNTESTED** |

`EVIDENCE-AUDIT-1 / INDEPENDENTLY ACCEPTED` applies to the configured scientific-evidence / epistemic boundary. It does **not** mean that HBBA behavioral effectiveness, diagnostic validity, individual prediction, or universal LLM enhancement has been established.

See the canonical bilingual results page: **[`research-results.html`](research-results.html)**.

---

## 1. Why HBBA exists

Behavioral interpretation easily collapses several different epistemic levels into one story:

- an action is observed;
- a motive is inferred;
- the inferred motive is treated as a cause;
- several weak assumptions become a confident narrative;
- the distinction between observation, hypothesis, evidence, and conclusion disappears.

HBBA was created to make that process more explicit and inspectable.

The intended workflow is:

> **observation → candidate mechanisms → typed relations → composition → possible influence paths → testable hypotheses + explicit limits**

The project therefore treats a behavior not as a single label, but as a graph fragment that can be compared and composed with other fragments.

---

## 2. Core concept

A behavior in HBBA is represented as a subgraph. Combining two or more behaviors may activate canonical cross-behavior relations and create paths that are not present in the components considered separately.

This is the project’s compositional hypothesis.

The crucial distinction is:

- **formal emergence:** a new path exists in the model;
- **empirical validity:** the new path predicts or causally explains a real human outcome.

HBBA demonstrates the first as a structural property. The second remains untested at the level required for a real-world scientific claim.

---

## 3. Scientific Core

Scientific Core `v0.7.0.28` is frozen.

It contains:

- **81 nodes**;
- **101 canonical typed relations**;
- **39 behaviors**;
- **78 used sources**;
- **150 source placements**;
- evidence distribution **A3 / B58 / C27 / D0 / X13**.

Evidence grades apply only to the narrow typed relation they annotate. They are not probabilities that a person is in a particular state.

- **A** — strong, sufficiently direct support for the narrow typed relation;
- **B** — good support with material causal/task/population/generalization limits;
- **C** — limited, mixed, partly indirect, or strongly context-dependent support;
- **D** — reserved weak/problematic grade; no final frozen relation uses it;
- **X** — retained after review because relation-level support is insufficient or the construct is too broad/underspecified for A–D.

A high grade does not change relation semantics. `associated_with` does not become a causal relation because it has strong evidence.

---

## 4. Interface and workflow

HBBA is a static local web application with:

- interactive graph navigation;
- Russian and English UI;
- Lay / Pro / Combined modes;
- behavior selection and composition;
- evidence/provenance inspection;
- focus and pinning;
- Scenario import/export;
- multi-actor ownership/isolation;
- Actor Profile schema;
- Guided Session;
- AI Bridge;
- AI Behavioral Runtime;
- formal AI Context export;
- bilingual research results.

---

## 5. Scenario and actor separation

The canonical atlas is not itself a claim about a specific person.

A Scenario selects relevant instances for a concrete analytical question. Multi-actor scenarios preserve ownership so that one person’s node instance is not silently treated as another person’s state.

Correct interpretation:

```text
Canonical atlas → scenario selection → actor-bound instances → explicit hypotheses
```

Incorrect interpretation:

```text
Observed action → graph contains mechanism Y → person definitely has motive Y
```

---

## 6. AI integration

### AI Bridge

AI Bridge exports explicit graph facts and epistemic constraints to an LLM. Its purpose is to reduce unconstrained narrative completion, not to authorize mind reading.

### Guided Session

Guided Session structures the path from observations to candidate graph mechanisms and inspectable hypotheses.

### AI Behavioral Runtime

The runtime compiles a model-facing representation from the frozen graph and contractual rules. It remains a reasoning interface over a formal model, not an empirical oracle.

---

## 7. Development history

HBBA was developed iteratively in August 2026.

### Stage 1 — visual behavioral map

The project began as an interactive visualization intended to make combinations of behavioral mechanisms easier to inspect.

### Stage 2 — scientific formalization

The visual graph was progressively constrained with typed relations, evidence grades, source provenance, validation rules, scenario schemas, and explicit inference boundaries.

### Stage 3 — repeated critical re-audits

Instead of accepting a single internal PASS, successive candidates were repeatedly tested in fresh validation sessions. Defects were fixed and new candidates were rechecked.

The scientific evidence / epistemic boundary was independently accepted at `v0.7.0.24`.

### Stage 4 — frozen core

Technical acceptance work continued until `v0.7.0.28`, which became the frozen Scientific Core used by the subsequent experiments.

### Stage 5 — broad reasoning hypothesis

A Challenge Benchmark tested whether HBBA generally improved a strong LLM’s behavioral reasoning.

It did not support that broad claim.

### Stage 6 — composition representation hypothesis

A separate benchmark then tested whether explicit GRAPH representation outperformed a strict FLAT serialization containing the same relational facts.

Both reached 100%, producing a neutral topology result under complete ceiling.

### Stage 7 — final positioning

HBBA was finalized as a **specialized graph atlas/workbench**, not a universal LLM reasoning enhancer or diagnostic system.

---

## 8. Experiment 1 — Challenge Benchmark

Research question:

> Does HBBA improve general behavioral reasoning compared with a plain analysis condition?

Final execution:

- 420 generation iterations;
- 120 blind semantic evaluations;
- paired comparisons;
- stability checks;
- graph-reference validation;
- preregistered interpretation.

Results:

```text
PLAIN Core = 85.01
HBBA Core  = 84.75
HBBA − PLAIN = −0.26
95% bootstrap CI = [−1.13; +0.62]
Cohen's dz = −0.053
Core W/T/L = 59 / 3 / 58
Blind semantic W/T/L = 39 / 8 / 73
Stability = PASS
Valid/relevant graph refs = 302/302
```

Preregistered interpretation:

**EVIDENCE_AGAINST** universal/general LLM behavioral-reasoning enhancement for the frozen tested configuration.

This does not mean that the graph has no use. It means that the broad claim of general reasoning improvement was not supported.

See [`research/05b_CHALLENGE_REPORT.md`](research/05b_CHALLENGE_REPORT.md).

---

## 9. Experiment 2 — Composition Precision Benchmark

Research question:

> When GRAPH and FLAT receive the same relational facts, does explicit graph representation improve accuracy?

The benchmark was independently validated before execution. Its checks included frozen-source provenance, independent hidden-truth recomputation, GRAPH↔FLAT factual parity, randomization construction, generation isolation, public-surface leakage analysis, multiple-testing calibration, scorer mathematics, and reproducibility.

Results:

```text
FLAT  = 60/60 = 100%
GRAPH = 60/60 = 100%
GRAPH − FLAT = 0.00 pp
95% bootstrap CI = [0.00; 0.00] pp
GRAPH W/T/L = 0 / 60 / 0
Exact McNemar p = 1.000000
Interpretation = NEUTRAL_TOPOLOGY_EFFECT
```

The result has a complete ceiling effect. Therefore it does not establish that GRAPH can never help; it establishes that this 60-case set showed no measurable accuracy advantage over an equivalent strict FLAT serialization.

See [`research/06b_COMPOSITION_v1.3.0_FINAL_SUMMARY.md`](research/06b_COMPOSITION_v1.3.0_FINAL_SUMMARY.md).

---

## 10. Structural composition analysis

Exhaustive analysis of the frozen behavior set found:

### Pairs

- 741 total unordered pairs;
- 632/741 = **85.29%** with an emergent cross-behavior edge;
- 430/741 = **58.03%** with new executive-control reachability;
- 594 emergent pairs excluding X-relations;
- 394 new control-route pairs excluding X-relations.

### Triples

- 9,139 triples;
- 8,588/9,139 = **93.97%** with emergent structure;
- 7,467/9,139 = **81.70%** with new executive-control reachability;
- 6,608 non-X new-control triples;
- 1,753/9,139 = **19.18%** with triple-only control reachability.

This is evidence of a **formal structural capability**, not evidence that the paths are active biological mechanisms in a specific individual.

---

## 11. Appropriate use cases

HBBA may be useful for:

- research and teaching about behavioral mechanisms;
- explicit hypothesis construction;
- comparison of competing behavioral models;
- graph-based representation of evidence boundaries;
- LLM structured-context experiments;
- behavioral analysis as a hypothesis workbench;
- educational demonstrations of association vs causation;
- reproducibility/audit studies of scientific software;
- external attempts to falsify or improve the model.

---

## 12. Correct use

A recommended process:

1. Separate observations from interpretation.
2. Define a concrete question.
3. Select behaviors as candidate hypotheses, not facts.
4. Inspect included nodes and typed relations.
5. Check evidence grade and limitations for relevant edges.
6. Inspect composition when multiple behaviors are selected.
7. Record alternative paths.
8. Use Scenarios for concrete cases.
9. Preserve actor ownership in multi-person cases.
10. Use AI Bridge/Runtime only with explicit epistemic constraints.
11. Phrase uncertain conclusions as testable hypotheses.
12. Do not increase confidence merely because the visualization is coherent.

---

## 13. Inappropriate use

HBBA is not validated for:

- medical or psychiatric diagnosis;
- lie detection;
- guilt determination;
- covert motive detection as fact;
- criminal-risk scoring;
- autonomous hiring/legal/medical decisions;
- treating population-level evidence as an individual diagnosis;
- treating graph reachability as established biological causality.

---

## 14. Why negative and neutral results remain public

The project intentionally preserves results that did not support the original expectations.

The Challenge experiment did not support universal reasoning enhancement.

The Composition experiment did not demonstrate an accuracy advantage for GRAPH over equivalent FLAT.

Neither result was removed or re-labeled as success.

This is part of the project’s methodological design: the final product positioning follows the observed results rather than rewriting the evidence around the product story.

---

## 15. Repository layout

```text
HBBA/
├── index.html
├── styles.css
├── app.js
├── data.js
├── behavior-runtime-compiler.js
├── actor-profile.js
├── ai-bridge.html
├── guided-session.html
├── ai-behavioral-runtime.html
├── research-results.html
├── HBBA_PROJECT_STATUS.json
├── HBBA_RELEASE.json
├── docs/                          # includes frozen scientific acceptance record
├── research/
├── validation/
├── CONTRIBUTING.md
├── SECURITY.md
└── README.md
```

---

## 16. Public vs private benchmark material

This public-clean release intentionally excludes private case-level assets that could compromise future blind reuse of the Composition Benchmark, including hidden truth, evaluation maps, master randomization secrets, private generation mappings/packages, and answer-revealing corpora.

Public research outputs contain methodology, aggregated results, and structural analyses.

---

## 17. Quick start

HBBA is a static web application.

Open `index.html` directly, or run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

The repository is also suitable for GitHub Pages.

---

## 18. Versioning

**Product release:** `v1.0.1`  
**Scientific Core:** `v0.7.0.28 · FROZEN`

Documentation/UI changes do not silently change the scientific model.

Any future change to the scientific core should be released as a new research branch/version with independent provenance and validation.

---

## 19. Development provenance

**Project concept, problem definition, product direction, acceptance decisions, and final research interpretation: Alexander.**

HBBA was developed through iterative **vibe coding**. The human author defined objectives, reviewed behavior, set constraints, accepted/rejected implementation decisions, and repeatedly initiated fresh validation/re-audit cycles.

The main implementation, refactoring, QA tooling, documentation, scientific validation support, and benchmark engineering were produced with **ChatGPT by OpenAI**.

**Primary model used in the final development stage: GPT-5.6 Sol · reasoning mode High.**

Fresh ChatGPT sessions were used as independent critical QA sessions, but they should not be treated as equivalent to peer review by an external independent scientific team.

```text
Project author / research direction:
Alexander

AI-assisted implementation / refactoring / QA / documentation / benchmark engineering:
ChatGPT (OpenAI)
GPT-5.6 Sol
Reasoning mode: High

Development method:
Iterative vibe coding + repeated independent validation sessions
```

---

## 20. License

No license is automatically assigned in this public-clean package. Public visibility does not by itself grant unrestricted reuse rights.

The project owner should choose an explicit license before accepting broad external reuse or contributions.

---

## Final position

HBBA should be understood as:

> **a visual scientific/educational behavioral graph atlas and research workbench for formalizing, composing, comparing, and transforming models of human behavior.**

Not as:

> a system that knows what a person is thinking.

That boundary is part of the architecture and research status of HBBA, not a disclaimer added after the fact.
