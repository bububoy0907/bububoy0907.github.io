// src/views/contact.js
import { PROFILE } from "../content.js";

const CONTACTS = [
  {
    key: "hiring",
    label: "Hiring / Recruiters",
    title: "Hiring",
    lines: [
      { k: "Email", v: PROFILE.contact.email, href: `mailto:${PROFILE.contact.email}` },
      { k: "LinkedIn", v: PROFILE.contact.linkedin, href: `https://${PROFILE.contact.linkedin}` },
    ],
  },
  {
    key: "engineering",
    label: "Technical questions",
    title: "Engineering",
    lines: [
      { k: "GitHub", v: PROFILE.contact.github, href: `https://${PROFILE.contact.github}` },
      { k: "Email", v: PROFILE.contact.email, href: `mailto:${PROFILE.contact.email}` },
    ],
  },
  {
    key: "general",
    label: "General inquiry",
    title: "General",
    lines: [
      { k: "Email", v: PROFILE.contact.email, href: `mailto:${PROFILE.contact.email}` },
      { k: "LinkedIn", v: PROFILE.contact.linkedin, href: `https://${PROFILE.contact.linkedin}` },
      { k: "GitHub", v: PROFILE.contact.github, href: `https://${PROFILE.contact.github}` },
    ],
  },
];

function renderPanel(panel, item) {
  panel.innerHTML = `
    <div class="contactPanelTitle">${item.title}</div>
    <div class="contactPanelGrid">
      ${item.lines
        .map(
          (x) => `
          <div class="contactRow contactRow--center">
            <div class="contactKey">${x.k}</div>
            <div class="contactVal">
              <a href="${x.href}"
                 target="${x.href.startsWith("mailto:") ? "" : "_blank"}"
                 rel="noreferrer">${x.v}</a>
            </div>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

export function mountContact(container) {
    document.body.classList.add("themeContact");
  const wrap = document.createElement("div");
  wrap.className = "contactPage";

  wrap.innerHTML = `
    <div class="container contactWrap">
      <div class="contactHead">
        <h1 class="hsH2">Contact</h1>
        <div class="hsRule"></div>
        <p class="hsBody">Please select your best-fit category</p>
      </div>

      <div class="contactChooser" role="tablist" aria-label="Contact categories"></div>
      <div class="contactPanel" id="contactPanel" aria-live="polite"></div>
    </div>
  `;

  const chooser = wrap.querySelector(".contactChooser");
  const panel = wrap.querySelector("#contactPanel");

  CONTACTS.forEach((c, idx) => {
    const btn = document.createElement("button");
    btn.className = "contactTab contactTab--center";
    btn.type = "button";
    btn.textContent = c.label;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", idx === 0 ? "true" : "false");

    btn.addEventListener("click", () => {
      chooser.querySelectorAll(".contactTab").forEach((b) => {
        b.setAttribute("aria-selected", "false");
        b.classList.remove("active");
      });
      btn.setAttribute("aria-selected", "true");
      btn.classList.add("active");
      renderPanel(panel, c);
    });

    if (idx === 0) btn.classList.add("active");
    chooser.appendChild(btn);
  });

  renderPanel(panel, CONTACTS[0]);
  container.appendChild(wrap);

  return () => {
    document.body.classList.remove("themeContact");
    container.innerHTML = "";
  };
}
