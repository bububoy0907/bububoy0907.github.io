// src/app.js
import { getHashRoute, onRouteChange, setHashRoute } from "./router.js";
import { mountHome } from "./views/home.js";
import { mountTraditional } from "./views/traditional.js";
import { mountForRecruiters } from "./views/forRecruiters.js";
import { mountContact } from "./views/contact.js";

const routes = {
  "/": mountHome,
  "/traditional": mountTraditional,
  "/for-recruiters": mountForRecruiters,
  "/contact": mountContact,
};

function makeShell() {
  const shell = document.createElement("div");

  shell.innerHTML = `
    <header class="topbar topbar--overlay" id="topbar">
      <div class="container topbarRow">
        <a class="brandLink" href="#/" aria-label="Go to Home">
          <span class="brandName">Jason Wong</span>
        </a>

        <button class="menuBtn" id="menuBtn" aria-expanded="false" aria-controls="menuOverlay">
          <span class="menuBtnText">Menu</span>
          <span class="menuIcon" aria-hidden="true"></span>
        </button>
      </div>
    </header>

    <div class="scrollProgress" aria-hidden="true">
      <div class="scrollProgressBar" id="scrollProgressBar"></div>
    </div>

    <div class="menuOverlay" id="menuOverlay" aria-hidden="true">
      <div class="menuPanel" role="dialog" aria-modal="true" aria-label="Site menu">
        <div class="menuPanelTop">
          <div class="menuPanelBrand">Jason Wong</div>
          <button class="menuClose" id="menuClose" aria-label="Close menu">Close</button>
        </div>

        <nav class="menuNav" aria-label="Menu">
          <a class="menuLink" href="#/" data-nav="/">Home</a>
          <a class="menuLink" href="#/for-recruiters" data-nav="/for-recruiters">For Recruiters</a>
          <a class="menuLink" href="#/traditional" data-nav="/traditional">Main Portfolio</a>
          <a class="menuLink" href="#/contact" data-nav="/contact">Contact</a>
        </nav>

        <div class="menuHint">Tap anywhere to close</div>
      </div>
    </div>

    <main id="main"></main>
  `;

  return shell;
}

function setActiveNav(path) {
  document.querySelectorAll(".menuLink[data-nav]").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("data-nav") === path);
  });
}

function setupMenu() {
  const overlay = document.getElementById("menuOverlay");
  const btn = document.getElementById("menuBtn");
  const close = document.getElementById("menuClose");

  const closeMenu = () => {
    document.body.classList.remove("menuOpen");
    btn?.setAttribute("aria-expanded", "false");
    overlay?.setAttribute("aria-hidden", "true");
  };

  const openMenu = () => {
    document.body.classList.add("menuOpen");
    btn?.setAttribute("aria-expanded", "true");
    overlay?.setAttribute("aria-hidden", "false");
    overlay?.querySelector(".menuPanel")?.focus?.();
  };

  btn?.addEventListener("click", () => {
    const isOpen = document.body.classList.contains("menuOpen");
    isOpen ? closeMenu() : openMenu();
  });

  close?.addEventListener("click", closeMenu);

  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) closeMenu();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Close menu after navigation
  document.querySelectorAll(".menuLink").forEach((a) => {
    a.addEventListener("click", () => closeMenu());
  });

  return { openMenu, closeMenu };
}

let unmount = null;

function setTopbarMode(mode) {
  const topbar = document.getElementById("topbar");
  if (!topbar) return;

  topbar.classList.toggle("topbar--overlay", mode === "overlay");
  topbar.classList.toggle("topbar--solidDark", mode === "solidDark");
  topbar.classList.toggle("topbar--solidLight", mode === "solidLight");
}

function setupScrollProgress() {
  const bar = document.getElementById("scrollProgressBar");
  if (!bar) return;

  let rafId = null;

  const update = () => {
    rafId = null;

    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop || 0;
    const scrollHeight = doc.scrollHeight || document.body.scrollHeight || 0;
    const clientHeight = doc.clientHeight || window.innerHeight || 0;

    const max = Math.max(1, scrollHeight - clientHeight);
    const progress = Math.min(1, Math.max(0, scrollTop / max));

    bar.style.width = (progress * 100).toFixed(3) + "%";
  };

  const onScroll = () => {
    if (rafId) return;
    rafId = requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  // Update now + also after route changes (content height changes)
  update();

  return {
    update,
    destroy: () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    },
  };
}

function render() {
  const path = getHashRoute();
  const main = document.getElementById("main");
  if (!main) return;

  if (unmount) unmount();
  main.innerHTML = "";

  const mount = routes[path] || routes["/"];
  const resolvedPath = routes[path] ? path : "/";

  document.body.dataset.page = resolvedPath.replace("/", "") || "home";
  setActiveNav(resolvedPath);

  // Default topbar behavior; views can override via data attributes/sentinels if needed
  setTopbarMode(resolvedPath === "/" ? "overlay" : "solidDark");
  scrollProgress?.update?.();
  
  unmount = mount(main);
}

const app = document.getElementById("app");
app.appendChild(makeShell());
const scrollProgress = setupScrollProgress();
setupMenu();

// Default route -> home
if (!window.location.hash) setHashRoute("/");

render();
onRouteChange(render);
