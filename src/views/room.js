import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import { PROFILE, SKILLS, PROJECTS, ROOM_HOTSPOTS } from "../content.js";

function makeModalRoot() {
  const backdrop = document.createElement("div");
  backdrop.className = "modalBackdrop";
  backdrop.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-label="Portfolio detail modal">
      <div class="modalHeader">
        <div>
          <h3 id="modalTitle">Title</h3>
          <p id="modalDesc">Description</p>
        </div>
        <button class="modalClose" id="modalCloseBtn" aria-label="Close modal">Close</button>
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

function projectsHtml() {
  const cards = PROJECTS.map((p) => {
    const tech = p.tech.map((t) => `<code>${t}</code>`).join(" ");
    const outcomes = p.outcomes.join(" · ");
    const resp = `<ul>${p.responsibilities.map(r => `<li>${r}</li>`).join("")}</ul>`;

    // links are placeholders: keep as text chips (no fabricated URLs)
    const links = `
      <div class="links">
        <span class="link">${p.links.repo}</span>
        <span class="link">${p.links.demo}</span>
        <span class="link">${p.links.caseStudy}</span>
        <span class="link">${p.links.readme}</span>
      </div>
    `;

    const img = `
      <div class="thumb">
        <img src="${p.screenshot}" alt="Screenshot placeholder for ${p.name}"
          onerror="this.remove(); this.parentElement.textContent='[Screenshot Placeholder]';" />
      </div>
    `;

    return `
      <div class="projectCard" style="margin-bottom:12px;">
        <h3>${p.name}</h3>
        <p class="meta">${p.oneLiner}</p>
        <div class="kv">
          <div><strong>Responsibilities</strong>: ${resp}</div>
          <div><strong>Tech</strong>: ${tech}</div>
          <div><strong>Outcomes</strong>: ${outcomes}</div>
        </div>
        ${img}
        ${links}
      </div>
    `;
  }).join("");

  return `
    <p class="mini">
      This view is documentation-first. Some source code may be private or not published; placeholders indicate what will be added.
    </p>
    <hr class="smallHr" />
    ${cards}
  `;
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

function contactHtml() {
  return `
    <p class="mini">
      Replace placeholders with real links when ready.
    </p>
    <ul class="mini" style="line-height:1.7;">
      <li>Email: ${PROFILE.contact.email}</li>
      <li>LinkedIn: ${PROFILE.contact.linkedin}</li>
    </ul>
  `;
}

function defaultHtml(objectName) {
  return `
    <p class="mini">
      You clicked: <strong>${objectName}</strong>
    </p>
    <p class="mini">
      This object is not wired yet. Add an entry in <code>ROOM_HOTSPOTS</code> (src/content.js) that matches the mesh name in your GLB.
    </p>
    <p class="mini">
      Recommended: keep hotspot names simple (e.g., <code>Computer</code>, <code>IDCard</code>, <code>Notebook</code>, <code>Phone</code>).
    </p>
  `;
}

export function mountRoom(container) {
  const wrap = document.createElement("div");
  wrap.className = "container";

  const header = document.createElement("section");
  header.className = "card hero";
  header.innerHTML = `
    <h1 class="h1">Interactive 3D Room</h1>
    <p class="sub">
      Click objects on the desk to open project and personal information panels.
      (Computer → Projects, ID card → About)
    </p>
  `;
  wrap.appendChild(header);

  const room = document.createElement("section");
  room.className = "roomWrap";
  room.innerHTML = `
    <div class="hint">
      <strong>How to interact</strong>
      <ul>
        <li>Drag to rotate camera (Orbit Controls)</li>
        <li>Scroll to zoom</li>
        <li>Click desk objects (Computer, ID card) to open details</li>
      </ul>
    </div>
    <div class="crosshair" aria-hidden="true"></div>
    <div class="hud">
      <button class="btn" id="resetCamBtn" type="button">Reset Camera</button>
      <button class="btn" id="helpBtn" type="button">Interaction Help</button>
    </div>
    <div class="toast" id="toast"></div>
  `;
  wrap.appendChild(room);

  container.appendChild(wrap);

  const modal = makeModalRoot();
  document.body.appendChild(modal.el);

  const toast = room.querySelector("#toast");
  const showToast = (msg, ms = 2200) => {
    toast.textContent = msg;
    toast.style.display = "block";
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => (toast.style.display = "none"), ms);
  };

  // Basic WebGL support check
  const testCanvas = document.createElement("canvas");
  const gl =
    testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
  if (!gl) {
    showToast("WebGL not available. Use Traditional View for best compatibility.", 6000);
    return () => {
      modal.el.remove();
      container.innerHTML = "";
    };
  }

  // --- Three.js setup ---
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(room.clientWidth, room.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  room.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    45,
    room.clientWidth / room.clientHeight,
    0.1,
    200
  );
  camera.position.set(2.8, 1.6, 3.2);

  // Controls (simple, reliable, recruiter-friendly)
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(0, 1.0, 0);

  // Lighting: safe defaults
  const hemi = new THREE.HemisphereLight(0xffffff, 0x223344, 1.0);
  scene.add(hemi);

  const dir = new THREE.DirectionalLight(0xffffff, 1.0);
  dir.position.set(4, 6, 2);
  dir.castShadow = false;
  scene.add(dir);

  // Ground plane (in case your GLB has transparency / to anchor visually)
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({ color: 0x0c111a, roughness: 1.0, metalness: 0.0 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.001;
  ground.visible = false; // set true if you want
  scene.add(ground);

  // Load room GLB
  const loader = new GLTFLoader();
  let roomRoot = null;
  const clickable = [];

  const roomModelUrl = "./assets/room.glb"; // ensure exists
  const loadPromise = new Promise((resolve, reject) => {
    loader.load(
      roomModelUrl,
      (gltf) => resolve(gltf),
      undefined,
      (err) => reject(err)
    );
  });

  // Raycaster for clicking
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function getTopObjectName(object) {
    // Walk up until we find a named object (or return mesh name)
    let o = object;
    while (o && o.parent) {
      if (o.name && o.name.trim()) return o.name.trim();
      o = o.parent;
    }
    return object.name || "UnnamedObject";
  }

  function openHotspot(name) {
    const hotspot = ROOM_HOTSPOTS[name];

    if (!hotspot) {
      modal.open({
        title: "Object",
        description: "This object is not wired yet.",
        bodyHtml: defaultHtml(name)
      });
      return;
    }

    if (hotspot.mode === "projects") {
      modal.open({ title: hotspot.title, description: hotspot.description, bodyHtml: projectsHtml() });
      return;
    }
    if (hotspot.mode === "about") {
      modal.open({ title: hotspot.title, description: hotspot.description, bodyHtml: aboutHtml() });
      return;
    }
    if (hotspot.mode === "skills") {
      modal.open({ title: hotspot.title, description: hotspot.description, bodyHtml: skillsHtml() });
      return;
    }
    if (hotspot.mode === "contact") {
      modal.open({ title: hotspot.title, description: hotspot.description, bodyHtml: contactHtml() });
      return;
    }

    modal.open({
      title: hotspot.title || "Info",
      description: hotspot.description || "",
      bodyHtml: `<p class="mini">No renderer for mode: <code>${hotspot.mode}</code></p>`
    });
  }

  function onPointerDown(ev) {
    const rect = renderer.domElement.getBoundingClientRect();
    const x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((ev.clientY - rect.top) / rect.height) * 2 - 1);
    pointer.set(x, y);

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickable, true);

    if (hits.length === 0) {
      showToast("Tip: Click desk objects (Computer / ID card).");
      return;
    }

    const hit = hits[0].object;
    const name = getTopObjectName(hit);
    openHotspot(name);
  }

  renderer.domElement.addEventListener("pointerdown", onPointerDown);

  // Buttons
  room.querySelector("#resetCamBtn").addEventListener("click", () => {
    camera.position.set(2.8, 1.6, 3.2);
    controls.target.set(0, 1.0, 0);
    controls.update();
    showToast("Camera reset.");
  });

  room.querySelector("#helpBtn").addEventListener("click", () => {
    modal.open({
      title: "Interaction Help",
      description: "How to use the 3D view.",
      bodyHtml: `
        <ul class="mini" style="line-height:1.7;">
          <li><strong>Drag</strong>: rotate camera</li>
          <li><strong>Scroll</strong>: zoom</li>
          <li><strong>Click Computer</strong>: projects</li>
          <li><strong>Click ID card</strong>: about</li>
          <li>If clicks do nothing, confirm your GLB mesh names match <code>ROOM_HOTSPOTS</code>.</li>
        </ul>
        <hr class="smallHr" />
        <p class="mini">
          Implementation detail: object names are read from the GLB node/mesh names (case-sensitive).
        </p>
      `
    });
  });

  // Resize handling
  const onResize = () => {
    const w = room.clientWidth;
    const h = room.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener("resize", onResize);

  let raf = 0;
  let disposed = false;

  const animate = () => {
    if (disposed) return;
    raf = requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  // Load scene model and start
  loadPromise
    .then((gltf) => {
      if (disposed) return;
      roomRoot = gltf.scene;
      scene.add(roomRoot);

      // Build clickable list: you asked "interact with any object in the room".
      // This includes all meshes, so any click will hit something; unmapped names show default message.
      roomRoot.traverse((obj) => {
        if (obj.isMesh) {
          clickable.push(obj);
          // Improve material safety
          if (obj.material) {
            obj.material.transparent = obj.material.transparent ?? false;
            obj.material.depthWrite = true;
          }
        }
      });

      // Inform user about required names (only once)
      showToast("Click desk objects: Computer (Projects), IDCard (About).");

      animate();
    })
    .catch(() => {
      showToast("Failed to load ./assets/room.glb. Add the model file, or use Traditional View.", 6500);
    });

  // Cleanup
  return () => {
    disposed = true;
    cancelAnimationFrame(raf);

    renderer.domElement.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("resize", onResize);

    controls.dispose();

    // Dispose scene resources
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.geometry?.dispose?.();
        const m = obj.material;
        if (Array.isArray(m)) m.forEach((mm) => mm.dispose?.());
        else m?.dispose?.();
      }
    });

    renderer.dispose();
    modal.el.remove();
    container.innerHTML = "";
  };
}
