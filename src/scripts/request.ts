import { requestSchema } from '../lib/validation';
import { company } from '../data/site';
import { copyText } from './clipboard';

type Field = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
class DeliveryError extends Error { constructor(public readonly status: number) { super('Delivery not confirmed'); } }
function initializeRequest(form: HTMLFormElement) {
  const status = form.querySelector<HTMLElement>('#form-status');
  const submit = form.querySelector<HTMLButtonElement>('[type=submit]');
  const message = form.querySelector<HTMLTextAreaElement>('[name=messaggio]');
  const fallback = form.querySelector<HTMLElement>('.form-fallback');
  if (!status || !submit || !message || !fallback) throw new Error('Incomplete request component');
  const confirmation = form.querySelector<HTMLElement>('#request-success');
  let sending = false;
  form.noValidate = true;
  function field(name: string): Field | null {
    const element = form.elements.namedItem(name);
    return element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement ? element : null;
  }
  function clearErrors() {
    form.querySelectorAll('[data-field-error]').forEach(element => element.remove());
    form.querySelectorAll<Field>('[aria-invalid]').forEach(element => {
      element.removeAttribute('aria-invalid');
      const remaining = (element.getAttribute('aria-describedby') ?? '').split(' ').filter(id => id && !id.startsWith('error-'));
      if (remaining.length) element.setAttribute('aria-describedby', remaining.join(' ')); else element.removeAttribute('aria-describedby');
    });
  }
  function countMessage() { const count = form.querySelector('[data-message-count]'); if (count) count.textContent = `${message!.value.length} / 3000`; }
  function updateSelection() {
    const panel = form.querySelector<HTMLElement>('.request-selection');
    const summary = form.querySelector('[data-selection-summary]');
    const values = ['categoria', 'marchio', 'prodotto'].map(name => field(name)?.value.trim()).filter(Boolean);
    if (panel) panel.hidden = values.length === 0;
    if (summary) summary.textContent = values.join(' · ');
  }
  form.querySelector('[data-clear-selection]')?.addEventListener('click', () => {
    for (const name of ['categoria', 'marchio', 'prodotto']) { const input = field(name); if (input) input.value = ''; }
    updateSelection(); clearErrors(); field('categoria')?.focus();
  });
  form.addEventListener('change', updateSelection);
  function showStatus(text: string, state: string, focus = true) {
    status!.textContent = text; status!.dataset['state'] = state; status!.hidden = false;
    if (confirmation) confirmation.hidden = state !== 'success';
    if (focus) status!.focus({ preventScroll: true });
    if (state === 'success') status!.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  }
  function requestText() {
    const data = new FormData(form);
    const labels = [['Tipo', 'tipo-richiesta'], ['Profilo', 'profilo'], ['Categoria', 'categoria'], ['Marchio', 'marchio'], ['Prodotto', 'prodotto'], ['Nome', 'nome'], ['Azienda', 'azienda'], ['Email', 'email'], ['Telefono', 'telefono'], ['Messaggio', 'messaggio']] as const;
    return ['Richiesta da Commerciale Clima Plus', ...labels.map(([label, name]) => `${label}: ${String(data.get(name) || '-')}`)].join('\n');
  }
  function showFallback() {
    fallback!.hidden = false;
    const link = form.querySelector<HTMLAnchorElement>('[data-email-fallback]');
    if (link) link.href = `mailto:${company.email}?subject=${encodeURIComponent('Richiesta dal sito')}&body=${encodeURIComponent(requestText())}`;
  }
  form.querySelector('[data-copy-request]')?.addEventListener('click', async () => {
    const copied = await copyText(requestText());
    const result = form.querySelector('[data-copy-status]');
    if (result) result.textContent = copied ? 'Richiesta copiata. Puoi incollarla in una email.' : `Copia non disponibile. Scrivi a ${company.email}.`;
  });
  form.addEventListener('input', () => {
    clearErrors(); countMessage(); updateSelection();
    if (confirmation) confirmation.hidden = true;
    if (status.dataset['state'] === 'success') status.hidden = true;
    if (!fallback.hidden) showFallback();
  });
  for (const link of document.querySelectorAll<HTMLElement>('[data-request-category], [data-request-brand], [data-request-product], [data-request-client], [data-request-type]')) {
    link.addEventListener('click', () => {
      const values = { categoria: link.dataset['requestCategory'], marchio: link.dataset['requestBrand'], prodotto: link.dataset['requestProduct'], profilo: link.dataset['requestClient'], 'tipo-richiesta': link.dataset['requestType'] };
      if (values.marchio) { const product = field('prodotto'); if (product) product.value = ''; }
      if (values.prodotto) { const brand = field('marchio'); if (brand) brand.value = ''; }
      for (const [name, value] of Object.entries(values)) {
        const input = field(name);
        if (input && value !== undefined && (!(input instanceof HTMLSelectElement) || [...input.options].some(option => option.value === value))) input.value = value;
      }
      clearErrors();
      if (confirmation) confirmation.hidden = true;
      if (status.dataset['state'] === 'success') status.hidden = true;
      if (!fallback.hidden) showFallback();
      updateSelection();
      requestAnimationFrame(() => document.querySelector<HTMLElement>('#request-title')?.focus({ preventScroll: true }));
    });
  }
  const params = new URLSearchParams(location.search);
  const requestType = field('tipo-richiesta');
  if (requestType instanceof HTMLSelectElement && [...requestType.options].some(option => option.value === params.get('tipo'))) requestType.value = params.get('tipo') ?? 'Informazioni';
  const category = field('categoria');
  const brand = field('marchio');
  if (brand instanceof HTMLSelectElement && [...brand.options].some(option => option.value === params.get('marchio'))) brand.value = params.get('marchio') ?? '';
  if (category instanceof HTMLSelectElement && [...category.options].some(option => option.value === params.get('categoria'))) {
    category.value = params.get('categoria') ?? '';
    const product = field('prodotto'); if (product) product.value = (params.get('prodotto') ?? '').slice(0,180);
  }
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (sending) return;
    if (form.querySelector<HTMLInputElement>('[name=botcheck]')?.checked) return;
    clearErrors();
    const parsed = requestSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) {
      let first: Field | null = null;
      for (const issue of parsed.error.issues) {
        const name = issue.path[0]; if (typeof name !== 'string') continue;
        const input = field(name); if (!input || input.hasAttribute('aria-invalid')) continue;
        input.setAttribute('aria-invalid', 'true');
        const error = document.createElement('span'); error.id = `error-${input.id}`; error.className = 'field-error'; error.dataset['fieldError'] = ''; error.textContent = issue.message;
        input.insertAdjacentElement('afterend', error);
        input.setAttribute('aria-describedby', `${input.getAttribute('aria-describedby') ?? ''} ${error.id}`.trim());
        first ??= input;
      }
      showStatus('Controlla i campi evidenziati prima di inviare.', 'error', false); first?.focus(); return;
    }
    sending = true; submit.disabled = true; form.setAttribute('aria-busy', 'true'); submit.textContent = 'Invio in corso…'; fallback.hidden = true;
    showStatus('Invio della richiesta in corso…', 'pending', false);
    const controller = new AbortController(); const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, credentials: 'omit', signal: controller.signal,
        body: JSON.stringify({ access_key: company.web3FormsKey, subject: 'Richiesta commerciale dal sito Commerciale Clima Plus', from_name: company.name, ...parsed.data }) });
      const result: unknown = await response.json();
      if (!response.ok || typeof result !== 'object' || result === null || !('success' in result) || result.success !== true) throw new DeliveryError(response.status);
      form.reset(); countMessage(); updateSelection(); clearErrors(); showStatus('Richiesta inviata. La risposta sarà trasmessa ai recapiti indicati.', 'success');
    } catch (error: unknown) {
      const text = error instanceof DOMException && error.name === 'AbortError'
        ? 'Il servizio non ha confermato l’invio in tempo. Non possiamo verificarne la ricezione: prima di riprovare puoi contattarci direttamente.'
        : error instanceof DeliveryError && error.status === 429
          ? 'Il servizio ha raggiunto un limite di invio temporaneo. I dati sono rimasti nel modulo: utilizzare i contatti diretti oppure riprovare più tardi.'
          : 'Invio non riuscito. I dati sono rimasti nel modulo: riprovare oppure utilizzare i contatti diretti.';
      showStatus(text, 'error'); showFallback();
    } finally { clearTimeout(timeout); sending = false; submit.disabled = false; form.removeAttribute('aria-busy'); submit.textContent = 'Invia richiesta'; }
  });
  countMessage(); updateSelection();
  window.addEventListener('pageshow', updateSelection);
}
const form = document.querySelector<HTMLFormElement>('#contact-form');
if (form) initializeRequest(form);
document.querySelector('[data-copy-email]')?.addEventListener('click', async () => {
  const copied = await copyText(company.email); const status = document.querySelector('.copy-status');
  if (status) status.textContent = copied ? 'Indirizzo copiato.' : `Indirizzo: ${company.email}`;
});
