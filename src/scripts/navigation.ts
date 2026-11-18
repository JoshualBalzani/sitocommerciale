const toggle = document.querySelector<HTMLButtonElement>('.navigation-toggle');
const navigation = document.querySelector<HTMLElement>('#primary-navigation');
if (toggle && navigation) {
  const mobile = window.matchMedia('(max-width: 1050px)');
  const label = toggle.querySelector('[data-navigation-label]');
  const areaMenu = navigation.querySelector<HTMLDetailsElement>('.area-menu');
  function setOpen(open: boolean) {
    toggle!.setAttribute('aria-expanded', String(open));
    navigation!.hidden = mobile.matches && !open;
    if (label) label.textContent = open ? 'Chiudi' : 'Menu';
    if (!open && areaMenu) areaMenu.open = false;
  }
  function synchronize() { toggle!.hidden = !mobile.matches; setOpen(false); }
  synchronize();
  mobile.addEventListener('change', () => {
    const focusInside = navigation.contains(document.activeElement);
    synchronize();
    if (mobile.matches && focusInside) toggle.focus();
    else if (!mobile.matches && document.activeElement === toggle) navigation.querySelector('a')?.focus();
  });
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a');
    if (!link) return;
    if (areaMenu) areaMenu.open = false;
    if (!mobile.matches) return;
    const url = new URL(link.href);
    setOpen(false);
    if (url.pathname === location.pathname && url.hash) {
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && areaMenu?.open) {
      areaMenu.open = false; areaMenu.querySelector('summary')?.focus(); return;
    }
    if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false); toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    if (event.target instanceof Node && areaMenu && !areaMenu.contains(event.target)) areaMenu.open = false;
  });
  document.addEventListener('focusin', event => {
    if (event.target instanceof Node && areaMenu && !areaMenu.contains(event.target)) areaMenu.open = false;
  });
  window.addEventListener('pageshow', synchronize);
}
