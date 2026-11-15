# Commerciale Clima Plus — GitHub Pages

Pacchetto pronto per un repository GitHub. Mantiene il design corrente, le sezioni intere sovrapposte e il modulo Web3Forms. Nessun oggetto 3D.

## Pubblicazione

1. Crea un repository (pubblico se usi GitHub Free) e carica **il contenuto di questo pacchetto nella sua cartella principale**, comprese `.github`, `.seo`, `assets`, `fonts` e `scripts`. Non caricare il file ZIP come unico file del repository.
2. In **Settings → Pages → Build and deployment → Source**, seleziona **GitHub Actions**.
3. Apri **Actions → Publish GitHub Pages → Run workflow**. I successivi aggiornamenti del ramo principale pubblicano automaticamente il sito.

Il workflow legge l'indirizzo effettivo da GitHub Pages e ricompila collegamenti, canonical, Open Graph, dati strutturati e sitemap. Funziona sia sulla radice `utente.github.io`, sia sotto il nome del repository. Non devi inserire ora un dominio.

## Quando avrai il dominio definitivo

Impostalo in **Settings → Pages → Custom domain**, configura i DNS del dominio secondo le istruzioni di GitHub e abilita **Enforce HTTPS** quando disponibile. Poi esegui nuovamente il workflow: rileverà il nuovo indirizzo. Non è necessario sostituire manualmente gli URL nel codice.

`pages.config.json` contiene un campo `siteUrl` facoltativo per le build locali. Nel workflow, l'indirizzo restituito da GitHub Pages ha priorità. Non impostare un dominio non ancora operativo come canonical della versione online.

## Modulo di contatto

Il modulo usa direttamente Web3Forms; non richiede Netlify Forms, Functions o un server GitHub. La chiave pubblica fornita è già integrata. Nell'account Web3Forms verifica il destinatario, il piano e le eventuali restrizioni di dominio: dopo il passaggio devi consentire l'indirizzo `github.io` o il tuo dominio. L'effettiva ricezione va verificata con un invio dal sito pubblicato. I test locali usano risposte simulate e non inviano email reali.

## Privacy e sicurezza

L'informativa descrive GitHub Pages e Web3Forms. Nessun Analytics, pixel pubblicitario, font remoto o mappa incorporata viene aggiunto. La preferenza di movimento e la chiusura dell'avviso restano nella sessione del browser.

GitHub Pages non applica i file Netlify `_headers` e `_redirects`: il pacchetto pubblico non li usa. La Content Security Policy e la politica referrer sono inserite nell'HTML con i meccanismi disponibili. Gli header che richiedono configurazione del server, come `frame-ancestors`, non sono simulati con meta tag.

Le vecchie pagine `.html` hanno reindirizzamenti lato browser verso i percorsi a cartella, mantenendo parametri e frammenti quando JavaScript è attivo. Non vengono presentati come redirect HTTP 301. Il file `404.html` usa percorsi corretti anche nelle URL inesistenti profonde.

## Build locale, se serve

Con Node.js 24:

```text
node scripts/build-github-pages.cjs --site-url https://TUO-UTENTE.github.io/NOME-REPOSITORY
node scripts/check-github-pages.cjs
```

L'output è `dist-github/`. Non servono installazioni npm per la pubblicazione: le librerie del sito sono già incluse localmente. Per modificare le animazioni, il sorgente è `scripts/scroll-experience.js`; il compilatore opzionale richiede gli strumenti di sviluppo indicati nei suoi script.

## Search Console

Dopo la pubblicazione verifica la proprietà URL corrispondente all'indirizzo effettivo. Puoi inserire il token in `pages.config.json`, campo `googleSiteVerification`, e ripubblicare. La sitemap si trova all'indirizzo del sito seguito da `/sitemap.xml`.

Per un sito di progetto, un `robots.txt` sotto il percorso del repository non governa l'intero dominio `utente.github.io`: rimangono validi i meta robots delle pagine e la sitemap. Non è stata dichiarata alcuna verifica Search Console già completata.

## File pubblicati

GitHub Actions carica solo `dist-github/`, costruita da un elenco esplicito di risorse. Visura, report locali, screenshot, note operative e strumenti di sviluppo non sono inclusi nel sito pubblico. Questo pacchetto non contiene la visura.

Fonti ufficiali:
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages
