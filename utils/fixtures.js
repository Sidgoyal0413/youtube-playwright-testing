// Custom test fixture: adds on-screen visuals so you can SEE what the test is doing.
//  - Top banner with the current test-case name
//  - Fake mouse cursor (red dot) that follows Playwright's mouse
//  - Ripple animation on every click
//  - Yellow outline on whichever element is being typed into / focused
const base = require('@playwright/test');

const test = base.test.extend({
  page: async ({ page }, use, testInfo) => {
    await page.addInitScript((title) => {
      if (window.top !== window) return;
      const init = () => {
        if (document.getElementById('__pw_banner')) return;
        const mk = (id, css) => {
          const el = document.createElement('div');
          el.id = id;
          Object.assign(el.style, css);
          document.documentElement.appendChild(el);
          return el;
        };
        const banner = mk('__pw_banner', {
          position: 'fixed', top: '0', left: '0', right: '0', zIndex: '2147483647',
          background: '#1e1e2e', color: '#fff', font: 'bold 14px Arial', padding: '6px 12px',
          textAlign: 'center', pointerEvents: 'none', borderBottom: '3px solid #e11d48',
        });
        banner.textContent = '\u25B6 Playwright Test: ' + title;

        const cursor = mk('__pw_cursor', {
          position: 'fixed', width: '18px', height: '18px', borderRadius: '50%',
          background: 'rgba(225,29,72,.85)', border: '2px solid #fff', zIndex: '2147483647',
          pointerEvents: 'none', transform: 'translate(-50%,-50%)', left: '-50px', top: '-50px',
          transition: 'left .05s linear, top .05s linear',
        });
        document.addEventListener('mousemove', (e) => {
          cursor.style.left = e.clientX + 'px';
          cursor.style.top = e.clientY + 'px';
        }, true);

        document.addEventListener('mousedown', (e) => {
          const r = document.createElement('div');
          Object.assign(r.style, {
            position: 'fixed', left: e.clientX + 'px', top: e.clientY + 'px', width: '10px', height: '10px',
            borderRadius: '50%', border: '3px solid #e11d48', transform: 'translate(-50%,-50%)',
            zIndex: '2147483647', pointerEvents: 'none', transition: 'all .5s ease-out', opacity: '1',
          });
          document.documentElement.appendChild(r);
          requestAnimationFrame(() => {
            r.style.width = '60px'; r.style.height = '60px'; r.style.opacity = '0';
          });
          setTimeout(() => r.remove(), 600);
        }, true);

        document.addEventListener('focusin', (e) => {
          if (e.target && e.target.style) {
            e.target.__pw_old = e.target.style.outline;
            e.target.style.outline = '3px solid #facc15';
          }
        }, true);
        document.addEventListener('focusout', (e) => {
          if (e.target && e.target.style) e.target.style.outline = e.target.__pw_old || '';
        }, true);
      };
      if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
      else init();
    }, testInfo.title);
    await use(page);
  },
});

/** Show a custom step caption in the banner, e.g. await say(page, 'Searching...') */
async function say(page, text) {
  await page.evaluate((t) => {
    const b = document.getElementById('__pw_banner');
    if (b) b.textContent = '\u25B6 ' + t;
  }, text).catch(() => {});
}

module.exports = { test, expect: base.expect, say };
