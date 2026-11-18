# Migrazione Astro - 18 novembre 2026

## Analisi e scelte

La versione precedente accentrava contenuti e interazioni in HTML e JavaScript manuali, con diversi fogli di stile sovrapposti e script di generazione SEO separati. Questo rendeva difficile aggiornare pagine e comportamenti senza incoerenze.

La migrazione usa Astro 7, TypeScript rigoroso e Zod 4: pagine HTML prerenderizzate e JavaScript solo dove serve. Il sito ha contenuti corporate e un modulo, quindi non richiede rendering server, React, gestione di stato globale o un backend sul piano GitHub Pages.

## Lavoro completato, in ordine di priorita

1. Inventario di pagine, link, dati societari, marchi e campi modulo. Conservazione dei documenti legali e dei contenuti dettagliati.
2. Dati centrali validati durante la build e componenti riutilizzabili per tutte le pagine. Eliminazione della vecchia implementazione duplicata.
3. Design system unico, responsive e mobile-first: hero bianca, tipografia Manrope locale e Georgia, palette blu/navy, sezioni lineari, focus visibile e controlli utilizzabili da tastiera.
4. Catalogo con ricerca e filtri combinabili, FAQ native, collegamenti alle richieste con precompilazione, validazione Zod, messaggi associati ai campi, gestione errori/timeout e prevenzione invii duplicati.
5. Metadata e canonical centralizzati, Open Graph, dati strutturati, sitemap, robots, pagina 404 e compatibilita degli indirizzi precedenti. Font locali, loghi WebP ottimizzati e CSS/JS con nomi versionati.
6. CSP senza unsafe-eval/unsafe-inline, generazione hash per gli script inline necessari, artefatto pubblico controllato e workflow di pubblicazione con verifiche automatiche.

## Componenti principali

`BaseLayout.astro` compone header, contenuto, footer e informativa. `HomeHero`, `ProductAreas`, `Catalog`, `Brands`, `Faq`, `RequestSection` e `ContactSection` compongono la homepage. `AreaPage` riutilizza la stessa struttura per quattro aree prodotto. `LegalPage` mantiene leggibili le informative.

`request.ts` applica lo schema di `validation.ts`, invia con fetch soltanto dopo la validazione e mantiene i valori dopo un errore. `catalog.ts` filtra i contenuti gia presenti nell'HTML. Tutti i contenuti principali rimangono leggibili senza JavaScript; il modulo conserva la sua action Web3Forms.

## Verifiche

- Astro/TypeScript: 40 file, zero errori, avvisi o suggerimenti.
- Output: 17 pagine statiche, collegamenti e ancore validi, una sola H1 per pagina, ID univoci, CSP e risorse pubbliche controllati; sitemap con 7 URL indicizzabili.
- Playwright: 24 test superati, desktop 1440x900 e mobile 390x844. Inclusi filtri, validazione, invio simulato, errore 429, precompilazione, vecchi URL, tastiera, preferenze privacy e storico di navigazione.
- axe: verifiche WCAG 2 A/AA, 2.1 AA e 2.2 AA sulle otto pagine principali in entrambe le dimensioni. Corretta la navigabilita da tastiera della tabella privacy su mobile.
- Lighthouse 13, build production su anteprima locale Chrome: mobile e desktop 100 performance, 100 accessibilita, 100 best practice, 100 SEO. Misure salvate in `reports/verification.json`. I punteggi di laboratorio non certificano la conformita completa WCAG e non sostituiscono i Core Web Vitals raccolti da utenti reali in Search Console.
- npm audit ha riportato la catena picomatch GHSA-fc5q-39xc-vjpf; la fonte GitHub la indica ritirata il 18 novembre 2026: https://github.com/advisories/GHSA-fc5q-39xc-vjpf. Non applicato il downgrade automatico suggerito da npm. Questi pacchetti appartengono alla build e non sono serviti nel sito statico.

## Limiti e manutenzione

La validazione nel browser migliora l'esperienza ma non sostituisce le verifiche del servizio di invio. L'invio reale non e stato eseguito per evitare email di prova. Le informative sono state conservate: la migrazione tecnica non costituisce una certificazione legale. Se vengono aggiunti analytics o altri servizi, occorre riesaminare integrazione e informative prima della loro attivazione.

Per gli aggiornamenti futuri eseguire le verifiche documentate nel README e conservare il lockfile. L'intera versione precedente rimane disponibile nella cronologia Git.
