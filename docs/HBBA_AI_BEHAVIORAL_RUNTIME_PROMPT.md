# HBBA AI BEHAVIORAL RUNTIME — GENERATION CONTRACT v0.7.0.28

This file defines the deterministic contract used by the HBBA AI Behavioral Runtime page. The actual user prompt is generated from the current validated `HBBA-BEHAVIOR-RUNTIME-1` model; it is not a static Context Pack.

## Core contract

1. Host/system/safety/truthfulness rules remain above HBBA Runtime.
2. Behavior display names are metadata/provenance only and MUST NOT be compiled into persona instructions.
3. The source of truth is the literal current graph: runtime nodes, directed edges, relation types, traversal structure, feedback loops, intersections, and compiled edge-level instructions.
4. Do NOT turn `associated_with` into causality, `may_influence` into mandatory activation, `modulates` into initiation, `updates` into an instantaneous loop, or implementation/network membership into temporal behavior.
5. A/B/C/D/X are evidence-status labels, not behavior intensity weights or probabilities.
6. The AI uses the compiled runtime to influence how it interprets messages, allocates attention, models the interlocutor, maintains goals, evaluates options, selects response strategy, processes feedback, and adapts only where the graph actually supports those functions.
7. The AI must answer naturally and MUST NOT narrate node IDs, graph stages, grades, or internal graph mechanics unless the user explicitly requests a policy-level explanation.
8. The runtime persists across topic changes until explicitly disabled or replaced.
9. The runtime MUST NOT automatically become AI Bridge: ordinary user messages are conversation input, not an instruction to explain the user through HBBA.
10. Deception/manipulation/aggression/self-defense labels never become direct commands. If a graph contains compatible functional pathways, only those literal pathways may affect behavior, subject to higher-level safety/truthfulness constraints.
11. If a graph-supported behavior conflicts with host rules, preserve the closest compatible graph functions rather than fabricating forbidden behavior or discarding the whole graph.
12. Every compiled behavioral instruction must expose provenance to the Runtime debug view: literal node IDs, literal edge ID, relation type, and selected behavior provenance IDs.
13. The generated prompt must contain a visible statement: **This is NOT an AI Context Pack for analyzing a topic.**
14. The first response after activation is a short confirmation; do not dump the graph or compiled policy unless asked.

## Required generated sections

The generated RU/EN prompt must contain:

- runtime mode and hierarchy;
- purpose and separation from AI Bridge / Guided Session;
- selected behavior metadata marked `metadata/provenance only`;
- runtime summary;
- functional layers actually present;
- deterministic compiled edge-level policy instructions;
- traversal order;
- actual feedback loops and feedback/update edges;
- literal runtime nodes;
- literal runtime edges;
- relation semantics;
- persistence and feedback rules;
- no-graph-exposition rule;
- epistemic/system/safety boundaries;
- runtime integrity status and functional fingerprint.

The generator MUST refuse a ready/copyable prompt when `model.validation.ok !== true`.

## Actor Profile / Person Model contract — v0.7.0.28

`HBBA-ACTOR-PROFILE-1` is an OPTIONAL contextual/modulatory layer. It is deliberately separate from `HBBA-BEHAVIOR-RUNTIME-1`.

When absent or empty, the generated Runtime remains graph-only and MUST NOT invent a default person. `field absent = no information`.

When present:

1. Behavioral graph topology remains authoritative. Actor Profile cannot create nodes, edges, behaviors, relation types, grades, hidden weights, probabilities, or effectiveness values.
2. Use only explicitly populated fields. Empty fields are omitted from the prompt.
3. Demographics/protected or sensitive attributes are context only. `attribute ≠ behavior`; do not infer aggression, dominance, risk tolerance, intelligence, motives, or other psychological properties from age, sex/gender, ethnicity, religion, nationality, disability, sexual orientation, diagnoses, or political affiliation.
4. `real_person` requires epistemic restraint: latent traits/states are hypotheses unless directly observed or reported.
5. Profile attributes only modulate selection among graph-supported pathways when relevant to current input. One field never automatically activates a branch.
6. If profile and graph conflict, graph topology wins. If stale profile conflicts with current observed interaction context, current observed context wins.
7. `confidence` is confidence in an input assertion only; it is not behavior probability or edge strength.
8. `experimental_variable=true` marks an A/B variable but does not itself create a behavioral mechanism.
9. `Strict Actor Profile=ON` forbids reconstruction of missing biography/personality/status/motives/knowledge/relationships.
10. The generated prompt must omit the entire Actor Profile section when profile is empty/disabled.
11. Runtime bundle export uses `HBBA-BEHAVIOR-RUNTIME-BUNDLE-2` with optional `actor_profile`; legacy `HBBA-BEHAVIOR-RUNTIME-1` import remains valid with an empty profile.
12. Quick parsing of Short Person Description may propose fields, but parser-derived fields must be visibly marked `epistemic_status=inferred` and remain user-reviewable before prompt generation.
