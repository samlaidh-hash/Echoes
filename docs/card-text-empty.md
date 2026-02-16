# Empty Deck Card Text (Front + Rear)

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

### EMPTY_01 — Cargo Drift

**Front (6 lines)**
1. Cargo Drift
2. Cargo Drift sits in faint transponder ghosts; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 2 Credits and 1 Energy.
- Option B (Deep Cut): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_02 — Hull Scatter

**Front (6 lines)**
1. Hull Scatter
2. Hull Scatter sits in broken cargo signatures; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 2 Credits and 1 Energy.
- Option B (Hard Burn): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

### EMPTY_03 — Stray Hull

**Front (6 lines)**
1. Stray Hull
2. Stray Hull sits in unclaimed relay traffic; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 2 Credits and 1 Energy.
- Option B (Breakline): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_04 — Debris Field

**Front (6 lines)**
1. Debris Field
2. Debris Field sits in old salvage corridors; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pressure Run): Gain 4 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Risk Buffer): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

### EMPTY_05 — Void Drift

**Front (6 lines)**
1. Void Drift
2. Void Drift sits in cold debris lanes; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Tag Void
5. Strip Void
6. Shadow Void

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Void): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Strip Void): Gain 4 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Shadow Void): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_06 — Abandoned Outpost

**Front (6 lines)**
1. Abandoned Outpost
2. Abandoned Outpost sits in faint transponder ghosts; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 2 Credits and 1 Energy.
- Option B (Deep Cut): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

### EMPTY_07 — Cargo Cluster

**Front (6 lines)**
1. Cargo Cluster
2. Cargo Cluster sits in broken cargo signatures; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 2 Credits and 1 Energy.
- Option B (Hard Burn): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits, 2 Energy, +1 Fleet, and +1 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits (minor backlash).
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_08 — Orphaned Buoy

**Front (6 lines)**
1. Orphaned Buoy
2. Orphaned Buoy sits in unclaimed relay traffic; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Breakline): Gain 4 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Silent Mark): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

### EMPTY_09 — Silent Beacon

**Front (6 lines)**
1. Silent Beacon
2. Silent Beacon sits in old salvage corridors; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 2 Credits and 1 Energy.
- Option B (Pressure Run): Gain 7 Credits, 3 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_10 — Void Remnant

**Front (6 lines)**
1. Void Remnant
2. Void Remnant sits in cold debris lanes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Tag Void
5. Strip Void
6. Shadow Void

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Void): Gain 2 Credits and 1 Energy.
- Option B (Strip Void): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Shadow Void): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

## Cards 11-20

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### EMPTY_11 — Scavenger Mark

**Front (6 lines)**
1. Scavenger Mark
2. Scavenger Mark sits in faint transponder ghosts; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 2 Credits and 1 Energy.
- Option B (Deep Cut): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_12 — Lost Buoy

**Front (6 lines)**
1. Lost Buoy
2. Lost Buoy sits in broken cargo signatures; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Burn): Gain 4 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Hold Distance): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

### EMPTY_13 — Derelict Probe Field

**Front (6 lines)**
1. Derelict Probe Field
2. Derelict Probe Field sits in unclaimed relay traffic; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 2 Credits and 1 Energy.
- Option B (Breakline): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_14 — Scrap Veil

**Front (6 lines)**
1. Scrap Veil
2. Scrap Veil sits in old salvage corridors; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 2 Credits and 1 Energy.
- Option B (Pressure Run): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

### EMPTY_15 — Signal Burst

**Front (6 lines)**
1. Signal Burst
2. Signal Burst sits in cold debris lanes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Tag Signal
5. Strip Signal
6. Shadow Signal

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Signal): Gain 2 Credits and 1 Energy.
- Option B (Strip Signal): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Shadow Signal): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_16 — Scattered Hulls

**Front (6 lines)**
1. Scattered Hulls
2. Scattered Hulls sits in faint transponder ghosts; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Deep Cut): Gain 4 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Cold Pass): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits, 2 Energy, and one friendly fleet within 2 takes a FORTIFIED token. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits (minor backlash).
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

### EMPTY_17 — Floating Cache

**Front (6 lines)**
1. Floating Cache
2. Floating Cache sits in broken cargo signatures; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 2 Credits and 1 Energy.
- Option B (Hard Burn): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_18 — Wreck Cluster

**Front (6 lines)**
1. Wreck Cluster
2. Wreck Cluster sits in unclaimed relay traffic; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 2 Credits and 1 Energy.
- Option B (Breakline): Gain 7 Credits, 3 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

### EMPTY_19 — Cold Wake

**Front (6 lines)**
1. Cold Wake
2. Cold Wake sits in old salvage corridors; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 2 Credits and 1 Energy.
- Option B (Pressure Run): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_20 — Orphaned Station

**Front (6 lines)**
1. Orphaned Station
2. Orphaned Station sits in cold debris lanes; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Tag Orphaned
5. Strip Orphaned
6. Shadow Orphaned

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Orphaned): Gain 1 Credits; each player gains 1 Credits.
- Option B (Strip Orphaned): Gain 4 Credits; gain +1 Influence.
- Option C (Shadow Orphaned): Lose 2 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and +1 Influence. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

## Cards 21-30

### Full Design Notes

- Scope mix in this block: 7 self, 3 local, 0 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### EMPTY_21 — Ghost Drift

**Front (6 lines)**
1. Ghost Drift
2. Ghost Drift sits in faint transponder ghosts; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 2 Credits and 1 Energy.
- Option B (Deep Cut): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_22 — Signal Drift

**Front (6 lines)**
1. Signal Drift
2. Signal Drift sits in broken cargo signatures; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 2 Credits and 1 Energy.
- Option B (Hard Burn): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

### EMPTY_23 — Scavenger's Mark

**Front (6 lines)**
1. Scavenger's Mark
2. Scavenger's Mark sits in unclaimed relay traffic; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 2 Credits and 1 Energy.
- Option B (Breakline): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_24 — Floating Hull

**Front (6 lines)**
1. Floating Hull
2. Floating Hull sits in old salvage corridors; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pressure Run): Gain 4 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Risk Buffer): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

### EMPTY_25 — Wreckage Cluster

**Front (6 lines)**
1. Wreckage Cluster
2. Wreckage Cluster sits in cold debris lanes; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Tag Wreckage
5. Strip Wreckage
6. Shadow Wreckage

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Wreckage): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Strip Wreckage): Gain 4 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Shadow Wreckage): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits, 2 Energy, and one friendly fleet within 2 takes a FORTIFIED token. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits (minor backlash).
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_26 — Micrometeor Swarm

**Front (6 lines)**
1. Micrometeor Swarm
2. Micrometeor Swarm sits in faint transponder ghosts; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 2 Credits and 1 Energy.
- Option B (Deep Cut): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

### EMPTY_27 — Unclaimed Cache

**Front (6 lines)**
1. Unclaimed Cache
2. Unclaimed Cache sits in broken cargo signatures; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 2 Credits and 1 Energy.
- Option B (Hard Burn): Gain 7 Credits, 3 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_28 — Scattered Wreck

**Front (6 lines)**
1. Scattered Wreck
2. Scattered Wreck sits in unclaimed relay traffic; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Breakline): Gain 4 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Silent Mark): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

### EMPTY_29 — Floating Debris

**Front (6 lines)**
1. Floating Debris
2. Floating Debris sits in old salvage corridors; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 2 Credits and 1 Energy.
- Option B (Pressure Run): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_30 — Orphaned Cargo

**Front (6 lines)**
1. Orphaned Cargo
2. Orphaned Cargo sits in cold debris lanes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Tag Orphaned
5. Strip Orphaned
6. Shadow Orphaned

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Orphaned): Gain 2 Credits and 1 Energy.
- Option B (Strip Orphaned): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Shadow Orphaned): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

## Cards 31-40

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### EMPTY_31 — Orphaned Relay

**Front (6 lines)**
1. Orphaned Relay
2. Orphaned Relay sits in faint transponder ghosts; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 2 Credits and 1 Energy.
- Option B (Deep Cut): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_32 — Derelict Hull

**Front (6 lines)**
1. Derelict Hull
2. Derelict Hull sits in broken cargo signatures; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Burn): Gain 4 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Hold Distance): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits, 2 Energy, and one friendly fleet within 2 takes a FORTIFIED token. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits (minor backlash).
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

### EMPTY_33 — Scattered Remains

**Front (6 lines)**
1. Scattered Remains
2. Scattered Remains sits in unclaimed relay traffic; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 2 Credits and 1 Energy.
- Option B (Breakline): Gain 5 Credits, 2 Energy, and +1 Influence.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 2 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_34 — Drift Remnant

**Front (6 lines)**
1. Drift Remnant
2. Drift Remnant sits in old salvage corridors; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 2 Credits and 1 Energy.
- Option B (Pressure Run): Gain 8 Credits, 3 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

### EMPTY_35 — Cargo Graveyard

**Front (6 lines)**
1. Cargo Graveyard
2. Cargo Graveyard sits in cold debris lanes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Tag Cargo
5. Strip Cargo
6. Shadow Cargo

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Cargo): Gain 2 Credits and 1 Energy.
- Option B (Strip Cargo): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Shadow Cargo): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_36 — Signal Ghost

**Front (6 lines)**
1. Signal Ghost
2. Signal Ghost sits in faint transponder ghosts; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Deep Cut): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Cold Pass): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

### EMPTY_37 — Wreckage Field

**Front (6 lines)**
1. Wreckage Field
2. Wreckage Field sits in broken cargo signatures; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 2 Credits and 1 Energy. Place 1 TRIGGER-ECHO token on this card.
- Option B (Hard Burn): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. TRIGGER-ECHO: choose one instant option on this card that has already resolved and trigger its effect again. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_38 — Orphaned Pod

**Front (6 lines)**
1. Orphaned Pod
2. Orphaned Pod sits in unclaimed relay traffic; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 2 Credits and 1 Energy.
- Option B (Breakline): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

### EMPTY_39 — Void Remains

**Front (6 lines)**
1. Void Remains
2. Void Remains sits in old salvage corridors; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 2 Credits and 1 Energy.
- Option B (Pressure Run): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_40 — Cargo Scatter

**Front (6 lines)**
1. Cargo Scatter
2. Cargo Scatter sits in cold debris lanes; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Tag Cargo
5. Strip Cargo
6. Shadow Cargo

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Cargo): Gain 1 Credits; each player gains 1 Credits.
- Option B (Strip Cargo): Gain 5 Credits; gain +1 Influence.
- Option C (Shadow Cargo): Lose 2 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and +1 Influence. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

## Cards 41-50

### Full Design Notes

- Scope mix in this block: 7 self, 3 local, 0 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### EMPTY_41 — Lost Freighter

**Front (6 lines)**
1. Lost Freighter
2. Lost Freighter sits in faint transponder ghosts; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 2 Credits and 1 Energy.
- Option B (Deep Cut): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits, 2 Energy, +1 Fleet, and +1 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits (minor backlash).
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_42 — Signal Static

**Front (6 lines)**
1. Signal Static
2. Signal Static sits in broken cargo signatures; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 2 Credits and 1 Energy.
- Option B (Hard Burn): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

### EMPTY_43 — Dust Field

**Front (6 lines)**
1. Dust Field
2. Dust Field sits in unclaimed relay traffic; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 2 Credits and 1 Energy.
- Option B (Breakline): Gain 8 Credits, 3 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_44 — Floating Debris Field

**Front (6 lines)**
1. Floating Debris Field
2. Floating Debris Field sits in old salvage corridors; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pressure Run): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Risk Buffer): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

### EMPTY_45 — Debris Scatter

**Front (6 lines)**
1. Debris Scatter
2. Debris Scatter sits in cold debris lanes; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Tag Debris
5. Strip Debris
6. Shadow Debris

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Debris): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Strip Debris): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Shadow Debris): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_46 — Scavenger Haul

**Front (6 lines)**
1. Scavenger Haul
2. Scavenger Haul sits in faint transponder ghosts; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 2 Credits and 1 Energy.
- Option B (Deep Cut): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

### EMPTY_47 — Wreck Trail

**Front (6 lines)**
1. Wreck Trail
2. Wreck Trail sits in broken cargo signatures; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 2 Credits and 1 Energy.
- Option B (Hard Burn): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_48 — Drift Net

**Front (6 lines)**
1. Drift Net
2. Drift Net sits in unclaimed relay traffic; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Breakline): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Silent Mark): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

### EMPTY_49 — Void Pocket

**Front (6 lines)**
1. Void Pocket
2. Void Pocket sits in old salvage corridors; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 2 Credits and 1 Energy.
- Option B (Pressure Run): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_50 — Lost Cargo

**Front (6 lines)**
1. Lost Cargo
2. Lost Cargo sits in cold debris lanes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Tag Lost
5. Strip Lost
6. Shadow Lost

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Lost): Gain 2 Credits and 1 Energy.
- Option B (Strip Lost): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Shadow Lost): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

## Cards 51-60

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### EMPTY_51 — Ghost Cargo

**Front (6 lines)**
1. Ghost Cargo
2. Ghost Cargo sits in faint transponder ghosts; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 2 Credits and 1 Energy.
- Option B (Deep Cut): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_52 — Drift Station

**Front (6 lines)**
1. Drift Station
2. Drift Station sits in broken cargo signatures; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Burn): Gain 7 Credits and +1 Influence in a hex within 2. Cost: Spend 1 Energy.
- Option C (Hold Distance): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

### EMPTY_53 — Lost Beacon

**Front (6 lines)**
1. Lost Beacon
2. Lost Beacon sits in unclaimed relay traffic; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 2 Credits and 1 Energy.
- Option B (Breakline): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_54 — Debris Ring

**Front (6 lines)**
1. Debris Ring
2. Debris Ring sits in old salvage corridors; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 2 Credits and 1 Energy.
- Option B (Pressure Run): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

### EMPTY_55 — Debris Trail

**Front (6 lines)**
1. Debris Trail
2. Debris Trail sits in cold debris lanes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Tag Debris
5. Strip Debris
6. Shadow Debris

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Debris): Gain 2 Credits and 1 Energy.
- Option B (Strip Debris): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Shadow Debris): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits, 2 Energy, +1 Fleet, and +1 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits (minor backlash).
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_56 — Ghost Freighter

**Front (6 lines)**
1. Ghost Freighter
2. Ghost Freighter sits in faint transponder ghosts; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Deep Cut): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Cold Pass): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

### EMPTY_57 — Void Anomaly

**Front (6 lines)**
1. Void Anomaly
2. Void Anomaly sits in broken cargo signatures; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 2 Credits and 1 Energy.
- Option B (Hard Burn): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_58 — Hull Fragment

**Front (6 lines)**
1. Hull Fragment
2. Hull Fragment sits in unclaimed relay traffic; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 2 Credits and 1 Energy.
- Option B (Breakline): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

### EMPTY_59 — Dust Ring

**Front (6 lines)**
1. Dust Ring
2. Dust Ring sits in old salvage corridors; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 2 Credits and 1 Energy.
- Option B (Pressure Run): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_60 — Void Echo

**Front (6 lines)**
1. Void Echo
2. Void Echo sits in cold debris lanes; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Tag Void
5. Strip Void
6. Shadow Void

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Void): Gain 1 Credits; each player gains 1 Credits.
- Option B (Strip Void): Gain 5 Credits; gain +1 Influence.
- Option C (Shadow Void): Lose 2 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and +1 Influence. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

## Cards 61-70

### Full Design Notes

- Scope mix in this block: 7 self, 3 local, 0 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### EMPTY_61 — Lost Station

**Front (6 lines)**
1. Lost Station
2. Lost Station sits in faint transponder ghosts; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 2 Credits and 1 Energy.
- Option B (Deep Cut): Gain 8 Credits, 3 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_62 — Signal Echo

**Front (6 lines)**
1. Signal Echo
2. Signal Echo sits in broken cargo signatures; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 2 Credits and 1 Energy.
- Option B (Hard Burn): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

### EMPTY_63 — Drift Hull

**Front (6 lines)**
1. Drift Hull
2. Drift Hull sits in unclaimed relay traffic; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 2 Credits and 1 Energy.
- Option B (Breakline): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_64 — Derelict Cache

**Front (6 lines)**
1. Derelict Cache
2. Derelict Cache sits in old salvage corridors; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pressure Run): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Risk Buffer): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

### EMPTY_65 — Silent Remains

**Front (6 lines)**
1. Silent Remains
2. Silent Remains sits in cold debris lanes; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Tag Silent
5. Strip Silent
6. Shadow Silent

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Silent): Gain 2 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Strip Silent): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Shadow Silent): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_66 — Scrap Cluster

**Front (6 lines)**
1. Scrap Cluster
2. Scrap Cluster sits in faint transponder ghosts; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 2 Credits and 1 Energy.
- Option B (Deep Cut): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits, 2 Energy, +1 Fleet, and +1 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits (minor backlash).
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

### EMPTY_67 — Lost Pod

**Front (6 lines)**
1. Lost Pod
2. Lost Pod sits in broken cargo signatures; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 2 Credits and 1 Energy.
- Option B (Hard Burn): Gain 6 Credits, 2 Energy, and +1 Influence.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_68 — Orbital Scrap

**Front (6 lines)**
1. Orbital Scrap
2. Orbital Scrap sits in unclaimed relay traffic; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Breakline): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Silent Mark): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

### EMPTY_69 — Derelict Convoy

**Front (6 lines)**
1. Derelict Convoy
2. Derelict Convoy sits in old salvage corridors; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 3 Credits and 1 Energy.
- Option B (Pressure Run): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_70 — Dust Veil

**Front (6 lines)**
1. Dust Veil
2. Dust Veil sits in cold debris lanes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Tag Dust
5. Strip Dust
6. Shadow Dust

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Dust): Gain 3 Credits and 1 Energy.
- Option B (Strip Dust): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Shadow Dust): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

## Cards 71-80

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### EMPTY_71 — Abandoned Probe

**Front (6 lines)**
1. Abandoned Probe
2. Abandoned Probe sits in faint transponder ghosts; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 3 Credits and 1 Energy.
- Option B (Deep Cut): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_72 — Scrap Trail

**Front (6 lines)**
1. Scrap Trail
2. Scrap Trail sits in broken cargo signatures; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Burn): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Hold Distance): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

### EMPTY_73 — Orbital Wreck

**Front (6 lines)**
1. Orbital Wreck
2. Orbital Wreck sits in unclaimed relay traffic; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 3 Credits and 1 Energy.
- Option B (Breakline): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_74 — Floating Ruins

**Front (6 lines)**
1. Floating Ruins
2. Floating Ruins sits in old salvage corridors; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 3 Credits and 1 Energy.
- Option B (Pressure Run): Gain 9 Credits, 3 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

### EMPTY_75 — Silent Buoy

**Front (6 lines)**
1. Silent Buoy
2. Silent Buoy sits in cold debris lanes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Tag Silent
5. Strip Silent
6. Shadow Silent

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Silent): Gain 3 Credits and 1 Energy.
- Option B (Strip Silent): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Shadow Silent): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_76 — Wreck Field

**Front (6 lines)**
1. Wreck Field
2. Wreck Field sits in faint transponder ghosts; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Deep Cut): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Cold Pass): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

### EMPTY_77 — Silent Wreck

**Front (6 lines)**
1. Silent Wreck
2. Silent Wreck sits in broken cargo signatures; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 3 Credits and 1 Energy.
- Option B (Hard Burn): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_78 — Scavenger Trail

**Front (6 lines)**
1. Scavenger Trail
2. Scavenger Trail sits in unclaimed relay traffic; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 3 Credits and 1 Energy.
- Option B (Breakline): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits, 2 Energy, +1 Fleet, and +1 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits (minor backlash).
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

### EMPTY_79 — Abandoned Mine

**Front (6 lines)**
1. Abandoned Mine
2. Abandoned Mine sits in old salvage corridors; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 3 Credits and 1 Energy.
- Option B (Pressure Run): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_80 — Abandoned Station

**Front (6 lines)**
1. Abandoned Station
2. Abandoned Station sits in cold debris lanes; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Tag Abandoned
5. Strip Abandoned
6. Shadow Abandoned

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Abandoned): Gain 2 Credits; each player gains 1 Credits.
- Option B (Strip Abandoned): Gain 6 Credits; gain +1 Influence.
- Option C (Shadow Abandoned): Lose 2 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and +1 Influence. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

## Cards 81-90

### Full Design Notes

- Scope mix in this block: 7 self, 3 local, 0 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### EMPTY_81 — Drift Cache

**Front (6 lines)**
1. Drift Cache
2. Drift Cache sits in faint transponder ghosts; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 3 Credits and 1 Energy.
- Option B (Deep Cut): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_82 — Abandoned Freighter

**Front (6 lines)**
1. Abandoned Freighter
2. Abandoned Freighter sits in broken cargo signatures; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 3 Credits and 1 Energy.
- Option B (Hard Burn): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

### EMPTY_83 — Scavenger's Haul

**Front (6 lines)**
1. Scavenger's Haul
2. Scavenger's Haul sits in unclaimed relay traffic; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 3 Credits and 1 Energy.
- Option B (Breakline): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_84 — Silent Scatter

**Front (6 lines)**
1. Silent Scatter
2. Silent Scatter sits in old salvage corridors; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Pressure Run): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Risk Buffer): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

### EMPTY_85 — Cargo Void

**Front (6 lines)**
1. Cargo Void
2. Cargo Void sits in cold debris lanes; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Tag Cargo
5. Strip Cargo
6. Shadow Cargo

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Cargo): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Strip Cargo): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Shadow Cargo): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_86 — Silent Convoy

**Front (6 lines)**
1. Silent Convoy
2. Silent Convoy sits in faint transponder ghosts; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 3 Credits and 1 Energy.
- Option B (Deep Cut): Gain 9 Credits, 3 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

### EMPTY_87 — Void Scatter

**Front (6 lines)**
1. Void Scatter
2. Void Scatter sits in broken cargo signatures; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 3 Credits and 1 Energy.
- Option B (Hard Burn): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_88 — Drift Cargo

**Front (6 lines)**
1. Drift Cargo
2. Drift Cargo sits in unclaimed relay traffic; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Breakline): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Silent Mark): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

### EMPTY_89 — Silent Drift

**Front (6 lines)**
1. Silent Drift
2. Silent Drift sits in old salvage corridors; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 3 Credits and 1 Energy.
- Option B (Pressure Run): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits, 2 Energy, +1 Fleet, and +1 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits (minor backlash).
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_90 — Derelict Station

**Front (6 lines)**
1. Derelict Station
2. Derelict Station sits in cold debris lanes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Tag Derelict
5. Strip Derelict
6. Shadow Derelict

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Derelict): Gain 3 Credits and 1 Energy.
- Option B (Strip Derelict): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Shadow Derelict): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

## Cards 91-100

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### EMPTY_91 — Scrap Field

**Front (6 lines)**
1. Scrap Field
2. Scrap Field sits in faint transponder ghosts; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 3 Credits and 1 Energy.
- Option B (Deep Cut): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Cold Pass): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_92 — Scattered Cargo

**Front (6 lines)**
1. Scattered Cargo
2. Scattered Cargo sits in broken cargo signatures; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Burn): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Hold Distance): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

### EMPTY_93 — Lost Convoy

**Front (6 lines)**
1. Lost Convoy
2. Lost Convoy sits in unclaimed relay traffic; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 3 Credits and 1 Energy.
- Option B (Breakline): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_94 — Derelict Buoy Field

**Front (6 lines)**
1. Derelict Buoy Field
2. Derelict Buoy Field sits in old salvage corridors; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 3 Credits and 1 Energy.
- Option B (Pressure Run): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

### EMPTY_95 — Abandoned Relay

**Front (6 lines)**
1. Abandoned Relay
2. Abandoned Relay sits in cold debris lanes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Tag Abandoned
5. Strip Abandoned
6. Shadow Abandoned

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Abandoned): Gain 3 Credits and 1 Energy.
- Option B (Strip Abandoned): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Shadow Abandoned): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Marshal Voss

### EMPTY_96 — Derelict Probe

**Front (6 lines)**
1. Derelict Probe
2. Derelict Probe sits in faint transponder ghosts; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Relay Sweep
5. Deep Cut
6. Cold Pass

**Instant Option Results (resolve once, then ignore)**
- Option A (Relay Sweep): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Deep Cut): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Cold Pass): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Archivist Nera

### EMPTY_97 — Abandoned Cargo

**Front (6 lines)**
1. Abandoned Cargo
2. Abandoned Cargo sits in broken cargo signatures; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Quiet Claim
5. Hard Burn
6. Hold Distance

**Instant Option Results (resolve once, then ignore)**
- Option A (Quiet Claim): Gain 3 Credits and 1 Energy.
- Option B (Hard Burn): Gain 9 Credits, 3 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy.
- Option C (Hold Distance): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Quartermaster Renn

### EMPTY_98 — Orbital Cache

**Front (6 lines)**
1. Orbital Cache
2. Orbital Cache sits in unclaimed relay traffic; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Beacon Stitch
5. Breakline
6. Silent Mark

**Instant Option Results (resolve once, then ignore)**
- Option A (Beacon Stitch): Gain 3 Credits and 1 Energy.
- Option B (Breakline): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Silent Mark): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "The Driftline remembers every hull we leave behind." — Oracle Senn

### EMPTY_99 — Void Cache

**Front (6 lines)**
1. Void Cache
2. Void Cache sits in old salvage corridors; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Survey Arc
5. Pressure Run
6. Risk Buffer

**Instant Option Results (resolve once, then ignore)**
- Option A (Survey Arc): Gain 3 Credits and 1 Energy.
- Option B (Pressure Run): Gain 7 Credits, 2 Energy, and +1 Influence.
- Option C (Risk Buffer): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 1 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "In the void, patience compounds faster than fear." — Chanter Ilye

### EMPTY_100 — Rogue Trader

**Front (6 lines)**
1. Rogue Trader
2. Rogue Trader sits in cold debris lanes; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Tag Rogue
5. Strip Rogue
6. Shadow Rogue

**Instant Option Results (resolve once, then ignore)**
- Option A (Tag Rogue): Gain 2 Credits; each player gains 1 Credits.
- Option B (Strip Rogue): Gain 6 Credits; gain +1 Influence.
- Option C (Shadow Rogue): Lose 2 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits, 2 Energy, and +0 Fleet. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits (minor backlash).
- Flavor: "The Driftline remembers every hull we leave behind." — Captain Mirel

