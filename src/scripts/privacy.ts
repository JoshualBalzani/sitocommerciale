const key = 'ccp_privacy_notice_v1';
let notice: HTMLElement | null = null;
let returnFocus: HTMLElement | null = null;
function closeNotice() {
  try { sessionStorage.setItem(key, 'acknowledged'); } catch { /* Storage is optional. */ }
  notice?.remove(); notice = null; returnFocus?.focus({ preventScroll: true }); returnFocus = null;
}
function showNotice(fromSettings = false) {
  if (notice) { if (fromSettings) notice.querySelector('button')?.focus(); return; }
  if (fromSettings && document.activeElement instanceof HTMLElement) returnFocus = document.activeElement;
  notice = document.createElement('aside'); notice.className = 'privacy-notice'; notice.setAttribute('aria-labelledby', 'privacy-notice-title');
  notice.innerHTML = '<div class="privacy-notice-heading"><h2 id="privacy-notice-title">Cookie e riservatezza</h2><button type="button" class="privacy-notice-close" aria-label="Chiudi informativa">Chiudi</button></div><p>Il sito non utilizza cookie di profilazione, pubblicità o statistiche. Non sono attivati tracciamenti facoltativi e non è richiesto un consenso per accettarli.</p><dl><div><dt>Funzioni tecniche</dt><dd>Necessarie</dd></div><div><dt>Statistiche e marketing</dt><dd>Non utilizzati</dd></div></dl><p class="privacy-notice-storage">La chiusura di questo avviso viene ricordata soltanto per la sessione di navigazione.</p><div class="privacy-notice-actions"><button type="button" class="button" data-privacy-continue>Continua senza tracciamento</button><a href="/privacy/#cookie">Informativa completa</a></div>';
  notice.querySelector('.privacy-notice-close')?.addEventListener('click', closeNotice);
  notice.querySelector('[data-privacy-continue]')?.addEventListener('click', closeNotice);
  document.body.append(notice); if (fromSettings) notice.querySelector('button')?.focus();
}
document.querySelectorAll('[data-privacy-settings]').forEach(button => button.addEventListener('click', () => showNotice(true)));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && notice) closeNotice(); });
let acknowledged = false; try { acknowledged = sessionStorage.getItem(key) === 'acknowledged'; } catch { /* The notice still works without storage. */ }
if (!acknowledged) showNotice();
