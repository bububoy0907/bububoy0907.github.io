# Cozy Anime Room (Three.js, no build)

Works on GitHub Pages without any bundler.  
Open: https://bububoy0907.github.io

- Toon shading via `MeshToonMaterial` + gradient map (CORS-safe).
- Drag to orbit, scroll to zoom, **single-click** to move between viewpoints.
- Overlay cards from `data/profile.json`.

If you ever get a white screen: open DevTools (F12) → Console.  
Common issues:
- Wrong path to `main.js` (must be `./src/main.js`).
- CDN import blocked / version mismatch → use the pinned URLs in code.
- Texture CORS errors → we use jsDelivr gradient to avoid this.
