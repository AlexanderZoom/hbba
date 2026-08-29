# HBBA v0.7.0.13 — Scientific Interpretation Protocol

> **HISTORICAL PROTOCOL SNAPSHOT — v0.7.0.13, NOT CURRENT RELEASE STATUS.**  
> Current status: HBBA Final Release `v1.0.1`; Scientific Core `v0.7.0.28 FROZEN`; evidence/epistemic boundary `EVIDENCE-AUDIT-1 / INDEPENDENTLY ACCEPTED`. See `research-results.html` and `HBBA_PROJECT_STATUS.json`. The `candidate` / `pending` wording below is preserved as historical chronology.


## 1. Edge grade

A/B/C/D/X относится к **конкретной typed base relation**, а не к человеку.

- **A** — сильная конвергентная поддержка формулировки в заявленном scope;
- **B** — хорошая поддержка с существенными ограничениями;
- **C** — умеренная, косвенная, неоднородная или construct/task-dependent поддержка;
- **D** — слабая/противоречивая связь, требующая пересмотра;
- **X** — relation-level review выполнен, но evidence недостаточно, противоречиво либо сама typed relation слишком широкая/недоопределённая; X не является подтверждением.

Шкала HBBA не является clinical GRADE и не кодирует вероятность истины.

## 2. Relation semantics first

Grade не отменяет semantics relation type. `associated_with` не становится причинной связью при Grade A. `participates_in`/implementation mappings не становятся временными стадиями. `updates` относится к across-time update. `requires_motor_output` не кодирует социальный смысл действия.

## 3. Individual inference forbidden

Base evidence не позволяет выводить скрытый мотив, эмоцию, neural activation или физиологическую причину у конкретного человека без допустимых scenario-level данных. Model mapping ≠ measurement. Physiological measurement ≠ уникальная psychological cause.

## 4. Candidate review provenance

Candidate review date: 2026-08-23. Метод: targeted relation/construct literature review with emphasis on meta-analysis/review evidence, scope limitations and counterevidence. Independent review pending.

## 5. Frozen epistemic core

Validator 4.4.3, Scenario-3 trust boundaries и Measurement Contract 3.1 наследуются из frozen v0.6.4.3. Scientific Evidence Audit не является основанием ослаблять их.


## v0.7.0.13 reviewed-X rule

`X` no longer means only “not reviewed”. In the v0.7.0.13 candidate, X is permitted after substantive relation-level review when evidence is insufficient or the typed claim remains too broad/underspecified. X must not be silently upgraded for completeness.

## Post-audit acceptance note

Independent audit flagged the scope of `learn_rl → cog_value : updates` at Grade A. The candidate response is **A → B**, with explicit restriction to error-driven/model-free value updating. This is a grade correction only; frozen-core topology and relation type are unchanged. Final acceptance still requires independent verification of all 78 currently placed unique sources, all 150 source→edge placements (including explicit context roles), and contradiction search across all 101 edges. Context/limitations placements must not be counted as relation support.

## v0.7.0.13 patch scope

Relative to v0.7.0.12, v0.7.0.13 changes no scientific grades, endpoints or source placements. It is an AI workflow hardening patch (Bridge structural topic analysis + Guided state-machine visibility + AI Graph Runtime); scientific acceptance remains pending the independent 101/78/150 gate.


## v0.7.0.13 final acceptance protocol

This patch does not change scientific relations, grades, placements, source roles, Validator or Scenario trust boundaries. Final independent audit uses `CRITICAL_AUDIT_PROMPT_v0.7.0.13.md` plus `HBBA_INDEPENDENT_AUDIT_COVERAGE_TEMPLATE_v0.7.0.13.json`. Allowed final states are PASS / FAIL / INCOMPLETE AUDIT; an incomplete mandatory leg must not be reported as CONDITIONAL PASS.
