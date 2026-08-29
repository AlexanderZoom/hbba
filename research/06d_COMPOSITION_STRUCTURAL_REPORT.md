# HBBA v0.7.0.28 — structural composition report

This report concerns the frozen HBBA graph itself, before any LLM comparison.

## Exhaustive pair/triple enumeration
From 39 frozen behaviors:
- unordered behavior pairs: **741**;
- unordered behavior triples: **9,139**.

### Pairs
- with at least one emergent canonical cross-behavior edge: **632 / 741 = 85.29%**;
- with at least one non-X emergent edge: **594 / 741 = 80.16%**;
- with new structural reachability to `cog_exec` beyond either behavior alone: **430 / 741 = 58.03%**;
- same result restricted to A/B/C evidence grades: **394 / 741 = 53.17%**.

### Triples
- with emergent canonical cross-behavior structure: **8,588 / 9,139 = 93.97%**;
- with new reachability to `cog_exec`: **7,467 / 9,139 = 81.70%**;
- same restricted to A/B/C grades: **6,608 / 9,139 = 72.31%**;
- with decision/control reachability unavailable in every constituent pair: **1,753 / 9,139 = 19.18%**.

### Emergent edge evidence grades
Across pair compositions, 50 distinct canonical edges can appear as emergent cross-behavior edges:
- A: **2**;
- B: **23**;
- C: **17**;
- X: **8**.

## Interpretation boundary
These results establish a structural property of the frozen atlas: combining behavior node sets frequently activates canonical relations and directed routes that are absent from the individual component behaviors.

They do **not** establish that the corresponding psychological effects occur in a person, that combined mechanisms add linearly, or that the structure predicts an individual's decision.

The v1.1.1 model benchmark tests a narrower next question: whether the typed representation of those relational facts lets an LLM reason about the frozen composition more precisely than the same facts serialized as flat text.
