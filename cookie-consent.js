/* No optional trackers are installed. This notice records only its display preference. */
(() => {
  const privacyUrl = new URL("privacy/#cookie", new URL(".", document.currentScript.src)).href;
  const storageKey = "ccp_privacy_notice_v1";
  const legacy = document.cookie
    .split(";")
    .map((item) => item.trim().split("=")[0])
    .filter((name) =>
      /^(analytics_consent|cookie_consent|_ga(?:_.*)?|_gid|_gat(?:_.*)?)$/.test(
        name,
      ),
    );
  const parts = location.hostname.split(".");
  for (const name of legacy) {
    const expiry = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    document.cookie = expiry;
    for (let i = 0; i < parts.length - 1; i++)
      document.cookie = `${expiry}; Domain=${parts.slice(i).join(".")}`;
  }
  let notice;
  let returnFocus;
  let dismissed = false;
  try {
    dismissed = sessionStorage.getItem(storageKey) === "acknowledged";
  } catch {}
  function closeNotice() {
    try {
      sessionStorage.setItem(storageKey, "acknowledged");
    } catch {}
    notice?.remove();
    notice = null;
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  }
  function showNotice(fromSettings = false) {
    if (notice) {
      if (fromSettings) notice.querySelector("button").focus();
      return;
    }
    if (fromSettings) returnFocus = document.activeElement;
    notice = document.createElement("aside");
    notice.className = "privacy-notice";
    notice.setAttribute("aria-labelledby", "privacy-notice-title");
    notice.innerHTML =
      '<div class="privacy-notice-heading"><h2 id="privacy-notice-title">Cookie e riservatezza</h2><button type="button" class="privacy-notice-close" aria-label="Chiudi informativa">Chiudi</button></div><p>Il sito non utilizza cookie di profilazione, pubblicità o statistiche. Non sono attivati tracciamenti facoltativi e non è richiesto un consenso per accettarli.</p><dl><div><dt>Funzioni tecniche</dt><dd>Necessarie</dd></div><div><dt>Statistiche e marketing</dt><dd>Non utilizzati</dd></div></dl><p class="privacy-notice-storage">La chiusura di questo avviso viene ricordata soltanto per la sessione di navigazione.</p><div class="privacy-notice-actions"><button type="button" class="button" data-privacy-continue>Continua senza tracciamento</button><a href="' + privacyUrl + '">Informativa completa</a></div>';
    notice
      .querySelector(".privacy-notice-close")
      .addEventListener("click", closeNotice);
    notice
      .querySelector("[data-privacy-continue]")
      .addEventListener("click", closeNotice);
    document.body.appendChild(notice);
    if (fromSettings) notice.querySelector("button").focus();
  }
  document
    .querySelectorAll("[data-privacy-settings]")
    .forEach((button) =>
      button.addEventListener("click", () => showNotice(true)),
    );
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && notice) closeNotice();
  });
  if (!dismissed) showNotice();
})();
