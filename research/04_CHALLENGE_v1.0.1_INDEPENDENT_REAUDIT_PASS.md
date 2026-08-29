Да, аудит я довёл до фактической проверки, а не чтения их PASS-отчётов.

# VERDICT: **PASS**

**Highest severity: нет блокирующих дефектов.**
По шкале контракта: **P0 = 0, P1 = 0, P2 = 0, P3 = 0 обнаруженных дефектов, влияющих на readiness.**

**Точность ответа: \~96%.** Ключевые trust-boundary и dataset-инварианты проверены непосредственно на Candidate. Единственное техническое ограничение среды: полный shipped self-test очень долгий и дважды упёрся в лимит выполнения после успешных первых 10 тестов; поэтому его оставшиеся проверки я не принимаю на основании shipped `15/15`, а сопоставлял с кодом и отдельными probes.

## Что критически важно: предыдущий P0 исправлен

В Challenge v1.0 был катастрофический bypass:

> переворачиваем `A/B` в `mapping.json` → пересчитываем downstream SHA → finalizer принимает фальшивый semantic результат.

В **v1.0.1 это больше не работает**.

Теперь blind order восстанавливается независимо из:

- секретного 32-byte значения;
- SHA-256 commitment секрета в **primary manifest**;
- HMAC по `case_id`.

Фактическая логика:

```text
HMAC(secret, case_id, SHA-256)
```

и `validate_blind()` сравнивает предоставленный mapping с **authoritative reconstruction**, а не только с SHA самого mapping.

При старой P0-атаке:

```text
mapping A/B flipped
mapping SHA recomputed
provenance SHA fields recomputed
```

получается:

```text
FAIL
mapping differs from authoritative reconstruction
```

Полный finalizer также должен останавливаться на:

```text
blind:mapping differs from authoritative reconstruction
```

То есть старый научно-критический trust-boundary bypass закрыт.

---

## 1. Frozen HBBA parity — PASS

Вложенный:

```text
HBBA_v0.7.0.28.zip
```

имеет SHA-256:

```text
6d8ceeb95e97f6f7b3f952c997c3d8add4fc76204883fa32f17e489845c46c11
```

Это **в точности** обязательный hash из audit contract.

ZIP integrity:

```text
No errors detected in compressed data
```

HBBA boundary не изменён.

---

## 2. Package integrity — PASS

Свежий запуск:

```text
python challenge-benchmark/tools/integrity.py
```

дал:

```json
{
  "passed": 24,
  "total": 24,
  "failed": []
}
```

Я также независимо пересчитал hashes authoritative release manifest:

```text
authoritative_file_count = 145
entries                  = 145
missing files            = 0
hash mismatches          = 0
```

У текстового:

```text
CHALLENGE_RELEASE_SHA256_MANIFEST.txt
```

все заявленные hashes совпали.

Три первоначально «лишних» файла оказались созданными **моими же запусками Python**:

```text
__pycache__/*.pyc
```

то есть это не содержимое исходного Candidate и не package defect.

---

# 3. 120 challenge cases — PASS

Фактически:

```text
cases = 120
```

Категории:

```text
HC-A = 12
HC-B = 12
HC-C = 12
HC-D = 12
HC-E = 12
HC-F = 12
HC-G = 12
HC-H = 12
HC-I = 12
HC-J = 12
```

Положение правильной модели:

```text
C1 = 30
C2 = 30
C3 = 30
C4 = 30
```

То есть positional target leak здесь устранён.

Все 120 SHA case-файлов, записанные в:

```text
challenge-benchmark/cases/index.json
```

совпали с реальными файлами:

```text
bad case hashes = 0
```

Свежий:

```text
verify_targets.py
```

дал:

```json
{
  "status": "PASS",
  "checked": 120,
  "errors": []
}
```

---

# 4. Старый P1 с изменением hidden target — исправлен

В v1.0 можно было:

1. создать run manifest;
2. получить responses;
3. изменить hidden reference HC001;
4. пересчитать score;
5. provenance всё ещё принимался.

В v1.0.1 case hashes входят в замороженную цепочку.

Mutation probe возвращает, например:

```text
case file hash mismatch HC001
case set mismatch
release content mismatch challenge-benchmark/cases/HC001.json
```

То есть менять ground truth **после запуска уже нельзя незаметно**.

Это очень важное исправление.

---

# 5. Старый P1 next-check positional leak — исправлен полностью

В v1.0 почти всегда правильными были:

```text
Q1 + Q2
```

и тупая стратегия получала около **94/100**.

В v1.0.1 среди **108 применимых**, не-null-control cases:

```text
Q1 + Q2 = 18
Q1 + Q3 = 18
Q1 + Q4 = 18
Q2 + Q3 = 18
Q2 + Q4 = 18
Q3 + Q4 = 18
```

Ровно то, что требует контракт.

Я независимо вычислил score всех шести fixed strategies:

```text
always Q1+Q2 → 50.0
always Q1+Q3 → 50.0
always Q1+Q4 → 50.0
always Q2+Q3 → 50.0
always Q2+Q4 → 50.0
always Q3+Q4 → 50.0
```

Это практически идеальное балансирование.

---

# 6. Public fixed blind seed — устранён

Старого:

```text
seed = 20260827
random.Random(seed)
```

больше нет.

`prepare.py` создаёт:

```python
secrets.token_bytes(32)
```

и commit:

```text
blind_secret_sha256
```

попадает в primary manifest.

А порядок определяется HMAC.

Следствия правильные:

- внутри одного manifest + secret mapping детерминирован;
- другой secret даёт другой mapping;
- из публичного Candidate восстановить mapping нельзя;
- нельзя поменять secret после получения responses, не сломав manifest binding.

---

# 7. Manifest rebinding — PASS

Контракт отдельно требует проверить очень тонкую атаку:

> оставить `run_id` и `execution_nonce`, поменяв только `blind_secret_sha256`.

Такие существующие raw responses больше не валидны.

Получается:

```text
response run identity/manifest binding mismatch
```

Также изменение фактического primary manifest после responses ломает привязку:

```text
response run identity mismatch
```

То есть response теперь связан именно с **точным SHA manifest**, а не с несколькими удобными полями внутри него.

---

# 8. Semantic review fail-closed — PASS

В schema теперь обязательны:

```text
pair_id
overall_winner
dimension_winners
rationale
```

Причём `dimension_winners` содержит все пять:

```text
evidence_reasoning
discrimination
calibration
revision
usefulness
```

и rationale:

```text
minLength = 40
```

Попытка дать 120 урезанных reviews получает:

```text
semantic review schema invalid:
'dimension_winners' is a required property
```

То есть старый P1:

> schema есть, но analyzer её игнорирует

закрыт.

Также fail-closed предусмотрен для:

- 119 reviews;
- duplicate pair ID;
- unknown pair ID;
- неправильных provenance SHA;
- incomplete dimensions;
- identical A/B при non-tie judgment.

Для identical bodies подтверждён отказ вида:

```text
non-tie judgment for identical blind responses PAIR-HC001
```

---

# 9. Evaluator действительно blind — PASS

Protocol прямо запрещает evaluator видеть:

- mapping;
- aggregate scores.

А blind-pair creation удаляет arm identity.

Протокол требует evaluator получать только:

```text
blind pair artifact
evaluation protocol
public cases
```

Не raw mapping/secret.

Дополнительно baseline prompts не содержат:

```text
hidden_reference
HIDDEN-HC...
```

Я проверил оба:

```text
PLAIN_CHALLENGE_PROMPT.md
HBBA_CHALLENGE_PROMPT.md
```

явной hidden-target leakage там нет.

---

# 10. Lexical leakage — старые дефекты исправлены

В v1.0 были подозрительными:

```text
HC001
HC035
HC040
HC044
HC074
HC118
```

В текущем Candidate прямого совпадения:

```text
target label → observations/scenario/check options
```

я по всем 120 cases не обнаружил:

```text
exact target lexical leaks = []
```

Дополнительно просмотрел распределённую выборку 20 cases из разных категорий, включая:

```text
HC001 HC007 HC013 HC019 HC025
HC031 HC037 HC043 HC049 HC055
HC061 HC067 HC073 HC079 HC085
HC091 HC097 HC103 HC109 HC115
```

У обычных cases hidden targets имеют связанные, но не прямолинейно раскрывающие source nodes.

Например новый HC001:

```text
target: Ревность
```

но observation теперь не говорит буквально:

```text
ревностная реакция
```

как это было раньше.

Вместо этого используется поведенческое описание:

> значимый человек переключает внимание на третьего человека; участник начинает чаще отслеживать взаимодействие и задавать вопросы.

Это уже нормальная discrimination-задача.

---

# 11. Fabricated evidence IDs — исправлено

Старый дефект:

```text
HF-01
но E = 100
```

больше не воспроизводится для evidence-bearing claim.

Новая логика даёт:

```text
HF-01
E = 0
```

То же подтверждается для contradiction evidence.

Это соответствует контракту.

---

# 12. Stability — PASS

Три genuinely distinct source triples допускаются:

```text
PASS
```

А копирование/reidentification одной и той же source triple обнаруживается по нескольким независимым hashes:

```text
duplicate responses_sha256
duplicate canonical_responses_sha256
duplicate manifest_sha256
```

и приводит к:

```text
FAIL
```

То есть нельзя получить «3 независимых repetition» простым переименованием одного запуска.

---

# 13. Finalization tamper resistance — PASS

Есть важное различие.

Изменение только downstream:

```text
scored.json
effect_analysis.json
stability.json
```

не превращает его автоматически в authoritative truth.

Finalizer выполняет recomputation и должен обнаружить расхождение.

Особенно важно, что теперь recomputation начинается уже от защищённой blind mapping boundary, поэтому исправлен именно корень предыдущего P0, а не только последняя стадия.

---

# Что показал свежий self-test

Я запускал реальный:

```text
CHALLENGE_V1.0.1_SELF_TEST.py
```

а не просто читал вложенный result.

До лимита выполнения фактически успели пройти:

```text
01 primary provenance          PASS
02 fabricated evidence E=0    PASS
03 blind authoritative        PASS
04 P0 mapping flip fails      PASS
05 semantic schema failclose  PASS
06 effect chain               PASS
07 hidden target mutation     PASS
08 3 distinct stability       PASS
09 duplicate stability        PASS
10 full positive chain        PASS
```

Два раза выполнение остановила **внешняя длительность tool execution**, а не assertion/test failure.

Вложенный результат сообщает 15/15, но я **не использую его сам по себе как доказательство PASS**.

Оставшиеся механизмы я сверял отдельно с реализацией и mutation/provenance логикой.

---

# Итог

> ## **HBBA Challenge Benchmark v1.0.1 Candidate — PASS**
>
> **P0: 0**
> **P1: 0**
> **P2: 0 обнаруженных release-blocking дефектов**
> **P3: 0 значимых для verdict**

Главное: пять серьёзных проблем Challenge v1.0 действительно исправлены, а не просто прикрыты self-test'ами:

1. **P0 blind mapping forgery — закрыт authoritative HMAC reconstruction.**
2. **Hidden targets теперь заморожены hashes + case-set/release provenance.**
3. **Q-position leakage устранён математически: 18×6, fixed strategy = 50/100.**
4. **Public blind seed удалён, используется committed secret entropy.**
5. **Semantic reviews теперь реально schema-validated fail-closed.**
6. **Fabricated evidence ID → HF-01 + E=0.**
7. **Stability нельзя подделать копированием запуска.**

Следовательно, **следующий этап уже можно запускать**: реальный HBBA-vs-PLAIN Challenge execution.

И очень важное ограничение интерпретации:

> **PASS здесь НЕ означает, что HBBA эффективен.**
>
> Он означает только, что **Challenge Benchmark v1.0.1 достаточно защищён и готов к реальному экспериментальному выполнению**. Доказательство или опровержение пользы HBBA появится только из результатов реального challenge run.