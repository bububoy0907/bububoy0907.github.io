// src/views/forRecruiters.js
import { PROFILE, PROJECTS, SKILLS } from "../content.js";

const STACK_ICONS = [
  { key: "csharp", label: "C#" },
  { key: "unity", label: "Unity" },
  { key: "react", label: "React" },
  { key: "typeScript", label: "TypeScript" },
  { key: "javascript", label: "JavaScript" },
  { key: "nodejs", label: "Node.js" },
  { key: "java", label: "Java" },
  { key: "python", label: "Python" },
  { key: "docker", label: "Docker" },
  { key: "git", label: "Git" },
  { key: "linux", label: "Linux" },
  { key: "firebase", label: "Firebase" },
  { key: "mongodb", label: "MongoDB" },
  { key: "MySQL", label: "MySQL" },
  { key: "sql", label: "SQL" },
  { key: "threejs", label: "Three.js" },
  { key: "webgl", label: "WebGL" },
  { key: "figma", label: "Figma" },
  { key: "blender", label: "Blender" },
  { key: "Premiere", label: "Premiere Pro" },
  { key: "unrealengine", label: "Unreal Engine" },
  { key: "R", label: "R" },
  { key: "SPSS", label: "SPSS" },
];

const KPI_ITEMS = [
  { value: "2,000+", label: "Concurrent Users on WebAR Event Build" },
  { value: "7,000+", label: "Unique Registrations on MMORPG Server" },
  { value: "~150", label: "Steady Concurrent Players At Peak" },
  { value: "1", label: "Project Accelerated by HKSTP Ideation Programme" },
  { value: "1", label: "Upcoming Academic Publication" },
  { value: "1", label: "Microsoft Azure Certification" },
];

const RECRUITER_PROJECT_META = {
  webar: {
    shortName: "PolyU-GO!",
    detailTitle: "WebAR Application for PolyU COMP Info Day",
    bullets: [
      "Shipped an end-to-end AR, geofencing experience under a ~4-week sprint",
      "Designed the full PolyU campus 3D model.",
      "Developed core gameplay, UI flow and deployment for an event build.",
      "Handled live event load: 2,000+ concurrent users and ~90% positive feedback.",
    ],
  },
  unity: {
    shortName: "Hong Kong Driving Simulator",
    detailTitle: "Hong Kong based Driving Simulator ",
    bullets: [
      "Built a 1:1 geospatial 3D replica of the Happy Valley and Chung Yee Street driving-test route in Unity",
      "Implemented 70+ traffic-rule checks and reporting/logging style logic.",
      "Shipped a showcase-ready build under a 2-week sprint; wrote patch notes + handoff docs.",
      "Capstone continuation: aligned to HK driving-test scenarios.",
      "Demoed at InnoEX; contributed to 500+ potential collaboration leads captured by the team.",
    ],
  },
  wishcraft: {
    shortName: "Minecraft Server - BladeCyber",
    detailTitle: "Live MMORPG in Minecraft (7,000 regs; ~150 CCU)",
    bullets: [
      "Operated a live MMORPG across Hong Kong/Macau/Taiwan",
      "Achieved 7,000 unique registrations and steady ~150 concurrent players.",
      "Implemented scaling/routing + production debugging; tuned configs for reliability under peak load.",
      "Built and moderated a 1,000+ Discord community for announcements and player support.",
    ],
  },
  petmatch: {
    shortName: "PetMatch",
    detailTitle: "A Swipe-based Web Application as Pet Distribution Platform",
    bullets: [
      "Built the full-stack web application",
      "Designed the database model",
      "Implemented the Node.js backend API, and delivered the React client UI.",
      "Implemented swipe-based browsing, matchmaking flows, and data persistence across the database, server, and client layers.",
      "Set up a Dockerized development environment and basic CI workflow to streamline onboarding and iterative delivery within a 2-week sprint.",
    ],
  },
  candy: {
    shortName: "Revenge Recipe",
    detailTitle: "A Unity Candy-themed RPG Game Practice",
    bullets: [
      "Designed the candy-theme map and the terrain layout design within 1 week.",
      "Designed the character model and the monster model.",
      "Developed the quest system, game flow, and boss fight logic.",
    ],
  },
  unreal: {
    shortName: "Unreal Island",
    detailTitle: "An Unreal Engine Auto-material Terrain Design Practice",
    bullets: [
      "Terrain-sculpting practice: recreated an island inspired by Sea of Thieves’ Smugglers Bay using UE Landscape.",
      "Authored a custom terrain auto-material (slope/height blending) to minimize manual texture painting.",
      "Applied Nanite where appropriate and tuned materials/assets for real-time stability.",
      "Configured foliage rendering (trees/grass density + LOD) to balance visuals and performance."
    ],
  },
};

function recruiterMeta(p) {
  const meta = RECRUITER_PROJECT_META[p?.id] || {};
  return {
    shortName: meta.shortName || p?.name || "Project",
    detailTitle: meta.detailTitle || p?.name || "",
    bullets:
      Array.isArray(meta.bullets) && meta.bullets.length
        ? meta.bullets
        : Array.isArray(p?.responsibilities)
          ? p.responsibilities.slice(0, 3)
          : [],
  };
}

function renderIconMarquee() {
  const items = STACK_ICONS.map((it) => `
    <span class="hsLogo hsLogo--icon" title="${it.label}" aria-label="${it.label}">
      <img class="hsLogoIcon" src="./assets/icons/${it.key}.svg" alt="" loading="lazy" />
      <span class="hsLogoText">${it.label}</span>
    </span>
  `).join("");

  return `
    <div class="hsMarquee hsMarquee--icons" aria-label="Core stack marquee">
      <div class="hsMarqueeTrack hsMarqueeTrack--icons">
        ${items}
        ${items}
      </div>
    </div>
  `;
}

function renderKpis() {
  const cards = KPI_ITEMS.map((k, i) => `
    <div class="kpiCard" data-tone="${(i % 6) + 1}">
      <div class="kpiValue">${k.value}</div>
      <div class="kpiLabel">${k.label}</div>
    </div>
  `).join("");

  return `
    <div class="kpiSection" aria-label="Proof points">
      <div class="kpiGrid kpiGrid--recruiters">
        ${cards}
      </div>
    </div>
  `;
}

function setupReveal(root) {
  const els = root.querySelectorAll("[data-reveal]");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("isIn");
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}


function isPlaceholderUrl(url) {
  return typeof url === "string" && /^\[.*\]$/.test(url.trim());
}

function renderRecruiterLinks(links) {
  if (!links || typeof links !== "object") return "";
  const entries = Object.entries(links).filter(([, v]) => v && !isPlaceholderUrl(v));
  if (!entries.length) return "";

  const items = entries
    .map(([k, v]) => {
      const label = k.replaceAll("_", " ");
      return `<a class="hsLinkChip" href="${v}" target="_blank" rel="noreferrer">${label}</a>`;
    })
    .join("");

  return `
    <div class="hsAccLinks">
      ${items}
    </div>
  `;
}
function projectAccordionItem(p) {
  const meta = recruiterMeta(p);

  const el = document.createElement("div");
  el.className = "hsAccItem";

  el.innerHTML = `
    <details class="hsDetails">
      <summary class="hsSummary">
        <div class="hsSummaryTitle">${meta.shortName}</div>
        <div class="hsSummaryIcon" aria-hidden="true"></div>
      </summary>

      <div class="hsAccBody">
        <div class="hsAccMeta">
          <div class="hsAccPeriod">${p.period || ""}</div>
          <div class="hsAccTitle">${meta.detailTitle}</div>
        </div>

        <div class="hsAccGrid hsAccGrid--scan">
          <div>
            <div class="hsAccLabel">Highlights</div>
            <ul class="hsAccBullets">
              ${meta.bullets.map((t) => `<li>${t}</li>`).join("")}
            </ul>
          </div>

          <div>
            <div class="hsAccLabel">Stack</div>
            <div class="hsChipRow">
              ${(p.tech || []).map((t) => `<span class="hsChip">${t}</span>`).join("")}
            </div>
            ${renderRecruiterLinks(p.links)}
          </div>
        </div>
      </div>
    </details>
  `;

  return el;
}

function escapeHtml(s) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildGalleryItems(projects) {
  const items = [];

  projects.forEach((p) => {
    const meta = recruiterMeta(p);

    const run =
      Array.isArray(p.gallery) && p.gallery.length
        ? p.gallery
        : [{ type: "image", src: p.screenshot, tag: meta.shortName, caption: p.name }];

    run.forEach((it, idx) => {
      items.push({
        projectId: p.id,
        projectName: meta.shortName,
        type: it.type || "image",
        src: it.src,
        poster: it.poster,
        tag: it.tag || meta.shortName,
        caption: it.caption || p.name,
        alt: it.alt || `Media: ${p.name} (${idx + 1})`,
      });
    });
  });

  return items;
}
function setupGalleryNav(root) {
  const gallery = root.querySelector("#hsGallery");
  const track = root.querySelector("#hsGalleryTrack");
  const prev = root.querySelector("#hsGalleryPrev");
  const next = root.querySelector("#hsGalleryNext");
  if (!gallery || !track || !prev || !next) return () => {};

  const getSlides = () => Array.from(track.querySelectorAll(".hsSlide"));

  const getActiveIndex = () => {
    const slides = getSlides();
    if (!slides.length) return 0;

    // Find the slide whose left edge is closest to gallery scrollLeft
    const x = gallery.scrollLeft;
    let best = 0;
    let bestDist = Infinity;

    for (let i = 0; i < slides.length; i++) {
      const left = slides[i].offsetLeft;
      const d = Math.abs(left - x);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best;
  };

  const scrollToIndex = (idx, behavior = "smooth") => {
    const slides = getSlides();
    if (!slides.length) return;

    const i = ((idx % slides.length) + slides.length) % slides.length; // wrap
    const target = slides[i].offsetLeft;

    gallery.scrollTo({ left: target, behavior });
  };

  const onPrev = () => {
    const i = getActiveIndex();
    scrollToIndex(i - 1);
  };

  const onNext = () => {
    const i = getActiveIndex();
    scrollToIndex(i + 1);
  };

  prev.addEventListener("click", onPrev);
  next.addEventListener("click", onNext);

  // Re-rendering (filter changes) rebuilds slides, so this ensures nav stays correct:
  const onRebuild = () => scrollToIndex(0, "auto");

  // Hook: when gallery content changes, reset to start without animation
  // (MutationObserver is lightweight here and avoids manual wiring)
  const mo = new MutationObserver(() => onRebuild());
  mo.observe(track, { childList: true });

  return () => {
    prev.removeEventListener("click", onPrev);
    next.removeEventListener("click", onNext);
    mo.disconnect();
  };
}
function setupGalleryWheelScroll(galleryEl) {
  if (!galleryEl) return () => {};

  const onWheel = (e) => {
    // allow zoom gestures
    if (e.ctrlKey || e.metaKey) return;

    const max = galleryEl.scrollWidth - galleryEl.clientWidth;
    if (max <= 2) return; // not scrollable => let page scroll

    // Use vertical wheel to drive horizontal scroll (works with normal mouse)
    // Normalize delta for browsers that report "lines"
    const scale = e.deltaMode === 1 ? 16 : (e.deltaMode === 2 ? galleryEl.clientWidth : 1);
    const delta = e.deltaY * scale;

    const next = Math.max(0, Math.min(max, galleryEl.scrollLeft + delta));

    // If we can’t move (already at edge), let the page scroll.
    if (next === galleryEl.scrollLeft) return;

    e.preventDefault();
    galleryEl.scrollLeft = next;
  };

  // Must be passive:false to allow preventDefault()
  galleryEl.addEventListener("wheel", onWheel, { passive: false });

  return () => galleryEl.removeEventListener("wheel", onWheel);
}

function renderGallerySlide(it) {
  // Show project tag + item tag (if different)
  const tags = [];
  if (it.projectName) tags.push({ text: it.projectName, kind: "project" });
  if (it.tag && it.tag !== it.projectName) tags.push({ text: it.tag, kind: "item" });

  const tagRow = `
    <div class="hsSlideTags">
      ${tags
        .map(
          (t) =>
            `<span class="hsSlideTag hsSlideTag--${t.kind}">${escapeHtml(t.text)}</span>`
        )
        .join("")}
    </div>
  `;

  const caption = `<div class="hsSlideCaption">${escapeHtml(it.caption)}</div>`;

  const media =
    it.type === "video"
      ? `
        <video
          class="hsSlideVideo"
          src="${escapeHtml(it.src)}"
          ${it.poster ? `poster="${escapeHtml(it.poster)}"` : ""}
          preload="metadata"
          playsinline
          muted
          controls
        ></video>
      `
      : `
        <img
          class="hsSlideImg"
          src="${escapeHtml(it.src)}"
          alt="${escapeHtml(it.alt)}"
          loading="lazy"
          decoding="async"
          draggable="false"
        />
      `;

  return `
    <figure class="hsSlide" data-project="${escapeHtml(it.projectId)}">
      <div class="hsSlideMedia">${media}</div>
      <figcaption class="hsSlideCap">
        ${tagRow}
        ${caption}
      </figcaption>
    </figure>
  `;
}
function setupGalleryDragScroll(galleryEl) {
  if (!galleryEl) return () => {};

  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;

  const onPointerDown = (e) => {
    // Only left click / primary pointer
    if (e.button !== undefined && e.button !== 0) return;

    isDown = true;
    galleryEl.classList.add("isDragging");
    startX = e.clientX;
    startScrollLeft = galleryEl.scrollLeft;

    // Capture pointer so dragging continues even if cursor leaves element
    galleryEl.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!isDown) return;
    e.preventDefault(); // prevent text selection
    const dx = e.clientX - startX;
    galleryEl.scrollLeft = startScrollLeft - dx;
  };

  const endDrag = (e) => {
    if (!isDown) return;
    isDown = false;
    galleryEl.classList.remove("isDragging");
    galleryEl.releasePointerCapture?.(e.pointerId);
  };

  galleryEl.addEventListener("pointerdown", onPointerDown);
  galleryEl.addEventListener("pointermove", onPointerMove, { passive: false });
  galleryEl.addEventListener("pointerup", endDrag);
  galleryEl.addEventListener("pointercancel", endDrag);
  galleryEl.addEventListener("pointerleave", endDrag);

  return () => {
    galleryEl.removeEventListener("pointerdown", onPointerDown);
    galleryEl.removeEventListener("pointermove", onPointerMove);
    galleryEl.removeEventListener("pointerup", endDrag);
    galleryEl.removeEventListener("pointercancel", endDrag);
    galleryEl.removeEventListener("pointerleave", endDrag);
  };
}

function setupGalleryUI(root) {
  const gallery = root.querySelector("#hsGallery");
  const track = root.querySelector("#hsGalleryTrack");
  const filter = root.querySelector("#hsGalleryFilter");
  if (!gallery || !track || !filter) return () => {};

  const items = buildGalleryItems(PROJECTS);

  const options = [
    { id: "all", label: "All" },
    ...PROJECTS
      .filter((p) => p.id !== "capstone") // hide capstone filter chip
      .map((p) => ({ id: p.id, label: recruiterMeta(p).shortName })),
  ];

  let active = "all";

  const render = () => {
    // Filter chips
    filter.innerHTML = options
      .map(
        (o) => `
          <button
            class="hsFilterChip"
            type="button"
            data-filter="${escapeHtml(o.id)}"
            aria-pressed="${o.id === active ? "true" : "false"}"
          >${escapeHtml(o.label)}</button>
        `
      )
      .join("");

    // Slides
    const shown = active === "all" ? items : items.filter((x) => x.projectId === active);
    track.innerHTML = shown.map(renderGallerySlide).join("");

    // Reset to start and force a scroll event so pan-effects recompute
    gallery.scrollLeft = 0;
  };

  const onClick = (e) => {
    const btn = e.target.closest(".hsFilterChip");
    if (!btn) return;
    const next = btn.getAttribute("data-filter");
    if (!next || next === active) return;
    active = next;
    render();
  };

  filter.addEventListener("click", onClick);
  render();

  return () => {
    filter.removeEventListener("click", onClick);
  };
}

export function mountForRecruiters(container) {
  const wrap = document.createElement("div");
  wrap.className = "forRecruiters";

  wrap.innerHTML = `
    <section class="hero hero--video hero--tight">
      <div class="heroMedia" aria-hidden="true">
        <video class="heroVideo" autoplay muted playsinline loop preload="metadata">
          <source src="./assets/media/creators.mp4" type="video/mp4" />
        </video>
        <div class="heroOverlay heroOverlay--soft"></div>
      </div>

      <div class="container heroContent">
        <div class="heroKicker">For Recruiters</div>
        <h1 class="heroTitle">Scan in 1 minute</h1>
        <p class="heroSubtitle">
            Projects, impact, and the work I can share.
        </p>

        <div class="heroCtas" data-reveal>
          <a class="hsCta" href="#/traditional" aria-label="Open Main Portfolio">
            <span class="hsCtaInner">
              <span class="hsCtaLine" style="color:#000;">View Main Portfolio</span>
              <span class="hsCtaLine" style="color:#000;" >View Main Portfolio</span>
            </span>
          </a>
          <a class="hsCta hsCta--ghost" href="#/contact" aria-label="Open Contact">
            <span class="hsCtaInner">
              <span class="hsCtaLine">Get in touch</span>
              <span class="hsCtaLine">Get in touch</span>
            </span>
          </a>
        </div>
      </div>
    </section>

    <section class="hsSection hsSection--white">
      <div class="container" data-reveal>
        <div class="hsSectionTop">
          <h2 class="hsH2">Core Stacks</h2>
          <div class="hsRule"></div>
        </div>

        ${renderIconMarquee()}
      </div>
    </section>

    <section class="hsSection hsSection--white">
      <div class="container" data-reveal>
        <div class="hsSectionTop">
          <h2 class="hsH2">Proof Points</h2>
          <div class="hsRule"></div>
        </div>

        ${renderKpis()}
      </div>
    </section>

    <section class="hsSection hsSection--white">
      <div class="container" data-reveal>
        <div class="hsSectionTop">
          <h2 class="hsH2">Project Experience</h2>
          <div class="hsRule"></div>
        </div>

        <div class="hsAccordion" id="hsAccordion"></div>
      </div>
    </section>

    <section class="hsSection hsSection--white">
      <div class="container" data-reveal>
        <div class="hsGalleryHead">
          <h2 class="hsH2">Gallery</h2>
          <div class="hsGalleryLine"></div>

          <!-- Styled chips will be rendered here -->
          <div class="hsGalleryFilter" id="hsGalleryFilter" aria-label="Filter gallery by project"></div>
        </div>

        <div class="hsGalleryWrap" id="hsGalleryWrap" aria-label="Project gallery">
          <button class="hsGalleryNav hsGalleryNav--left" id="hsGalleryPrev" type="button" aria-label="Scroll gallery left">
            &#x2039;
          </button>
          <button class="hsGalleryNav hsGalleryNav--right" id="hsGalleryNext" type="button" aria-label="Scroll gallery right">
            &#x203A;
          </button>

          <div class="hsGallery" id="hsGallery" aria-label="Horizontal project gallery">
            <div class="hsGalleryTrack" id="hsGalleryTrack"></div>
          </div>
        </div>
      </div>
    </section>
    <footer class="homeFooter">
      <div class="container homeFooterInner">
        <a class="footerItem" href="mailto:${PROFILE.contact.email}" aria-label="Email">
          <span class="footerIcon" aria-hidden="true">
            <!-- Mail icon -->
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M4 6.5h16v11H4v-11Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="footerText">
            <span class="footerLabel">Email</span>
            <span class="footerValue">${PROFILE.contact.email}</span>
          </span>
        </a>

        <a class="footerItem" href="https://${PROFILE.contact.linkedin}" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <span class="footerIcon" aria-hidden="true">
            <!-- LinkedIn icon -->
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M6.5 10v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M6.5 6.75h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
              <path d="M10.5 18v-4.7c0-1.55.95-2.8 2.6-2.8 1.7 0 2.4 1.2 2.4 2.95V18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="footerText">
            <span class="footerLabel">LinkedIn</span>
            <span class="footerValue">${PROFILE.contact.linkedin}</span>
          </span>
        </a>

        <a class="footerItem" href="https://${PROFILE.contact.github}" target="_blank" rel="noreferrer" aria-label="GitHub">
          <span class="footerIcon" aria-hidden="true">
            <!-- GitHub icon -->
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M12 2.75c-5.1 0-9.25 4.15-9.25 9.25 0 4.1 2.65 7.55 6.3 8.78.46.08.63-.2.63-.45v-1.6c-2.56.56-3.1-1.1-3.1-1.1-.42-1.06-1.03-1.34-1.03-1.34-.84-.58.07-.57.07-.57.93.07 1.42.95 1.42.95.82 1.4 2.14 1 2.66.76.08-.6.32-1 .58-1.23-2.04-.23-4.2-1.02-4.2-4.54 0-1 .36-1.82.95-2.46-.1-.23-.41-1.16.09-2.42 0 0 .78-.25 2.55.94.74-.2 1.53-.3 2.31-.3.78 0 1.57.1 2.31.3 1.77-1.19 2.55-.94 2.55-.94.5 1.26.19 2.19.09 2.42.59.64.95 1.46.95 2.46 0 3.53-2.16 4.3-4.22 4.53.33.28.62.84.62 1.7v2.52c0 .25.17.54.64.45 3.64-1.23 6.28-4.68 6.28-8.78 0-5.1-4.15-9.25-9.25-9.25Z"
                stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="footerText">
            <span class="footerLabel">GitHub</span>
            <span class="footerValue">${PROFILE.contact.github}</span>
          </span>
        </a>
      </div>
    </footer>
  `;

  // Build accordion items (keeps the plus icon aligned, regardless of title length)
  const acc = wrap.querySelector("#hsAccordion");
  PROJECTS.filter((p) => p.id !== "capstone").forEach((p) => acc.appendChild(projectAccordionItem(p)));

  container.appendChild(wrap);

const cleanupReveal = setupReveal(wrap);
const cleanupGalleryUI = setupGalleryUI(wrap);
const cleanupGalleryNav = setupGalleryNav(wrap);
const galleryEl = wrap.querySelector("#hsGallery");

    return () => {
      cleanupReveal?.();
      cleanupGalleryUI?.();
      cleanupGalleryNav?.();
      container.innerHTML = "";
    };
}
