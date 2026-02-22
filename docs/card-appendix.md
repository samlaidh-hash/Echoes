# Card Appendix (All 300 Cards)

This appendix is the reference index for the full authored card set and should be used together with:

- `docs/card-text-empty.md` (100 cards)
- `docs/card-text-system.md` (100 cards)
- `docs/card-text-phenomena.md` (100 cards)

These three deck volumes contain the full per-card breakdown (front lines, instant options, rear powers, flavor, and metadata) for all 300 cards.

## A) Appendix Scope

This appendix documents:

- canonical card data source
- how to read each card entry
- variant-card handling (same art/front, different rear)
- summary statistics and balancing profile
- where to find every detailed card entry

## B) Canonical Data Source

Primary data source:

- `data/card-text-all.json`

Current package metadata:

- schema version: `1.1.0`
- decks: `3`
- cards: `300`

Deck split:

- Empty: 100
- System: 100
- Phenomena: 100

## C) How to Read a Card Entry

Each card entry has:

1. **Identity**
   - `id` (for example `EMPTY_01`)
   - `deck` (`empty`, `system`, `phenomena`)
2. **Front**
   - 6-line structure (title, description, decision, options A/B/C)
3. **Instant Option Results**
   - one-shot option outcomes
   - profile (`soft_gain`, `hard_gain`, `soft_loss`, or `vp_award`)
   - timing/cost/effect
   - `effectData` field (present on `vp_award` options; carries `gainVpMostX` opcode)
4. **Rear**
   - primary `On Activation` (controller action)
   - secondary on-activation effect (auto)
5. **Metadata**
   - scope, keywords, status usage, retrigger flags, etc.

## D) Variant Card Handling Rule

Some cards may intentionally share:

- the same front image
- the same rear image
- the same front text

while using different rear powers.

When variants exist:

1. Treat each `deck:id` as a distinct card.
2. Use rear rules text as authoritative for persistent behavior.
3. Do not infer rear effects from shared art or shared front text.
4. For physical sets, include card ID markers for unambiguous lookup.
5. For digital runtime, variant resolution is keyed by `deck:id`.

Design note: this allows hidden strategic variance while preserving familiar visual language.

## E) Balance and Content Snapshot

From the current all-card data:

- costly instant options present: 30 cards (~10%)
- overdrive-style primaries: 30 cards (~10%)
- retrigger-capable primaries (`TRIGGER-ECHO`): 3 cards (one per deck target)
- minor-negative secondary backlash cards: 30 cards (~10%)
- VP Award instant options (`vp_award`): 10 per deck = **30 cards total** (every 10th card)

**VP Award metrics by deck:**

| Deck | Rotating metrics |
|------|-----------------|
| Empty | controlled systems → total influence → fleets deployed |
| System | total influence → active trade routes → beacons placed |
| Phenomena | controlled systems → total influence → fleets deployed |

All VP Award metrics are faction-neutral. Ties award no VP.

High-frequency keyword families include:

- `SCOUT`, `FORTIFY`, `DRIFTMARK`, `RELAY`
- `JAMMED`, `BEACONNET`, `VANTAGE`
- `SURGE`, `RECOVERY`

## F) Full Detailed Breakdown Locations

### F.1 Empty Deck (Cards `EMPTY_01`-`EMPTY_100`)

- File: `docs/card-text-empty.md`
- Contains all 100 Empty cards with complete front/rear breakdown.

### F.2 System Deck (Cards `SYS_01`-`SYS_100`)

- File: `docs/card-text-system.md`
- Contains all 100 System cards with complete front/rear breakdown.

### F.3 Phenomena Deck (Cards `PHE_01`-`PHE_100`)

- File: `docs/card-text-phenomena.md`
- Contains all 100 Phenomena cards with complete front/rear breakdown.

## G) Card Identity and Lookup Standard

Always reference cards as:

- `<deck>:<id>`

Examples:

- `empty:EMPTY_01`
- `system:SYS_41`
- `phenomena:PHE_88`

This prevents collisions when titles/fronts/art are shared across variants.

## H) Print and Digital Usage

### H.1 Digital

- Hover/tooltips show keyword reminders.
- Runtime rendering loads authored card text by `deck:id`.

### H.2 Print

- Keep a one-page keyword rules sheet nearby.
- Use this appendix + per-deck volumes for exact rear text lookup when variants share fronts.

## I) VP and Resource System Reference

**Victory Points** are the sole win condition. See `docs/how-to-play-and-rules-guide.md §2` for full detail.

Sources of VP:
- Card VP Award instants (30 cards total, every 10th)
- End-of-round controlled system count (+1 VP per faction with at least one controlled system)
- Combat: +1 VP per fleet destroyed; +1 VP for forcing a retreat

**Credits** and **Energy** are resources — they do not score VP directly. Their purpose:
- Credits: economic/logistics (Directorate-favoured boost, trade, costly options)
- Energy: tech/tactical (Bloom/Choir-favoured boost, Choir die shift, hazard movement)

## J) Maintenance Rule

Whenever cards are regenerated:

1. Regenerate `data/card-text-all.json` and deck markdown files.
2. Verify variant policy still holds (`deck:id` lookup and rear authority).
3. Update this appendix summary counts if profile percentages shift.
4. Confirm VP award count (should be 10 per deck = 30 total).
