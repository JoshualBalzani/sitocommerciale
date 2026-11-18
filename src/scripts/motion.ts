import { animate } from 'motion/mini';

// Text is always visible; animate only a short translation on first entry.
const preference = matchMedia('(prefers-reduced-motion: reduce)');
const running = new Set<ReturnType<typeof animate>>();
let observer: IntersectionObserver | undefined;
function initializeMotion() {
  observer?.disconnect();
  for (const animation of running) animation.cancel();
  running.clear();
  if (preference.matches || !('IntersectionObserver' in window)) return;
  observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer?.unobserve(entry.target);
      const animation = animate(entry.target, { transform: ['translateY(18px)', 'translateY(0px)'] }, { duration: .5, ease: [.22, 1, .36, 1] });
      running.add(animation);
      void animation.then(() => { animation.cancel(); running.delete(animation); });
    }
  }, { threshold: .12 });
  document.querySelectorAll('.section-heading,.area-product-card,.about-statement,.brand-tile,.hero-directory').forEach(element => observer?.observe(element));
}
initializeMotion();
preference.addEventListener('change', initializeMotion);
window.addEventListener('pagehide', () => { observer?.disconnect(); for (const animation of running) animation.cancel(); running.clear(); });
window.addEventListener('pageshow', event => { if (event.persisted) initializeMotion(); });
function animateInteraction(selector: string) {
  const element = document.querySelector(selector);
  if (preference.matches || !element) return;
  const animation = animate(element, { transform: ['translateY(6px)', 'translateY(0px)'] }, { duration: .22, ease: 'easeOut' });
  running.add(animation);
  void animation.then(() => { animation.cancel(); running.delete(animation); });
}
document.addEventListener('catalog:filtered', () => animateInteraction('#catalog-grid'));
document.addEventListener('navigation:opened', () => animateInteraction('#primary-navigation'));
