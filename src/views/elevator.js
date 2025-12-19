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

function makeModalRoot() {
  const backdrop = document.createElement("div");
  backdrop.className = "modalBackdrop";
  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modalHeader">
        <div>
          <h3 id="modalTitle">Title</h3>
          <p id="modalDesc">Description</p>
        </div>
        <button class="modalClose" id="modalCloseBtn" aria-label="Close">Close</button>
      </div>
      <div class="modalBody" id="modalBody"></div>
    </div>
  `;

  const close = () => {
    backdrop.style.display = "none";
    document.body.style.overflow = "";
  };

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) close();
  });
  backdrop.querySelector("#modalCloseBtn").addEventListener("click", close);

  return {
    el: backdrop,
    open: ({ title, description, bodyHtml }) => {
      backdrop.querySelector("#modalTitle").textContent = title || "";
      backdrop.querySelector("#modalDesc").textContent = description || "";
      backdrop.querySelector("#modalBody").innerHTML = bodyHtml || "";
      backdrop.style.display = "flex";
      document.body.style.overflow = "hidden";
    },
    close
  };
}

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
  // Mirrors your “Proof of Work / Demos” section (placeholders only)
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

export function mountElevator(container) {
  const wrap = document.createElement("div");
  wrap.className = "container";

  const header = document.createElement("section");
  header.className = "card hero";
  header.innerHTML = `
    <h1 class="h1">Interactive Elevator</h1>
    <p class="sub">
      Click a floor button to open a section (About, Projects, Skills, Demos, Contact).
      The animation simulates travel, then opens the doors.
    </p>
  `;
  wrap.appendChild(header);

  const stage = document.createElement("section");
  stage.className = "roomWrap";
  stage.innerHTML = `
    <div class="hint">
      <strong>How to interact</strong>
      <ul>
        <li>Click a floor button on the panel</li>
        <li>Watch the floor indicator change</li>
        <li>Doors open and a section panel appears</li>
      </ul>
    </div>
    <div class="hud">
      <button class="btn" id="resetBtn" type="button">Reset View</button>
    </div>
    <div class="toast" id="toast"></div>
  `;
  wrap.appendChild(stage);

  container.appendChild(wrap);

  // Modal
  const modal = makeModalRoot();
  document.body.appendChild(modal.el);

  const toast = stage.querySelector("#toast");
  const showToast = (msg, ms = 2200) => {
    toast.textContent = msg;
    toast.style.display = "block";
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => (toast.style.display = "none"), ms);
  };

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(stage.clientWidth, stage.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  stage.appendChild(renderer.domElement);

  // Scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    50,
    stage.clientWidth / stage.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 1.45, 2.6);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 1.8;
  controls.maxDistance = 3.8;
  controls.target.set(0, 1.25, 0);

  // Lights
  scene.add(new THREE.HemisphereLight(0xffffff, 0x223344, 0.9));
  const dir = new THREE.DirectionalLight(0xffffff, 0.9);
  dir.position.set(2, 4, 2);
  scene.add(dir);

  // Elevator cabin geometry (simple primitives)
  const cabin = new THREE.Group();
  scene.add(cabin);

  const wallMat = new THREE.MeshStandardMaterial({ color: 0x1a2030, roughness: 0.9, metalness: 0.1 });
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x2a3246, roughness: 0.8, metalness: 0.2 });
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x0f1420, roughness: 1.0, metalness: 0.0 });
  const doorMat  = new THREE.MeshStandardMaterial({ color: 0x101826, roughness: 0.6, metalness: 0.3 });

  // Floor & ceiling
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), floorMat);
  floor.rotation.x = -Math.PI / 2;
  cabin.add(floor);

  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), wallMat);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = 2.5;
  cabin.add(ceiling);

  // Back wall
  const backWall = new THREE.Mesh(new THREE.PlaneGeometry(3, 2.5), wallMat);
  backWall.position.set(0, 1.25, -1.5);
  cabin.add(backWall);

  // Side walls
  const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(3, 2.5), wallMat);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.set(-1.5, 1.25, 0);
  cabin.add(leftWall);

  const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(3, 2.5), wallMat);
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.set(1.5, 1.25, 0);
  cabin.add(rightWall);

  // Front frame wall (around doors)
  const frontFrame = new THREE.Mesh(new THREE.PlaneGeometry(3, 2.5), wallMat);
  frontFrame.position.set(0, 1.25, 1.5);
  cabin.add(frontFrame);

  // Door opening cutout illusion: we’ll put doors in front
  // Doors (two sliding panels)
  const doorGroup = new THREE.Group();
  doorGroup.position.set(0, 0, 1.49);
  cabin.add(doorGroup);

  const doorGeom = new THREE.BoxGeometry(1.45, 2.2, 0.04);

  const doorLeft = new THREE.Mesh(doorGeom, doorMat);
  doorLeft.name = "DoorLeft";
  doorLeft.position.set(-0.73, 1.1, 0);
  doorGroup.add(doorLeft);

  const doorRight = new THREE.Mesh(doorGeom, doorMat);
  doorRight.name = "DoorRight";
  doorRight.position.set(0.73, 1.1, 0);
  doorGroup.add(doorRight);

  // Panel (right wall)
  const panel = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.4, 0.05), panelMat);
  panel.position.set(1.38, 1.2, 0.2);
  panel.rotation.y = -Math.PI / 2;
  cabin.add(panel);

  // Floor indicator (simple emissive plane)
  const indicatorMat = new THREE.MeshStandardMaterial({
    color: 0x071018,
    roughness: 0.4,
    metalness: 0.0,
    emissive: new THREE.Color(0x2233aa),
    emissiveIntensity: 0.4
  });
  const indicator = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.18), indicatorMat);
  indicator.position.set(1.36, 1.9, 0.2);
  indicator.rotation.y = -Math.PI / 2;
  cabin.add(indicator);

  // Use a DOM overlay for the floor number (simple and crisp)
  const floorHUD = document.createElement("div");
  floorHUD.style.position = "absolute";
  floorHUD.style.right = "26px";
  floorHUD.style.top = "118px";
  floorHUD.style.padding = "8px 10px";
  floorHUD.style.borderRadius = "12px";
  floorHUD.style.background = "rgba(0,0,0,0.38)";
  floorHUD.style.border = "1px solid rgba(255,255,255,0.14)";
  floorHUD.style.backdropFilter = "blur(8px)";
  floorHUD.style.fontFamily = "var(--mono)";
  floorHUD.style.fontSize = "13px";
  floorHUD.style.color = "rgba(255,255,255,0.88)";
  floorHUD.textContent = "FLOOR: 1";
  stage.appendChild(floorHUD);

  // Buttons (raycast targets)
  const buttons = [];
  const buttonMat = new THREE.MeshStandardMaterial({ color: 0x39425a, roughness: 0.6, metalness: 0.2 });
  const buttonActiveMat = new THREE.MeshStandardMaterial({ color: 0x7c5cff, roughness: 0.5, metalness: 0.1, emissive: new THREE.Color(0x7c5cff), emissiveIntensity: 0.25 });

  // Lay out buttons vertically on the panel
  const btnGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.02, 18);
  const baseX = 1.355;
  const baseZ = 0.2;
  let startY = 1.65;

  ELEVATOR_FLOORS.forEach((f, i) => {
    const b = new THREE.Mesh(btnGeom, buttonMat.clone());
    b.name = `Btn_F${f.floor}`;
    b.userData = { floor: f.floor, key: f.key, label: f.label };
    b.rotation.z = Math.PI / 2;
    b.position.set(baseX, startY - i * 0.22, baseZ);
    buttons.push(b);
    cabin.add(b);
  });

  // State
  let currentFloor = 1;
  let busy = false;
  let doorsOpen = false;

  function setIndicator(floor) {
    floorHUD.textContent = `FLOOR: ${floor}`;
  }

  async function animateDoors(open) {
    // open: doors slide outward; close: slide inward
    const leftStart = doorLeft.position.x;
    const rightStart = doorRight.position.x;

    const leftTarget = open ? -1.35 : -0.73;
    const rightTarget = open ? 1.35 : 0.73;

    await animate({
      duration: 600,
      onUpdate: (t) => {
        const k = easeInOutCubic(t);
        doorLeft.position.x = THREE.MathUtils.lerp(leftStart, leftTarget, k);
        doorRight.position.x = THREE.MathUtils.lerp(rightStart, rightTarget, k);
      }
    });

    doorsOpen = open;
  }

  async function simulateTravel(targetFloor) {
    const delta = Math.abs(targetFloor - currentFloor);
    const duration = 900 + delta * 450;

    // floor counting interval
    const stepTime = Math.max(180, Math.floor(duration / Math.max(1, delta)));

    // camera shake parameters
    const basePos = camera.position.clone();

    let displayed = currentFloor;
    const dir = targetFloor > currentFloor ? 1 : -1;

    // update floor number gradually
    const timer = setInterval(() => {
      if (displayed === targetFloor) return;
      displayed += dir;
      setIndicator(displayed);
    }, stepTime);

    await animate({
      duration,
      onUpdate: (t) => {
        // shake intensity peaks mid-travel
        const k = Math.sin(Math.PI * t);
        const shake = 0.01 + 0.02 * k;

        // subtle oscillation (rumble)
        camera.position.x = basePos.x + Math.sin(t * 40) * shake;
        camera.position.y = basePos.y + Math.sin(t * 55) * shake * 0.6;
        camera.position.z = basePos.z + Math.sin(t * 38) * shake;

        // light flicker (optional subtle)
        dirLight.intensity = 0.85 + 0.08 * Math.sin(t * 25);
      }
    });

    clearInterval(timer);

    // restore camera + light
    camera.position.copy(basePos);
    dirLight.intensity = 0.9;

    currentFloor = targetFloor;
    setIndicator(currentFloor);
  }

  // Keep a named directional light reference for flicker
  const dirLight = dir;

  function openSection(key) {
    if (key === "about") {
      modal.open({ title: "About", description: "Personal info", bodyHtml: aboutHtml() });
      return;
    }
    if (key === "projects") {
      modal.open({ title: "Projects", description: "Featured projects", bodyHtml: projectsHtml() });
      return;
    }
    if (key === "skills") {
      modal.open({ title: "Skills", description: "Tech stack", bodyHtml: skillsHtml() });
      return;
    }
    if (key === "demos") {
      modal.open({ title: "Demos", description: "Proof of work / placeholders", bodyHtml: demosHtml() });
      return;
    }
    if (key === "contact") {
      modal.open({ title: "Contact", description: "How to reach me", bodyHtml: contactHtml() });
      return;
    }
    modal.open({ title: "Section", description: "Not wired yet", bodyHtml: `<p class="mini">Unknown key: ${key}</p>` });
  }

  async function handleFloorClick(targetFloor, key, mesh) {
    if (busy) return;
    busy = true;

    // Visual feedback
    mesh.material = buttonActiveMat;

    try {
      if (doorsOpen) await animateDoors(false);

      if (targetFloor !== currentFloor) {
        showToast(`Going to floor ${targetFloor}…`);
        await simulateTravel(targetFloor);
      } else {
        showToast(`Already on floor ${targetFloor}.`);
      }

      await animateDoors(true);
      openSection(key);

      // When modal closes, close doors automatically
      // We detect close by watching backdrop display state (simple)
      const poll = setInterval(async () => {
        if (modal.el.style.display !== "flex") {
          clearInterval(poll);
          if (doorsOpen) await animateDoors(false);
        }
      }, 250);

    } finally {
      // reset button after a moment
      setTimeout(() => { mesh.material = buttonMat; }, 900);
      busy = false;
    }
  }

  // Raycasting
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function onPointerDown(ev) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((ev.clientY - rect.top) / rect.height) * 2 - 1);
    raycaster.setFromCamera(pointer, camera);

    const hits = raycaster.intersectObjects(buttons, false);
    if (!hits.length) return;

    const hit = hits[0].object;
    const { floor, key } = hit.userData;
    handleFloorClick(floor, key, hit);
  }

  renderer.domElement.addEventListener("pointerdown", onPointerDown);

  // Cursor feedback (hover)
  function onPointerMove(ev) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((ev.clientY - rect.top) / rect.height) * 2 - 1);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(buttons, false);
    renderer.domElement.style.cursor = hits.length ? "pointer" : "default";
  }
  renderer.domElement.addEventListener("pointermove", onPointerMove);

  // Reset view button
  stage.querySelector("#resetBtn").addEventListener("click", async () => {
    if (busy) return;
    camera.position.set(0, 1.45, 2.6);
    controls.target.set(0, 1.25, 0);
    controls.update();
    if (doorsOpen) await animateDoors(false);
    currentFloor = 1;
    setIndicator(1);
    showToast("Reset.");
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

  showToast("Click a floor button to navigate.");

  // Cleanup
  return () => {
    disposed = true;
    cancelAnimationFrame(raf);

    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    renderer.domElement.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("resize", onResize);

    controls.dispose();
    renderer.dispose();

    modal.el.remove();
    floorHUD.remove();
    container.innerHTML = "";
  };
}
