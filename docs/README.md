# Documentation / Документация

## RU

Здесь находятся scientific schemas, evidence/provenance artifacts, prompt contracts и финальная release-документация.

### Канонический текущий статус

Текущий project-level status **не нужно выводить из исторических полей внутри frozen scientific artifacts**. Используйте:

- [`../HBBA_PROJECT_STATUS.json`](../HBBA_PROJECT_STATUS.json)
- [`../research-results.html`](../research-results.html)
- [`../README.md`](../README.md)

### Frozen / historical metadata

Часть научных артефактов сохранена из процесса closure `v0.7.0.24–v0.7.0.28` и может содержать исторические workflow-поля: тогда ещё будущий benchmark gate, `CANDIDATE`, `NOT_YET_ACCEPTED` и т.п. Эти строки описывают состояние **на момент создания frozen artifact**, а не текущий статус продукта.

Особенно:

- `HBBA_SCIENTIFIC_ACCEPTANCE_STATUS_v0.7.0.24.json` сохраняет independently accepted scientific-evidence boundary record и его историческое поле `next_gate`;
- `HBBA_EDGE_AUDIT.json` сохраняет record-level provenance frozen core и может содержать историческую metadata behavioral-benchmark gate.

Они намеренно не переписаны ради косметического обновления статуса, чтобы не уничтожать provenance. Текущие research outcomes находятся в `HBBA_PROJECT_STATUS.json` и public research artifacts.

---

## EN

This directory contains scientific schemas, evidence/provenance artifacts, prompt contracts, and final release documentation.

### Canonical current status

The current project-level status should **not** be inferred from historical fields inside frozen scientific artifacts. Use:

- [`../HBBA_PROJECT_STATUS.json`](../HBBA_PROJECT_STATUS.json)
- [`../research-results.html`](../research-results.html)
- [`../README.md`](../README.md)

### Frozen / historical metadata

Some scientific artifacts are preserved from the `v0.7.0.24–v0.7.0.28` closure process and may contain historical workflow fields such as a then-future benchmark gate, `CANDIDATE`, or `NOT_YET_ACCEPTED`. These strings describe the state **when the frozen artifact was produced**, not the current product status.

In particular:

- `HBBA_SCIENTIFIC_ACCEPTANCE_STATUS_v0.7.0.24.json` preserves the independently accepted scientific-evidence boundary record and its historical `next_gate` field;
- `HBBA_EDGE_AUDIT.json` preserves record-level frozen-core provenance and may contain historical behavioral-benchmark gate metadata.

These files are intentionally not rewritten merely to modernize status wording, because that would erase provenance. Current research outcomes are recorded in `HBBA_PROJECT_STATUS.json` and the public research artifacts.
