# Phenomena Deck Card Text (Front + Rear)

Generated from agreed design constraints.

## Core Rules Profile

- Fixed front/back mapping per card; option outcomes are deterministic for that card.
- Front uses 6-line format: Title, Description, Decision, Option A, Option B, Option C.
- Option results are instant and one-shot: resolve once, then ignored for rest of game.
- Rear powers persist: controller can use **On Activation** action after card flips.
- Secondary effect auto-triggers each time On Activation is used.
- Controller = most influence; secondary target = second-most influence.
- Around 10% of cards have costly instant options with stronger effects.
- If a player cannot pay a cost, that effect does not happen.
- Negative effects never have a cost.
- At least one card has TRIGGER-ECHO primary that retriggers a resolved option effect.

## Combat Interaction Notes

- FORTIFY: a fleet with a FORTIFIED token may discard one token to negate one hit taken.
- EXPOSED: when a fleet with EXPOSED takes a hit, discard EXPOSED and apply one extra hit.
- JAMMED: a JAMMED fleet cannot move; discard JAMMED at END of turn.
- VANTAGE: at combat start, a side may discard VANTAGE to win draw outcomes; if both sides use VANTAGE, they cancel out.

## Keyword Glossary (Metadata)

- SALVAGE: Gain the listed Credits from this effect immediately; this does not place a token unless the effect says it does.
- SCOUT: Reveal 1 adjacent unrevealed hex immediately. If no adjacent unrevealed hex exists, this effect does nothing.
- ANCHOR: A Fleet entering this card's cell may not be activated to move again this turn.
- OVERCHARGE: Gain the listed bonus immediately. Apply the listed drawback at END of this turn unless that effect says otherwise.
- FORTIFY: Take a FORTIFIED token. You may discard this token to negate a hit you have taken.
- JAMMED: Take a JAMMED token. A JAMMED Fleet cannot move. Discard this token at END of turn.
- EXPOSED: Take an EXPOSED token. Next time you take a hit, discard this token and take an extra hit.
- STABILIZE: Reduce Cosmic Tension by 1 immediately, to a minimum of 0 unless another rule states otherwise.
- DRIFTMARK: Take a DRIFTMARK token and place it on the card/hex specified by the effect.
- BEACONNET: You have BEACONNET while you control at least two Beacon cards/tokens linked by your controlled path.
- TRADECHAIN: You have TRADECHAIN while you control a continuous route of trade-enabled cards between two controlled points.
- MUSTER: Gain +1 Fleet on this card.
- RELAY: Take a RELAY token. You may discard that token at any time to extend an effect's range by 1.
- VANTAGE: Take a VANTAGE token. At the start of any future combat you may discard it; your Fleets win any draws, even if the other side would normally win. If both sides play VANTAGE, they cancel out.
- SURGE: After resolving the main effect, immediately resolve one additional listed beneficial sub-effect.
- RECOVERY: After this effect fully resolves, gain 1 Energy.
- TRIGGER-ECHO: Choose one already-resolved instant option on this card and resolve it again.

## Cards 1-10

### Full Design Notes

- Scope mix in this block: 7 self, 3 local, 0 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### PHE_01 — Collapsed Megastructure

**Front (6 lines)**
1. Collapsed Megastructure
2. Collapsed Megastructure sits in phase-shear wakefields; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 4 Credits and 1 Energy.
- Option B (Pulse Cut): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Cool Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_02 — Phase Gate

**Front (6 lines)**
1. Phase Gate
2. Phase Gate sits in pre-cursor resonance scars; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 4 Credits and 1 Energy.
- Option B (Hard Tap): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Wide Berth): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

### PHE_03 — Fragmented Gate

**Front (6 lines)**
1. Fragmented Gate
2. Fragmented Gate sits in harmonic gate echoes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 4 Credits and 1 Energy.
- Option B (Breakwave): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Silent Seal): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_04 — Cosmic Ruins

**Front (6 lines)**
1. Cosmic Ruins
2. Cosmic Ruins sits in anomaly pressure tides; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pressure Spike): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Risk Veil): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

### PHE_05 — Void Maw

**Front (6 lines)**
1. Void Maw
2. Void Maw sits in unstable rift gradients; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Tune Void
5. Bleed Void
6. Ward Void

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Void): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Bleed Void): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Ward Void): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_06 — Phase Boundary

**Front (6 lines)**
1. Phase Boundary
2. Phase Boundary sits in phase-shear wakefields; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 4 Credits and 1 Energy.
- Option B (Pulse Cut): Gain 9 Credits, 4 Energy, +1 Fleet, and +1 Influence. Cost: Spend 2 Energy.
- Option C (Cool Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

### PHE_07 — Nebula Void

**Front (6 lines)**
1. Nebula Void
2. Nebula Void sits in pre-cursor resonance scars; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 4 Credits and 1 Energy.
- Option B (Hard Tap): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Wide Berth): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_08 — Elder Relic

**Front (6 lines)**
1. Elder Relic
2. Elder Relic sits in harmonic gate echoes; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Breakwave): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Silent Seal): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

### PHE_09 — The Singing Star

**Front (6 lines)**
1. The Singing Star
2. The Singing Star sits in anomaly pressure tides; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 4 Credits and 1 Energy.
- Option B (Pressure Spike): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Veil): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 6 Credits, 3 Energy, +1 Fleet, and +2 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 2 Credits (minor backlash).
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_10 — Dead Civilization

**Front (6 lines)**
1. Dead Civilization
2. Dead Civilization sits in unstable rift gradients; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Tune Dead
5. Bleed Dead
6. Ward Dead

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Dead): Gain 4 Credits and 1 Energy.
- Option B (Bleed Dead): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Ward Dead): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

## Cards 11-20

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### PHE_11 — Gravitational Lens

**Front (6 lines)**
1. Gravitational Lens
2. Gravitational Lens sits in phase-shear wakefields; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 4 Credits and 1 Energy.
- Option B (Pulse Cut): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Cool Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_12 — Frozen Anomaly

**Front (6 lines)**
1. Frozen Anomaly
2. Frozen Anomaly sits in pre-cursor resonance scars; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Tap): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Wide Berth): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

### PHE_13 — Gravity Gate

**Front (6 lines)**
1. Gravity Gate
2. Gravity Gate sits in harmonic gate echoes; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 4 Credits and 1 Energy.
- Option B (Breakwave): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Silent Seal): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_14 — Precursor Gate

**Front (6 lines)**
1. Precursor Gate
2. Precursor Gate sits in anomaly pressure tides; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 4 Credits and 1 Energy.
- Option B (Pressure Spike): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Veil): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

### PHE_15 — Gate Anomaly

**Front (6 lines)**
1. Gate Anomaly
2. Gate Anomaly sits in unstable rift gradients; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Tune Gate
5. Bleed Gate
6. Ward Gate

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Gate): Gain 4 Credits and 1 Energy.
- Option B (Bleed Gate): Gain 9 Credits, 4 Energy, +1 Fleet, and +1 Influence. Cost: Spend 2 Energy.
- Option C (Ward Gate): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_16 — Gate Remnant

**Front (6 lines)**
1. Gate Remnant
2. Gate Remnant sits in phase-shear wakefields; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pulse Cut): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Cool Pass): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

### PHE_17 — Magnetic Anomaly

**Front (6 lines)**
1. Magnetic Anomaly
2. Magnetic Anomaly sits in pre-cursor resonance scars; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 4 Credits and 1 Energy.
- Option B (Hard Tap): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Wide Berth): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_18 — Scattered Anomaly

**Front (6 lines)**
1. Scattered Anomaly
2. Scattered Anomaly sits in harmonic gate echoes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 4 Credits and 1 Energy.
- Option B (Breakwave): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Silent Seal): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

### PHE_19 — Rift Ruins

**Front (6 lines)**
1. Rift Ruins
2. Rift Ruins sits in anomaly pressure tides; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 4 Credits and 1 Energy.
- Option B (Pressure Spike): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Veil): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_20 — Gravity Void

**Front (6 lines)**
1. Gravity Void
2. Gravity Void sits in unstable rift gradients; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Tune Gravity
5. Bleed Gravity
6. Ward Gravity

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Gravity): Gain 3 Credits; each player gains 1 Credits.
- Option B (Bleed Gravity): Gain 6 Credits; gain +1 Influence.
- Option C (Ward Gravity): Lose 2 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits, 3 Energy, and +0 Fleet. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 2 Credits (minor backlash).
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

## Cards 21-30

### Full Design Notes

- Scope mix in this block: 7 self, 3 local, 0 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 0/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### PHE_21 — Megastructure Anomaly

**Front (6 lines)**
1. Megastructure Anomaly
2. Megastructure Anomaly sits in phase-shear wakefields; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 4 Credits and 1 Energy.
- Option B (Pulse Cut): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Cool Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_22 — Megastructure Debris

**Front (6 lines)**
1. Megastructure Debris
2. Megastructure Debris sits in pre-cursor resonance scars; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 4 Credits and 1 Energy.
- Option B (Hard Tap): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Wide Berth): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

### PHE_23 — Elder Pulse

**Front (6 lines)**
1. Elder Pulse
2. Elder Pulse sits in harmonic gate echoes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 4 Credits and 1 Energy.
- Option B (Breakwave): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Silent Seal): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_24 — Dimensional Rift

**Front (6 lines)**
1. Dimensional Rift
2. Dimensional Rift sits in anomaly pressure tides; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pressure Spike): Gain 8 Credits and +1 Influence in a hex within 2. Cost: Spend 2 Energy.
- Option C (Risk Veil): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

### PHE_25 — Reality Anomaly

**Front (6 lines)**
1. Reality Anomaly
2. Reality Anomaly sits in unstable rift gradients; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Tune Reality
5. Bleed Reality
6. Ward Reality

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Reality): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Bleed Reality): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Ward Reality): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_26 — Star Storm

**Front (6 lines)**
1. Star Storm
2. Star Storm sits in phase-shear wakefields; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 4 Credits and 1 Energy.
- Option B (Pulse Cut): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Cool Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

### PHE_27 — Nebula Ruins

**Front (6 lines)**
1. Nebula Ruins
2. Nebula Ruins sits in pre-cursor resonance scars; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 4 Credits and 1 Energy.
- Option B (Hard Tap): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Wide Berth): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_28 — Whispering Rift

**Front (6 lines)**
1. Whispering Rift
2. Whispering Rift sits in harmonic gate echoes; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Breakwave): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Silent Seal): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

### PHE_29 — Screaming Nebula

**Front (6 lines)**
1. Screaming Nebula
2. Screaming Nebula sits in anomaly pressure tides; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 4 Credits and 1 Energy.
- Option B (Pressure Spike): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Veil): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_30 — Scattered Relics

**Front (6 lines)**
1. Scattered Relics
2. Scattered Relics sits in unstable rift gradients; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Tune Scattered
5. Bleed Scattered
6. Ward Scattered

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Scattered): Gain 4 Credits and 1 Energy.
- Option B (Bleed Scattered): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Ward Scattered): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

## Cards 31-40

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 2/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### PHE_31 — Silent Gate

**Front (6 lines)**
1. Silent Gate
2. Silent Gate sits in phase-shear wakefields; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 4 Credits and 1 Energy.
- Option B (Pulse Cut): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Cool Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 6 Credits, 3 Energy, +1 Fleet, and +2 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 2 Credits (minor backlash).
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_32 — Screaming Gate

**Front (6 lines)**
1. Screaming Gate
2. Screaming Gate sits in pre-cursor resonance scars; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Tap): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Wide Berth): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

### PHE_33 — Frozen Gate

**Front (6 lines)**
1. Frozen Gate
2. Frozen Gate sits in harmonic gate echoes; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 4 Credits and 1 Energy.
- Option B (Breakwave): Gain 9 Credits, 4 Energy, +1 Fleet, and +1 Influence. Cost: Spend 2 Energy.
- Option C (Silent Seal): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_34 — Dead Star Gate

**Front (6 lines)**
1. Dead Star Gate
2. Dead Star Gate sits in anomaly pressure tides; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 4 Credits and 2 Energy.
- Option B (Pressure Spike): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Veil): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

### PHE_35 — Void Singer

**Front (6 lines)**
1. Void Singer
2. Void Singer sits in unstable rift gradients; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Tune Void
5. Bleed Void
6. Ward Void

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Void): Gain 4 Credits and 2 Energy.
- Option B (Bleed Void): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Ward Void): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_36 — Void Storm

**Front (6 lines)**
1. Void Storm
2. Void Storm sits in phase-shear wakefields; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pulse Cut): Gain 7 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Cool Pass): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

### PHE_37 — Nebula Anomaly

**Front (6 lines)**
1. Nebula Anomaly
2. Nebula Anomaly sits in pre-cursor resonance scars; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 4 Credits and 2 Energy.
- Option B (Hard Tap): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Wide Berth): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_38 — Dead Star Remnant

**Front (6 lines)**
1. Dead Star Remnant
2. Dead Star Remnant sits in harmonic gate echoes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 4 Credits and 2 Energy.
- Option B (Breakwave): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Silent Seal): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

### PHE_39 — Supernova Remnant

**Front (6 lines)**
1. Supernova Remnant
2. Supernova Remnant sits in anomaly pressure tides; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 4 Credits and 2 Energy.
- Option B (Pressure Spike): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Veil): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_40 — Black Hole Choir

**Front (6 lines)**
1. Black Hole Choir
2. Black Hole Choir sits in unstable rift gradients; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Tune Black
5. Bleed Black
6. Ward Black

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Black): Gain 3 Credits; each player gains 1 Credits.
- Option B (Bleed Black): Gain 7 Credits; gain +1 Influence.
- Option C (Ward Black): Lose 2 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 6 Credits, 3 Energy, and +1 Fleet. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 2 Credits (minor backlash).
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

## Cards 41-50

### Full Design Notes

- Scope mix in this block: 7 self, 3 local, 0 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 0/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### PHE_41 — Phase Storm

**Front (6 lines)**
1. Phase Storm
2. Phase Storm sits in phase-shear wakefields; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 4 Credits and 2 Energy.
- Option B (Pulse Cut): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Cool Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_42 — Star Anomaly

**Front (6 lines)**
1. Star Anomaly
2. Star Anomaly sits in pre-cursor resonance scars; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 4 Credits and 2 Energy.
- Option B (Hard Tap): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Wide Berth): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

### PHE_43 — Screaming Rift

**Front (6 lines)**
1. Screaming Rift
2. Screaming Rift sits in harmonic gate echoes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 4 Credits and 2 Energy.
- Option B (Breakwave): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Silent Seal): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_44 — Gravity Well

**Front (6 lines)**
1. Gravity Well
2. Gravity Well sits in anomaly pressure tides; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pressure Spike): Gain 7 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Risk Veil): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

### PHE_45 — Phase Ruins

**Front (6 lines)**
1. Phase Ruins
2. Phase Ruins sits in unstable rift gradients; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Tune Phase
5. Bleed Phase
6. Ward Phase

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Phase): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Bleed Phase): Gain 7 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Ward Phase): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_46 — Nebula Pulse

**Front (6 lines)**
1. Nebula Pulse
2. Nebula Pulse sits in phase-shear wakefields; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 4 Credits and 2 Energy.
- Option B (Pulse Cut): Gain 10 Credits, 4 Energy, +1 Fleet, and +1 Influence. Cost: Spend 2 Energy.
- Option C (Cool Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

### PHE_47 — Echoing Anomaly

**Front (6 lines)**
1. Echoing Anomaly
2. Echoing Anomaly sits in pre-cursor resonance scars; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 4 Credits and 2 Energy.
- Option B (Hard Tap): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Wide Berth): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_48 — Spatial Gate

**Front (6 lines)**
1. Spatial Gate
2. Spatial Gate sits in harmonic gate echoes; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Breakwave): Gain 7 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Silent Seal): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

### PHE_49 — Collapsed Gate

**Front (6 lines)**
1. Collapsed Gate
2. Collapsed Gate sits in anomaly pressure tides; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 4 Credits and 2 Energy.
- Option B (Pressure Spike): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Veil): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_50 — Neutron Pulse

**Front (6 lines)**
1. Neutron Pulse
2. Neutron Pulse sits in unstable rift gradients; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Tune Neutron
5. Bleed Neutron
6. Ward Neutron

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Neutron): Gain 4 Credits and 2 Energy.
- Option B (Bleed Neutron): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Ward Neutron): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

## Cards 51-60

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### PHE_51 — Buried Gate

**Front (6 lines)**
1. Buried Gate
2. Buried Gate sits in phase-shear wakefields; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 4 Credits and 2 Energy.
- Option B (Pulse Cut): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Cool Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 7 Credits, 3 Energy, +2 Fleet, and +2 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 2 Credits (minor backlash).
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_52 — Buried Storm

**Front (6 lines)**
1. Buried Storm
2. Buried Storm sits in pre-cursor resonance scars; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Tap): Gain 7 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Wide Berth): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

### PHE_53 — Cosmic Choir

**Front (6 lines)**
1. Cosmic Choir
2. Cosmic Choir sits in harmonic gate echoes; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 4 Credits and 2 Energy.
- Option B (Breakwave): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Silent Seal): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_54 — Megastructure Pulse

**Front (6 lines)**
1. Megastructure Pulse
2. Megastructure Pulse sits in anomaly pressure tides; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 4 Credits and 2 Energy.
- Option B (Pressure Spike): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Veil): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

### PHE_55 — Hyperspace Bleed

**Front (6 lines)**
1. Hyperspace Bleed
2. Hyperspace Bleed sits in unstable rift gradients; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Tune Hyperspace
5. Bleed Hyperspace
6. Ward Hyperspace

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Hyperspace): Gain 4 Credits and 2 Energy. Place 1 TRIGGER-ECHO token on this card.
- Option B (Bleed Hyperspace): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Ward Hyperspace): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. TRIGGER-ECHO: choose one instant option on this card that has already resolved and trigger its effect again. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_56 — Quantum Echo

**Front (6 lines)**
1. Quantum Echo
2. Quantum Echo sits in phase-shear wakefields; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pulse Cut): Gain 7 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Cool Pass): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

### PHE_57 — Gate Storm

**Front (6 lines)**
1. Gate Storm
2. Gate Storm sits in pre-cursor resonance scars; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 4 Credits and 2 Energy.
- Option B (Hard Tap): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Wide Berth): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_58 — Ancient Ruins

**Front (6 lines)**
1. Ancient Ruins
2. Ancient Ruins sits in harmonic gate echoes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 4 Credits and 2 Energy.
- Option B (Breakwave): Gain 10 Credits, 4 Energy, +1 Fleet, and +1 Influence. Cost: Spend 2 Energy.
- Option C (Silent Seal): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

### PHE_59 — Quantum Void

**Front (6 lines)**
1. Quantum Void
2. Quantum Void sits in anomaly pressure tides; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 4 Credits and 2 Energy.
- Option B (Pressure Spike): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Veil): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_60 — Precursor Relic

**Front (6 lines)**
1. Precursor Relic
2. Precursor Relic sits in unstable rift gradients; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Tune Precursor
5. Bleed Precursor
6. Ward Precursor

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Precursor): Gain 3 Credits; each player gains 1 Credits.
- Option B (Bleed Precursor): Gain 7 Credits; gain +1 Influence.
- Option C (Ward Precursor): Lose 2 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 6 Credits and +1 Influence. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

## Cards 61-70

### Full Design Notes

- Scope mix in this block: 7 self, 3 local, 0 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### PHE_61 — Ancient Storm

**Front (6 lines)**
1. Ancient Storm
2. Ancient Storm sits in phase-shear wakefields; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 4 Credits and 2 Energy.
- Option B (Pulse Cut): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Cool Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_62 — Nebula Song

**Front (6 lines)**
1. Nebula Song
2. Nebula Song sits in pre-cursor resonance scars; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 4 Credits and 2 Energy.
- Option B (Hard Tap): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Wide Berth): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

### PHE_63 — Elder Structure

**Front (6 lines)**
1. Elder Structure
2. Elder Structure sits in harmonic gate echoes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 4 Credits and 2 Energy.
- Option B (Breakwave): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Silent Seal): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 7 Credits, 3 Energy, +2 Fleet, and +2 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 2 Credits (minor backlash).
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_64 — Whispering Void

**Front (6 lines)**
1. Whispering Void
2. Whispering Void sits in anomaly pressure tides; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pressure Spike): Gain 7 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Risk Veil): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

### PHE_65 — Quantum Pulse

**Front (6 lines)**
1. Quantum Pulse
2. Quantum Pulse sits in unstable rift gradients; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Tune Quantum
5. Bleed Quantum
6. Ward Quantum

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Quantum): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Bleed Quantum): Gain 7 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Ward Quantum): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_66 — Lost Technology

**Front (6 lines)**
1. Lost Technology
2. Lost Technology sits in phase-shear wakefields; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 4 Credits and 2 Energy.
- Option B (Pulse Cut): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Cool Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

### PHE_67 — Void Ruins

**Front (6 lines)**
1. Void Ruins
2. Void Ruins sits in pre-cursor resonance scars; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 4 Credits and 2 Energy.
- Option B (Hard Tap): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Wide Berth): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_68 — Ancient Jump Gate

**Front (6 lines)**
1. Ancient Jump Gate
2. Ancient Jump Gate sits in harmonic gate echoes; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 5 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Breakwave): Gain 8 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Silent Seal): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +2 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

### PHE_69 — Fragmented Storm

**Front (6 lines)**
1. Fragmented Storm
2. Fragmented Storm sits in anomaly pressure tides; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 5 Credits and 2 Energy.
- Option B (Pressure Spike): Gain 11 Credits, 5 Energy, +2 Fleet, and +2 Influence. Cost: Spend 2 Energy.
- Option C (Risk Veil): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_70 — Nebula Gate

**Front (6 lines)**
1. Nebula Gate
2. Nebula Gate sits in unstable rift gradients; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Tune Nebula
5. Bleed Nebula
6. Ward Nebula

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Nebula): Gain 5 Credits and 2 Energy.
- Option B (Bleed Nebula): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Ward Nebula): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

## Cards 71-80

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### PHE_71 — Burning Ruins

**Front (6 lines)**
1. Burning Ruins
2. Burning Ruins sits in phase-shear wakefields; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 5 Credits and 2 Energy.
- Option B (Pulse Cut): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Cool Pass): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_72 — Quantum Gate

**Front (6 lines)**
1. Quantum Gate
2. Quantum Gate sits in pre-cursor resonance scars; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 5 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Tap): Gain 8 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Wide Berth): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 7 Credits, 4 Energy, and one friendly fleet within 2 takes a FORTIFIED token. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 2 Credits (minor backlash).
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

### PHE_73 — Gate Fragment

**Front (6 lines)**
1. Gate Fragment
2. Gate Fragment sits in harmonic gate echoes; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 5 Credits and 2 Energy.
- Option B (Breakwave): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Silent Seal): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_74 — Whispering Anomaly

**Front (6 lines)**
1. Whispering Anomaly
2. Whispering Anomaly sits in anomaly pressure tides; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 5 Credits and 2 Energy.
- Option B (Pressure Spike): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Risk Veil): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

### PHE_75 — Gate Echo

**Front (6 lines)**
1. Gate Echo
2. Gate Echo sits in unstable rift gradients; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Tune Gate
5. Bleed Gate
6. Ward Gate

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Gate): Gain 5 Credits and 2 Energy.
- Option B (Bleed Gate): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Ward Gate): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_76 — Silent Anomaly

**Front (6 lines)**
1. Silent Anomaly
2. Silent Anomaly sits in phase-shear wakefields; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 5 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pulse Cut): Gain 8 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Cool Pass): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +2 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

### PHE_77 — Rift Pulse

**Front (6 lines)**
1. Rift Pulse
2. Rift Pulse sits in pre-cursor resonance scars; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 5 Credits and 2 Energy.
- Option B (Hard Tap): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Wide Berth): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_78 — Warp Storm

**Front (6 lines)**
1. Warp Storm
2. Warp Storm sits in harmonic gate echoes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 5 Credits and 2 Energy.
- Option B (Breakwave): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Silent Seal): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

### PHE_79 — Star Tear

**Front (6 lines)**
1. Star Tear
2. Star Tear sits in anomaly pressure tides; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 5 Credits and 2 Energy.
- Option B (Pressure Spike): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Risk Veil): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_80 — Singularity Echo

**Front (6 lines)**
1. Singularity Echo
2. Singularity Echo sits in unstable rift gradients; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Tune Singularity
5. Bleed Singularity
6. Ward Singularity

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Singularity): Gain 4 Credits; each player gains 1 Credits.
- Option B (Bleed Singularity): Gain 9 Credits and +1 Fleet. Cost: Spend 2 Energy.
- Option C (Ward Singularity): Lose 3 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 6 Credits and +2 Influence. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

## Cards 81-90

### Full Design Notes

- Scope mix in this block: 7 self, 3 local, 0 global.
- Costly instant options in this block: 0/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### PHE_81 — Phase Anomaly

**Front (6 lines)**
1. Phase Anomaly
2. Phase Anomaly sits in phase-shear wakefields; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 5 Credits and 2 Energy.
- Option B (Pulse Cut): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Cool Pass): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_82 — Radiation Burst

**Front (6 lines)**
1. Radiation Burst
2. Radiation Burst sits in pre-cursor resonance scars; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 5 Credits and 2 Energy.
- Option B (Hard Tap): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Wide Berth): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

### PHE_83 — Rift Harmony

**Front (6 lines)**
1. Rift Harmony
2. Rift Harmony sits in harmonic gate echoes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 5 Credits and 2 Energy.
- Option B (Breakwave): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Silent Seal): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 7 Credits, 4 Energy, +2 Fleet, and +3 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 2 Credits (minor backlash).
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_84 — Quantum Foam

**Front (6 lines)**
1. Quantum Foam
2. Quantum Foam sits in anomaly pressure tides; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 5 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pressure Spike): Gain 8 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Risk Veil): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +2 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

### PHE_85 — Ancient Dead Star

**Front (6 lines)**
1. Ancient Dead Star
2. Ancient Dead Star sits in unstable rift gradients; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Tune Ancient
5. Bleed Ancient
6. Ward Ancient

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Ancient): Gain 5 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Bleed Ancient): Gain 8 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Ward Ancient): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +2 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_86 — Singing Void

**Front (6 lines)**
1. Singing Void
2. Singing Void sits in phase-shear wakefields; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 5 Credits and 2 Energy.
- Option B (Pulse Cut): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Cool Pass): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

### PHE_87 — Abandoned Megastructure

**Front (6 lines)**
1. Abandoned Megastructure
2. Abandoned Megastructure sits in pre-cursor resonance scars; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 5 Credits and 2 Energy.
- Option B (Hard Tap): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Wide Berth): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_88 — Magnetic Pulse

**Front (6 lines)**
1. Magnetic Pulse
2. Magnetic Pulse sits in harmonic gate echoes; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 5 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Breakwave): Gain 8 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Silent Seal): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +2 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

### PHE_89 — Buried Ruins

**Front (6 lines)**
1. Buried Ruins
2. Buried Ruins sits in anomaly pressure tides; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 5 Credits and 2 Energy.
- Option B (Pressure Spike): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Risk Veil): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_90 — Elder Anomaly

**Front (6 lines)**
1. Elder Anomaly
2. Elder Anomaly sits in unstable rift gradients; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Tune Elder
5. Bleed Elder
6. Ward Elder

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Elder): Gain 5 Credits and 2 Energy.
- Option B (Bleed Elder): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Ward Elder): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

## Cards 91-100

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 2/10.
- Overdrive primary with minor secondary backlash: 2/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### PHE_91 — Void Harmony

**Front (6 lines)**
1. Void Harmony
2. Void Harmony sits in phase-shear wakefields; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 5 Credits and 2 Energy.
- Option B (Pulse Cut): Gain 11 Credits, 5 Energy, +2 Fleet, and +2 Influence. Cost: Spend 2 Energy.
- Option C (Cool Pass): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_92 — Gravity Anomaly

**Front (6 lines)**
1. Gravity Anomaly
2. Gravity Anomaly sits in pre-cursor resonance scars; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 5 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Tap): Gain 8 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Wide Berth): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +2 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

### PHE_93 — Phase Shift

**Front (6 lines)**
1. Phase Shift
2. Phase Shift sits in harmonic gate echoes; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 5 Credits and 2 Energy.
- Option B (Breakwave): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Silent Seal): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_94 — Rift Storm

**Front (6 lines)**
1. Rift Storm
2. Rift Storm sits in anomaly pressure tides; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 5 Credits and 2 Energy.
- Option B (Pressure Spike): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Risk Veil): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 7 Credits, 4 Energy, +2 Fleet, and +3 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 2 Credits (minor backlash).
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

### PHE_95 — Quantum Rift

**Front (6 lines)**
1. Quantum Rift
2. Quantum Rift sits in unstable rift gradients; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Tune Quantum
5. Bleed Quantum
6. Ward Quantum

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Quantum): Gain 5 Credits and 2 Energy.
- Option B (Bleed Quantum): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Ward Quantum): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Rift Cartographer Enna

### PHE_96 — Phase Echo

**Front (6 lines)**
1. Phase Echo
2. Phase Echo sits in phase-shear wakefields; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Rift Sweep
5. Pulse Cut
6. Cool Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Rift Sweep): Gain 5 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pulse Cut): Gain 8 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Cool Pass): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and choose a hex within 2: gain +2 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Whisper-Seer Kael

### PHE_97 — Reality Bubble

**Front (6 lines)**
1. Reality Bubble
2. Reality Bubble sits in pre-cursor resonance scars; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Echo Claim
5. Hard Tap
6. Wide Berth

**Instant Option Results (resolve once, then ignore)**
- Option A (Echo Claim): Gain 5 Credits and 2 Energy.
- Option B (Hard Tap): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Wide Berth): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Gatewright Joss

### PHE_98 — Megastructure Ruins

**Front (6 lines)**
1. Megastructure Ruins
2. Megastructure Ruins sits in harmonic gate echoes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Phase Stitch
5. Breakwave
6. Silent Seal

**Instant Option Results (resolve once, then ignore)**
- Option A (Phase Stitch): Gain 5 Credits and 2 Energy.
- Option B (Breakwave): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Silent Seal): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 7 Credits, 4 Energy, +2 Fleet, and +3 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 2 Credits (minor backlash).
- Flavor: "Every rift is a question asked in the language of gravity." — Chronicle-Node 7

### PHE_99 — Temporal Gate

**Front (6 lines)**
1. Temporal Gate
2. Temporal Gate sits in anomaly pressure tides; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Probe Arc
5. Pressure Spike
6. Risk Veil

**Instant Option Results (resolve once, then ignore)**
- Option A (Probe Arc): Gain 5 Credits and 2 Energy.
- Option B (Pressure Spike): Gain 9 Credits, 4 Energy, and +2 Influence.
- Option C (Risk Veil): Lose 3 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and 3 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The void sings loudest to captains who rush." — Cantor Brine

### PHE_100 — Singing Gate

**Front (6 lines)**
1. Singing Gate
2. Singing Gate sits in unstable rift gradients; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Tune Singing
5. Bleed Singing
6. Ward Singing

**Instant Option Results (resolve once, then ignore)**
- Option A (Tune Singing): Gain 4 Credits; each player gains 1 Credits.
- Option B (Bleed Singing): Gain 9 Credits and +1 Fleet. Cost: Spend 2 Energy.
- Option C (Ward Singing): Lose 3 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 6 Credits and +2 Influence. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Every rift is a question asked in the language of gravity." — Void Pilgrim Taal

