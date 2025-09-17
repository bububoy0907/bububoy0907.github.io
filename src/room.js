// Simple cozy room with toon/cel shading — no fragile post-processing.
// Uses a CORS-safe gradient map hosted on jsDelivr (three.js repo).

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

export async function makeToon(color = 0xffffff) {
  const loader = new THREE.TextureLoader();
  const gradient = await loader.loadAsync(
    'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/gradientMaps/threeTone.jpg'
  );
  gradient.minFilter = THREE.NearestFilter;
  gradient.magFilter = THREE.NearestFilter;
  gradient.generateMipmaps = false;

  return new THREE.MeshToonMaterial({ color, gradientMap: gradient });
}

export async function buildRoom(scene) {
  // Lighting
  scene.add(new THREE.HemisphereLight(0xffe7c7, 0x202028, 1.0));
  const key = new THREE.DirectionalLight(0xffddaa, 0.9);
  key.position.set(3, 4, 2);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x99aabb, 0.3);
  fill.position.set(-2, 2, -1);
  scene.add(fill);

  // Materials
  const floorMat = await makeToon(0x3a2f29);
  const wallMat  = await makeToon(0x403a43);
  const rugMat   = await makeToon(0x8c4a3c);
  const woodMat  = await makeToon(0x5a4a45);
  const sofaMat  = await makeToon(0x6f7485);
  const darkMat  = await makeToon(0x32323a);

  // Floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  floor.receiveShadow = true;
  scene.add(floor);

  // Walls
  const wallGeo = new THREE.PlaneGeometry(8, 3);
  const back  = new THREE.Mesh(wallGeo, wallMat); back.position.set(0, 1.5, -4); scene.add(back);
  const left  = new THREE.Mesh(wallGeo, wallMat); left.rotation.y  =  Math.PI / 2; left.position.set(-4, 1.5, 0); scene.add(left);
  const right = new THREE.Mesh(wallGeo, wallMat); right.rotation.y = -Math.PI / 2; right.position.set( 4, 1.5, 0); scene.add(right);

  // Rug
  const rug = new THREE.Mesh(new THREE.CylinderGeometry(0.001, 1.6, 0.02, 24), rugMat);
  rug.rotation.x = -Math.PI / 2;
  rug.position.y = 0.011;
  scene.add(rug);

  // Low table
  const table = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.2, 0.9), woodMat);
  table.position.set(0, 0.35, -0.6);
  scene.add(table);

  // Sofa
  const seat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.35, 0.9), sofaMat);
  seat.position.set(0.4, 0.35, 1.2);
  scene.add(seat);

  const backrest = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 0.2), sofaMat);
  backrest.position.set(0.4, 0.75, 0.7);
  scene.add(backrest);

  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, 0.9), sofaMat);
  armL.position.set(-0.8, 0.6, 1.2);
  scene.add(armL);

  const armR = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.5, 0.9), sofaMat);
  armR.position.set(1.6, 0.6, 1.2);
  scene.add(armR);

  // Lamp
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.0, 16), darkMat);
  pole.position.set(-2.8, 0.5, -1.2);
  scene.add(pole);

  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.5, 24), await makeToon(0xf2c196));
  shade.position.set(-2.8, 1.2, -1.2);
  scene.add(shade);

  const spot = new THREE.SpotLight(0xffd8a6, 1.2, 4, Math.PI / 4, 0.3, 1);
  spot.position.set(-2.8, 1.2, -1.2);
  spot.target = table;
  scene.add(spot);

  // Optional: tiny plinths you can click later
  const plinth1 = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.3, 24), darkMat);
  plinth1.position.set(2.4, 0.15, 0.2);
  plinth1.name = 'info:projects';
  scene.add(plinth1);

  const plinth2 = plinth1.clone();
  plinth2.position.set(-2.2, 0.15, 0.8);
  plinth2.name = 'info:experience';
  scene.add(plinth2);
}

export function cameraSpots() {
  return [
    { name: 'Entrance', pos: { x: 0, y: 1.2, z: 4.2 },  look: { x: 0,   y: 0.8, z: 0 } },
    { name: 'Sofa',     pos: { x: 1.8, y: 1.2, z: 2.2 },  look: { x: 0.6, y: 0.6, z: 1.0 } },
    { name: 'Table',    pos: { x: 0.0, y: 1.2, z: 1.4 },  look: { x: 0,   y: 0.4, z: -0.6 } },
    { name: 'Lamp',     pos: { x: -2.6, y: 1.2, z: -0.4 },look: { x: -2.8,y: 1.0, z: -1.2 } }
  ];
}
