import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const preference = matchMedia('(prefers-reduced-motion: reduce)');
let engine: Lenis | undefined;
function initialize() {
  engine?.destroy(); engine = undefined;
  if (preference.matches) return;
  engine = new Lenis({
    autoRaf: true, smoothWheel: true, syncTouch: false, lerp: .13,
    anchors: false, stopInertiaOnNavigate: true,
    prevent: node => node.matches('textarea,select,.privacy-notice,.table-scroll,[data-lenis-prevent]'),
  });
}
initialize();
preference.addEventListener('change', initialize);
window.addEventListener('pagehide', () => { engine?.destroy(); engine = undefined; });
window.addEventListener('pageshow', event => { if (event.persisted) initialize(); });
window.addEventListener('popstate', () => { engine?.scrollTo(window.scrollY, { immediate: true }); });
document.addEventListener('click', event => {
  if (!engine || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !(event.target instanceof Element)) return;
  const link = event.target.closest<HTMLAnchorElement>('a[href]');
  if (!link || link.target || link.hasAttribute('download') || link.classList.contains('skip-link')) return;
  const url = new URL(link.href);
  if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
  let target: HTMLElement | null;
  try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
  if (!target) return;
  event.preventDefault();
  if (location.hash !== url.hash) history.pushState(null, '', url.href);
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  engine.resize();
  engine.scrollTo(target, { onComplete: () => {
    // Offscreen catalogue rows can acquire their actual height during the trip.
    engine?.resize(); engine?.scrollTo(target!, { immediate: true });
  } });
});
