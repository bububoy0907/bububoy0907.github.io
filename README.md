# Cozy Room WebGL Profile (No Build)

A minimal, cozy, anime-styled Three.js scene for your GitHub Pages profile:  
**single-click** moves to the next viewpoint, **drag** to orbit, **scroll** to zoom.

### How to run (GitHub Pages profile)
1. Create the repo named **bububoy0907.github.io** (you already did 🎉).
2. Put these files in the repo at the root.
3. Commit & push to `main`.
4. Visit `https://bububoy0907.github.io`.

### Customize
- Edit `data/profile.json` (cards, text).
- Tweak room colors / layout in `src/room.js`.
- Add your textures under `assets/textures/` and wire them into materials.
- Replace `favicon.ico` under `assets/icons/`.

### Notes
- Uses **MeshToonMaterial** + **OutlinePass** (from three.js examples) to get anime/cartoon feel—no custom shaders built here.
- ESM via CDN: no bundler, works directly on GitHub Pages.
- Accessible: skip-link, focusable button, semantic overlay.

### Next steps (optional)
- Add **raycasting** to click props (e.g., a plinth) to show specific info sections.
- Add **ambient SFX** toggle for cozy vibes.
- Replace primitive furniture with GLB models (import via `GLTFLoader`).
