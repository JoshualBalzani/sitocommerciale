# Commerciale Clima Plus

Sito corporate statico realizzato con Astro, TypeScript e Zod; Motion per le animazioni e Lucide per le icone SVG. Pubblicato con GitHub Actions su https://www.commercialeclimaplus.it.

## Sviluppo

Richiede Node.js 24 e npm.

```sh
npm ci
npm run dev
```

## Verifiche e build

```sh
npm run check
npm run build
npm run test:links
npx playwright install chromium
npm run test:e2e
```

`npm run preview` serve la build. Astro gestisce una singola anteprima per progetto: `astro preview stop` termina quella esistente. L'output pubblicabile e esclusivamente `dist-github/`. Non caricare i sorgenti come sito statico.

## Struttura

- `src/pages/`: pagine, sitemap, robots e compatibilita con gli indirizzi HTML precedenti.
- `src/components/`: hero, catalogo, marchi, modulo, FAQ, footer e componenti delle aree prodotto.
- `src/layouts/BaseLayout.astro`: documento, metadata, JSON-LD e politica CSP.
- `src/data/`: dati aziendali e contenuti validati con Zod.
- `src/content/`: contenuti dettagliati delle aree e documenti legali preservati.
- `src/scripts/`: interazioni TypeScript di catalogo, richieste e preferenze privacy.
- `src/styles/`: base responsive e design system del restyling.
- `public/`: font locali, illustrazioni SVG, icone e risorse pubbliche.
- `tests/`: verifiche Playwright e axe su desktop e mobile.

## Contenuti e dominio

Modificare i dati societari in `src/data/site.ts`; le schede in `src/data/home.json` e `areas.json`. Aggiornare `pages.config.json` solo quando cambia il dominio: canonical, sitemap e CNAME sono generati dalla stessa configurazione. `googleSiteVerification` e facoltativo quando la proprieta Search Console e gia verificata via DNS.

Il modulo usa Web3Forms con validazione, errori accessibili e protezione contro invii duplicati. Il campo access_key e una chiave pubblica del servizio. Le prove intercettano le richieste: non inviano email reali. La consegna finale delle email dipende dal servizio e dalla configurazione del destinatario.

Non sono presenti analytics, font remoti o incorporamenti. L'avviso privacy e informativo; la sua chiusura viene ricordata solo nella sessione. I dati del modulo non sono memorizzati nel browser.

## Pubblicazione

I push su main attivano `.github/workflows/static.yml`: installazione riproducibile, controllo tipi, build, controllo collegamenti, test desktop/mobile/accessibilita e pubblicazione del solo output statico. GitHub Pages deve usare GitHub Actions. I vecchi URL `.html` rimangono disponibili con inoltro alle pagine canoniche, preservando query e ancore; GitHub Pages non permette redirect HTTP configurabili.

Dettagli e risultati in [MIGRATION.md](MIGRATION.md).

Scelte grafiche e librerie in [RESTYLING.md](RESTYLING.md).
