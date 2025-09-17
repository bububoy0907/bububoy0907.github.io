// Minimal, reliable setup for GitHub Pages (no build step).
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { buildRoom, cameraSpots } from './room.js';

const canvas = document.getElementById('webgl');

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f0f14);

// Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.05, 100);
camera.position.set(0, 1.2, 4.2);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 1.6;
controls.maxDistance = 6.0;
controls.target.set(0, 0.7, 0);

// Build scene content
await buildRoom(scene);

// Camera spots + single-click cycling
const spots = cameraSpots();
let currentSpot = 0;

function goTo(i) {
  const s = spots[(i % spots.length + spots.length) % spots.length];
  currentSpot = (i % spots.length + spots.length) % spots.length;

  const startPos = camera.position.clone();
  const startTgt = controls.target.clone();
  const endPos = new THREE.Vector3(s.pos.x, s.pos.y, s.pos.z);
  const endTgt = new THREE.Vector3(s.look.x, s.look.y, s.look.z);
  const t0 = performance.now();
  const dur = 800; // ms

  function step() {
    const k = Math.min(1, (performance.now() - t0) / dur);
    camera.position.lerpVectors(startPos, endPos, k);
    controls.target.lerpVectors(startTgt, endTgt, k);
    if (k < 1) requestAnimationFrame(step);
  }
  step();
}
goTo(currentSpot);

// UI: next spot button
document.getElementById('nextSpot')?.addEventListener('click', () => goTo(currentSpot + 1));

// Single-click detection (not drag)
let isDragging = false;
let downX = 0, downY = 0;
renderer.domElement.addEventListener('pointerdown', (e) => { isDragging = false; downX = e.clientX; downY = e.clientY; });
renderer.domElement.addEventListener('pointermove', (e) => {
  if (Math.abs(e.clientX - downX) > 5 || Math.abs(e.clientY - downY) > 5) isDragging = true;
});
renderer.domElement.addEventListener('pointerup', () => { if (!isDragging) goTo(currentSpot + 1); });

// Info cards (optional JSON)
(async function loadCards() {
  const box = document.getElementById('info-cards');
  if (!box) return;
  try {
    const res = await fetch('./data/profile.json', { cache: 'no-store' });
    const json = await res.json();
    box.innerHTML = '';
    (json.cards || []).forEach((c) => {
      const el = document.createElement('div');
      el.className = 'card';
      el.innerHTML = `<h3>${c.title}</h3><p>${c.text}</p>`;
      box.appendChild(el);
    });
  } catch {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<h3>Welcome</h3><p>Edit <code>/data/profile.json</code> to customize these cards.</p>`;
    box.appendChild(el);
  }
})();

// Resize handling
window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

// Render loop
const clock = new THREE.Clock();
function animate() {
  controls.update(clock.getDelta());
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
