# GitHub Pages Deployment

## Requirements

The game must be deployed with the full repository structure. Ensure the deployed branch contains:

- `index.html` (entry point)
- `styles.css`
- `src/` (all JavaScript modules)
- `data/` (hex_map.json, actions.json, cards_*.json, tokens.json, factions.json, card-text-all.json)

## Configuration

1. Open the repo on GitHub → **Settings** → **Pages**
2. Under **Source**, select:
   - **Branch**: `reboot/v0` (or merge `reboot/v0` into `main` and use `main`)
   - **Folder**: `/ (root)`
3. Save. GitHub will publish from the selected branch.

## Project site URL

For a project site, the game will be at:

```
https://<username>.github.io/<repo-name>/
```

Example: `https://samlaidh-hash.github.io/Echoes/`

## Troubleshooting

- **Empty map / BOOT FAIL**: Check the browser console (F12) and Network tab. Look for 404s on `data/*.json` or `src/*.js`. Ensure the deployed branch includes all files.
- **Wrong branch**: If Pages deploys from `main` but your work is on `reboot/v0`, either merge and push, or change Settings → Pages → Source to `reboot/v0`.
