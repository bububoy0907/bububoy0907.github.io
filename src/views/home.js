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
                  <span class="hsCtaLine" style="color:#000;">For Recruiters</span>
                  <span class="hsCtaLine" style="color:#000;">For Recruiters</span>
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
        <a class="footerItem" href="mailto:${PROFILE.contact.email}" aria-label="Email">
          <span class="footerIcon" aria-hidden="true">
            <!-- Mail icon -->
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M4 6.5h16v11H4v-11Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              <path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="footerText">
            <span class="footerLabel">Email</span>
            <span class="footerValue">${PROFILE.contact.email}</span>
          </span>
        </a>

        <a class="footerItem" href="https://${PROFILE.contact.linkedin}" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <span class="footerIcon" aria-hidden="true">
            <!-- LinkedIn icon -->
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M6.5 10v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M6.5 6.75h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
              <path d="M10.5 18v-4.7c0-1.55.95-2.8 2.6-2.8 1.7 0 2.4 1.2 2.4 2.95V18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="footerText">
            <span class="footerLabel">LinkedIn</span>
            <span class="footerValue">${PROFILE.contact.linkedin}</span>
          </span>
        </a>

        <a class="footerItem" href="https://${PROFILE.contact.github}" target="_blank" rel="noreferrer" aria-label="GitHub">
          <span class="footerIcon" aria-hidden="true">
            <!-- GitHub icon -->
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M12 2.75c-5.1 0-9.25 4.15-9.25 9.25 0 4.1 2.65 7.55 6.3 8.78.46.08.63-.2.63-.45v-1.6c-2.56.56-3.1-1.1-3.1-1.1-.42-1.06-1.03-1.34-1.03-1.34-.84-.58.07-.57.07-.57.93.07 1.42.95 1.42.95.82 1.4 2.14 1 2.66.76.08-.6.32-1 .58-1.23-2.04-.23-4.2-1.02-4.2-4.54 0-1 .36-1.82.95-2.46-.1-.23-.41-1.16.09-2.42 0 0 .78-.25 2.55.94.74-.2 1.53-.3 2.31-.3.78 0 1.57.1 2.31.3 1.77-1.19 2.55-.94 2.55-.94.5 1.26.19 2.19.09 2.42.59.64.95 1.46.95 2.46 0 3.53-2.16 4.3-4.22 4.53.33.28.62.84.62 1.7v2.52c0 .25.17.54.64.45 3.64-1.23 6.28-4.68 6.28-8.78 0-5.1-4.15-9.25-9.25-9.25Z"
                stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="footerText">
            <span class="footerLabel">GitHub</span>
            <span class="footerValue">${PROFILE.contact.github}</span>
          </span>
        </a>
      </div>
    </footer>
  `;

  container.appendChild(wrap);

  return () => {
    container.innerHTML = "";
  };
}
