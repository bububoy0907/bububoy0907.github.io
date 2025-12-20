import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { PROFILE, SKILLS, PROJECTS } from "../content.js";

/* ---------------- utils ---------------- */

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animate({ duration, onUpdate }) {
  return new Promise((resolve) => {
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      onUpdate(t);
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    }
    requestAnimationFrame(tick);
  });
}

/* ---------------- content (must match Traditional) ---------------- */

const FLOORS = [
  { floor: 1, key: "about", label: "About" },
  { floor: 2, key: "projects", label: "Projects" },
  { floor: 3, key: "skills", label: "Skills" },
  { floor: 4, key: "demos", label: "Demos" },
  { floor: 5, key: "contact", label: "Contact" }
];

function aboutHtml() {
  return `
    <p><strong>${PROFILE.name}</strong></p>
    <p class="mini">${PROFILE.education}</p>
    <p class="mini">${PROFILE.location}</p>
    <hr class="smallHr" />
    <p><strong>Focus</strong></p>
    <ul class="mini" style="line-height:1.7;">
      <li>${PROFILE.titlePrimary}</li>
      <li>${PROFILE.titleSecondary}</li>
    </ul>
    <p><strong>Contact</strong></p>
    <ul class="mini" style="line-height:1.7;">
      <li>Email: ${PROFILE.contact.email}</li>
      <li>LinkedIn: ${PROFILE.contact.linkedin}</li>
    </ul>
  `;
}

function skillsHtml() {
  return `
    <p><strong>Languages</strong>: ${SKILLS.languages.join(", ")}</p>
    <p><strong>Web</strong>: ${SKILLS.web.join(", ")}</p>
    <p><strong>Systems/Tools</strong>: ${SKILLS.systems.join(", ")}</p>
    <p><strong>3D/Simulation</strong>: ${SKILLS.additionals.join(", ")}</p>
  `;
}

function demosHtml() {
  return `
    <p class="mini">
      Some artifacts are placeholders until published. This is intentional and honest.
    </p>
    <ul class="mini" style="line-height:1.7;">
      <li>WebAR Delivery: <strong>[Demo Video Coming Soon]</strong> · <strong>[Screenshots Folder]</strong></li>
      <li>Unity Internship: <strong>[Request Access / Private Repo]</strong> · <strong>[Screenshots Folder]</strong></li>
      <li>WishCraft Ops: <strong>[Case Study]</strong> · <strong>[Architecture Notes]</strong></li>
      <li>PetMatch: <strong>[Repo Link]</strong> · <strong>[Readme]</strong></li>
    </ul>
  `;
}

function contactHtml() {
  return `
    <p class="mini">Replace placeholders with real links when ready.</p>
    <ul class="mini" style="line-height:1.7;">
      <li>Email: ${PROFILE.contact.email}</li>
      <li>LinkedIn: ${PROFILE.contact.linkedin}</li>
      <li>Location: ${PROFILE.location}</li>
    </ul>
  `;
}

function projectsHtml() {
  const cards = PROJECTS.map((p) => {
    const tech = p.tech.map((t) => `<code>${t}</code>`).join(" ");
    const outcomes = p.outcomes.join(" · ");
    const resp = `<ul>${p.responsibilities.map(r => `<li>${r}</li>`).join("")}</ul>`;
    return `
      <div class="projectCard" style="margin-bottom:12px;">
        <h3>${p.name}</h3>
        <p class="meta">${p.oneLiner}</p>
        <div class="kv">
          <div><strong>Responsibilities</strong>: ${resp}</div>
          <div><strong>Tech</strong>: ${tech}</div>
          <div><strong>Outcomes</strong>: ${outcomes}</div>
        </div>
        <div class="thumb">[Screenshot Placeholder]</div>
        <div class="links">
          <span class="link">${p.links.repo}</span>
          <span class="link">${p.links.demo}</span>
          <span class="link">${p.links.caseStudy}</span>
          <span class="link">${p.links.readme}</span>
        </div>
      </div>
    `;
  }).join("");

  return `<p class="mini">Featured projects (same content as Traditional view).</p><hr class="smallHr" />${cards}`;
}

/* ---------------- canvas textures: luxury tiles + indicator ---------------- */

function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function makeRowTileTexture({ floor, label, active }) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  // tile background
  const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  if (active) {
    bg.addColorStop(0, "rgba(255,210,150,0.34)");
    bg.addColorStop(1, "rgba(0,150,255,0.16)");
  } else {
    bg.addColorStop(0, "rgba(18,20,26,0.92)");
    bg.addColorStop(1, "rgba(10,12,16,0.92)");
  }

  roundRect(ctx, 12, 16, 488, 96, 26);
  ctx.fillStyle = bg;
  ctx.fill();

  // border (brass tone)
  ctx.lineWidth = 3;
  ctx.strokeStyle = active ? "rgba(255,255,255,0.30)" : "rgba(176,141,87,0.40)";
  ctx.stroke();

  // inner highlight
  roundRect(ctx, 18, 22, 476, 84, 22);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.stroke();

  const num = String(floor).padStart(2, "0");
  const title = (label || "").toUpperCase();

  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = "bold 40px ui-monospace, Menlo, Consolas, monospace";
  ctx.fillText(num, 34, 64);

  ctx.fillStyle = "rgba(255,255,255,0.86)";
  ctx.font = "bold 28px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";
  ctx.fillText(title, 118, 64);

  // small LED dot
  ctx.beginPath();
  ctx.arc(474, 64, 8, 0, Math.PI * 2);
  ctx.fillStyle = active ? "rgba(0,210,255,0.90)" : "rgba(255,255,255,0.16)";
  ctx.fill();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function makeIndicatorTexture({ floor = 1, dir = 0 }) {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  roundRect(ctx, 10, 12, 236, 104, 18);
  ctx.fillStyle = "rgba(0,0,0,0.85)";
  ctx.fill();

  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(176,141,87,0.55)";
  ctx.stroke();

  const num = String(floor).padStart(2, "0");
  const arrow = dir === 1 ? "▲" : dir === -1 ? "▼" : " ";

  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = "bold 50px ui-monospace, Menlo, Consolas, monospace";
  ctx.fillText(num, 24, 64);

  ctx.fillStyle = "rgba(255,255,255,0.80)";
  ctx.font = "bold 44px ui-monospace, Menlo, Consolas, monospace";
  ctx.fillText(arrow, 178, 64);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/* ---------------- main mount ---------------- */

export function mountElevator(container) {
  // DOM
  const wrap = document.createElement("div");
  wrap.className = "container";

  const header = document.createElement("section");
  header.className = "card hero";
  header.innerHTML = `
    <h1 class="h1">Interactive Elevator</h1>
    <p class="sub">
      Click a floor row on the panel next to the doors. The elevator simulates travel, opens the doors, and shows the section below.
    </p>
  `;
  wrap.appendChild(header);

  const stage = document.createElement("section");
  stage.className = "roomWrap";
  stage.style.position = "relative";
  stage.innerHTML = `
    <div class="hint">
      <strong>How to interact</strong>
      <ul>
        <li>Click a floor row on the panel</li>
        <li>Doors open; section appears in the in-view display</li>
      </ul>
    </div>

    <div class="hud">
      <button class="btn" id="resetBtn" type="button">Reset</button>
      <button class="btn" id="closeBtn" type="button">Close Panel</button>
    </div>

    <div class="infoDrawer" id="infoDrawer">
      <div class="infoDrawerHeader">
        <div>
          <h3 id="infoTitle">Title</h3>
          <p id="infoDesc">Description</p>
        </div>
        <button class="infoDrawerClose" id="infoClose">Close</button>
      </div>
      <div class="infoDrawerBody" id="infoBody"></div>
    </div>
  `;
  wrap.appendChild(stage);
  container.appendChild(wrap);

  const drawer = stage.querySelector("#infoDrawer");
  const infoTitle = stage.querySelector("#infoTitle");
  const infoDesc = stage.querySelector("#infoDesc");
  const infoBody = stage.querySelector("#infoBody");

  const openDrawer = ({ title, desc, html }) => {
    infoTitle.textContent = title || "";
    infoDesc.textContent = desc || "";
    infoBody.innerHTML = html || "";
    drawer.classList.add("open");
  };

  const closeDrawer = () => {
    drawer.classList.remove("open");
    infoBody.innerHTML = "";
  };

  // renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(stage.clientWidth, stage.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // luxury-ish tone mapping
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  stage.appendChild(renderer.domElement);

  // scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07090d);

  // camera: guaranteed INSIDE, facing doors & panel
  const camera = new THREE.PerspectiveCamera(52, stage.clientWidth / stage.clientHeight, 0.1, 100);

  // Elevator dimensions
  const W = 3.0;
  const D = 3.2;
  const H = 2.7;
  const halfW = W / 2;
  const halfD = D / 2;

  const frontZ = halfD;

  // Doors opening
  const openingW = 1.75;
  const openingH = 2.25;
  const sideFrameW = (W - openingW) / 2;

  // Place camera behind target: theta ~ -PI (important for OrbitControls clamping)
  const target = new THREE.Vector3(0.15, 1.25, frontZ - 0.25);
  camera.position.set(-0.35, 1.48, -halfD + 0.55);

  // controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.target.copy(target);

  // Critical: clamp azimuth around -PI so OrbitControls does NOT snap outside
  const AZ = 0.65;
  controls.minAzimuthAngle = -Math.PI - AZ;
  controls.maxAzimuthAngle = -Math.PI + AZ;

  controls.minPolarAngle = 1.12;
  controls.maxPolarAngle = 1.46;

  controls.minDistance = 1.55;
  controls.maxDistance = 2.45;

  // Force OrbitControls to compute internal spherical state from our camera/target
  controls.update();

  /* ---------------- luxury lighting ---------------- */

  // warm ambient
  scene.add(new THREE.AmbientLight(0xfff0dd, 0.22));

  // ceiling downlights
  const key = new THREE.SpotLight(0xffe3c2, 1.35, 12, Math.PI / 4, 0.55, 1.4);
  key.position.set(0.2, H + 0.05, -0.2);
  key.target.position.set(0.0, 1.0, frontZ - 0.6);
  scene.add(key, key.target);

  const fill = new THREE.SpotLight(0xffebd2, 0.95, 10, Math.PI / 4, 0.60, 1.5);
  fill.position.set(-0.9, H, -0.6);
  fill.target.position.set(0.0, 1.0, frontZ - 0.4);
  scene.add(fill, fill.target);

  const brassAccent = new THREE.PointLight(0xffd2a0, 0.55, 8, 2.0);
  brassAccent.position.set(0.9, 2.0, frontZ - 0.7);
  scene.add(brassAccent);

  /* ---------------- materials: luxury hotel elevator ---------------- */

  const woodMat = new THREE.MeshStandardMaterial({ color: 0x2b2016, roughness: 0.65, metalness: 0.05, side: THREE.DoubleSide });
  const charcoalMat = new THREE.MeshStandardMaterial({ color: 0x101422, roughness: 0.92, metalness: 0.05, side: THREE.DoubleSide });
  const brassMat = new THREE.MeshStandardMaterial({ color: 0xb08d57, roughness: 0.28, metalness: 1.0 });
  const steelMat = new THREE.MeshStandardMaterial({ color: 0xb7c0cb, roughness: 0.35, metalness: 1.0 });
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x0f1014, roughness: 1.0, metalness: 0.0, side: THREE.DoubleSide });
  const panelBodyMat = new THREE.MeshStandardMaterial({ color: 0x171b24, roughness: 0.55, metalness: 0.28 });
  const emissiveStripMat = new THREE.MeshStandardMaterial({
    color: 0x0f131a, roughness: 0.2, metalness: 0.0,
    emissive: new THREE.Color(0xffd6a3), emissiveIntensity: 0.55,
    side: THREE.DoubleSide
  });

  /* ---------------- cabin geometry ---------------- */

  const cabin = new THREE.Group();
  scene.add(cabin);

  // floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), floorMat);
  floor.rotation.x = -Math.PI / 2;
  cabin.add(floor);

  // ceiling
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(W, D), charcoalMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = H;
  cabin.add(ceiling);

  // ceiling strips
  const strip1 = new THREE.Mesh(new THREE.PlaneGeometry(2.25, 0.06), emissiveStripMat);
  strip1.rotation.x = Math.PI / 2;
  strip1.position.set(0, H - 0.01, -0.35);
  cabin.add(strip1);

  const strip2 = new THREE.Mesh(new THREE.PlaneGeometry(2.25, 0.06), emissiveStripMat);
  strip2.rotation.x = Math.PI / 2;
  strip2.position.set(0, H - 0.01, 0.55);
  cabin.add(strip2);

  // back wall (wood)
  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(W, H), woodMat);
  backWall.position.set(0, H / 2, -halfD);
  cabin.add(backWall);

  // side walls (charcoal)
  const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(D, H), charcoalMat);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-halfW, H / 2, 0);
  cabin.add(leftWall);

  const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(D, H), charcoalMat);
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(halfW, H / 2, 0);
  cabin.add(rightWall);

  // corner trims (brass)
  const cornerTrimGeom = new THREE.BoxGeometry(0.03, H, 0.03);
  const trim1 = new THREE.Mesh(cornerTrimGeom, brassMat);
  trim1.position.set(-halfW + 0.015, H / 2, -halfD + 0.015);
  cabin.add(trim1);

  const trim2 = new THREE.Mesh(cornerTrimGeom, brassMat);
  trim2.position.set(halfW - 0.015, H / 2, -halfD + 0.015);
  cabin.add(trim2);

  /* ---------------- front wall: door frame + panel on SAME FRONT WALL ---------------- */

  const frameDepth = 0.09;

  // top frame
  const frameTop = new THREE.Mesh(new THREE.BoxGeometry(W, H - openingH, frameDepth), brassMat);
  frameTop.position.set(0, openingH + (H - openingH) / 2, frontZ - 0.03);
  cabin.add(frameTop);

  // left frame
  const frameLeft = new THREE.Mesh(new THREE.BoxGeometry(sideFrameW, openingH, frameDepth), brassMat);
  frameLeft.position.set(-(openingW / 2 + sideFrameW / 2), openingH / 2, frontZ - 0.03);
  cabin.add(frameLeft);

  // right frame (this will hold the panel area; still brass outer trim)
  const frameRight = new THREE.Mesh(new THREE.BoxGeometry(sideFrameW, openingH, frameDepth), brassMat);
  frameRight.position.set(openingW / 2 + sideFrameW / 2, openingH / 2, frontZ - 0.03);
  cabin.add(frameRight);

  // bottom threshold
  const frameBottom = new THREE.Mesh(new THREE.BoxGeometry(openingW, 0.08, frameDepth), brassMat);
  frameBottom.position.set(0, 0.04, frontZ - 0.03);
  cabin.add(frameBottom);

  /* ---------------- doors (thick 3D sliding steel) ---------------- */

  const doorGroup = new THREE.Group();
  doorGroup.position.set(0, 0, frontZ - 0.05);
  cabin.add(doorGroup);

  const doorPanelW = openingW / 2;
  const doorPanelH = openingH;

  const doorGeom = new THREE.BoxGeometry(doorPanelW, doorPanelH, 0.12);

  const doorLeft = new THREE.Mesh(doorGeom, steelMat);
  doorLeft.position.set(-doorPanelW / 2, doorPanelH / 2, 0);
  doorGroup.add(doorLeft);

  const doorRight = new THREE.Mesh(doorGeom, steelMat);
  doorRight.position.set(doorPanelW / 2, doorPanelH / 2, 0);
  doorGroup.add(doorRight);

  // seam + handles (brass)
  const seam = new THREE.Mesh(new THREE.BoxGeometry(0.02, doorPanelH * 0.92, 0.03), brassMat);
  seam.position.set(0, doorPanelH / 2, 0.08);
  doorGroup.add(seam);

  const handleGeom = new THREE.BoxGeometry(0.08, 0.65, 0.03);
  const handleL = new THREE.Mesh(handleGeom, brassMat);
  handleL.position.set(-0.28, 1.22, 0.08);
  doorGroup.add(handleL);

  const handleR = new THREE.Mesh(handleGeom, brassMat);
  handleR.position.set(0.28, 1.22, 0.08);
  doorGroup.add(handleR);

  /* ---------------- door reveal hallway (fade plane + light) ---------------- */

  const hallway = new THREE.Group();
  hallway.visible = false;
  cabin.add(hallway);

  const hallPlaneMat = new THREE.MeshBasicMaterial({ color: 0x0b2036, transparent: true, opacity: 0.0, side: THREE.DoubleSide });
  const hallPlane = new THREE.Mesh(new THREE.PlaneGeometry(openingW + 0.95, openingH + 0.25), hallPlaneMat);
  hallPlane.position.set(0, openingH / 2, frontZ + 0.55);
  hallway.add(hallPlane);

  const hallLight = new THREE.PointLight(0xaad7ff, 0.0, 8.0, 2.0);
  hallLight.position.set(0.0, 1.8, frontZ + 0.95);
  hallway.add(hallLight);

  async function setHallway(open) {
    if (open) {
      hallway.visible = true;
      await animate({
        duration: 260,
        onUpdate: (t) => {
          const k = easeInOutCubic(t);
          hallPlane.material.opacity = 0.62 * k;
          hallLight.intensity = 1.5 * k;
        }
      });
    } else {
      await animate({
        duration: 220,
        onUpdate: (t) => {
          const k = 1 - easeInOutCubic(t);
          hallPlane.material.opacity = 0.62 * k;
          hallLight.intensity = 1.5 * k;
        }
      });
      hallway.visible = false;
    }
  }

  /* ---------------- panel: on FRONT WALL, right of doors, with rounded-rect row labels ---------------- */

  // place panel centered within the right-frame area, flush to front wall
  const panelGroup = new THREE.Group();
  const panelX = openingW / 2 + sideFrameW / 2;
  panelGroup.position.set(panelX, 1.18, frontZ - 0.11);
  panelGroup.rotation.y = 0; // same plane as door wall
  cabin.add(panelGroup);

  const panelW = sideFrameW * 0.78;
  const panelH = 2.05;
  const panelT = 0.10;

  const panelBody = new THREE.Mesh(new THREE.BoxGeometry(panelW, panelH, panelT), panelBodyMat);
  panelGroup.add(panelBody);

  // brass bezel (thin frame)
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(panelW + 0.03, panelH + 0.03, 0.02), brassMat);
  bezel.position.z = panelT / 2 + 0.02;
  panelGroup.add(bezel);

  // indicator (3D plane on panel)
  const disposableTextures = [];
  let indicatorTex = makeIndicatorTexture({ floor: 1, dir: 0 });
  disposableTextures.push(indicatorTex);

  const indicatorMat = new THREE.MeshBasicMaterial({ map: indicatorTex, transparent: true });
  const indicatorMesh = new THREE.Mesh(new THREE.PlaneGeometry(panelW * 0.78, 0.22), indicatorMat);
  indicatorMesh.position.set(0, panelH / 2 - 0.22, panelT / 2 + 0.035);
  panelGroup.add(indicatorMesh);

  function updateIndicator(floor, dir) {
    const next = makeIndicatorTexture({ floor, dir });
    disposableTextures.push(next);
    indicatorMesh.material.map = next;
    indicatorMesh.material.needsUpdate = true;
  }

  // row tiles (rounded rectangle labels) + hit targets
  const rowTiles = new Map(); // floor -> tile mesh
  const clickTargets = [];

  const rowTileGeom = new THREE.PlaneGeometry(panelW * 0.86, 0.14);
  const hitGeom = new THREE.PlaneGeometry(panelW * 0.92, 0.16);

  const buttonGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.028, 20);
  const buttonMat = new THREE.MeshStandardMaterial({ color: 0x3a4562, roughness: 0.5, metalness: 0.25 });
  const buttonActiveMat = new THREE.MeshStandardMaterial({
    color: 0x7c5cff, roughness: 0.45, metalness: 0.2,
    emissive: new THREE.Color(0x7c5cff), emissiveIntensity: 0.35
  });

  const topY = panelH / 2 - 0.55;
  const gapY = 0.22;

  FLOORS.forEach((f, i) => {
    const y = topY - i * gapY;

    const tex = makeRowTileTexture({ floor: f.floor, label: f.label, active: f.floor === 1 });
    disposableTextures.push(tex);

    const tileMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
    const tile = new THREE.Mesh(rowTileGeom, tileMat);
    tile.position.set(0, y, panelT / 2 + 0.035);
    panelGroup.add(tile);
    rowTiles.set(f.floor, tile);

    // push button to the right edge of each row (optional realism)
    const btn = new THREE.Mesh(buttonGeom, buttonMat.clone());
    btn.rotation.x = Math.PI / 2;
    btn.position.set(panelW * 0.39, y, panelT / 2 + 0.055);
    panelGroup.add(btn);

    // large invisible hit target for the whole row
    const hit = new THREE.Mesh(hitGeom, new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
    hit.position.set(0, y, panelT / 2 + 0.065);
    hit.userData = { floor: f.floor, key: f.key, btn };
    panelGroup.add(hit);
    clickTargets.push(hit);
  });

  function setRowActive(activeFloor) {
    FLOORS.forEach((f) => {
      const tile = rowTiles.get(f.floor);
      if (!tile) return;
      const next = makeRowTileTexture({ floor: f.floor, label: f.label, active: f.floor === activeFloor });
      disposableTextures.push(next);
      tile.material.map = next;
      tile.material.needsUpdate = true;
    });
  }

  /* ---------------- interaction + animation state ---------------- */

  let currentFloor = 1;
  let busy = false;
  let doorsOpen = false;

  async function animateDoors(open) {
    const leftStart = doorLeft.position.x;
    const rightStart = doorRight.position.x;

    const leftTarget = open ? -doorPanelW : -doorPanelW / 2;
    const rightTarget = open ? doorPanelW : doorPanelW / 2;

    await animate({
      duration: 520,
      onUpdate: (t) => {
        const k = easeInOutCubic(t);
        doorLeft.position.x = THREE.MathUtils.lerp(leftStart, leftTarget, k);
        doorRight.position.x = THREE.MathUtils.lerp(rightStart, rightTarget, k);
      }
    });

    doorsOpen = open;
    await setHallway(open);
  }

  async function simulateTravel(targetFloor) {
    const delta = Math.abs(targetFloor - currentFloor);
    const duration = 850 + delta * 420;

    let displayed = currentFloor;
    const dir = targetFloor > currentFloor ? 1 : targetFloor < currentFloor ? -1 : 0;

    updateIndicator(displayed, dir);

    const stepTime = Math.max(180, Math.floor(duration / Math.max(1, delta || 1)));
    const timer = setInterval(() => {
      if (displayed === targetFloor) return;
      displayed += dir;
      updateIndicator(displayed, dir);
    }, stepTime);

    const basePos = camera.position.clone();
    const baseKey = key.intensity;
    const baseFill = fill.intensity;

    await animate({
      duration,
      onUpdate: (t) => {
        const mid = Math.sin(Math.PI * t);
        const shake = 0.006 + 0.016 * mid;

        camera.position.x = basePos.x + Math.sin(t * 42) * shake;
        camera.position.y = basePos.y + Math.sin(t * 57) * shake * 0.6;
        camera.position.z = basePos.z + Math.sin(t * 38) * shake;

        // subtle luxury “flicker”
        key.intensity = baseKey + 0.06 * Math.sin(t * 21);
        fill.intensity = baseFill + 0.05 * Math.sin(t * 23);
      }
    });

    clearInterval(timer);
    camera.position.copy(basePos);
    key.intensity = baseKey;
    fill.intensity = baseFill;

    currentFloor = targetFloor;
    updateIndicator(currentFloor, 0);
    setRowActive(currentFloor);
  }

  function openSection(keyName) {
    if (keyName === "about") return openDrawer({ title: "About", desc: "Personal information", html: aboutHtml() });
    if (keyName === "projects") return openDrawer({ title: "Projects", desc: "Featured projects", html: projectsHtml() });
    if (keyName === "skills") return openDrawer({ title: "Skills", desc: "Tech stack", html: skillsHtml() });
    if (keyName === "demos") return openDrawer({ title: "Demos", desc: "Proof of work / placeholders", html: demosHtml() });
    if (keyName === "contact") return openDrawer({ title: "Contact", desc: "Reach me", html: contactHtml() });

    return openDrawer({ title: "Section", desc: "Not wired yet", html: `<p class="mini">Unknown key: ${keyName}</p>` });
  }

  async function handleSelectFloor(hitObj) {
    if (busy) return;
    busy = true;

    closeDrawer();

    const { floor, key: keyName, btn } = hitObj.userData;
    const originalBtnMat = btn.material;
    btn.material = buttonActiveMat;

    try {
      if (doorsOpen) await animateDoors(false);

      if (floor !== currentFloor) {
        await simulateTravel(floor);
      } else {
        updateIndicator(currentFloor, 0);
        setRowActive(currentFloor);
      }

      await animateDoors(true);
      openSection(keyName);
    } finally {
      setTimeout(() => { btn.material = originalBtnMat; }, 700);
      busy = false;
    }
  }

  /* ---------------- raycasting ---------------- */

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function pointerToNDC(ev) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((ev.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function onPointerMove(ev) {
    if (busy) {
      renderer.domElement.style.cursor = "default";
      return;
    }
    pointerToNDC(ev);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickTargets, false);
    renderer.domElement.style.cursor = hits.length ? "pointer" : "default";
  }

  function onPointerDown(ev) {
    if (busy) return;
    pointerToNDC(ev);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickTargets, false);
    if (!hits.length) return;
    handleSelectFloor(hits[0].object);
  }

  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerdown", onPointerDown);

  async function closeDrawerAndDoors() {
    if (busy) return;
    closeDrawer();
    if (doorsOpen) await animateDoors(false);
  }

  stage.querySelector("#infoClose").addEventListener("click", closeDrawerAndDoors);
  stage.querySelector("#closeBtn").addEventListener("click", closeDrawerAndDoors);

  stage.querySelector("#resetBtn").addEventListener("click", async () => {
    if (busy) return;
    busy = true;
    try {
      closeDrawer();
      if (doorsOpen) await animateDoors(false);

      currentFloor = 1;
      updateIndicator(1, 0);
      setRowActive(1);

      camera.position.set(-0.35, 1.48, -halfD + 0.55);
      controls.target.copy(target);
      controls.update();
    } finally {
      busy = false;
    }
  });

  /* ---------------- resize + loop ---------------- */

  const onResize = () => {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener("resize", onResize);

  // initial state
  updateIndicator(1, 0);
  setRowActive(1);

  let disposed = false;
  let raf = 0;

  const tick = () => {
    if (disposed) return;
    raf = requestAnimationFrame(tick);
    controls.update();
    renderer.render(scene, camera);
  };
  tick();

  /* ---------------- cleanup ---------------- */

  return () => {
    disposed = true;
    cancelAnimationFrame(raf);

    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("resize", onResize);

    controls.dispose();

    disposableTextures.forEach((t) => t?.dispose?.());

    scene.traverse((obj) => {
      if (!obj.isMesh) return;
      obj.geometry?.dispose?.();
      const m = obj.material;
      if (Array.isArray(m)) m.forEach((mm) => mm.dispose?.());
      else m?.dispose?.();
      if (m?.map?.dispose) m.map.dispose();
    });

    renderer.dispose();
    container.innerHTML = "";
  };
}
