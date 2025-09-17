// Minimal cozy room primitives using toon materials.
// Uses gradient map from three.js examples for the cel look.

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

export async function createToonMaterial(color = 0xffffff) {
  const loader = new THREE.TextureLoader();
  // Public gradient map texture from three.js examples (credit: three.js)
  const gradient = await loader.loadAsync(
    'https://threejs.org/examples/textures/gradientMaps/threeTone.jpg'
  );
  gradient.minFilter = THREE.NearestFilter;
  gradient.magFilter = THREE.NearestFilter;

  return new THREE.MeshToonMaterial({
    color,
    gradientMap: gradient
  });
}

export async function buildCozyRoom(scene) {
  // Lights: warm cozy
  const hemi = new THREE.HemisphereLight(0xffe7c7, 0x202028, 0.8);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xffddaa, 0.9);
  dir.position.set(3, 4, 2);
  scene.add(dir);

  // Floor
  const floorMat = await createToonMaterial(0x3a2f29);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  floor.receiveShadow = true;
  scene.add(floor);

  // Walls (simple room)
  const wallMat = await createToonMaterial(0x403a43);
  const wallGeo = new THREE.PlaneGeometry(8, 3);
  const back = new THREE.Mesh(wallGeo, wallMat);
  back.position.set(0, 1.5, -4);
  scene.add(back);

  const left = new THREE.Mesh(wallGeo, wallMat);
  left.rotation.y = Math.PI / 2;
  left.position.set(-4, 1.5, 0);
  scene.add(left);

  const right = new THREE.Mesh(wallGeo, wallMat);
  right.rotation.y = -Math.PI / 2;
  right.position.set(4, 1.5, 0);
  scene.add(right);

  // Rug
  const rugMat = await createToonMaterial(0x8c4a3c);
  const rug = new THREE.Mesh(new THREE.CylinderGeometry(0.001, 1.6, 0.02, 24), rugMat);
  rug.rotation.x = -Math.PI / 2;
  rug.position.y = 0.011;
  scene.add(rug);

  // Low table
  const tableMat = await createToonMaterial(0x5a4a45);
  const table = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.2, 0.9), tableMat);
  table.position.set(0, 0.35, -0.6);
  scene.add(table);

  // Sofa (boxes)
  const sofaMat = await createToonMaterial(0x6f7485);
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
  const lampBaseMat = await createToonMaterial(0x32323a);
  const lampShadeMat = await createToonMaterial(0xf2c196);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.0, 16), lampBaseMat);
  pole.position.set(-2.8, 0.5, -1.2);
  scene.add(pole);

  const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.5, 24), lampShadeMat);
  lampShade.position.set(-2.8, 1.2, -1.2);
  scene.add(lampShade);

  const spot = new THREE.SpotLight(0xffd8a6, 1.2, 4, Math.PI / 4, 0.3, 1);
  spot.position.set(-2.8, 1.2, -1.2);
  spot.target = table;
  scene.add(spot);

  // “Info objects” you can raycast later (optional)
  const infoPlinthMat = await createToonMaterial(0x444);
  const infoPlinth = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.3, 24), infoPlinthMat);
  infoPlinth.position.set(2.4, 0.15, 0.2);
  infoPlinth.name = 'info:projects';
  scene.add(infoPlinth);

  const infoPlinth2 = infoPlinth.clone();
  infoPlinth2.position.set(-2.2, 0.15, 0.8);
  infoPlinth2.name = 'info:experience';
  scene.add(infoPlinth2);

  return { floor, table, seat };
}

export function cameraSpots() {
  // Waypoints for single-click navigation
  return [
    { name: 'Entrance', pos: { x: 0, y: 1.2, z: 4.2 }, lookAt: { x: 0, y: 0.8, z: 0 } },
    { name: 'Sofa',     pos: { x: 1.8, y: 1.2, z: 2.2 }, lookAt: { x: 0.6, y: 0.6, z: 1.0 } },
    { name: 'Table',    pos: { x: 0.0, y: 1.2, z: 1.4 }, lookAt: { x: 0, y: 0.4, z: -0.6 } },
    { name: 'Lamp',     pos: { x: -2.6, y: 1.2, z: -0.4 }, lookAt: { x: -2.8, y: 1.0, z: -1.2 } }
  ];
}
