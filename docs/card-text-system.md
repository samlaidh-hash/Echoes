# System Deck Card Text (Front + Rear)

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

### SYS_01 — Research Outpost

**Front (6 lines)**
1. Research Outpost
2. Research Outpost sits in contested trade approaches; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 3 Credits and 1 Energy.
- Option B (Core Push): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_02 — Trade Outpost

**Front (6 lines)**
1. Trade Outpost
2. Trade Outpost sits in station relay grids; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 3 Credits and 1 Energy.
- Option B (Hard Levy): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

### SYS_03 — Dyson Swarm

**Front (6 lines)**
1. Dyson Swarm
2. Dyson Swarm sits in colonial supply wakes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 3 Credits and 1 Energy.
- Option B (Power Drive): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_04 — Magnetic Storm

**Front (6 lines)**
1. Magnetic Storm
2. Magnetic Storm sits in fortified dock rings; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Supply Burn): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Risk Screen): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

### SYS_05 — Lagrange Hub

**Front (6 lines)**
1. Lagrange Hub
2. Lagrange Hub sits in crowded orbital corridors; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Secure Lagrange
5. Exploit Lagrange
6. Buffer Lagrange

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Lagrange): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Exploit Lagrange): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Buffer Lagrange): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_06 — Military Base

**Front (6 lines)**
1. Military Base
2. Military Base sits in contested trade approaches; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 3 Credits and 1 Energy.
- Option B (Core Push): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Governor Halden

### SYS_07 — Red Dwarf: Cinder Belt

**Front (6 lines)**
1. Red Dwarf: Cinder Belt
2. Red Dwarf: Cinder Belt sits in station relay grids; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 3 Credits and 1 Energy.
- Option B (Hard Levy): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_08 — Storm World

**Front (6 lines)**
1. Storm World
2. Storm World sits in colonial supply wakes; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Power Drive): Gain 7 Credits and +1 Influence in a hex within 2. Cost: Spend 1 Energy and 1 Credits.
- Option C (Quiet Hold): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

### SYS_09 — Frozen Colony

**Front (6 lines)**
1. Frozen Colony
2. Frozen Colony sits in fortified dock rings; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 3 Credits and 1 Energy.
- Option B (Supply Burn): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_10 — Dwarf Outpost

**Front (6 lines)**
1. Dwarf Outpost
2. Dwarf Outpost sits in crowded orbital corridors; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Secure Dwarf
5. Exploit Dwarf
6. Buffer Dwarf

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Dwarf): Gain 3 Credits and 1 Energy.
- Option B (Exploit Dwarf): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Buffer Dwarf): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits, 3 Energy, +1 Fleet, and +2 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits and 1 Energy (minor backlash).
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

## Cards 11-20

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 0/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### SYS_11 — Desert Station

**Front (6 lines)**
1. Desert Station
2. Desert Station sits in contested trade approaches; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 3 Credits and 1 Energy.
- Option B (Core Push): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_12 — Frontier Outpost

**Front (6 lines)**
1. Frontier Outpost
2. Frontier Outpost sits in station relay grids; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Levy): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Stand Off): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Governor Halden

### SYS_13 — Colonial Base

**Front (6 lines)**
1. Colonial Base
2. Colonial Base sits in colonial supply wakes; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 3 Credits and 1 Energy.
- Option B (Power Drive): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_14 — Trade Nexus

**Front (6 lines)**
1. Trade Nexus
2. Trade Nexus sits in fortified dock rings; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 3 Credits and 1 Energy.
- Option B (Supply Burn): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

### SYS_15 — Refinery World

**Front (6 lines)**
1. Refinery World
2. Refinery World sits in crowded orbital corridors; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Secure Refinery
5. Exploit Refinery
6. Buffer Refinery

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Refinery): Gain 3 Credits and 1 Energy.
- Option B (Exploit Refinery): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Buffer Refinery): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_16 — Storm Refuge

**Front (6 lines)**
1. Storm Refuge
2. Storm Refuge sits in contested trade approaches; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Core Push): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Reserve Line): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

### SYS_17 — Prison Planet

**Front (6 lines)**
1. Prison Planet
2. Prison Planet sits in station relay grids; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 3 Credits and 1 Energy.
- Option B (Hard Levy): Gain 8 Credits, 4 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy and 1 Credits.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_18 — Trading Hub

**Front (6 lines)**
1. Trading Hub
2. Trading Hub sits in colonial supply wakes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 3 Credits and 1 Energy.
- Option B (Power Drive): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Governor Halden

### SYS_19 — Volcanic Base

**Front (6 lines)**
1. Volcanic Base
2. Volcanic Base sits in fortified dock rings; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 3 Credits and 1 Energy.
- Option B (Supply Burn): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_20 — Shrine World

**Front (6 lines)**
1. Shrine World
2. Shrine World sits in crowded orbital corridors; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Secure Shrine
5. Exploit Shrine
6. Buffer Shrine

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Shrine): Gain 2 Credits; each player gains 1 Credits.
- Option B (Exploit Shrine): Gain 5 Credits; gain +1 Influence.
- Option C (Buffer Shrine): Lose 2 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and +1 Influence. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

## Cards 21-30

### Full Design Notes

- Scope mix in this block: 7 self, 3 local, 0 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 2/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### SYS_21 — Base Quartus

**Front (6 lines)**
1. Base Quartus
2. Base Quartus sits in contested trade approaches; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 3 Credits and 1 Energy.
- Option B (Core Push): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits, 3 Energy, +1 Fleet, and +2 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits and 1 Energy (minor backlash).
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_22 — Ice Moon

**Front (6 lines)**
1. Ice Moon
2. Ice Moon sits in station relay grids; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 3 Credits and 1 Energy.
- Option B (Hard Levy): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

### SYS_23 — Pilgrim Rest

**Front (6 lines)**
1. Pilgrim Rest
2. Pilgrim Rest sits in colonial supply wakes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 3 Credits and 1 Energy.
- Option B (Power Drive): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_24 — Ash Colony

**Front (6 lines)**
1. Ash Colony
2. Ash Colony sits in fortified dock rings; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Supply Burn): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Risk Screen): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Governor Halden

### SYS_25 — Science Base

**Front (6 lines)**
1. Science Base
2. Science Base sits in crowded orbital corridors; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Secure Science
5. Exploit Science
6. Buffer Science

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Science): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Exploit Science): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Buffer Science): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_26 — Ash World

**Front (6 lines)**
1. Ash World
2. Ash World sits in contested trade approaches; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 3 Credits and 1 Energy.
- Option B (Core Push): Gain 8 Credits, 4 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy and 1 Credits.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

### SYS_27 — Research Complex

**Front (6 lines)**
1. Research Complex
2. Research Complex sits in station relay grids; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 3 Credits and 1 Energy.
- Option B (Hard Levy): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_28 — Pulsar Base

**Front (6 lines)**
1. Pulsar Base
2. Pulsar Base sits in colonial supply wakes; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Power Drive): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Quiet Hold): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

### SYS_29 — Station Gamma

**Front (6 lines)**
1. Station Gamma
2. Station Gamma sits in fortified dock rings; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 3 Credits and 1 Energy.
- Option B (Supply Burn): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_30 — Orbital Haven

**Front (6 lines)**
1. Orbital Haven
2. Orbital Haven sits in crowded orbital corridors; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Secure Orbital
5. Exploit Orbital
6. Buffer Orbital

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Orbital): Gain 3 Credits and 1 Energy.
- Option B (Exploit Orbital): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Buffer Orbital): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits, 3 Energy, +1 Fleet, and +2 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits and 1 Energy (minor backlash).
- Flavor: "A stable port is just a promise defended often." — Governor Halden

## Cards 31-40

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### SYS_31 — Death World Outpost

**Front (6 lines)**
1. Death World Outpost
2. Death World Outpost sits in contested trade approaches; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 3 Credits and 1 Energy.
- Option B (Core Push): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_32 — Supply Chain

**Front (6 lines)**
1. Supply Chain
2. Supply Chain sits in station relay grids; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Levy): Gain 5 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Stand Off): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

### SYS_33 — Military Depot

**Front (6 lines)**
1. Military Depot
2. Military Depot sits in colonial supply wakes; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 3 Credits and 1 Energy.
- Option B (Power Drive): Gain 6 Credits, 3 Energy, and +1 Influence.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 3 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_34 — Gas Harvester

**Front (6 lines)**
1. Gas Harvester
2. Gas Harvester sits in fortified dock rings; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 3 Credits and 1 Energy.
- Option B (Supply Burn): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

### SYS_35 — Pulsar Station

**Front (6 lines)**
1. Pulsar Station
2. Pulsar Station sits in crowded orbital corridors; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Secure Pulsar
5. Exploit Pulsar
6. Buffer Pulsar

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Pulsar): Gain 3 Credits and 1 Energy.
- Option B (Exploit Pulsar): Gain 9 Credits, 4 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy and 1 Credits.
- Option C (Buffer Pulsar): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_36 — Hive Colony

**Front (6 lines)**
1. Hive Colony
2. Hive Colony sits in contested trade approaches; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Core Push): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Reserve Line): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Governor Halden

### SYS_37 — Solar Collector

**Front (6 lines)**
1. Solar Collector
2. Solar Collector sits in station relay grids; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 3 Credits and 1 Energy.
- Option B (Hard Levy): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_38 — Rogue Planet

**Front (6 lines)**
1. Rogue Planet
2. Rogue Planet sits in colonial supply wakes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 3 Credits and 1 Energy.
- Option B (Power Drive): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

### SYS_39 — Terraformed Outpost

**Front (6 lines)**
1. Terraformed Outpost
2. Terraformed Outpost sits in fortified dock rings; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 3 Credits and 1 Energy.
- Option B (Supply Burn): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 6 Credits, 3 Energy, +1 Fleet, and +2 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits and 1 Energy (minor backlash).
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_40 — Binary Outpost

**Front (6 lines)**
1. Binary Outpost
2. Binary Outpost sits in crowded orbital corridors; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Secure Binary
5. Exploit Binary
6. Buffer Binary

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Binary): Gain 2 Credits; each player gains 1 Credits.
- Option B (Exploit Binary): Gain 6 Credits; gain +1 Influence.
- Option C (Buffer Binary): Lose 2 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and +1 Influence. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

## Cards 41-50

### Full Design Notes

- Scope mix in this block: 7 self, 3 local, 0 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### SYS_41 — Colony Prime

**Front (6 lines)**
1. Colony Prime
2. Colony Prime sits in contested trade approaches; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 3 Credits and 1 Energy.
- Option B (Core Push): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_42 — Prison Station

**Front (6 lines)**
1. Prison Station
2. Prison Station sits in station relay grids; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 3 Credits and 1 Energy. Place 1 TRIGGER-ECHO token on this card.
- Option B (Hard Levy): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. TRIGGER-ECHO: choose one instant option on this card that has already resolved and trigger its effect again. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Governor Halden

### SYS_43 — Lava World

**Front (6 lines)**
1. Lava World
2. Lava World sits in colonial supply wakes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 3 Credits and 1 Energy.
- Option B (Power Drive): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_44 — Desert Base

**Front (6 lines)**
1. Desert Base
2. Desert Base sits in fortified dock rings; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Supply Burn): Gain 8 Credits and +1 Influence in a hex within 2. Cost: Spend 1 Energy and 1 Credits.
- Option C (Risk Screen): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

### SYS_45 — Nebula Edge

**Front (6 lines)**
1. Nebula Edge
2. Nebula Edge sits in crowded orbital corridors; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Secure Nebula
5. Exploit Nebula
6. Buffer Nebula

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Nebula): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Exploit Nebula): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Buffer Nebula): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_46 — Dwarf System

**Front (6 lines)**
1. Dwarf System
2. Dwarf System sits in contested trade approaches; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 3 Credits and 1 Energy.
- Option B (Core Push): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

### SYS_47 — Forge Base

**Front (6 lines)**
1. Forge Base
2. Forge Base sits in station relay grids; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 3 Credits and 1 Energy.
- Option B (Hard Levy): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_48 — Relic Moon

**Front (6 lines)**
1. Relic Moon
2. Relic Moon sits in colonial supply wakes; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Power Drive): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Quiet Hold): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 6 Credits, 3 Energy, and one friendly fleet within 2 takes a FORTIFIED token. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits and 1 Energy (minor backlash).
- Flavor: "A stable port is just a promise defended often." — Governor Halden

### SYS_49 — Military Garrison

**Front (6 lines)**
1. Military Garrison
2. Military Garrison sits in fortified dock rings; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 3 Credits and 1 Energy.
- Option B (Supply Burn): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_50 — Jungle World

**Front (6 lines)**
1. Jungle World
2. Jungle World sits in crowded orbital corridors; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Secure Jungle
5. Exploit Jungle
6. Buffer Jungle

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Jungle): Gain 3 Credits and 1 Energy.
- Option B (Exploit Jungle): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Buffer Jungle): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

## Cards 51-60

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### SYS_51 — Binary Stars

**Front (6 lines)**
1. Binary Stars
2. Binary Stars sits in contested trade approaches; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 3 Credits and 1 Energy.
- Option B (Core Push): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_52 — Cinder Colony

**Front (6 lines)**
1. Cinder Colony
2. Cinder Colony sits in station relay grids; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Levy): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Stand Off): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

### SYS_53 — Frozen Wastes

**Front (6 lines)**
1. Frozen Wastes
2. Frozen Wastes sits in colonial supply wakes; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 3 Credits and 1 Energy.
- Option B (Power Drive): Gain 9 Credits, 4 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy and 1 Credits.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_54 — Dust World

**Front (6 lines)**
1. Dust World
2. Dust World sits in fortified dock rings; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 3 Credits and 1 Energy.
- Option B (Supply Burn): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Governor Halden

### SYS_55 — Frost Planet

**Front (6 lines)**
1. Frost Planet
2. Frost Planet sits in crowded orbital corridors; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Secure Frost
5. Exploit Frost
6. Buffer Frost

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Frost): Gain 3 Credits and 1 Energy.
- Option B (Exploit Frost): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Buffer Frost): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_56 — Mining Colony

**Front (6 lines)**
1. Mining Colony
2. Mining Colony sits in contested trade approaches; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Core Push): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Reserve Line): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

### SYS_57 — Garden Station

**Front (6 lines)**
1. Garden Station
2. Garden Station sits in station relay grids; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 3 Credits and 1 Energy.
- Option B (Hard Levy): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 6 Credits, 3 Energy, +1 Fleet, and +2 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits and 1 Energy (minor backlash).
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_58 — Supply Station

**Front (6 lines)**
1. Supply Station
2. Supply Station sits in colonial supply wakes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 3 Credits and 1 Energy.
- Option B (Power Drive): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

### SYS_59 — Nebula Station

**Front (6 lines)**
1. Nebula Station
2. Nebula Station sits in fortified dock rings; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 3 Credits and 1 Energy.
- Option B (Supply Burn): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_60 — Garden World

**Front (6 lines)**
1. Garden World
2. Garden World sits in crowded orbital corridors; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Secure Garden
5. Exploit Garden
6. Buffer Garden

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Garden): Gain 2 Credits; each player gains 1 Credits.
- Option B (Exploit Garden): Gain 6 Credits; gain +1 Influence.
- Option C (Buffer Garden): Lose 2 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and +1 Influence. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Governor Halden

## Cards 61-70

### Full Design Notes

- Scope mix in this block: 7 self, 3 local, 0 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### SYS_61 — Death World

**Front (6 lines)**
1. Death World
2. Death World sits in contested trade approaches; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 3 Credits and 1 Energy.
- Option B (Core Push): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_62 — Belt Mining

**Front (6 lines)**
1. Belt Mining
2. Belt Mining sits in station relay grids; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 3 Credits and 1 Energy.
- Option B (Hard Levy): Gain 9 Credits, 4 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy and 1 Credits.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

### SYS_63 — Mining Belt

**Front (6 lines)**
1. Mining Belt
2. Mining Belt sits in colonial supply wakes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 3 Credits and 1 Energy.
- Option B (Power Drive): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_64 — Research Haven

**Front (6 lines)**
1. Research Haven
2. Research Haven sits in fortified dock rings; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Supply Burn): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Risk Screen): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

### SYS_65 — Gateway System

**Front (6 lines)**
1. Gateway System
2. Gateway System sits in crowded orbital corridors; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Secure Gateway
5. Exploit Gateway
6. Buffer Gateway

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Gateway): Gain 3 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Exploit Gateway): Gain 6 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Buffer Gateway): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_66 — Hive World

**Front (6 lines)**
1. Hive World
2. Hive World sits in contested trade approaches; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 3 Credits and 1 Energy.
- Option B (Core Push): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Governor Halden

### SYS_67 — Frontier Colony

**Front (6 lines)**
1. Frontier Colony
2. Frontier Colony sits in station relay grids; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 3 Credits and 1 Energy.
- Option B (Hard Levy): Gain 7 Credits, 3 Energy, and +1 Influence.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_68 — Orbital Farm

**Front (6 lines)**
1. Orbital Farm
2. Orbital Farm sits in colonial supply wakes; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Power Drive): Gain 7 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Quiet Hold): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 6 Credits, 3 Energy, and one friendly fleet within 2 takes a FORTIFIED token. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits and 1 Energy (minor backlash).
- Flavor: "A stable port is just a promise defended often." — Warden Solm

### SYS_69 — Gateway Hub

**Front (6 lines)**
1. Gateway Hub
2. Gateway Hub sits in fortified dock rings; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 4 Credits and 1 Energy.
- Option B (Supply Burn): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_70 — Ocean Haven

**Front (6 lines)**
1. Ocean Haven
2. Ocean Haven sits in crowded orbital corridors; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Secure Ocean
5. Exploit Ocean
6. Buffer Ocean

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Ocean): Gain 4 Credits and 1 Energy.
- Option B (Exploit Ocean): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Buffer Ocean): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

## Cards 71-80

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### SYS_71 — Crystal Caves

**Front (6 lines)**
1. Crystal Caves
2. Crystal Caves sits in contested trade approaches; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 4 Credits and 1 Energy.
- Option B (Core Push): Gain 10 Credits, 4 Energy, +1 Fleet, and +1 Influence. Cost: Spend 1 Energy and 1 Credits.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_72 — Relay Station

**Front (6 lines)**
1. Relay Station
2. Relay Station sits in station relay grids; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Levy): Gain 7 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Stand Off): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Governor Halden

### SYS_73 — Tidal Lock

**Front (6 lines)**
1. Tidal Lock
2. Tidal Lock sits in colonial supply wakes; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 4 Credits and 1 Energy.
- Option B (Power Drive): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_74 — Frontier Haven

**Front (6 lines)**
1. Frontier Haven
2. Frontier Haven sits in fortified dock rings; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 4 Credits and 1 Energy.
- Option B (Supply Burn): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

### SYS_75 — Orbital Station

**Front (6 lines)**
1. Orbital Station
2. Orbital Station sits in crowded orbital corridors; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Secure Orbital
5. Exploit Orbital
6. Buffer Orbital

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Orbital): Gain 4 Credits and 1 Energy.
- Option B (Exploit Orbital): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Buffer Orbital): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_76 — Frost Station

**Front (6 lines)**
1. Frost Station
2. Frost Station sits in contested trade approaches; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Core Push): Gain 7 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Reserve Line): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

### SYS_77 — Desert Planet

**Front (6 lines)**
1. Desert Planet
2. Desert Planet sits in station relay grids; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 4 Credits and 1 Energy.
- Option B (Hard Levy): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_78 — Refinery Complex

**Front (6 lines)**
1. Refinery Complex
2. Refinery Complex sits in colonial supply wakes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 4 Credits and 1 Energy.
- Option B (Power Drive): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Governor Halden

### SYS_79 — Frost Base

**Front (6 lines)**
1. Frost Base
2. Frost Base sits in fortified dock rings; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 4 Credits and 1 Energy.
- Option B (Supply Burn): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 6 Credits, 3 Energy, +1 Fleet, and +2 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits and 1 Energy (minor backlash).
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_80 — Dust Outpost

**Front (6 lines)**
1. Dust Outpost
2. Dust Outpost sits in crowded orbital corridors; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Secure Dust
5. Exploit Dust
6. Buffer Dust

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Dust): Gain 3 Credits; each player gains 1 Credits.
- Option B (Exploit Dust): Gain 7 Credits; gain +1 Influence.
- Option C (Buffer Dust): Lose 2 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and +1 Influence. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

## Cards 81-90

### Full Design Notes

- Scope mix in this block: 7 self, 3 local, 0 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### SYS_81 — Giant Moon

**Front (6 lines)**
1. Giant Moon
2. Giant Moon sits in contested trade approaches; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 4 Credits and 1 Energy.
- Option B (Core Push): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_82 — Storm Planet

**Front (6 lines)**
1. Storm Planet
2. Storm Planet sits in station relay grids; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 4 Credits and 1 Energy.
- Option B (Hard Levy): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

### SYS_83 — Supply Depot

**Front (6 lines)**
1. Supply Depot
2. Supply Depot sits in colonial supply wakes; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 4 Credits and 1 Energy.
- Option B (Power Drive): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_84 — Mining Base

**Front (6 lines)**
1. Mining Base
2. Mining Base sits in fortified dock rings; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Supply Burn): Gain 9 Credits and +1 Influence in a hex within 2. Cost: Spend 1 Energy and 1 Credits.
- Option C (Risk Screen): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Governor Halden

### SYS_85 — Outpost Secundus

**Front (6 lines)**
1. Outpost Secundus
2. Outpost Secundus sits in crowded orbital corridors; control here rewards local planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Secure Outpost
5. Exploit Outpost
6. Buffer Outpost

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Outpost): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Exploit Outpost): Gain 7 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Buffer Outpost): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_86 — Volcanic Outpost

**Front (6 lines)**
1. Volcanic Outpost
2. Volcanic Outpost sits in contested trade approaches; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 4 Credits and 1 Energy.
- Option B (Core Push): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

### SYS_87 — Ash Station

**Front (6 lines)**
1. Ash Station
2. Ash Station sits in station relay grids; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 4 Credits and 1 Energy.
- Option B (Hard Levy): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_88 — Relay Nexus

**Front (6 lines)**
1. Relay Nexus
2. Relay Nexus sits in colonial supply wakes; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Power Drive): Gain 7 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Quiet Hold): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

### SYS_89 — Science Station

**Front (6 lines)**
1. Science Station
2. Science Station sits in fortified dock rings; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 4 Credits and 1 Energy.
- Option B (Supply Burn): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_90 — Military Station

**Front (6 lines)**
1. Military Station
2. Military Station sits in crowded orbital corridors; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Secure Military
5. Exploit Military
6. Buffer Military

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Military): Gain 4 Credits and 1 Energy.
- Option B (Exploit Military): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Buffer Military): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 6 Credits, 3 Energy, +1 Fleet, and +2 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits and 1 Energy (minor backlash).
- Flavor: "A stable port is just a promise defended often." — Governor Halden

## Cards 91-100

### Full Design Notes

- Scope mix in this block: 7 self, 2 local, 1 global.
- Costly instant options in this block: 1/10.
- Overdrive primary with minor secondary backlash: 1/10.
- One-shot options are distinct from persistent rear powers.
- Secondary effects are tied to primary activation and never resolve independently.

### SYS_91 — Jungle Outpost

**Front (6 lines)**
1. Jungle Outpost
2. Jungle Outpost sits in contested trade approaches; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 4 Credits and 1 Energy.
- Option B (Core Push): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Reserve Line): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_92 — Ocean Station

**Front (6 lines)**
1. Ocean Station
2. Ocean Station sits in station relay grids; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Hard Levy): Gain 7 Credits; one friendly fleet within 2 takes a FORTIFIED token.
- Option C (Stand Off): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

### SYS_93 — Colonial Hub

**Front (6 lines)**
1. Colonial Hub
2. Colonial Hub sits in colonial supply wakes; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 4 Credits and 1 Energy.
- Option B (Power Drive): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_94 — Port Epsilon

**Front (6 lines)**
1. Port Epsilon
2. Port Epsilon sits in fortified dock rings; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 4 Credits and 1 Energy.
- Option B (Supply Burn): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

### SYS_95 — Agri-Station

**Front (6 lines)**
1. Agri-Station
2. Agri-Station sits in crowded orbital corridors; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Secure Agri-Station
5. Exploit Agri-Station
6. Buffer Agri-Station

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Agri-Station): Gain 4 Credits and 1 Energy.
- Option B (Exploit Agri-Station): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Buffer Agri-Station): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Dockmaster Cira

### SYS_96 — Shipyard System

**Front (6 lines)**
1. Shipyard System
2. Shipyard System sits in contested trade approaches; control here rewards local planning.
3. Choose one approach and resolve the matching instant result.
4. Dock Sweep
5. Core Push
6. Reserve Line

**Instant Option Results (resolve once, then ignore)**
- Option A (Dock Sweep): Gain 4 Credits and place 1 DRIFTMARK in a hex within 2.
- Option B (Core Push): Gain 9 Credits and +1 Influence in a hex within 2. Cost: Spend 1 Energy and 1 Credits.
- Option C (Reserve Line): Lose 1 Credits; you may remove 1 enemy DRIFTMARK within 2.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and choose a hex within 2: gain +1 Influence there. If this card had a costly instant option this game, gain +1 Credits. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Governor Halden

### SYS_97 — Asteroid Haven

**Front (6 lines)**
1. Asteroid Haven
2. Asteroid Haven sits in station relay grids; control here rewards self planning.
3. Commit a doctrine and resolve the linked instant result now.
4. Civic Claim
5. Hard Levy
6. Stand Off

**Instant Option Results (resolve once, then ignore)**
- Option A (Civic Claim): Gain 4 Credits and 1 Energy.
- Option B (Hard Levy): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Stand Off): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "Influence is counted in docking rights, not speeches." — Fleet Prelate Ovan

### SYS_98 — Dwarf Colony

**Front (6 lines)**
1. Dwarf Colony
2. Dwarf Colony sits in colonial supply wakes; control here rewards self planning.
3. Select your line, resolve it once, then ignore it for the rest of the game.
4. Network Sync
5. Power Drive
6. Quiet Hold

**Instant Option Results (resolve once, then ignore)**
- Option A (Network Sync): Gain 4 Credits and 1 Energy.
- Option B (Power Drive): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Quiet Hold): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 4 Credits and 2 Energy. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Warden Solm

### SYS_99 — Relay Base

**Front (6 lines)**
1. Relay Base
2. Relay Base sits in fortified dock rings; control here rewards self planning.
3. Lock your plan and apply the mapped instant result.
4. Patrol Arc
5. Supply Burn
6. Risk Screen

**Instant Option Results (resolve once, then ignore)**
- Option A (Patrol Arc): Gain 4 Credits and 1 Energy.
- Option B (Supply Burn): Gain 8 Credits, 3 Energy, and +1 Influence.
- Option C (Risk Screen): Lose 2 Credits and take a JAMMED token.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 6 Credits, 3 Energy, +1 Fleet, and +2 Influence. Activation cost: Pay 1 Energy.
- Secondary (auto on activation): Second-most influential faction loses 1 Credits and 1 Energy (minor backlash).
- Flavor: "Influence is counted in docking rights, not speeches." — Logistician Vey

### SYS_100 — Station Tertius

**Front (6 lines)**
1. Station Tertius
2. Station Tertius sits in crowded orbital corridors; control here rewards global planning.
3. Choose one approach and resolve the matching instant result.
4. Secure Station
5. Exploit Station
6. Buffer Station

**Instant Option Results (resolve once, then ignore)**
- Option A (Secure Station): Gain 3 Credits; each player gains 1 Credits.
- Option B (Exploit Station): Gain 7 Credits; gain +1 Influence.
- Option C (Buffer Station): Lose 2 Credits; each opponent loses 1 Credits.

**Rear Powers (persistent after flip)**
- Controller rule: Controller is the faction with the highest influence on this card.
- Secondary rule: Secondary target is the faction with the second-highest influence on this card.
- Primary (On Activation Action): Gain 5 Credits and +1 Influence. Activation cost: No cost.
- Secondary (auto on activation): Second-most influential faction gains 1 Credits.
- Flavor: "A stable port is just a promise defended often." — Engineer Tarin

