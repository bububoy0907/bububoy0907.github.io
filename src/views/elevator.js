import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { PROFILE, SKILLS, PROJECTS, ELEVATOR_FLOORS } from "../content.js";

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

/* ---------- Content renderers (reuse your verified facts only) ---------- */

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

/* ---------- Helper: create 3D text label as a small plate ---------- */

function makeLabelPlate(text, { width = 256, height = 64 } = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "rgba(15,18,26,0.95)";
  ctx.fillRect(0, 0, width, height);

  // Border
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, width - 2, height - 2);

  // Text
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.font = "bold 30px ui-monospace, Menlo, Consolas, monospace";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 14, height / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;

  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
  const geom = new THREE.PlaneGeometry(0.32, 0.08);
  const mesh = new THREE.Mesh(geom, mat);
  mesh.renderOrder = 2;
  return mesh;
}

/* ---------- Main view ---------- */

export function mountElevator(container) {
  const wrap = document.createElement("div");
  wrap.className = "container";

  const header = document.createElement("section");
  header.className = "card hero";
  header.innerHTML = `
    <h1 class="h1">Interactive Elevator</h1>
    <p class="sub">
      Click a floor button (hotel-style panel) to open a section. The elevator simulates travel, opens the doors, and shows the content inside the scene.
    </p>
  `;
  wrap.appendChild(header);

  const stage = document.createElement("section");
  stage.className = "roomWrap";
  stage.innerHTML = `
    <div class="hint">
      <strong>How to interact</strong>
      <ul>
        <li>Click a floor button on the panel next to the doors</li>
        <li>Doors open and the section appears in the elevator display panel</li>
        <li>Use Reset if you want to return to Floor 1</li>
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

  // In-view info panel
  const drawer = stage.querySelector("#infoDrawer");
  const infoTitle = stage.querySelector("#infoTitle");
  const infoDesc = stage.querySelector("#infoDesc");
  const infoBody = stage.querySelector("#infoBody");

  function openDrawer({ title, desc, html }) {
    infoTitle.textContent = title || "";
    infoDesc.textContent = desc || "";
    infoBody.innerHTML = html || "";
    drawer.classList.add("open");
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    infoBody.innerHTML = "";
  }

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

  // Camera: inside elevator, facing doors
  const camera = new THREE.PerspectiveCamera(
    50,
    stage.clientWidth / stage.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 1.45, -1.05);

  // Controls: clamp so user stays inside / facing doors
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Target near the door center
  controls.target.set(0, 1.25, 1.05);

  // Clamp angles: keep view generally forward
  controls.minAzimuthAngle = -0.55;
  controls.maxAzimuthAngle = 0.55;
  controls.minPolarAngle = 1.10;
  controls.maxPolarAngle = 1.45;

  // Clamp zoom so you don’t go “outside”
  controls.minDistance = 1.4;
  controls.maxDistance = 2.6;

  // Lights
  scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 0.9));
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.95);
  dirLight.position.set(2, 4, -0.5);
  scene.add(dirLight);

  // Materials
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x171c29,
    roughness: 0.92,
    metalness: 0.08
  });

  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x232b3e,
    roughness: 0.7,
    metalness: 0.25
  });

  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0e121c,
    roughness: 1.0,
    metalness: 0.0
  });

  const doorMat = new THREE.MeshStandardMaterial({
    color: 0x0f1726,
    roughness: 0.55,
    metalness: 0.35
  });

  const panelMat = new THREE.MeshStandardMaterial({
    color: 0x242d42,
    roughness: 0.8,
    metalness: 0.2
  });

  // Cabin group
  const cabin = new THREE.Group();
  scene.add(cabin);

  const W = 3.0;   // width
  const D = 3.0;   // depth
  const H = 2.5;   // height
  const halfW = W / 2;
  const halfD = D / 2;

  // Floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), floorMat);
  floor.rotation.x = -Math.PI / 2;
  cabin.add(floor);

  // Ceiling
  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(W, D), wallMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = H;
  cabin.add(ceiling);

  // Back wall
  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(W, H), wallMat);
  backWall.position.set(0, H / 2, -halfD);
  cabin.add(backWall);

  // Side walls
  const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(D, H), wallMat);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-halfW, H / 2, 0);
  cabin.add(leftWall);

  const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(D, H), wallMat);
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(halfW, H / 2, 0);
  cabin.add(rightWall);

  /* ---------- Front wall: build a frame (NOT one big plane) ---------- */

  const frontZ = halfD;

  // Door opening size
  const openingW = 1.7;
  const openingH = 2.2;
  const frameThickness = 0.08;

  // Frame pieces (boxes)
  const frameTop = new THREE.Mesh(
    new THREE.BoxGeometry(W, H - openingH, frameThickness),
    trimMat
  );
  frameTop.position.set(0, openingH + (H - openingH) / 2, frontZ - 0.01);
  cabin.add(frameTop);

  const sideFrameW = (W - openingW) / 2;

  const frameLeft = new THREE.Mesh(
    new THREE.BoxGeometry(sideFrameW, openingH, frameThickness),
    trimMat
  );
  frameLeft.position.set(-(openingW / 2 + sideFrameW / 2), openingH / 2, frontZ - 0.01);
  cabin.add(frameLeft);

  const frameRight = new THREE.Mesh(
    new THREE.BoxGeometry(sideFrameW, openingH, frameThickness),
    trimMat
  );
  frameRight.position.set(openingW / 2 + sideFrameW / 2, openingH / 2, frontZ - 0.01);
  cabin.add(frameRight);

  // Threshold (bottom trim)
  const frameBottom = new THREE.Mesh(
    new THREE.BoxGeometry(openingW, 0.08, frameThickness),
    trimMat
  );
  frameBottom.position.set(0, 0.04, frontZ - 0.01);
  cabin.add(frameBottom);

  /* ---------- Doors: two sliding panels (3D) ---------- */

  const doorGroup = new THREE.Group();
  doorGroup.position.set(0, 0, frontZ - 0.02);
  cabin.add(doorGroup);

  const doorPanelW = openingW / 2;
  const doorPanelH = openingH;

  // Thicker panels for more “3D”
  const doorGeom = new THREE.BoxGeometry(doorPanelW, doorPanelH, 0.10);

  const doorLeft = new THREE.Mesh(doorGeom, doorMat);
  doorLeft.name = "DoorLeft";
  doorLeft.position.set(-doorPanelW / 2, doorPanelH / 2, 0);
  doorGroup.add(doorLeft);

  const doorRight = new THREE.Mesh(doorGeom, doorMat);
  doorRight.name = "DoorRight";
  doorRight.position.set(doorPanelW / 2, doorPanelH / 2, 0);
  doorGroup.add(doorRight);

  // Door seam trim (center strip)
  const seam = new THREE.Mesh(
    new THREE.BoxGeometry(0.02, doorPanelH * 0.92, 0.04),
    trimMat
  );
  seam.position.set(0, doorPanelH / 2, 0.06);
  doorGroup.add(seam);

  // Simple handle bars to add depth cues
  const handleGeom = new THREE.BoxGeometry(0.08, 0.55, 0.03);
  const handleMat = new THREE.MeshStandardMaterial({ color: 0x2b3550, roughness: 0.4, metalness: 0.4 });

  const handleL = new THREE.Mesh(handleGeom, handleMat);
  handleL.position.set(-0.28, 1.25, 0.06);
  doorGroup.add(handleL);

  const handleR = new THREE.Mesh(handleGeom, handleMat);
  handleR.position.set(0.28, 1.25, 0.06);
  doorGroup.add(handleR);

  /* ---------- Door reveal effect: hallway behind the doors ---------- */

  const hallway = new THREE.Group();
  hallway.visible = false;
  cabin.add(hallway);

  // Backdrop plane (soft glow)
  const hallPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(openingW + 0.8, openingH + 0.2),
    new THREE.MeshBasicMaterial({
      color: 0x0b1a2a,
      transparent: true,
      opacity: 0.0
    })
  );
  hallPlane.position.set(0, openingH / 2, frontZ + 0.35);
  hallway.add(hallPlane);

  // Subtle corridor “light”
  const hallLight = new THREE.PointLight(0x88bbff, 0.0, 6.0, 2.0);
  hallLight.position.set(0, 1.6, frontZ + 0.65);
  hallway.add(hallLight);

  async function setHallway(open) {
    if (open) {
      hallway.visible = true;
      await animate({
        duration: 300,
        onUpdate: (t) => {
          const k = easeInOutCubic(t);
          hallPlane.material.opacity = 0.55 * k;
          hallLight.intensity = 1.2 * k;
        }
      });
    } else {
      await animate({
        duration: 220,
        onUpdate: (t) => {
          const k = 1 - easeInOutCubic(t);
          hallPlane.material.opacity = 0.55 * k;
          hallLight.intensity = 1.2 * k;
        }
      });
      hallway.visible = false;
    }
  }

  /* ---------- Button panel: mounted on front wall next to doors ---------- */

  // Panel location: to the RIGHT of the doors on the same front wall
  const panelX = openingW / 2 + 0.40; // sits on the right frame area
  const panelY = 1.25;
  const panelZ = frontZ - 0.05;

  const panel = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 1.55, 0.06),
    panelMat
  );
  panel.position.set(panelX, panelY, panelZ);
  cabin.add(panel);

  // Indicator (small “screen” above buttons)
  const indicator = document.createElement("div");
  indicator.style.position = "absolute";
  indicator.style.left = "18px";
  indicator.style.top = "18px";
  indicator.style.padding = "8px 10px";
  indicator.style.borderRadius = "12px";
  indicator.style.background = "rgba(0,0,0,0.38)";
  indicator.style.border = "1px solid rgba(255,255,255,0.14)";
  indicator.style.backdropFilter = "blur(8px)";
  indicator.style.fontFamily = "var(--mono)";
  indicator.style.fontSize = "13px";
  indicator.style.color = "rgba(255,255,255,0.88)";
  indicator.textContent = "FLOOR: 1";
  stage.appendChild(indicator);

  function setIndicator(n) {
    indicator.textContent = `FLOOR: ${n}`;
  }

  // Buttons + labels
  const buttons = [];
  const buttonMat = new THREE.MeshStandardMaterial({
    color: 0x3a4562,
    roughness: 0.55,
    metalness: 0.25
  });
  const buttonActiveMat = new THREE.MeshStandardMaterial({
    color: 0x7c5cff,
    roughness: 0.45,
    metalness: 0.15,
    emissive: new THREE.Color(0x7c5cff),
    emissiveIntensity: 0.25
  });

  const btnGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.025, 18);

  // Panel surface (front face), buttons sit slightly “out”
  const btnZ = panelZ + 0.045;

  // Top-to-bottom layout
  const startY = panelY + 0.45;
  const gapY = 0.22;

  ELEVATOR_FLOORS.forEach((f, i) => {
    const y = startY - i * gapY;

    const b = new THREE.Mesh(btnGeom, buttonMat.clone());
    b.name = `Btn_F${f.floor}`;
    b.userData = { floor: f.floor, key: f.key, label: f.label };
    // cylinder axis along Y; rotate so it protrudes on Z
    b.rotation.x = Math.PI / 2;
    b.position.set(panelX + 0.13, y, btnZ);
    buttons.push(b);
    cabin.add(b);

    // Hotel-style label plate next to the button
    const plate = makeLabelPlate(`${f.floor}  ${f.label}`);
    plate.position.set(panelX - 0.07, y, btnZ + 0.002);
    cabin.add(plate);
  });

  // Cursor hover feedback
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function pointerToNDC(ev) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((ev.clientY - rect.top) / rect.height) * 2 - 1);
  }

  /* ---------- Door + travel animation state ---------- */

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

    // Count floors on indicator
    const stepTime = Math.max(180, Math.floor(duration / Math.max(1, delta)));
    let displayed = currentFloor;
    const direction = targetFloor > currentFloor ? 1 : -1;

    const timer = setInterval(() => {
      if (displayed === targetFloor) return;
      displayed += direction;
      setIndicator(displayed);
    }, stepTime);

    const basePos = camera.position.clone();
    const baseIntensity = dirLight.intensity;

    await animate({
      duration,
      onUpdate: (t) => {
        // Movement illusion: rumble + slight light flicker
        const mid = Math.sin(Math.PI * t);
        const shake = 0.006 + 0.016 * mid;

        camera.position.x = basePos.x + Math.sin(t * 42) * shake;
        camera.position.y = basePos.y + Math.sin(t * 57) * shake * 0.6;
        camera.position.z = basePos.z + Math.sin(t * 38) * shake;

        dirLight.intensity = baseIntensity + 0.08 * Math.sin(t * 22);
      }
    });

    clearInterval(timer);
    camera.position.copy(basePos);
    dirLight.intensity = baseIntensity;

    currentFloor = targetFloor;
    setIndicator(currentFloor);
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

  async function handleFloorClick(targetFloor, key, mesh) {
    if (busy) return;
    busy = true;

    // If user clicks a new floor while a section is open, close panel first
    closeDrawer();

    const originalMat = mesh.material;
    mesh.material = buttonActiveMat;

    try {
      if (doorsOpen) await animateDoors(false);

      if (targetFloor !== currentFloor) {
        await simulateTravel(targetFloor);
      } else {
        setIndicator(currentFloor);
      }

      await animateDoors(true);
      openSection(key);
    } finally {
      setTimeout(() => { mesh.material = originalMat; }, 650);
      busy = false;
    }
  }

  function onPointerDown(ev) {
    if (busy) return;

    pointerToNDC(ev);
    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObjects(buttons, false);
    if (!hits.length) return;

    const hit = hits[0].object;
    const { floor, key } = hit.userData;
    handleFloorClick(floor, key, hit);
  }

  function onPointerMove(ev) {
    pointerToNDC(ev);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(buttons, false);
    renderer.domElement.style.cursor = hits.length ? "pointer" : "default";
  }

  renderer.domElement.addEventListener("pointerdown", onPointerDown);
  renderer.domElement.addEventListener("pointermove", onPointerMove);

  // When drawer closes, close doors (keeps experience cohesive)
  const originalCloseDrawer = closeDrawer;
  function closeDrawerAndDoors() {
    originalCloseDrawer();
    if (!busy && doorsOpen) animateDoors(false);
  }
  stage.querySelector("#infoClose").addEventListener("click", closeDrawerAndDoors);
  stage.querySelector("#closeBtn").addEventListener("click", closeDrawerAndDoors);

  // Reset button
  stage.querySelector("#resetBtn").addEventListener("click", async () => {
    if (busy) return;
    busy = true;
    try {
      closeDrawer();
      if (doorsOpen) await animateDoors(false);

      currentFloor = 1;
      setIndicator(1);

      camera.position.set(0, 1.45, -1.05);
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

  // Start: doors closed, floor 1, no popups.
  setIndicator(1);

  // Cleanup
  return () => {
    disposed = true;
    cancelAnimationFrame(raf);

    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("resize", onResize);

    controls.dispose();

    // Dispose textures/materials
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.geometry?.dispose?.();
        const m = obj.material;
        if (Array.isArray(m)) m.forEach((mm) => mm.dispose?.());
        else m?.dispose?.();
        if (m?.map?.dispose) m.map.dispose();
      }
    });

    renderer.dispose();
    indicator.remove();
    container.innerHTML = "";
  };
}
