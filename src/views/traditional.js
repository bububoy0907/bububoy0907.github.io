// traditional.js
import { PROFILE, SKILLS, PROJECTS, RESEARCH, LOOKING_FOR } from "../content.js";

function safeUrl(raw) {
  if (!raw) return null;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `https://${raw}`;
}

function linkChip(text) {
  const a = document.createElement("a");
  a.className = "link";
  a.href = "#";
  a.textContent = text;

  // Placeholder links should not navigate away; replace later with real URLs.
  a.addEventListener("click", (e) => e.preventDefault());
  return a;
}

function chip(text, variant = "") {
  const s = document.createElement("span");
  s.className = `chip ${variant}`.trim();
  s.textContent = text;
  return s;
}

function pill(text) {
  const s = document.createElement("span");
  s.className = "pill";
  s.textContent = text;
  return s;
}

function projectCard(p) {
  const el = document.createElement("article");
  el.className = "projectCard";

  el.innerHTML = `
    <div class="projectHead">
      <h3 class="projectTitle">${p.name}</h3>
      <span class="projectPeriod">${p.period ?? ""}</span>
    </div>

    <p class="meta">${p.oneLiner}</p>

    <div class="kv">
      <div class="kvRow">
        <div class="kvLabel">Responsibilities</div>
        <ul class="bullets">
          ${p.responsibilities.map(r => `<li>${r}</li>`).join("")}
        </ul>
      </div>

      <div class="kvRow">
        <div class="kvLabel">Tech</div>
        <div class="chipRow">
          ${p.tech.map(t => `<span class="chip chip--tech">${t}</span>`).join("")}
        </div>
      </div>
    </div>

    <div class="linksRow" aria-label="Project links">
      <span class="linksLabel">Links</span>
      <div class="linkChips"></div>
    </div>
  `;

  // Build thumbnail with JS so we can:
  // - show full image (contain)
  // - detect portrait vs landscape
  // - handle missing image gracefully
  const thumb = document.createElement("div");
  thumb.className = "thumb";

  const img = document.createElement("img");
  img.src = p.screenshot;
  img.alt = `Screenshot for ${p.name}`;
  img.loading = "lazy";
  img.decoding = "async";

  img.addEventListener("load", () => {
    // Portrait detection: taller than it is wide (with some tolerance)
    const ratio = img.naturalHeight / Math.max(1, img.naturalWidth);
    const isPortrait = ratio > 1.15;
    thumb.classList.toggle("thumb--portrait", isPortrait);
  }, { once: true });

  img.addEventListener("error", () => {
    img.remove();
    thumb.textContent = "[Screenshot Placeholder]";
  }, { once: true });

  // Optional: open screenshot in a new tab for full-size view
  img.addEventListener("click", () => {
    window.open(img.src, "_blank", "noopener,noreferrer");
  });

  thumb.appendChild(img);

  // Insert thumb before links
  const linksRow = el.querySelector(".linksRow");
  el.insertBefore(thumb, linksRow);

  // Links
  const linkWrap = el.querySelector(".linkChips");
  linkWrap.appendChild(linkChip(p.links.repo));
  linkWrap.appendChild(linkChip(p.links.demo));
  linkWrap.appendChild(linkChip(p.links.caseStudy));
  linkWrap.appendChild(linkChip(p.links.readme));

  return el;
}

function skillGroup(label, items) {
  const wrap = document.createElement("div");
  wrap.className = "skillGroup";

  const left = document.createElement("div");
  left.className = "skillLabel";
  left.textContent = label;

  const right = document.createElement("div");
  right.className = "skillPills";
  items.forEach((x) => right.appendChild(chip(x, "chip--skill")));

  wrap.appendChild(left);
  wrap.appendChild(right);
  return wrap;
}

export function mountTraditional(container) {
  const wrap = document.createElement("div");
  wrap.className = "container";

  // HERO
  const header = document.createElement("section");
  header.className = "card hero";
  header.innerHTML = `
    <h1 class="h1">${PROFILE.name}</h1>

    <div class="pills">
      <span class="pill">${PROFILE.titlePrimary}</span>
      <span class="pill">${PROFILE.location}</span>
      <span class="pill">${PROFILE.education}</span>
    </div>

    <p class="heroIntro">${PROFILE.shortIntro}</p>
  `;
  wrap.appendChild(header);

  // ABOUT
  const about = document.createElement("section");
  about.className = "card section section--about";
  about.id = "about";
  about.innerHTML = `
    <h2>About</h2>
    <p>
      I am a BSc in Computing graduate from The Hong Kong Polytechnic University (Second-Class Honours, May 2025).
      I enjoy taking ideas from concept to a working product with clear engineering discipline—prioritizing correctness,
      performance, maintainability, and documentation. My experience spans modern web (TypeScript/JavaScript),
      real-time 3D/simulation (Unity/C#), and operational thinking shaped by running live services with meaningful user concurrency.
    </p>
  `;
  wrap.appendChild(about);

  // PROJECTS
  const projects = document.createElement("section");
  projects.className = "card section section--projects";
  projects.id = "projects";
  projects.innerHTML = `<h2>Project Experience</h2>`;
  const grid = document.createElement("div");
  grid.className = "projectGrid";
  PROJECTS.forEach((p) => grid.appendChild(projectCard(p)));
  projects.appendChild(grid);
  wrap.appendChild(projects);

  // SKILLS (resume-like pills)
  const skills = document.createElement("section");
  skills.className = "card section section--skills";
  skills.id = "skills";
  skills.innerHTML = `<h2>Skills / Tech Stack</h2>`;
  const skillWrap = document.createElement("div");
  skillWrap.className = "skillsWrap";
  skillWrap.appendChild(skillGroup("Languages", SKILLS.languages));
  skillWrap.appendChild(skillGroup("Web", SKILLS.web));
  skillWrap.appendChild(skillGroup("Systems/Tools", SKILLS.systems));
  skillWrap.appendChild(skillGroup("Additionals", SKILLS.additionals));
  skills.appendChild(skillWrap);
  wrap.appendChild(skills);

  // RESEARCH
  const research = document.createElement("section");
  research.className = "card section section--research";
  research.id = "research";
  research.innerHTML = `
    <h2>Research</h2>
    <ul class="bullets">
      ${RESEARCH.map(r => `<li><strong>${r.title}</strong> — ${r.note}</li>`).join("")}
    </ul>
  `;
  wrap.appendChild(research);

  // WHAT I'M LOOKING FOR
  const looking = document.createElement("section");
  looking.className = "card section section--looking";
  looking.id = "looking";
  looking.innerHTML = `
    <h2>What I’m Looking For</h2>
    <p>${LOOKING_FOR.text}</p>
  `;
  wrap.appendChild(looking);

  // CONTACT
  const contact = document.createElement("section");
  contact.className = "card section section--contact";
  contact.id = "contact";
  const email = PROFILE.contact.email;
  const linkedin = safeUrl(PROFILE.contact.linkedin);
  const github = safeUrl(PROFILE.contact.github);
  contact.innerHTML = `
    <h2>Contact</h2>
    <div class="contactGrid">
      <div class="contactRow">
        <span class="kvLabelInline">Email: </span>
        <a class="contactLink" href="mailto:${email}">${email}</a>
      </div>

      <div class="contactRow">
        <span class="kvLabelInline">LinkedIn: </span>
        <a class="contactLink" href="${linkedin}" target="_blank" rel="noreferrer">
          ${PROFILE.contact.linkedin}
        </a>
      </div>

      <div class="contactRow">
        <span class="kvLabelInline">GitHub: </span>
        <a class="contactLink" href="${github}" target="_blank" rel="noreferrer">
          ${PROFILE.contact.github}
        </a>
      </div>
    </div>
  `;
  wrap.appendChild(contact);

  container.appendChild(wrap);

  return () => {
    container.innerHTML = "";
  };
}
