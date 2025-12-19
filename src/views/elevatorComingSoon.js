export function mountElevatorComingSoon(container) {
  container.innerHTML = `
    <div class="container">
      <section class="card hero">
        <h1 class="h1">3D Elevator View</h1>
        <p class="sub">
          Coming soon. I’m prioritizing job applications and shipping a clean, recruiter-friendly portfolio first.
        </p>

        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:12px;">
          <a class="btn" href="#/traditional">View Traditional Portfolio</a>
          <a class="btn" href="#/home">Back to Home</a>
        </div>
      </section>

      <section class="card" style="margin-top:14px;">
        <h2 class="h2">What will be here later</h2>
        <ul class="mini" style="line-height:1.7;">
          <li>Interactive elevator buttons for: About / Projects / Skills / Demos / Contact</li>
          <li>Door open/close + floor indicator animation</li>
          <li>In-view content panel (no popups)</li>
        </ul>

        <hr class="smallHr"/>

        <p class="mini">
          For now, the full portfolio content is available in the Traditional view.
        </p>
      </section>
    </div>
  `;
}
