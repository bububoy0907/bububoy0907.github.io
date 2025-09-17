// Core scene setup + toon outline + controls + single-click move.
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/OutlinePass.js';

import { buildCozyRoom, cameraSpots } from './room.js';
import { loadProfileCards } from './ui.js';

const canvas = document.getElementById('webgl');

// Scene/Camera/Renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f0f14);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.05, 100);
camera.position.set(0, 1.2, 4.2);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);

// Postprocessing (anime-style outline)
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
outlinePass.edgeStrength = 2.2;
outlinePass.edgeGlow = 0.0;
outlinePass.edgeThickness = 1.0;
outlinePass.visibleEdgeColor.set('#2b2b35');
outlinePass.hiddenEdgeColor.set('#000000');
composer.addPass(outlinePass);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 1.6;
controls.maxDistance = 6.0;
controls.target.set(0, 0.7, 0);

// Build room
await buildCozyRoom(scene);

// Camera spots & single-click navigation
const spots = cameraSpots();
let currentSpot = 0;

function goToSpot(i) {
  const spot = spots[i % spots.length];
  currentSpot = i % spots.length;
  // Smooth tween using simple lerp over time (no external libs)
  const start = {
    p: camera.position.clone(),
    t: controls.target.clone(),
    time: performance.now()
  };
  const endPos = new THREE.Vector3(spot.pos.x, spot.pos.y, spot.pos.z);
  const endTgt = new THREE.Vector3(spot.lookAt.x, spot.lookAt.y, spot.lookAt.z);

  function animateTo() {
    const elapsed = (performance.now() - start.time) / 800; // 0.8s
    const k = Math.min(1, elapsed);
    camera.position.lerpVectors(start.p, endPos, k);
    controls.target.lerpVectors(start.t, endTgt, k);
    if (k < 1) requestAnimationFrame(animateTo);
  }
  animateTo();
}
goToSpot(currentSpot);

document.getElementById('nextSpot').addEventListener('click', () => goToSpot(currentSpot + 1));

// Single-click detection (not drag)
let isDragging = false;
let downX = 0, downY = 0;
renderer.domElement.addEventListener('pointerdown', (e) => {
  isDragging = false;
  downX = e.clientX; downY = e.clientY;
});
renderer.domElement.addEventListener('pointermove', (e) => {
  if (Math.abs(e.clientX - downX) > 5 || Math.abs(e.clientY - downY) > 5) {
    isDragging = true;
  }
});
renderer.domElement.addEventListener('pointerup', () => {
  if (!isDragging) goToSpot(currentSpot + 1);
});

// Responsive
window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
});

// UI cards
loadProfileCards();

// Animate
const clock = new THREE.Clock();
function tick() {
  const dt = clock.getDelta();
  controls.update(dt);
  composer.render();
  requestAnimationFrame(tick);
}
tick();
