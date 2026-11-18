const catalog = document.querySelector<HTMLElement>('#catalog-grid');
if (catalog) {
  const cards = [...catalog.querySelectorAll<HTMLElement>('.catalog-card')];
  const search = document.querySelector<HTMLInputElement>('#catalog-search');
  const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const counter = document.querySelector<HTMLElement>('#catalog-count');
  const empty = document.querySelector<HTMLElement>('.catalog-empty');
  let active = 'all';
  const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('it');
  function update() {
    const query = normalize(search?.value.trim() ?? '');
    let count = 0;
    for (const card of cards) {
      const visible = (active === 'all' || card.dataset['category'] === active) && normalize(card.dataset['search'] ?? '').includes(query);
      card.hidden = !visible;
      if (visible) count++;
    }
    if (counter) counter.textContent = `${count} ${count === 1 ? 'soluzione trovata' : 'soluzioni trovate'}`;
    if (empty) empty.hidden = count !== 0;
    for (const button of filters) button.setAttribute('aria-pressed', String(button.dataset['filter'] === active));
  }
  document.querySelector<HTMLElement>('[data-catalog-tools]')?.removeAttribute('hidden');
  search?.addEventListener('input', update);
  for (const button of filters) button.addEventListener('click', () => { active = button.dataset['filter'] ?? 'all'; update(); });
  document.querySelector('[data-reset-catalog]')?.addEventListener('click', () => { active = 'all'; if (search) { search.value = ''; search.focus(); } update(); });
  window.addEventListener('pageshow', () => requestAnimationFrame(update));
  update();
}
