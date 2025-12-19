import { setHashRoute } from "../router.js";
import { PROFILE } from "../content.js";

function attachCreativePointerGlow(el) {
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
  });
}

export function mountHome(container) {
  const wrap = document.createElement("div");
  wrap.className = "container";

  const card = document.createElement("section");
  card.className = "card hero";

  card.innerHTML = `
    <h1 class="h1">${PROFILE.name}</h1>
    <p class="sub">
      ${PROFILE.shortIntro}
    </p>

    <div class="pills">
      <span class="pill">${PROFILE.titlePrimary}</span>
      <span class="pill">${PROFILE.titleSecondary}</span>
      <span class="pill">${PROFILE.location}</span>
      <span class="pill">${PROFILE.education}</span>
    </div>

    <div class="ctaRow">
      <button class="btn btnPrimary btnCreative" data-route="/traditional" aria-label="Open traditional portfolio view">
        Traditional View
        <span style="opacity:.78;font-weight:600;">→</span>
      </button>

      <button class="btn btnCreative" data-route="/room" aria-label="Open interactive 3D portfolio view">
        Interactive 3D Room
        <span style="opacity:.78;font-weight:600;">→</span>
      </button>
    </div>

    <div class="section" style="margin-top:18px;">
      <h2>How to use this portfolio</h2>
      <p>
        Use <strong>Traditional View</strong> for a recruiter-friendly scan of projects, outcomes, and screenshots.
        Use <strong>Interactive 3D Room</strong> to explore by clicking objects on the desk (Computer for projects, ID card for personal info).
      </p>
      <p class="mini">
        Tip: If WebGL performance is limited on your device, the Traditional View is the fastest way to review.
      </p>
    </div>
  `;

  wrap.appendChild(card);
  container.appendChild(wrap);

  const buttons = card.querySelectorAll("button[data-route]");
  buttons.forEach((btn) => {
    attachCreativePointerGlow(btn);
    btn.addEventListener("click", () => setHashRoute(btn.dataset.route));
  });

  return () => {
    container.innerHTML = "";
  };
}
