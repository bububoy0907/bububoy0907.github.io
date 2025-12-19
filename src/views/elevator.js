import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { PROFILE, SKILLS, PROJECTS, ELEVATOR_FLOORS } from "../content.js";

/* ------------------ small utilities ------------------ */

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

/* ------------------ portfolio HTML (same as traditional) ------------------ */

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
    <p><strong>3D/Simulation</strong>: ${SKILLS.simulation.join(", ")}</p>
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

/* ------------------ canvas texture helpers (luxury UI) ------------------ */

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

function makeLabelTileTexture({ floor, label, active = false }) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");

  // Background “panel glass”
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Outer rounded tile
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  if (active) {
    grad.addColorStop(0, "rgba(124,92,255,0.40)");
    grad.addColorStop(1, "rgba(0,212,255,0.18)");
  } else {
    grad.addColorStop(0, "rgba(20,22,30,0.85)");
    grad.addColorStop(1, "rgba(10,12,16,0.85)");
  }

  roundRect(ctx, 10, 14, 492, 100, 26);
  ctx.fillStyle = grad;
  ctx.fill();

  // Subtle border (gold-ish for luxury)
  ctx.lineWidth = 3;
  ctx.strokeStyle = active ? "rgba(255,255,255,0.28)" : "rgba(176,141,87,0.35)";
  ctx.stroke();

  // Inner highlight
  roundRect(ctx, 18, 22, 476, 84, 22);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.stroke();

  // Text
  const f = String(floor).padStart(2, "0");
  const title = (label || "").toUpperCase();

  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = "bold 38px ui-monospace, Menlo, Consolas, monospace";
  ctx.textBaseline = "middle";
  ctx.fillText(f, 36, 64);

  ctx.fillStyle = "rgba(255,255,255,0.86)";
  ctx.font = "bold 28px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial";
  ctx.fillText(title, 120, 64);

  // Small “LED” dot
  ctx.beginPath();
  ctx.arc(468, 64, 8, 0, Math.PI * 2);
  ctx.fillStyle = active ? "rgba(0,212,255,0.9)" : "rgba(255,255,255,0.18)";
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

  // Background
  roundRect(ctx, 10, 12, 236, 104, 18);
  ctx.fillStyle = "rgba(0,0,0,0.85)";
  ctx.fill();

  // Border
  ctx.lineWidth = 3;
  ctx.strokeStyle = "rgba(176,141,87,0.45)";
  ctx.stroke();

  // Text
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = "bold 46px ui-monospace, Menlo, Consolas, monospace";
  ctx.textBaseline = "middle";
  ctx.fillText(String(floor).padStart(2, "0"), 24, 64);

  // Direction arrow
  ctx.fillStyle = "rgba(255,255,255,0.80)";
  ctx.font = "bold 44px ui-monospace, Menlo, Consolas, monospace";
  const arrow = dir === 1 ? "▲" : dir === -1 ? "▼" : " ";
  ctx.fillText(arrow, 178, 64);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

/* ------------------ main mount ------------------ */

export function mountElevator(container) {
  const wrap = document.createElement("div");
  wrap.className = "container";

  const header = document.createElement("section");
  header.className = "card hero";
  header.innerHTML = `
    <h1 class="h1">Interactive Elevator</h1>
    <p class="sub">
      Click a floor row on the hotel-style panel (next to the doors). The elevator simulates travel, opens the doors, and shows the section inside an in-view display panel.
    </p>
  `;
  wrap.appendChild(header);

  const stage = document.createElement("section");
  stage.className = "roomWrap";
  stage.innerHTML = `
    <div class="hint">
      <strong>How to interact</strong>
      <ul>
        <li>Click a floor row on the panel near the doors</li>
        <li>Doors open and the content appears below</li>
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

  // Drawer logic (in-view, not a popup)
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

  stage.querySelector("#infoClose").addEventListener("click", closeDrawer);
  stage.querySelector("#closeBtn").addEventListener("click", closeDrawer);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(stage.clientWidth, stage.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.appendChild(renderer.domElement);

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07090d);

  // Camera: inside elevator, facing doors with panel in view
  const camera = new THREE.PerspectiveCamera(
    52,
    stage.clientWidth / stage.clientHeight,
    0.1,
    100
  );
  // Slightly left-of-center so right-side panel is visible without rotating
  camera.position.set(-0.22, 1.45, -1.18);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Look toward door center; panel is on right near doors
 // controls.target.set(0, 1.25, 1.05);
  // Your camera is BEHIND the target (facing the doors), so theta is near -Math.PI.
  // Clamp around -PI to prevent OrbitControls from snapping outside.
  //const AZ = 0.65;
 // controls.minAzimuthAngle = -Math.PI - AZ;
  //controls.maxAzimuthAngle = -Math.PI + AZ;

  // Keep pitch reasonable (avoid looking at ceiling/floor too much)
  //controls.minPolarAngle = 1.12;
  //controls.maxPolarAngle = 1.46;

  // Keep zoom inside the cabin
  //controls.minDistance = 1.45;
  //controls.maxDistance = 2.35;
  
  //camera.position.set(-0.22, 1.45, -1.18);
  //controls.update();
  //controls.saveState?.();

  // Luxury lighting: warm downlights + subtle accent
  const amb = new THREE.AmbientLight(0xfff0d8, 0.28);
  scene.add(amb);

  const key = new THREE.SpotLight(0xffe3c2, 1.3, 12, Math.PI / 4, 0.45, 1.2);
  key.position.set(0.2, 2.55, -0.2);
  key.target.position.set(0, 1.0, 0.8);
  scene.add(key);
  scene.add(key.target);

  const fill = new THREE.SpotLight(0xffe8cf, 0.85, 10, Math.PI / 4, 0.6, 1.4);
  fill.position.set(-0.9, 2.45, -0.6);
  fill.target.position.set(0, 1.0, 1.0);
  scene.add(fill);
  scene.add(fill.target);

  const accent = new THREE.PointLight(0xffd39a, 0.55, 8, 2.0);
  accent.position.set(0.8, 2.1, 0.9);
  scene.add(accent);

  // Materials (luxury look)
  const woodMat = new THREE.MeshStandardMaterial({
    color: 0x2a1f16,        // walnut-ish
    roughness: 0.65,
    metalness: 0.05
  });

  const darkWallMat = new THREE.MeshStandardMaterial({
    color: 0x111522,
    roughness: 0.9,
    metalness: 0.05
  });

  const brassMat = new THREE.MeshStandardMaterial({
    color: 0xb08d57,
    roughness: 0.28,
    metalness: 1.0
  });

  const steelDoorMat = new THREE.MeshStandardMaterial({
    color: 0xb4bcc8, // brushed steel-ish
    roughness: 0.35,
    metalness: 1.0
  });

  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0f1014, // dark carpet
    roughness: 1.0,
    metalness: 0.0
  });

  const panelBodyMat = new THREE.MeshStandardMaterial({
    color: 0x1a1f2b,
    roughness: 0.55,
    metalness: 0.25
  });

  const emissiveStripMat = new THREE.MeshStandardMaterial({
    color: 0x10131a,
    roughness: 0.2,
    metalness: 0.0,
    emissive: new THREE.Color(0xffd6a3),
    emissiveIntensity: 0.55
  });

  // Cabin dimensions
  const W = 3.0;
  const D = 3.0;
  const H = 2.6;
  const halfW = W / 2;
  const halfD = D / 2;

  const cabin = new THREE.Group();
  scene.add(cabin);

  // Floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), floorMat);
  floor.rotation.x = -Math.PI / 2;
  cabin.add(floor);

  // Ceiling
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(W, D), darkWallMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = H;
  cabin.add(ceiling);

  // Ceiling light strips (luxury accent)
  const strip1 = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.06), emissiveStripMat);
  strip1.rotation.x = Math.PI / 2;
  strip1.position.set(0, H - 0.01, -0.4);
  cabin.add(strip1);

  const strip2 = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 0.06), emissiveStripMat);
  strip2.rotation.x = Math.PI / 2;
  strip2.position.set(0, H - 0.01, 0.6);
  cabin.add(strip2);

  // Back wall (wood)
  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(W, H), woodMat);
  backWall.position.set(0, H / 2, -halfD);
  cabin.add(backWall);

  // Side walls (dark + trim)
  const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(D, H), darkWallMat);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-halfW, H / 2, 0);
  cabin.add(leftWall);

  const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(D, H), darkWallMat);
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(halfW, H / 2, 0);
  cabin.add(rightWall);

  // Corner trims (brass)
  const cornerTrimGeom = new THREE.BoxGeometry(0.03, H, 0.03);
  const trimL = new THREE.Mesh(cornerTrimGeom, brassMat);
  trimL.position.set(-halfW + 0.015, H / 2, -halfD + 0.015);
  cabin.add(trimL);

  const trimR = new THREE.Mesh(cornerTrimGeom, brassMat);
  trimR.position.set(halfW - 0.015, H / 2, -halfD + 0.015);
  cabin.add(trimR);

  /* ------------------ front wall frame + doors ------------------ */

  const frontZ = halfD;

  const openingW = 1.75;
  const openingH = 2.25;
  const frameDepth = 0.08;

  const sideFrameW = (W - openingW) / 2;

  // Frame top
  const frameTop = new THREE.Mesh(
    new THREE.BoxGeometry(W, H - openingH, frameDepth),
    brassMat
  );
  frameTop.position.set(0, openingH + (H - openingH) / 2, frontZ - 0.02);
  cabin.add(frameTop);

  // Frame sides
  const frameLeft = new THREE.Mesh(
    new THREE.BoxGeometry(sideFrameW, openingH, frameDepth),
    brassMat
  );
  frameLeft.position.set(-(openingW / 2 + sideFrameW / 2), openingH / 2, frontZ - 0.02);
  cabin.add(frameLeft);

  const frameRight = new THREE.Mesh(
    new THREE.BoxGeometry(sideFrameW, openingH, frameDepth),
    brassMat
  );
  frameRight.position.set(openingW / 2 + sideFrameW / 2, openingH / 2, frontZ - 0.02);
  cabin.add(frameRight);

  // Bottom threshold
  const frameBottom = new THREE.Mesh(
    new THREE.BoxGeometry(openingW, 0.08, frameDepth),
    brassMat
  );
  frameBottom.position.set(0, 0.04, frontZ - 0.02);
  cabin.add(frameBottom);

  // Door group
  const doorGroup = new THREE.Group();
  doorGroup.position.set(0, 0, frontZ - 0.03);
  cabin.add(doorGroup);

  const doorPanelW = openingW / 2;
  const doorPanelH = openingH;

  const doorGeom = new THREE.BoxGeometry(doorPanelW, doorPanelH, 0.11);

  const doorLeft = new THREE.Mesh(doorGeom, steelDoorMat);
  doorLeft.name = "DoorLeft";
  doorLeft.position.set(-doorPanelW / 2, doorPanelH / 2, 0);
  doorGroup.add(doorLeft);

  const doorRight = new THREE.Mesh(doorGeom, steelDoorMat);
  doorRight.name = "DoorRight";
  doorRight.position.set(doorPanelW / 2, doorPanelH / 2, 0);
  doorGroup.add(doorRight);

  // Door seam
  const seam = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, doorPanelH * 0.92, 0.03),
    brassMat
  );
  seam.position.set(0, doorPanelH / 2, 0.07);
  doorGroup.add(seam);

  // Door handles (brass)
  const handleGeom = new THREE.BoxGeometry(0.08, 0.65, 0.03);
  const handleL = new THREE.Mesh(handleGeom, brassMat);
  handleL.position.set(-0.28, 1.22, 0.07);
  doorGroup.add(handleL);

  const handleR = new THREE.Mesh(handleGeom, brassMat);
  handleR.position.set(0.28, 1.22, 0.07);
  doorGroup.add(handleR);

  /* ------------------ door reveal (hallway) ------------------ */

  const hallway = new THREE.Group();
  hallway.visible = false;
  cabin.add(hallway);

  const hallPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(openingW + 0.9, openingH + 0.25),
    new THREE.MeshBasicMaterial({ color: 0x0b2036, transparent: true, opacity: 0 })
  );
  hallPlane.position.set(0, openingH / 2, frontZ + 0.45);
  hallway.add(hallPlane);

  const hallLight = new THREE.PointLight(0xaad7ff, 0, 7.5, 2.0);
  hallLight.position.set(0.0, 1.8, frontZ + 0.85);
  hallway.add(hallLight);

  async function setHallway(open) {
    if (open) {
      hallway.visible = true;
      await animate({
        duration: 280,
        onUpdate: (t) => {
          const k = easeInOutCubic(t);
          hallPlane.material.opacity = 0.62 * k;
          hallLight.intensity = 1.4 * k;
        }
      });
    } else {
      await animate({
        duration: 220,
        onUpdate: (t) => {
          const k = 1 - easeInOutCubic(t);
          hallPlane.material.opacity = 0.62 * k;
          hallLight.intensity = 1.4 * k;
        }
      });
      hallway.visible = false;
    }
  }

  /* ------------------ LUXURY PANEL: same side as door (right wall, near doors) ------------------ */

  // This is “real elevator” placement:
  // - Mounted to RIGHT WALL
  // - Close to the DOOR (front area)
  // - Slight inward angle for visibility
  const panelGroup = new THREE.Group();

  // position near front-right corner, slightly before door line
  panelGroup.position.set(halfW - 0.02, 1.30, frontZ - 0.72);

  // rotate so its face points into the cabin (toward -X) and slightly toward the camera
  panelGroup.rotation.y = -Math.PI / 2 + 0.12;

  cabin.add(panelGroup);

  // Panel body (bigger, hotel-like)
  const panelW = 0.75;
  const panelH = 1.85;
  const panelT = 0.09;

  const panelBody = new THREE.Mesh(
    new THREE.BoxGeometry(panelW, panelH, panelT),
    panelBodyMat
  );
  panelGroup.add(panelBody);

  // Panel brass bezel (frame)
  const bezel = new THREE.Mesh(
    new THREE.BoxGeometry(panelW + 0.02, panelH + 0.02, 0.02),
    brassMat
  );
  bezel.position.z = panelT / 2 + 0.02;
  panelGroup.add(bezel);

  // Indicator mesh (3D, no DOM overlay)
  const indicatorTex = makeIndicatorTexture({ floor: 1, dir: 0 });
  const disposableTextures = [indicatorTex];

  const indicatorMat = new THREE.MeshBasicMaterial({ map: indicatorTex });
  const indicatorMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.46, 0.23),
    indicatorMat
  );
  indicatorMesh.position.set(0, panelH / 2 - 0.22, panelT / 2 + 0.035);
  panelGroup.add(indicatorMesh);

  function updateIndicator({ floor, dir }) {
    const old = indicatorTex;
    const next = makeIndicatorTexture({ floor, dir });
    disposableTextures.push(next);
    indicatorMesh.material.map = next;
    indicatorMesh.material.needsUpdate = true;
    // note: old disposed in cleanup
  }

  // Floor rows: rounded rectangle tile with text + push button
  const clickTargets = [];
  const tileMeshes = new Map(); // floor -> tile mesh (for active highlight)

  const buttonGeom = new THREE.CylinderGeometry(0.055, 0.055, 0.03, 20);

  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x3a4562,
    roughness: 0.5,
    metalness: 0.25
  });

  const buttonActiveMat = new THREE.MeshStandardMaterial({
    color: 0x7c5cff,
    roughness: 0.45,
    metalness: 0.2,
    emissive: new THREE.Color(0x7c5cff),
    emissiveIntensity: 0.35
  });

  // layout in panel local coords
  const rowsTopY = panelH / 2 - 0.55; // below indicator
  const rowGap = 0.22;

  ELEVATOR_FLOORS.forEach((f, i) => {
    const y = rowsTopY - i * rowGap;

    // Tile texture
    const tex = makeLabelTileTexture({ floor: f.floor, label: f.label, active: false });
    disposableTextures.push(tex);

    const tileMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
    const tile = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.14), tileMat);
    tile.position.set(-0.02, y, panelT / 2 + 0.035);
    panelGroup.add(tile);
    tileMeshes.set(f.floor, tile);

    // 3D push button (to the right of the tile)
    const btn = new THREE.Mesh(buttonGeom, buttonMat.clone());
    btn.rotation.x = Math.PI / 2;
    btn.position.set(0.29, y, panelT / 2 + 0.06);
    panelGroup.add(btn);

    // Large hit area (clicking the row feels easy)
    const hit = new THREE.Mesh(
      new THREE.PlaneGeometry(0.70, 0.16),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
    );
    hit.position.set(0.02, y, panelT / 2 + 0.07);
    hit.userData = { floor: f.floor, key: f.key, btnMesh: btn };
    panelGroup.add(hit);

    clickTargets.push(hit);
  });

  function setTileActive(floor, active) {
    const tile = tileMeshes.get(floor);
    if (!tile) return;
    const f = ELEVATOR_FLOORS.find(x => x.floor === floor);
    if (!f) return;

    const next = makeLabelTileTexture({ floor: f.floor, label: f.label, active });
    disposableTextures.push(next);
    tile.material.map = next;
    tile.material.needsUpdate = true;
  }

  /* ------------------ state + animations ------------------ */

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

  function openSection(key) {
    if (key === "about") {
      openDrawer({ title: "About", desc: "Personal information", html: aboutHtml() });
      return;
    }
    if (key === "projects") {
      openDrawer({ title: "Projects", desc: "Featured projects", html: projectsHtml() });
      return;
    }
    if (key === "skills") {
      openDrawer({ title: "Skills", desc: "Tech stack", html: skillsHtml() });
      return;
    }
    if (key === "demos") {
      openDrawer({ title: "Demos", desc: "Proof of work / placeholders", html: demosHtml() });
      return;
    }
    if (key === "contact") {
      openDrawer({ title: "Contact", desc: "Reach me", html: contactHtml() });
      return;
    }
    openDrawer({ title: "Section", desc: "Not wired yet", html: `<p class="mini">Unknown key: ${key}</p>` });
  }

  async function simulateTravel(targetFloor) {
    const delta = Math.abs(targetFloor - currentFloor);
    const duration = 850 + delta * 420;

    let displayed = currentFloor;
    const direction = targetFloor > currentFloor ? 1 : targetFloor < currentFloor ? -1 : 0;

    updateIndicator({ floor: displayed, dir: direction });

    // Step-count floors
    const stepTime = Math.max(180, Math.floor(duration / Math.max(1, delta || 1)));
    const timer = setInterval(() => {
      if (displayed === targetFloor) return;
      displayed += direction;
      updateIndicator({ floor: displayed, dir: direction });
    }, stepTime);

    const basePos = camera.position.clone();
    const baseKey = key.intensity;
    const baseFill = fill.intensity;

    await animate({
      duration,
      onUpdate: (t) => {
        // movement illusion: subtle rumble, warm light flicker
        const mid = Math.sin(Math.PI * t);
        const shake = 0.006 + 0.016 * mid;

        camera.position.x = basePos.x + Math.sin(t * 42) * shake;
        camera.position.y = basePos.y + Math.sin(t * 57) * shake * 0.6;
        camera.position.z = basePos.z + Math.sin(t * 38) * shake;

        key.intensity = baseKey + 0.08 * Math.sin(t * 22);
        fill.intensity = baseFill + 0.06 * Math.sin(t * 25);
      }
    });

    clearInterval(timer);

    camera.position.copy(basePos);
    key.intensity = baseKey;
    fill.intensity = baseFill;

    currentFloor = targetFloor;
    updateIndicator({ floor: currentFloor, dir: 0 });
  }

  async function handleFloorSelect(targetFloor, keyName, hit) {
    if (busy) return;
    busy = true;

    // Close content drawer when selecting another floor
    closeDrawer();

    // Highlight selected row + button
    const btnMesh = hit.userData.btnMesh;
    const originalBtnMat = btnMesh.material;
    btnMesh.material = buttonActiveMat;

    // Tile highlight
    ELEVATOR_FLOORS.forEach((f) => setTileActive(f.floor, f.floor === targetFloor));

    try {
      if (doorsOpen) await animateDoors(false);

      if (targetFloor !== currentFloor) {
        await simulateTravel(targetFloor);
      } else {
        updateIndicator({ floor: currentFloor, dir: 0 });
      }

      await animateDoors(true);
      openSection(keyName);
    } finally {
      // Keep tile highlight on current floor, but return button material after animation
      setTimeout(() => { btnMesh.material = originalBtnMat; }, 700);
      busy = false;
    }
  }

  /* ------------------ raycasting for row clicks ------------------ */

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

    const hit = hits[0].object;
    const { floor, key } = hit.userData;
    handleFloorSelect(floor, key, hit);
  }

  renderer.domElement.addEventListener("pointermove", onPointerMove);
  renderer.domElement.addEventListener("pointerdown", onPointerDown);

  // When user closes drawer, doors close (clean experience)
  async function closeDrawerAndDoors() {
    if (busy) return;
    closeDrawer();
    if (doorsOpen) await animateDoors(false);
  }
  stage.querySelector("#infoClose").addEventListener("click", closeDrawerAndDoors);
  stage.querySelector("#closeBtn").addEventListener("click", closeDrawerAndDoors);

  // Reset
  stage.querySelector("#resetBtn").addEventListener("click", async () => {
    if (busy) return;
    busy = true;
    try {
      closeDrawer();
      if (doorsOpen) await animateDoors(false);

      currentFloor = 1;
      updateIndicator({ floor: 1, dir: 0 });

      ELEVATOR_FLOORS.forEach((f) => setTileActive(f.floor, f.floor === 1));

      camera.position.set(-0.22, 1.45, -1.18);
      controls.target.set(0, 1.25, 1.05);
      controls.update();
    } finally {
      busy = false;
    }
  });

  // Resize
  const onResize = () => {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener("resize", onResize);

  // Initial state
  updateIndicator({ floor: 1, dir: 0 });
  ELEVATOR_FLOORS.forEach((f) => setTileActive(f.floor, f.floor === 1));

  // Render loop
  let raf = 0;
  let disposed = false;

  const tick = () => {
    if (disposed) return;
    raf = requestAnimationFrame(tick);
    controls.update();
    renderer.render(scene, camera);
  };
  tick();

  // Cleanup
  return () => {
    disposed = true;
    cancelAnimationFrame(raf);

    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("resize", onResize);

    controls.dispose();

    // Dispose textures created at runtime
    disposableTextures.forEach((t) => t?.dispose?.());

    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.geometry?.dispose?.();
        const m = obj.material;
        if (Array.isArray(m)) m.forEach((mm) => mm.dispose?.());
        else m?.dispose?.();
      }
    });

    renderer.dispose();
    container.innerHTML = "";
  };
}
