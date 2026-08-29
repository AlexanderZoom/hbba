# HBBA AI Prompt Inventory — v0.7.0.28

| Surface | Canonical source | Required function | Release-blocking failure |
|---|---|---|---|
| Guided Session | `HBBA_GUIDED_SESSION_PROMPT.md` | facts → Scenario file → exact import instruction → STOP → wait `загрузил` → exactly one tour step per response → versioned re-export on material change | skips file/STOP, starts tour early, fake attachment/Validator/UI action, invented IDs |
| AI Bridge | `HBBA_AI_BRIDGE_PROMPT.md` + `buildStructuralGraphContext()` | current graph → exactly one topic/question request → analyze external topic only through literal graph | stale/missing graph, starts analysis before topic, invents graph, silently becomes Scenario/behavior runtime |
| AI Behavioral Runtime | `behavior-runtime-compiler.js` + `HBBA_AI_BEHAVIORAL_RUNTIME_PROMPT.md` + `ai-behavioral-runtime.html` | deterministically compile current selected graph into persistent AI behavioral policy with runtime summary, traversal, loops, edge semantics and provenance | behavior-name persona shortcut, invented/stale IDs, topology ignored, missing provenance, invalid model still copyable, Bridge-like analysis mode |
| AI Context Pack | `buildAIContextPack()` in `app.js` | explanatory export of the selected atlas subgraph | stale IDs/grades, invents graph content |
| Director AI handoff | rules in Guided/Help | emit only runtime-valid `HBBA:<COMMAND>` grammar using literal IDs | fake execution, invented ID/path |
| Behavior Shift AI guidance | Guided + Help | explain structural graph diff, not calibrated efficacy | probability/effectiveness claims or promises control of another person |

## Acceptance invariants

1. **Three modes remain distinct.** Bridge = external topic analysis. Guided = Scenario state machine. Behavioral Runtime = AI's own graph-derived response policy.
2. Behavioral Runtime is compiled by deterministic code from the actual selected graph. Behavior display names are metadata/provenance only and are excluded from the functional fingerprint.
3. Renaming a behavior without changing topology must not change the functional fingerprint or compiled edge policy. Changing topology while keeping the same behavior name must change the functional fingerprint/policy.
4. Runtime includes only selected-graph nodes/edges; common nodes are deduplicated and multi-behavior intersections preserve provenance.
5. Every compiled behavioral instruction is traceable to literal node IDs, edge ID, relation type and selected behavior provenance IDs.
6. Relation semantics are preserved: `associated_with` ≠ causality; `may_influence` ≠ mandatory activation; `modulates` ≠ initiation; `updates` ≠ instantaneous loop. A/B/C/D/X are evidence statuses, not behavior-intensity weights.
7. Runtime integrity validation is fail-closed. Missing/invalid runtime disables Generate/Copy/Download.
8. Runtime Prompt supports RU/EN independently of Atlas UI language; literal IDs are never translated.
9. Runtime must persist across topic changes, must answer naturally, and must not expose graph mechanics unless explicitly asked.
10. Higher-level host/system/safety/truthfulness rules remain above HBBA Runtime. Deception/manipulation/aggression/self-defense names never become direct commands.
11. AI Bridge still asks exactly one topic/question before analysis and does not change AI behavior/persona.
12. Guided Session keeps the hard gate: file → local import → STOP → explicit `загрузил` → exactly one tour step per response with no user-request override.

## v0.7.0.28 — Actor Profile / Person Model

AI Behavioral Runtime now has an optional independent `HBBA-ACTOR-PROFILE-1` module (`actor-profile.js`, `HBBA_ACTOR_PROFILE_SCHEMA.json`). It is a contextual/modulatory layer only and must never mutate the runtime graph. Empty profiles are omitted. Strict Actor Profile, preview, local short-description parsing, runtime bundle import/export, epistemic metadata, evidence references, temporal scope and experimental-variable annotations are part of this contract.


## v0.7.0.28 — Scientific acceptance / Behavioral Benchmark gate

Scientific Evidence is independently accepted at the v0.7.0.24 boundary. Prompt/runtime mechanics are unchanged apart from current version/status text. Behavioral Benchmark cases are isolated evaluation fixtures and are not injected into production prompts.
