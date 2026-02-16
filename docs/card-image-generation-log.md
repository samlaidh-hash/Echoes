# Echoes Card Image Generation Log

**Last updated:** 2026-02-15  
**Total cards:** 300 (100 empty + 100 system + 100 phenomena)  
**Images generated:** 300  
**Images remaining:** 0  

---

## Process Overview

### Card Layout
- Both sides of each card have text
- **Only the reverse side** (revealed when flipped) displays an image
- Generate **plain art only** — no text, no frames, no reserved space
- **Portrait orientation** required
- Save each image with the **exact card title** as filename (e.g. `Cold Wake.png`)

### Image Specs
- Format: PNG (recommended) or WebP
- Orientation: Portrait
- Style: sci-fi space art, atmospheric lighting, cinematic, digital painting
- Content: Plain artwork only — no overlays, text, or UI elements

### Source Files
- **Prompts:** `data/card-image-prompts.md` (full) | `data/card-image-prompts-simple.txt` (copy-paste)
- **Output directory:** `assets/` (Cursor may use project assets path; move/copy to `assets/cards/` for game use)
- **Naming:** `{Card Title}.png` (exact match to card title)
- **Perchance helper:** Run `node scripts/generate-perchance-helper.cjs` → open `perchance-card-helper.html` in browser

### Generation Method
Images are generated via Cursor's image generation tool using prompts from `card-image-prompts.md`. Each card has a unique prompt tailored to its type:
- **Empty:** Deep space void, drifting debris or abandoned structures
- **System:** Star system with planet, station, or colony
- **Phenomena:** Cosmic anomaly, ancient ruins, or alien phenomenon

---

## Progress by Deck

### Empty (EMPTY_01–EMPTY_100)
| # | Card Title | Status | Generated |
|---|------------|--------|-----------|
| 1 | Cargo Drift | ✅ Done | 2026-02-04 |
| 2 | Hull Scatter | ✅ Done | 2026-02-04 |
| 3 | Stray Hull | ✅ Done | 2026-02-04 |
| 4 | Debris Field | ✅ Done | 2026-02-04 |
| 5 | Void Drift | ✅ Done | 2026-02-04 |
| 6 | Abandoned Outpost | ✅ Done | 2026-02-04 |
| 7 | Cargo Cluster | ✅ Done | 2026-02-04 |
| 8 | Orphaned Buoy | ✅ Done | 2026-02-04 |
| 9 | Silent Beacon | ✅ Done | 2026-02-04 |
| 10 | Void Remnant | ✅ Done | 2026-02-04 |
| 11 | Scavenger Mark | ✅ Done | 2026-02-04 |
| 12 | Lost Buoy | ✅ Done | 2026-02-04 |
| 13 | Derelict Probe Field | ✅ Done | 2026-02-04 |
| 14 | Scrap Veil | ✅ Done | 2026-02-04 |
| 15 | Signal Burst | ✅ Done | 2026-02-04 |
| 16 | Scattered Hulls | ✅ Done | 2026-02-04 |
| 17 | Floating Cache | ✅ Done | 2026-02-04 |
| 18 | Wreck Cluster | ✅ Done | 2026-02-04 |
| 19 | Cold Wake | ✅ Done | 2026-02-04 |
| 20 | Orphaned Station | ✅ Done | 2026-02-04 |
| 21 | Ghost Drift | ✅ Done | 2026-02-04 |
| 22 | Signal Drift | ✅ Done | 2026-02-04 |
| 23 | Scavenger's Mark | ✅ Done | 2026-02-04 |
| 24 | Floating Hull | ✅ Done | 2026-02-04 |
| 25 | Wreckage Cluster | ✅ Done | 2026-02-04 |
| 26 | Micrometeor Swarm | ✅ Done | 2026-02-04 |
| 27 | Unclaimed Cache | ✅ Done | 2026-02-04 |
| 28 | Scattered Wreck | ✅ Done | 2026-02-04 |
| 29 | Floating Debris | ✅ Done | 2026-02-04 |
| 30 | Orphaned Cargo | ✅ Done | 2026-02-04 |
| 31 | Orphaned Relay | ✅ Done | 2026-02-04 |
| 32 | Derelict Hull | ✅ Done | 2026-02-04 |
| 33 | Scattered Remains | ✅ Done | 2026-02-04 |
| 34 | Drift Remnant | ✅ Done | 2026-02-04 |
| 35 | Cargo Graveyard | ✅ Done | 2026-02-04 |
| 36 | Signal Ghost | ✅ Done | 2026-02-04 |
| 37 | Wreckage Field | ✅ Done | 2026-02-04 |
| 38 | Orphaned Pod | ✅ Done | 2026-02-04 |
| 39 | Void Remains | ✅ Done | 2026-02-04 |
| 40 | Cargo Scatter | ✅ Done | 2026-02-04 |
| 41 | Lost Freighter | ✅ Done | 2026-02-04 |
| 42 | Signal Static | ✅ Done | 2026-02-04 |
| 43 | Dust Field | ✅ Done | 2026-02-04 |
| 44 | Floating Debris Field | ✅ Done | 2026-02-04 |
| 45 | Debris Scatter | ✅ Done | 2026-02-04 |
| 46 | Scavenger Haul | ✅ Done | 2026-02-04 |
| 47 | Wreck Trail | ✅ Done | 2026-02-04 |
| 48 | Drift Net | ✅ Done | 2026-02-04 |
| 49 | Void Pocket | ✅ Done | 2026-02-04 |
| 50 | Lost Cargo | ✅ Done | 2026-02-04 |
| 51 | Ghost Cargo | ✅ Done | 2026-02-04 |
| 52 | Drift Station | ✅ Done | 2026-02-04 |
| 53 | Lost Beacon | ✅ Done | 2026-02-04 |
| 54 | Debris Ring | ✅ Done | 2026-02-04 |
| 55 | Debris Trail | ✅ Done | 2026-02-04 |
| 56 | Ghost Freighter | ✅ Done | 2026-02-04 |
| 57 | Void Anomaly | ✅ Done | 2026-02-04 |
| 58 | Hull Fragment | ✅ Done | 2026-02-04 |
| 59 | Dust Ring | ✅ Done | 2026-02-04 |
| 60 | Void Echo | ✅ Done | 2026-02-04 |
| 61 | Lost Station | ✅ Done | 2026-02-04 |
| 62 | Signal Echo | ✅ Done | 2026-02-14 |
| 63 | Drift Hull | ✅ Done | 2026-02-14 |
| 64 | Derelict Cache | ✅ Done | 2026-02-14 |
| 65 | Silent Remains | ✅ Done | 2026-02-14 |
| 66 | Scrap Cluster | ✅ Done | 2026-02-14 |
| 67 | Lost Pod | ✅ Done | 2026-02-14 |
| 68 | Orbital Scrap | ✅ Done | 2026-02-14 |
| 69 | Derelict Convoy | ✅ Done | 2026-02-14 |
| 70 | Dust Veil | ✅ Done | 2026-02-14 |
| 71 | Abandoned Probe | ✅ Done | 2026-02-14 |
| 72 | Scrap Trail | ✅ Done | 2026-02-14 |
| 73 | Orbital Wreck | ✅ Done | 2026-02-14 |
| 74 | Floating Ruins | ✅ Done | 2026-02-14 |
| 75 | Silent Buoy | ✅ Done | 2026-02-14 |
| 76 | Wreck Field | ✅ Done | 2026-02-14 |
| 77 | Silent Wreck | ✅ Done | 2026-02-14 |
| 78 | Scavenger Trail | ✅ Done | 2026-02-14 |
| 79 | Abandoned Mine | ✅ Done | 2026-02-14 |
| 80 | Abandoned Station | ✅ Done | 2026-02-14 |
| 81 | Drift Cache | ✅ Done | 2026-02-14 |
| 82 | Abandoned Freighter | ✅ Done | 2026-02-14 |
| 83 | Scavenger's Haul | ✅ Done | 2026-02-14 |
| 84 | Silent Scatter | ✅ Done | 2026-02-14 |
| 85 | Cargo Void | ✅ Done | 2026-02-14 |
| 86 | Silent Convoy | ✅ Done | 2026-02-14 |
| 87 | Void Scatter | ✅ Done | 2026-02-14 |
| 88 | Drift Cargo | ✅ Done | 2026-02-14 |
| 89 | Silent Drift | ✅ Done | 2026-02-14 |
| 90 | Derelict Station | ✅ Done | 2026-02-14 |
| 91 | Scrap Field | ✅ Done | 2026-02-14 |
| 92 | Scattered Cargo | ✅ Done | 2026-02-15 |
| 93 | Lost Convoy | ✅ Done | 2026-02-15 |
| 94 | Derelict Buoy Field | ✅ Done | 2026-02-15 |
| 95 | Abandoned Relay | ✅ Done | 2026-02-15 |
| 96 | Derelict Probe | ✅ Done | 2026-02-15 |
| 97 | Abandoned Cargo | ✅ Done | 2026-02-15 |
| 98 | Orbital Cache | ✅ Done | 2026-02-15 |
| 99 | Void Cache | ✅ Done | 2026-02-15 |
| 100 | Rogue Trader | ✅ Done | 2026-02-15 |

### System (SYS_01–SYS_100)
| # | Card Title | Status | Generated |
|---|------------|--------|-----------|
| 1 | Research Outpost | ✅ Done | 2026-02-14 |
| 2 | Trade Outpost | ✅ Done | 2026-02-14 |
| 3 | Dyson Swarm | ✅ Done | 2026-02-14 |
| 4 | Magnetic Storm | ✅ Done | 2026-02-14 |
| 5 | Lagrange Hub | ✅ Done | 2026-02-14 |
| 6 | Military Base | ✅ Done | 2026-02-14 |
| 7 | Red Dwarf: Cinder Belt | ✅ Done | 2026-02-14 |
| 8 | Storm World | ✅ Done | 2026-02-14 |
| 9 | Frozen Colony | ✅ Done | 2026-02-14 |
| 10 | Dwarf Outpost | ✅ Done | 2026-02-14 |
| 11 | Desert Station | ✅ Done | 2026-02-14 |
| 12 | Frontier Outpost | ✅ Done | 2026-02-14 |
| 13 | Colonial Base | ✅ Done | 2026-02-14 |
| 14 | Trade Nexus | ✅ Done | 2026-02-14 |
| 15 | Refinery World | ✅ Done | 2026-02-14 |
| 16 | Storm Refuge | ✅ Done | 2026-02-14 |
| 17 | Prison Planet | ✅ Done | 2026-02-14 |
| 18 | Trading Hub | ✅ Done | 2026-02-14 |
| 19 | Volcanic Base | ✅ Done | 2026-02-14 |
| 20 | Shrine World | ✅ Done | 2026-02-14 |
| 21 | Base Quartus | ✅ Done | 2026-02-14 |
| 22 | Ice Moon | ✅ Done | 2026-02-14 |
| 23 | Pilgrim Rest | ✅ Done | 2026-02-14 |
| 24 | Ash Colony | ✅ Done | 2026-02-14 |
| 25 | Science Base | ✅ Done | 2026-02-14 |
| 26 | Ash World | ✅ Done | 2026-02-14 |
| 27 | Research Complex | ✅ Done | 2026-02-14 |
| 28 | Pulsar Base | ✅ Done | 2026-02-14 |
| 29 | Station Gamma | ✅ Done | 2026-02-14 |
| 30 | Orbital Haven | ✅ Done | 2026-02-14 |
| 31 | Death World Outpost | ✅ Done | 2026-02-14 |
| 32 | Supply Chain | ✅ Done | 2026-02-14 |
| 33 | Military Depot | ✅ Done | 2026-02-14 |
| 34 | Gas Harvester | ✅ Done | 2026-02-14 |
| 35 | Pulsar Station | ✅ Done | 2026-02-14 |
| 36 | Hive Colony | ✅ Done | 2026-02-14 |
| 37 | Solar Collector | ✅ Done | 2026-02-14 |
| 38 | Rogue Planet | ✅ Done | 2026-02-14 |
| 39 | Terraformed Outpost | ✅ Done | 2026-02-14 |
| 40 | Binary Outpost | ✅ Done | 2026-02-14 |
| 41 | Colony Prime | ✅ Done | 2026-02-14 |
| 42 | Prison Station | ✅ Done | 2026-02-14 |
| 43 | Lava World | ✅ Done | 2026-02-14 |
| 44 | Desert Base | ✅ Done | 2026-02-14 |
| 45 | Nebula Edge | ✅ Done | 2026-02-14 |
| 46 | Dwarf System | ✅ Done | 2026-02-14 |
| 47 | Forge Base | ✅ Done | 2026-02-14 |
| 48 | Relic Moon | ✅ Done | 2026-02-14 |
| 49 | Military Garrison | ✅ Done | 2026-02-14 |
| 50 | Jungle World | ✅ Done | 2026-02-14 |
| 51 | Binary Stars | ✅ Done | 2026-02-14 |
| 52 | Cinder Colony | ✅ Done | 2026-02-14 |
| 53 | Frozen Wastes | ✅ Done | 2026-02-14 |
| 54 | Dust World | ✅ Done | 2026-02-14 |
| 55 | Frost Planet | ✅ Done | 2026-02-14 |
| 56 | Mining Colony | ✅ Done | 2026-02-14 |
| 57 | Garden Station | ✅ Done | 2026-02-14 |
| 58 | Supply Station | ✅ Done | 2026-02-14 |
| 59 | Nebula Station | ✅ Done | 2026-02-14 |
| 60 | Garden World | ✅ Done | 2026-02-14 |
| 61 | Death World | ✅ Done | 2026-02-15 |
| ... | *(39 more, all done)* | ✅ Done | 2026-02-15 |

### Phenomena (PHE_01–PHE_100)
| # | Card Title | Status | Generated |
|---|------------|--------|-----------|
| 1 | Collapsed Megastructure | ✅ Done | 2026-02-14 |
| 2 | Phase Gate | ✅ Done | 2026-02-14 |
| 3 | Fragmented Gate | ✅ Done | 2026-02-14 |
| 4 | Cosmic Ruins | ✅ Done | 2026-02-14 |
| 5 | Void Maw | ✅ Done | 2026-02-14 |
| 6 | Phase Boundary | ✅ Done | 2026-02-14 |
| 7 | Nebula Void | ✅ Done | 2026-02-14 |
| 8 | Elder Relic | ✅ Done | 2026-02-14 |
| 9 | The Singing Star | ✅ Done | 2026-02-14 |
| 10 | Dead Civilization | ✅ Done | 2026-02-14 |
| 11 | Gravitational Lens | ✅ Done | 2026-02-14 |
| 12 | Frozen Anomaly | ✅ Done | 2026-02-14 |
| 13 | Gravity Gate | ✅ Done | 2026-02-14 |
| 14 | Precursor Gate | ✅ Done | 2026-02-14 |
| 15 | Gate Anomaly | ✅ Done | 2026-02-14 |
| 16 | Gate Remnant | ✅ Done | 2026-02-14 |
| 17 | Magnetic Anomaly | ✅ Done | 2026-02-14 |
| 18 | Scattered Anomaly | ✅ Done | 2026-02-14 |
| 19 | Rift Ruins | ✅ Done | 2026-02-14 |
| 20 | Gravity Void | ✅ Done | 2026-02-14 |
| 21 | Megastructure Anomaly | ✅ Done | 2026-02-14 |
| 22 | Megastructure Debris | ✅ Done | 2026-02-14 |
| 23 | Elder Pulse | ✅ Done | 2026-02-14 |
| 24 | Dimensional Rift | ✅ Done | 2026-02-14 |
| 25 | Reality Anomaly | ✅ Done | 2026-02-14 |
| 26 | Star Storm | ✅ Done | 2026-02-14 |
| 27 | Nebula Ruins | ✅ Done | 2026-02-14 |
| 28 | Whispering Rift | ✅ Done | 2026-02-14 |
| 29 | Screaming Nebula | ✅ Done | 2026-02-14 |
| 30 | Scattered Relics | ✅ Done | 2026-02-14 |
| 31 | Silent Gate | ✅ Done | 2026-02-14 |
| 32 | Screaming Gate | ✅ Done | 2026-02-14 |
| 33 | Frozen Gate | ✅ Done | 2026-02-14 |
| 34 | Dead Star Gate | ✅ Done | 2026-02-14 |
| 35 | Void Singer | ✅ Done | 2026-02-14 |
| 36 | Void Storm | ✅ Done | 2026-02-14 |
| 37 | Nebula Anomaly | ✅ Done | 2026-02-14 |
| 38 | Dead Star Remnant | ✅ Done | 2026-02-14 |
| 39 | Supernova Remnant | ✅ Done | 2026-02-14 |
| 40 | Black Hole Choir | ✅ Done | 2026-02-14 |
| 41 | Phase Storm | ✅ Done | 2026-02-14 |
| 42 | Star Anomaly | ✅ Done | 2026-02-14 |
| 43 | Screaming Rift | ✅ Done | 2026-02-14 |
| 44 | Gravity Well | ✅ Done | 2026-02-14 |
| 45 | Phase Ruins | ✅ Done | 2026-02-14 |
| 46 | Nebula Pulse | ✅ Done | 2026-02-14 |
| 47 | Echoing Anomaly | ✅ Done | 2026-02-14 |
| 48 | Spatial Gate | ✅ Done | 2026-02-14 |
| 49 | Collapsed Gate | ✅ Done | 2026-02-14 |
| 50 | Neutron Pulse | ✅ Done | 2026-02-14 |
| 51 | Buried Gate | ✅ Done | 2026-02-14 |
| 52 | Buried Storm | ✅ Done | 2026-02-14 |
| 53 | Cosmic Choir | ✅ Done | 2026-02-14 |
| 54 | Megastructure Pulse | ✅ Done | 2026-02-14 |
| 55 | Hyperspace Bleed | ✅ Done | 2026-02-14 |
| 56 | Quantum Echo | ✅ Done | 2026-02-14 |
| 57 | Gate Storm | ✅ Done | 2026-02-14 |
| 58 | Ancient Ruins | ✅ Done | 2026-02-14 |
| 59 | Quantum Void | ✅ Done | 2026-02-14 |
| 60 | Precursor Relic | ✅ Done | 2026-02-14 |
| 61 | Ancient Storm | ✅ Done | 2026-02-15 |
| ... | *(39 more, all done)* | ✅ Done | 2026-02-15 |

---

## Session Log

| Date | Action | Cards | Notes |
|------|--------|-------|-------|
| 2026-02-04 | Log created | — | Initial tracking document |
| 2026-02-04 | Generated | Cargo Drift | EMPTY_01 — first card |
| 2026-02-04 | Generated | Hull Scatter, Stray Hull, Debris Field, Void Drift, Abandoned Outpost | EMPTY_02-06 batch 1 |
| 2026-02-04 | Generated | Cargo Cluster, Orphaned Buoy, Silent Beacon, Void Remnant, Scavenger Mark | EMPTY_07-11 batch 2 |
| 2026-02-04 | Generated | Lost Buoy, Derelict Probe Field, Scrap Veil, Signal Burst, Scattered Hulls | EMPTY_12-16 batch 3 |
| 2026-02-04 | Generated | Floating Cache, Wreck Cluster, Cold Wake, Orphaned Station, Ghost Drift | EMPTY_17-21 batch 4 |
| 2026-02-04 | Generated | Signal Drift, Scavenger's Mark, Floating Hull, Wreckage Cluster, Micrometeor Swarm | EMPTY_22-26 batch 5 |
| 2026-02-04 | Generated | Unclaimed Cache, Scattered Wreck, Floating Debris, Orphaned Cargo, Orphaned Relay | EMPTY_27-31 batch 6 |
| 2026-02-04 | Generated | Derelict Hull, Scattered Remains, Drift Remnant, Cargo Graveyard, Signal Ghost | EMPTY_32-36 batch 7 |
| 2026-02-04 | Generated | Wreckage Field through Ghost Cargo | EMPTY_37-51 batch 8-10 |
| 2026-02-04 | Generated | Drift Station through Lost Station | EMPTY_52-61 batch 11 |
| 2026-02-14 | Generated | Research Outpost through Orbital Haven | SYS_01-30 batch 1 |
| 2026-02-14 | Generated | Collapsed Megastructure through Scattered Relics | PHE_01-30 batch 1 |
| 2026-02-14 | Generated | Signal Echo through Scrap Field, Death World Outpost through Garden World, Silent Gate through Precursor Relic | EMPTY_62-91, SYS_31-60, PHE_31-60 batch 2 |
| 2026-02-15 | Generated | Scattered Cargo through Rogue Trader | EMPTY_92-100 batch 3 |
| 2026-02-15 | Generated | Death World through Station Tertius | SYS_61-100 batch 2 |
| 2026-02-15 | Generated | Ancient Storm through Singing Gate | PHE_61-100 batch 2 |
| 2026-02-15 | Synced files | Full local image set copied to repository `assets/cards/` | 300 PNG files present locally |

**Note:** SYS_07 "Red Dwarf: Cinder Belt" saved as `Red Dwarf Cinder Belt.png` (colon omitted; Windows filename restriction). Rename if needed for exact card-title match.

---

## Regenerating Prompts

If card data changes, regenerate prompts:

```bash
node scripts/generate-image-prompts.js
```

Outputs:
- `data/card-image-prompts.md`
- `data/card-image-prompts-simple.txt`
