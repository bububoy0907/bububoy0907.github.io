export function getHashRoute() {
  const raw = window.location.hash || "#/";
  const path = raw.replace(/^#/, "");
  // Normalize: "" => "/"
  return path.trim() === "" ? "/" : path;
}

export function setHashRoute(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  window.location.hash = `#${normalized}`;
}

export function onRouteChange(handler) {
  window.addEventListener("hashchange", handler);
  return () => window.removeEventListener("hashchange", handler);
}
