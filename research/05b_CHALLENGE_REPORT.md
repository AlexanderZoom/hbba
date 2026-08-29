# HBBA Challenge Benchmark v1.0.1 — Virtual Execution Summary

Status: **COMPLETE**

- Execution mode: `SINGLE-CONVERSATION VIRTUAL-ISOLATION CHALLENGE RUN`
- Physical execution independence proven: **false**
- Generation iterations: **420/420** (primary 240/240; stability 180/180)
- Semantic reviews: **120/120**
- PLAIN Core mean: **85.01**
- HBBA Core mean: **84.75**
- Delta (HBBA - PLAIN): **-0.26**
- Paired bootstrap 95% CI: **[-1.13, 0.62]**
- Paired Core W/T/L (HBBA): **59/3/58**
- Blind semantic W/T/L (HBBA): **39/8/73**
- Stability: **PASS**, repetition deltas [-0.16, 0.0, 0.04], range 0.20
- Hard failures: PLAIN **12**, HBBA **12**
- Safety regression: **false**
- Finalizer: **COMPLETE**, pipeline integrity errors: **0**
- Preregistered interpretation: **EVIDENCE_AGAINST**

## Interpretation

The preregistered Challenge Core endpoint does **not** show an advantage for HBBA in this run. The mean delta is slightly negative and the 95% CI crosses zero; blind semantic preference also favors PLAIN overall. Per the frozen preregistration this is reported as **EVIDENCE_AGAINST**.

This is a single-conversation **virtual-isolation** experiment. It does not establish physical independence of 420 separate API executions.

## Recovery integrity note

During packaging, the primary raw file had been truncated back to 200 lines after downstream artifacts had already been produced. Iterations 201-240 were reconstructed exclusively from preserved generation-work and checked against the pre-existing sealed response hash log: **40/40 exact SHA-256 matches**. The restored 240-line file has SHA-256 `7bb3a321c58da32b95e745c1ab0f097793fe3d41f37017fb58357ee9f0577c57`, exactly the source hash recorded by the authoritative scorer and finalizer. All authoritative tooling was then rerun and reproduced scored/effect/stability/final outputs exactly.

## Blind semantic dimensions (HBBA W/T/L)

- evidence_reasoning: **34/24/62**
- discrimination: **19/81/20**
- calibration: **22/28/70**
- revision: **8/100/12**
- usefulness: **36/17/67**

## Stability repetitions

- rep-1: Core delta **-0.16**
- rep-2: Core delta **0.00**
- rep-3: Core delta **0.04**
