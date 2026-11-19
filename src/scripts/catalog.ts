const catalog = document.querySelector<HTMLElement>('#catalog-grid');
if (catalog) {
  const cards = [...catalog.querySelectorAll<HTMLElement>('.catalog-card')];
  const search = document.querySelector<HTMLInputElement>('#catalog-search');
  const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-filter]')];
  const counter = document.querySelector<HTMLElement>('#catalog-count');
  const empty = document.querySelector<HTMLElement>('.catalog-empty');
  const clearSearch = document.querySelector<HTMLButtonElement>('[data-clear-catalog-search]');
  const activeArea = document.querySelector('[data-active-catalog-area]');
  const activeQuery = document.querySelector('[data-active-catalog-query]');
  const missingRequest = document.querySelector<HTMLElement>('[data-catalog-missing-request]');
  let active = 'all';
  const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('it').replace(/[^a-z0-9]+/g, ' ').trim();
  const searchIndex = new Map(cards.map(card => [card, normalize(card.dataset['search'] ?? '')]));
  function update() {
    const rawQuery = search?.value.trim() ?? '';
    const terms = normalize(rawQuery).split(' ').filter(Boolean);
    const matches = cards.filter(card => terms.every(term => searchIndex.get(card)?.includes(term)));
    const matching = new Set(matches);
    let count = 0;
    for (const card of cards) {
      const visible = (active === 'all' || card.dataset['category'] === active) && matching.has(card);
      card.hidden = !visible;
      if (visible) count++;
    }
    if (counter) counter.textContent = `${count} ${count === 1 ? 'categoria trovata' : 'categorie trovate'}`;
    if (empty) empty.hidden = count !== 0;
    if (clearSearch) clearSearch.hidden = !rawQuery;
    if (activeArea) activeArea.textContent = active === 'all' ? 'Tutte le aree' : active;
    if (activeQuery) activeQuery.textContent = rawQuery ? ` · Ricerca: “${rawQuery}”` : '';
    if (missingRequest) { missingRequest.dataset['requestProduct'] = rawQuery.slice(0,180); missingRequest.dataset['requestCategory'] = active === 'all' ? 'Richiesta di orientamento' : active; }
    for (const button of filters) {
      button.setAttribute('aria-pressed', String(button.dataset['filter'] === active));
      const badge = button.querySelector('[data-filter-count]');
      if (badge) badge.textContent = String(matches.filter(card => button.dataset['filter'] === 'all' || card.dataset['category'] === button.dataset['filter']).length);
    }
  }
  document.querySelector<HTMLElement>('[data-catalog-tools]')?.removeAttribute('hidden');
  search?.addEventListener('input', update);
  for (const button of filters) button.addEventListener('click', () => { active = button.dataset['filter'] ?? 'all'; update(); document.dispatchEvent(new CustomEvent('catalog:filtered')); });
  clearSearch?.addEventListener('click', () => { if (search) { search.value = ''; search.focus(); } update(); });
  document.querySelectorAll('[data-reset-catalog]').forEach(button => button.addEventListener('click', () => { active = 'all'; if (search) { search.value = ''; search.focus(); } update(); }));
  window.addEventListener('pageshow', () => requestAnimationFrame(update));
  update();
}
