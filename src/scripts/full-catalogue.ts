const root = document.querySelector<HTMLElement>('#full-catalogue-grid');
if (root) {
  const cards = [...root.querySelectorAll<HTMLElement>('.full-catalogue-card')];
  const search = document.querySelector<HTMLInputElement>('#full-catalogue-search');
  const brand = document.querySelector<HTMLSelectElement>('#full-catalogue-brand');
  const application = document.querySelector<HTMLSelectElement>('#full-catalogue-application');
  const counter = document.querySelector('#full-catalogue-count');
  const empty = document.querySelector<HTMLElement>('.full-catalogue-empty');
  const pagination = document.querySelector<HTMLElement>('[data-catalogue-pagination]');
  const visibleCount = document.querySelector('[data-catalogue-visible]');
  const more = document.querySelector<HTMLButtonElement>('[data-catalogue-more]');
  const missingRequest = document.querySelector<HTMLAnchorElement>('[data-full-catalogue-missing]');
  let limit = 12;
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('it').replace(/[^a-z0-9]+/g,' ').trim();
  const index = new Map(cards.map(card => {
    let text = normalize(card.dataset['search'] ?? '');
    if (/rubinett|miscelator/.test(text)) text += ' rubinetti rubinetto mixer';
    if (/caldai/.test(text)) text += ' caldaia caldaie';
    if (/scaldacqua|scaldabagni/.test(text)) text += ' scaldabagno scaldacqua boiler';
    if (/bollitor|accumul/.test(text)) text += ' bollitore accumulo serbatoio';
    if (/valvol/.test(text)) text += ' valvola valvole';
    if (/raccord/.test(text)) text += ' raccordo raccordi';
    if (/climatizz|condizion/.test(text)) text += ' condizionatore condizionatori climatizzatore climatizzatori';
    if (/radiator/.test(text)) text += ' radiatore radiatori';
    if (/sistemi fumari|canne fumarie/.test(text)) text += ' canna fumaria fumisteria';
    if (/ventilconvett|terminali/.test(text)) text += ' fan coil fancoil';
    if (/pompe di calore/.test(text)) text += ' pompa calore pdc';
    if (/ventilazione meccanica|vmc/.test(text)) text += ' vmc ricambio aria';
    return [card,text] as const;
  }));
  const params = new URLSearchParams(location.search);
  if (search) search.value = (params.get('q') ?? '').slice(0,180);
  for (const [select,key] of [[brand,'marchio'],[application,'applicazione']] as const) {
    const value = params.get(key);
    if (select && [...select.options].some(option => option.value === value)) select.value = value ?? '';
  }
  function update(syncUrl = true) {
    const terms = normalize(search?.value ?? '').split(' ').filter(Boolean);
    const matchesText = (card: HTMLElement) => terms.every(term => index.get(card)?.includes(term));
    const matchesBrand = (card: HTMLElement) => !brand?.value || card.dataset['brand'] === brand.value;
    const matchesApplication = (card: HTMLElement) => !application?.value || (card.dataset['applications'] ?? '').split(' ').includes(application.value);
    const matches = cards.filter(card => matchesText(card) && matchesBrand(card) && matchesApplication(card));
    const count = matches.length;
    const visible = new Set(matches.slice(0,limit));
    for (const card of cards) card.hidden = !visible.has(card);
    root!.dataset['resultCount'] = String(visible.size);
    if (pagination) pagination.hidden = count === 0;
    if (visibleCount) visibleCount.textContent = `Visualizzate ${visible.size} di ${count} famiglie`;
    if (more) more.hidden = visible.size === count;
    if (missingRequest) {
      const query = new URLSearchParams({ categoria: 'Richiesta di orientamento' });
      if (search?.value.trim()) query.set('prodotto',search.value.trim().slice(0,180));
      if (brand?.value) query.set('marchio',brand.value);
      missingRequest.href = `/?${query.toString()}#richiesta`;
    }
    if (counter) counter.textContent = `${count} ${count === 1 ? 'famiglia trovata' : 'famiglie trovate'}`;
    if (empty) empty.hidden = count !== 0;
    for (const [select,predicate] of [[brand,matchesApplication],[application,matchesBrand]] as const) {
      for (const option of select?.options ?? []) {
        const label = option.dataset['label']; if (!label) continue;
        const count = cards.filter(card => matchesText(card) && predicate(card) && (select === brand ? card.dataset['brand'] === option.value : (card.dataset['applications'] ?? '').split(' ').includes(option.value))).length;
        option.textContent = `${label} (${count})`;
      }
    }
    if (syncUrl) {
      const url = new URL(location.href);
      for (const [key,value] of [['q',search?.value.trim()],['marchio',brand?.value],['applicazione',application?.value]]) {
        if (value) url.searchParams.set(key!,value); else url.searchParams.delete(key!);
      }
      history.replaceState(history.state,'',url);
    }
  }
  const applyFilters = () => { limit = 12; update(); };
  search?.addEventListener('input',applyFilters);
  brand?.addEventListener('change',applyFilters);
  application?.addEventListener('change',applyFilters);
  more?.addEventListener('click',()=>{
    const previous = new Set(cards.filter(card=>!card.hidden)); limit += 12; update();
    const firstNew = cards.find(card=>!card.hidden&&!previous.has(card));
    firstNew?.querySelector<HTMLElement>('h3')?.focus({preventScroll:true});
    firstNew?.scrollIntoView({block:'start',behavior:'instant'});
  });
  document.querySelectorAll('[data-reset-full-catalogue]').forEach(button=>button.addEventListener('click',()=>{
    if (search) search.value = ''; if (brand) brand.value = ''; if (application) application.value = '';
    limit = 12; update(); search?.focus();
  }));
  document.querySelector('[data-full-catalogue-tools]')?.removeAttribute('hidden');
  window.addEventListener('pageshow',()=>update(false));
  update(false);
}
