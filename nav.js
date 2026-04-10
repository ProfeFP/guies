/**
 * ProfeFP · nav.js
 * Llibreria de navegació compartida.
 *
 * ÚS: Afegeix una sola línia a cada guia, just abans del </body>:
 *
 *   <script src="../nav.js"></script>
 *
 * Per a guies a l'arrel (no subcarpeta):
 *   <script src="nav.js"></script>
 *
 * El script detecta automàticament la profunditat de ruta
 * i ajusta tots els enllaços.
 *
 * PERSONALITZACIÓ OPCIONAL (afegeix aquests atributs a <body>):
 *   data-pfp-title="Títol de la guia"      → breadcrumb
 *   data-pfp-section="Nom de la secció"    → breadcrumb intermedi
 *   data-pfp-section-url="seccio.html"     → URL de la secció
 *   data-pfp-prev-url="guia-anterior.html" → nav prev
 *   data-pfp-prev-title="Títol anterior"
 *   data-pfp-next-url="guia-seguent.html"  → nav next
 *   data-pfp-next-title="Títol seguent"
 *
 * Exemple:
 *   <body data-pfp-title="GAS · Avançat"
 *         data-pfp-section="Google Apps Script"
 *         data-pfp-section-url="../gas/gas1.html"
 *         data-pfp-prev-url="gas2.html"
 *         data-pfp-prev-title="GAS · Intermedi"
 *         data-pfp-next-url="../index.html"
 *         data-pfp-next-title="Portada">
 */

(function () {
    'use strict';

    /* ── 1. DETECTA PROFUNDITAT DE RUTA ── */
    const depth = (window.location.pathname.match(/\//g) || []).length - 1;
    const root = depth <= 1 ? './' : '../';

    /* ── 2. LLEGEIX METADADES DEL <body> ── */
    const bd = document.body;
    const pageTitle = bd.dataset.pfpTitle || document.title || '';
    const section = bd.dataset.pfpSection || '';
    const sectionUrl = bd.dataset.pfpSectionUrl || '';
    const prevUrl = bd.dataset.pfpPrevUrl || '';
    const prevTitle = bd.dataset.pfpPrevTitle || '';
    const nextUrl = bd.dataset.pfpNextUrl || '';
    const nextTitle = bd.dataset.pfpNextTitle || '';

    /* ── 3. INJECTA FONTS I ESTILS (una sola vegada) ── */
    if (!document.getElementById('pfp-nav-font')) {
        const link = document.createElement('link');
        link.id = 'pfp-nav-font';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap';
        document.head.appendChild(link);
    }

    if (!document.getElementById('pfp-nav-styles')) {
        const style = document.createElement('style');
        style.id = 'pfp-nav-styles';
        style.textContent = `
:root{
  --pfp-bg:#F5F2EC;--pfp-surface:#FDFCF9;--pfp-ink:#1A1814;
  --pfp-muted:#6B6760;--pfp-faint:#B8B5AE;
  --pfp-accent:#2D5BE3;--pfp-accent-s:#EEF2FD;
  --pfp-border:rgba(26,24,20,0.1);
  --pfp-radius:10px;
  --pfp-font:'DM Sans',sans-serif;
}
.pfp-header{
  background:var(--pfp-surface);border-bottom:1px solid var(--pfp-border);
  position:sticky;top:0;z-index:500;font-family:var(--pfp-font);
}
.pfp-header-inner{
  max-width:1200px;margin:0 auto;padding:0 clamp(1.2rem,4vw,4rem);
  height:60px;display:flex;align-items:center;gap:1rem;
}
.pfp-logo{display:flex;align-items:center;gap:9px;text-decoration:none;flex-shrink:0;}
.pfp-logo-mark{
  width:28px;height:28px;background:var(--pfp-ink);border-radius:7px;
  display:flex;align-items:center;justify-content:center;
}
.pfp-logo-mark svg{width:15px;height:15px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
.pfp-logo-name{font-size:14px;font-weight:500;color:var(--pfp-ink);letter-spacing:-.01em;}
.pfp-hsep{width:1px;height:20px;background:var(--pfp-border);margin:0 .3rem;}
.pfp-breadcrumb{
  display:flex;align-items:center;gap:6px;font-size:13px;
  color:var(--pfp-muted);flex:1;min-width:0;
}
.pfp-breadcrumb a{color:var(--pfp-muted);text-decoration:none;transition:color .15s;white-space:nowrap;}
.pfp-breadcrumb a:hover{color:var(--pfp-ink);}
.pfp-bc-sep{color:var(--pfp-faint);font-size:11px;}
.pfp-bc-cur{color:var(--pfp-ink);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.pfp-nav-links{display:flex;align-items:center;gap:.2rem;flex-shrink:0;}
.pfp-nav-links a{
  font-size:12.5px;color:var(--pfp-muted);text-decoration:none;
  padding:5px 10px;border-radius:6px;transition:color .15s,background .15s;
  white-space:nowrap;font-family:var(--pfp-font);
}
.pfp-nav-links a:hover{color:var(--pfp-ink);background:var(--pfp-bg);}
.pfp-btn-home{
  display:flex;align-items:center;gap:5px;font-size:12.5px;
  color:var(--pfp-muted);text-decoration:none;padding:5px 10px;
  border-radius:6px;border:1px solid var(--pfp-border);
  transition:color .15s,background .15s;font-family:var(--pfp-font);
}
.pfp-btn-home:hover{color:var(--pfp-ink);background:var(--pfp-bg);}
.pfp-btn-home svg{width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex-shrink:0;}
.pfp-guide-nav{
  max-width:1200px;margin:4rem auto 0;
  padding:0 clamp(1.2rem,4vw,4rem);
  display:flex;gap:1rem;font-family:var(--pfp-font);
}
.pfp-guide-prev,.pfp-guide-next{
  flex:1;background:var(--pfp-surface);border:1px solid var(--pfp-border);
  border-radius:var(--pfp-radius);padding:1.2rem 1.5rem;text-decoration:none;
  display:flex;align-items:center;gap:1rem;
  transition:transform .2s,box-shadow .2s;
}
.pfp-guide-prev:hover,.pfp-guide-next:hover{
  transform:translateY(-2px);box-shadow:0 6px 24px rgba(26,24,20,.07);
}
.pfp-guide-next{justify-content:flex-end;text-align:right;}
.pfp-g-arrow{
  width:32px;height:32px;border-radius:50%;background:var(--pfp-bg);
  border:1px solid var(--pfp-border);display:flex;align-items:center;
  justify-content:center;font-size:14px;flex-shrink:0;color:var(--pfp-muted);
}
.pfp-g-label{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--pfp-faint);margin-bottom:3px;font-weight:500;}
.pfp-g-title{font-size:14px;font-weight:500;color:var(--pfp-ink);}
.pfp-footer{border-top:1px solid var(--pfp-border);background:var(--pfp-surface);font-family:var(--pfp-font);margin-top:5rem;}
.pfp-footer-grid{
  max-width:1200px;margin:0 auto;
  padding:2.5rem clamp(1.2rem,4vw,4rem) 0;
  display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:2rem;
  padding-bottom:2rem;border-bottom:1px solid var(--pfp-border);
}
.pfp-footer-brand .pfp-logo{margin-bottom:.8rem;display:inline-flex;}
.pfp-footer-tagline{font-size:13px;color:var(--pfp-muted);font-weight:300;line-height:1.6;max-width:260px;}
.pfp-footer-col-title{font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--pfp-faint);margin-bottom:.8rem;}
.pfp-footer-col ul{list-style:none;padding:0;margin:0;}
.pfp-footer-col ul li{margin-bottom:.5rem;}
.pfp-footer-col ul a{font-size:13px;color:var(--pfp-muted);text-decoration:none;font-weight:300;transition:color .15s;}
.pfp-footer-col ul a:hover{color:var(--pfp-ink);}
.pfp-footer-bottom{
  max-width:1200px;margin:0 auto;
  padding:1.2rem clamp(1.2rem,4vw,4rem);
  display:flex;align-items:center;justify-content:space-between;
  font-size:11.5px;color:var(--pfp-faint);font-weight:300;
}
.pfp-footer-bottom a{color:var(--pfp-faint);text-decoration:none;transition:color .15s;}
.pfp-footer-bottom a:hover{color:var(--pfp-muted);}
.pfp-fbot-links{display:flex;gap:1.2rem;}
@media(max-width:860px){
  .pfp-breadcrumb{display:none;}
  .pfp-footer-grid{grid-template-columns:1fr 1fr;}
  .pfp-footer-brand{grid-column:1/-1;}
}
@media(max-width:560px){
  .pfp-nav-links a:not(.pfp-btn-home){display:none;}
  .pfp-footer-grid{grid-template-columns:1fr;}
  .pfp-guide-nav{flex-direction:column;}
}
    `;
        document.head.appendChild(style);
    }

    /* ── 4. ICONES SVG ── */
    const ICON_WAVE = `<svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`;
    const ICON_HOME = `<svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;

    /* ── 5. CONSTRUEIX EL BREADCRUMB ── */
    function buildBreadcrumb() {
        let html = `<a href="${root}index.html">Inici</a>`;
        if (section) {
            const url = sectionUrl || '#';
            html += `<span class="pfp-bc-sep">›</span><a href="${url}">${section}</a>`;
        }
        if (pageTitle) {
            html += `<span class="pfp-bc-sep">›</span><span class="pfp-bc-cur">${pageTitle}</span>`;
        }
        return html;
    }

    /* ── 6. INJECTA LA CAPÇALERA ── */
    function injectHeader() {
        if (document.querySelector('.pfp-header')) return; // ja existeix
        const header = document.createElement('header');
        header.className = 'pfp-header';
        header.setAttribute('role', 'banner');
        header.innerHTML = `
      <div class="pfp-header-inner">
        <a href="${root}index.html" class="pfp-logo" aria-label="ProfeFP — Portada">
          <div class="pfp-logo-mark">${ICON_WAVE}</div>
          <span class="pfp-logo-name">ProfeFP</span>
        </a>
        <div class="pfp-hsep" aria-hidden="true"></div>
        <nav class="pfp-breadcrumb" aria-label="Ruta de navegació">
          ${buildBreadcrumb()}
        </nav>
        <div class="pfp-nav-links">
          <a href="${root}skills.html">Competències</a>
          <a href="${root}equip_IA.html">Equip</a>
          <a href="${root}index.html" class="pfp-btn-home" aria-label="Portada">${ICON_HOME} Portada</a>
        </div>
      </div>`;
        document.body.insertBefore(header, document.body.firstChild);
    }

    /* ── 7. INJECTA NAV PREV/NEXT ── */
    function injectGuideNav() {
        if (!prevUrl && !nextUrl) return;
        if (document.querySelector('.pfp-guide-nav')) return;

        const nav = document.createElement('nav');
        nav.className = 'pfp-guide-nav';
        nav.setAttribute('aria-label', 'Navegació entre guies');

        let html = '';
        if (prevUrl) {
            html += `
        <a href="${prevUrl}" class="pfp-guide-prev">
          <div class="pfp-g-arrow">←</div>
          <div><div class="pfp-g-label">Anterior</div><div class="pfp-g-title">${prevTitle}</div></div>
        </a>`;
        } else {
            html += `<div style="flex:1"></div>`;
        }
        if (nextUrl) {
            html += `
        <a href="${nextUrl}" class="pfp-guide-next">
          <div><div class="pfp-g-label">Següent</div><div class="pfp-g-title">${nextTitle}</div></div>
          <div class="pfp-g-arrow">→</div>
        </a>`;
        }
        nav.innerHTML = html;

        // Insereix just abans del footer si existeix, si no al final del body
        const footer = document.querySelector('.pfp-footer');
        if (footer) {
            document.body.insertBefore(nav, footer);
        } else {
            document.body.appendChild(nav);
        }
    }

    /* ── 8. INJECTA EL PEU ── */
    function injectFooter() {
        if (document.querySelector('.pfp-footer')) return;

        const r = root;
        const footer = document.createElement('footer');
        footer.className = 'pfp-footer';
        footer.setAttribute('role', 'contentinfo');
        footer.innerHTML = `
      <div class="pfp-footer-grid">
        <div class="pfp-footer-brand">
          <a href="${r}index.html" class="pfp-logo">
            <div class="pfp-logo-mark">${ICON_WAVE}</div>
            <span class="pfp-logo-name">ProfeFP</span>
          </a>
          <p class="pfp-footer-tagline">Guies pràctiques d'intel·ligència artificial per a docents de Formació Professional.</p>
        </div>
        <div class="pfp-footer-col">
          <div class="pfp-footer-col-title">Guies principals</div>
          <ul>
            <li><a href="${r}primera_app.html">Primera app amb IA</a></li>
            <li><a href="${r}IA_programar.html">IA per programar</a></li>
            <li><a href="${r}python_colab.html">Python a Colab</a></li>
            <li><a href="${r}plataformes-live-coding.html">Live Coding</a></li>
            <li><a href="${r}trinitat.html">La Trinitat de la IA</a></li>
          </ul>
        </div>
        <div class="pfp-footer-col">
          <div class="pfp-footer-col-title">Sèrie GAS</div>
          <ul>
            <li><a href="${r}gas/gas1.html">GAS · Introducció</a></li>
            <li><a href="${r}gas/gas2.html">GAS · Intermedi</a></li>
            <li><a href="${r}gas/gas3.html">GAS · Avançat</a></li>
          </ul>
        </div>
        <div class="pfp-footer-col">
          <div class="pfp-footer-col-title">Context i equip</div>
          <ul>
            <li><a href="${r}historia.html">Història de la IA</a></li>
            <li><a href="${r}historia2.html">Història de la IA · II</a></li>
            <li><a href="${r}skills.html">Skills docents</a></li>
            <li><a href="${r}equip_IA.html">L'equip</a></li>
            <li><a href="${r}mostra/visor_RSS.html">Visor RSS</a></li>
          </ul>
        </div>
      </div>
      <div class="pfp-footer-bottom">
        <span>© 2025 ProfeFP · Formació Professional</span>
        <div class="pfp-fbot-links">
          <a href="${r}index.html">Portada</a>
          <a href="${r}llibreria.html">Llibreria</a>
          <a href="https://github.com" target="_blank">GitHub ↗</a>
        </div>
      </div>`;
        document.body.appendChild(footer);
    }

    /* ── 9. EXECUTA ── */
    function init() {
        injectHeader();
        injectFooter();
        injectGuideNav(); // ha d'anar després de injectFooter
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();