# Catalogo: dalla ricerca alla richiesta

Aggiornamento del 19 novembre 2026.

- Dieci categorie con descrizioni piu concrete, contenuti della categoria e informazioni utili per la richiesta.
- Ricerca senza distinzione di maiuscole/accenti, con sinonimi espliciti e combinazione di parole in ordine libero. Ogni termine deve comparire nell'indice della categoria; non vengono effettuate ricerche esterne.
- Conteggi per area aggiornati sulla ricerca corrente, filtro selezionato sempre visibile, cancellazione del solo testo e azzeramento completo distinti.
- Nessun risultato: alternativa per mostrare tutte le categorie o trasferire il termine cercato alla richiesta commerciale.
- Collegamenti interni ai marchi documentati: AUX per climatizzatori mono/multisplit, Fiore per rubinetteria, ITAP per valvole/raccordi, Facot per trattamento/manutenzione. Associazioni ricavate dai contenuti gia presenti in home.json e nelle pagine area; nessuna disponibilita di un modello specifico e dichiarata.
- Schema Zod controlla i nuovi campi e verifica che ogni marchio associato esista e appartenga alla stessa area.
- Categoria, prodotto e marchio vengono trasferiti insieme al modulo. Il riepilogo rimane modificabile; la rimozione della selezione conserva messaggio e recapiti.
- Layout mobile con azione visibile prima dei dettagli espandibili; ordine di lettura e tastiera coerenti. Ricerca, conteggi, stati e link verificati con axe e Playwright.

File principali: src/components/Catalog.astro, src/scripts/catalog.ts, src/data/home.json, src/data/content.ts, src/scripts/request.ts e src/styles/design.css.

Verifiche: controllo TypeScript senza errori, build, 17 pagine e relativi collegamenti; suite di 40 test desktop/mobile, incluse prove con VMC, FAN-COIL, parole invertite, accenti, filtri incrociati, selezione Fiore e richiesta di prodotto non presente. Gli invii restano simulati nei test: nessuna email reale inviata.
