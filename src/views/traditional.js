import { PROFILE, SKILLS, PROJECTS } from "../content.js";

function linkChip(text) {
  const a = document.createElement("a");
  a.className = "link";
  a.href = "#";
  a.textContent = text;
  // Placeholder links should not navigate away; you will replace later.
  a.addEventListener("click", (e) => e.preventDefault());
  return a;
}

function projectCard(p) {
  const el = document.createElement("article");
  el.className = "projectCard";
  el.innerHTML = `
    <h3>${p.name}</h3>
    <p class="meta">${p.oneLiner}</p>

    <div class="kv">
      <div><strong>Responsibilities:</strong> ${p.responsibilities.join("; ")}</div>
      <div><strong>Tech:</strong> ${p.tech.map(t => `<code>${t}</code>`).join(" ")}</div>
      <div><strong>Outcomes:</strong> ${p.outcomes.join(" · ")}</div>
    </div>

    <div class="thumb" role="img" aria-label="Project screenshot placeholder">
      <img src="${p.screenshot}" alt="Screenshot placeholder for ${p.name}"
           onerror="this.remove(); this.parentElement.textContent='[Screenshot Placeholder]';" />
    </div>

    <div class="links" aria-label="Project links">
      <span class="mini" style="margin-right:6px;">Links:</span>
    </div>
  `;

  const links = el.querySelector(".links");
  links.appendChild(linkChip(p.links.repo));
  links.appendChild(linkChip(p.links.demo));
  links.appendChild(linkChip(p.links.caseStudy));
  links.appendChild(linkChip(p.links.readme));
  return el;
}

export function mountTraditional(container) {
  const wrap = document.createElement("div");
  wrap.className = "container";

  const header = document.createElement("section");
  header.className = "card hero";
  header.innerHTML = `
    <h1 class="h1">Traditional Portfolio View</h1>
    <p class="sub">
      A recruiter-friendly landing page with projects, responsibilities, tech stack, outcomes, and media placeholders.
    </p>
    <div class="pills">
      <span class="pill">${PROFILE.titlePrimary}</span>
      <span class="pill">${PROFILE.location}</span>
      <span class="pill">${PROFILE.education}</span>
    </div>
  `;
  wrap.appendChild(header);

  const about = document.createElement("section");
  about.className = "card section";
  about.innerHTML = `
    <h2>About</h2>
    <p><strong>${PROFILE.name}</strong> — ${PROFILE.titlePrimary} (secondary: ${PROFILE.titleSecondary}).</p>
    <p>${PROFILE.shortIntro}</p>
    <p class="mini">
      Contact placeholders: Email ${PROFILE.contact.email} · LinkedIn ${PROFILE.contact.linkedin}
    </p>
  `;
  wrap.appendChild(about);

  const projects = document.createElement("section");
  projects.className = "card section";
  projects.innerHTML = `<h2>Featured Projects</h2><p>Four projects that reflect web + 3D + systems ownership.</p>`;
  const grid = document.createElement("div");
  grid.className = "projectGrid";
  PROJECTS.forEach((p) => grid.appendChild(projectCard(p)));
  projects.appendChild(grid);
  wrap.appendChild(projects);

  const skills = document.createElement("section");
  skills.className = "card section";
  skills.innerHTML = `
    <h2>Skills / Tech Stack</h2>
    <p><strong>Languages</strong>: ${SKILLS.languages.join(", ")}</p>
    <p><strong>Web</strong>: ${SKILLS.web.join(", ")}</p>
    <p><strong>Systems/Tools</strong>: ${SKILLS.systems.join(", ")}</p>
    <p><strong>3D/Simulation</strong>: ${SKILLS.simulation.join(", ")}</p>
  `;
  wrap.appendChild(skills);

  const proof = document.createElement("section");
  proof.className = "card section";
  proof.innerHTML = `
    <h2>Proof of Work / Demos</h2>
    <p>
      Some content is shared as <strong>case studies</strong> when source code is private or not ready.
      Use placeholders until you publish the artifacts.
    </p>
    <ul class="mini" style="line-height:1.7;">
      <li>WebAR Delivery: <strong>[Demo Video Coming Soon]</strong> · <strong>[Screenshots Folder]</strong></li>
      <li>Unity Internship: <strong>[Request Access / Private Repo]</strong> · <strong>[Screenshots Folder]</strong></li>
      <li>WishCraft Ops: <strong>[Case Study]</strong> · <strong>[Architecture Notes]</strong></li>
      <li>PetMatch: <strong>[Repo Link]</strong> · <strong>[Readme]</strong></li>
    </ul>
  `;
  wrap.appendChild(proof);

  container.appendChild(wrap);

  return () => {
    container.innerHTML = "";
  };
}
