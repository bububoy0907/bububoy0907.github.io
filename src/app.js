import { getHashRoute, onRouteChange, setHashRoute } from "./router.js";
import { mountHome } from "./views/home.js";
import { mountTraditional } from "./views/traditional.js";
import { mountElevator } from "./views/elevator.js";

const routes = {
  "/": mountHome,
  "/traditional": mountTraditional,
  "/room": mountElevator
};

function makeShell() {
  const shell = document.createElement("div");

  shell.innerHTML = `
    <header class="topbar">
      <div class="container">
        <div class="nav">
          <div class="brand">
            <strong>Jason Wong</strong>
            <span>Portfolio • GitHub Pages</span>
          </div>
          <nav class="navlinks" aria-label="Primary navigation">
            <a href="#/" data-nav="/" class="navlink">Home</a>
            <a href="#/traditional" data-nav="/traditional" class="navlink">Traditional</a>
            <a href="#/room" data-nav="/room" class="navlink">3D Room</a>
          </nav>
        </div>
      </div>
    </header>
    <main id="main"></main>
  `;

  return shell;
}

function setActiveNav(path) {
  document.querySelectorAll(".navlink").forEach((a) => {
    const p = a.getAttribute("data-nav");
    a.classList.toggle("active", p === path);
  });
}

let unmount = null;

function render() {
  const path = getHashRoute();
  const main = document.getElementById("main");
  if (!main) return;

  if (unmount) unmount();
  main.innerHTML = "";

  const mount = routes[path] || routes["/"];
  setActiveNav(routes[path] ? path : "/");

  unmount = mount(main);
}

const app = document.getElementById("app");
app.appendChild(makeShell());

// Default route
if (!window.location.hash) setHashRoute("/");

render();
onRouteChange(render);
