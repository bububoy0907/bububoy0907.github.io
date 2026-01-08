// src/views/home.js
import { PROFILE } from "../content.js";

export function mountHome(container) {
  const wrap = document.createElement("div");
  wrap.className = "home";

  wrap.innerHTML = `
    <section class="hero hero--video">
      <div class="heroMedia" aria-hidden="true">
        <video class="heroVideo" autoplay muted playsinline loop preload="metadata">
          <source src="./assets/media/hero.mp4" type="video/mp4" />
        </video>
        <div class="heroOverlay"></div>
      </div>

      <div class="container heroContent">
        <div class="heroKicker">Portfolio</div>
        <h1 class="heroTitle">${PROFILE.name}</h1>
        <p class="heroSubtitle">${PROFILE.shortIntro}</p>

        <div class="heroCtas">
          
              <a class="hsCta" href="#/for-recruiters" aria-label="Open For Recruiters page">
                <span class="hsCtaInner">
                  <span class="hsCtaLine">For Recruiters</span>
                  <span class="hsCtaLine">For Recruiters</span>
                </span>
              </a>

              <a class="hsCta hsCta--ghost" href="#/traditional" aria-label="Open Main Portfolio page">
                <span class="hsCtaInner">
                  <span class="hsCtaLine">Main Portfolio</span>
                  <span class="hsCtaLine">Main Portfolio</span>
                </span>
              </a>
              
            
        </div>

      </div>
    </section>

    <footer class="homeFooter">
      <div class="container homeFooterInner">
        <div class="footerCol">
          <div class="footerLabel">Email</div>
          <a class="footerLink" href="mailto:${PROFILE.contact.email}">${PROFILE.contact.email}</a>
        </div>
        <div class="footerCol">
          <div class="footerLabel">LinkedIn</div>
          <a class="footerLink" href="https://${PROFILE.contact.linkedin}" target="_blank" rel="noreferrer">${PROFILE.contact.linkedin}</a>
        </div>
        <div class="footerCol">
          <div class="footerLabel">GitHub</div>
          <a class="footerLink" href="https://${PROFILE.contact.github}" target="_blank" rel="noreferrer">${PROFILE.contact.github}</a>
        </div>
      </div>
    </footer>
  `;

  container.appendChild(wrap);

  return () => {
    container.innerHTML = "";
  };
}
