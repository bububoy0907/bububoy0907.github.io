// src/views/forRecruiters.js
import { PROFILE, PROJECTS, SKILLS } from "../content.js";

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
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

function setupGalleryPan(gallery) {
  const track = gallery.querySelector(".hsGalleryTrack");
  if (!track) return () => {};

  const onScroll = () => {
    const gRect = gallery.getBoundingClientRect();
    const gCenter = gRect.left + gRect.width / 2;

    gallery.querySelectorAll(".hsSlide").forEach((slide) => {
      const r = slide.getBoundingClientRect();
      const sCenter = r.left + r.width / 2;

      // -1 .. 1 (left..right)
      const raw = (sCenter - gCenter) / (gRect.width / 2);
      const progress = clamp(raw, -1, 1);

      // Use CSS variable to pan inner media
      slide.style.setProperty("--pan", String(progress));
    });
  };

  gallery.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  requestAnimationFrame(onScroll);

  return () => {
    gallery.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}

function projectAccordionItem(p) {
  const li = document.createElement("div");
  li.className = "hsAccItem";
  li.innerHTML = `
    <details class="hsDetails">
      <summary class="hsSummary">
        <span class="hsSummaryTitle">${p.name}</span>
        <span class="hsSummaryIcon" aria-hidden="true"></span>
      </summary>

      <div class="hsAccBody">
        <div class="hsAccMeta">
          <div class="hsAccPeriod">${p.period ?? ""}</div>
          <div class="hsAccOneLiner">${p.oneLiner ?? ""}</div>
        </div>

        <div class="hsAccGrid">
          <div>
            <div class="hsAccLabel">Responsibilities</div>
            <ul class="hsAccBullets">
              ${p.responsibilities.map((x) => `<li>${x}</li>`).join("")}
            </ul>
          </div>

          <div>
            <div class="hsAccLabel">Tech</div>
            <div class="hsChipRow">
              ${p.tech.map((t) => `<span class="hsChip">${t}</span>`).join("")}
            </div>
          </div>
        </div>
      </div>
    </details>
  `;
  return li;
}

export function mountForRecruiters(container) {
  const wrap = document.createElement("div");
  wrap.className = "forRecruiters";

  // A simple “Wix-style” sectioning approach:
  // - video hero
  // - white sections with thin dividers
  wrap.innerHTML = `
    <section class="hero hero--video hero--tight">
      <div class="heroMedia" aria-hidden="true">
        <video class="heroVideo" autoplay muted playsinline loop preload="metadata" poster="./assets/media/creators-poster.jpg">
          <source src="./assets/media/creators.mp4" type="video/mp4" />
          <source src="./assets/media/creators.webm" type="video/webm" />
        </video>
        <div class="heroOverlay heroOverlay--soft"></div>
      </div>

      <div class="container heroContent">
        <div class="heroKicker">For Recruiters</div>
        <h1 class="heroTitle">Fast signal, low noise</h1>
        <p class="heroSubtitle">
          ${PROFILE.shortIntro}
        </p>

        <div class="kpiRow" data-reveal>
          <div class="kpi">
            <div class="kpiValue">2,000+</div>
            <div class="kpiLabel">Concurrent users (WebAR)</div>
          </div>
          <div class="kpi">
            <div class="kpiValue">70+</div>
            <div class="kpiLabel">Driving-rule detections (Unity)</div>
          </div>
          <div class="kpi">
            <div class="kpiValue">7,000</div>
            <div class="kpiLabel">Registrations (MMORPG ops)</div>
          </div>
        </div>

        <div class="heroCtas" data-reveal>
          <a class="hsCta" href="#/traditional" aria-label="Open Main Portfolio">
            <span class="hsCtaInner">
              <span class="hsCtaLine">View Main Portfolio</span>
              <span class="hsCtaLine">View Main Portfolio</span>
            </span>
          </a>
          <a class="hsCta hsCta--ghost" href="#/contact" aria-label="Open Contact">
            <span class="hsCtaInner">
              <span class="hsCtaLine">Contact</span>
              <span class="hsCtaLine">Contact</span>
            </span>
          </a>
        </div>
      </div>
    </section>

    <section class="hsSection hsSection--white">
      <div class="container" data-reveal>
        <div class="hsSectionTop">
          <h2 class="hsH2">Core stack</h2>
          <div class="hsRule"></div>
        </div>

        <div class="hsMarquee" aria-label="Tech marquee">
          <div class="hsMarqueeTrack">
            ${[...SKILLS.languages, ...SKILLS.web, ...SKILLS.systems].map((x) => `<span class="hsLogo">${x}</span>`).join("")}
            ${[...SKILLS.languages, ...SKILLS.web, ...SKILLS.systems].map((x) => `<span class="hsLogo">${x}</span>`).join("")}
          </div>
        </div>

        <p class="hsBody">
          Replace these text “logos” with SVG icons later (Simple Icons, custom SVG, or your own badges).
        </p>
      </div>
    </section>

    <section class="hsSection hsSection--white">
      <div class="container" data-reveal>
        <div class="hsSectionTop">
          <h2 class="hsH2">Project experience</h2>
          <div class="hsRule"></div>
        </div>

        <div class="hsAccordion" id="hsAccordion"></div>
      </div>
    </section>

    <section class="hsSection hsSection--white">
      <div class="container" data-reveal>
        <div class="hsSectionTop">
          <h2 class="hsH2">Gallery</h2>
          <div class="hsRule"></div>
        </div>

        <div class="hsGallery" id="hsGallery" aria-label="Horizontal project gallery">
          <div class="hsGalleryTrack">
            ${PROJECTS.map((p) => `
              <figure class="hsSlide">
                <div class="hsSlideMedia">
                  <img src="${p.screenshot}" alt="Screenshot: ${p.name}" loading="lazy" decoding="async"/>
                </div>
                <figcaption class="hsSlideCap">${p.name}</figcaption>
              </figure>
            `).join("")}
          </div>
        </div>

        <p class="hsMini">
          Tip: Trackpad horizontal scroll feels best. This is intentionally a separate horizontal scroll region.
        </p>
      </div>
    </section>
  `;

  // Build accordion items (keeps the plus icon aligned, regardless of title length)
  const acc = wrap.querySelector("#hsAccordion");
  PROJECTS.forEach((p) => acc.appendChild(projectAccordionItem(p)));

  container.appendChild(wrap);

  const cleanupReveal = setupReveal(wrap);
  const cleanupPan = setupGalleryPan(wrap.querySelector("#hsGallery"));

  return () => {
    cleanupReveal?.();
    cleanupPan?.();
    container.innerHTML = "";
  };
}
