# Rappresentanze e famiglie di prodotto

Verifica editoriale: 19 novembre 2026. Le pagine pubbliche descrivono famiglie generali, non singoli articoli. Nessun modello, codice, prezzo, fotografia ufficiale o logo del produttore viene riprodotto. I siti dei produttori sono documentati qui per manutenzione interna; non sono collegati dalle pagine pubbliche.

## Fonti ufficiali

- Chaffoteaux: https://www.chaffoteaux.it/professionnel/prodotti.html e https://www.chaffoteaux.it/particulier/lista-prodotti-privati — caldaie, pompe di calore, ibridi, scaldacqua, solare, bollitori, termoregolazione e ventilconvettori.
- Beretta: https://www.berettaclima.it/catalogo — tutte le macrofamiglie del catalogo, compresi impianti professionali, climatizzazione, terminali e complementi.
- Sylber: https://www.sylber.it/ e https://www.sylber.it/documentazione/listini-e-schede-novita/catalogo-listino-marzo-2026 — indice del catalogo marzo 2026 e famiglie del sito italiano.
- AUX: **https://www.auxair.com/it**, sito italiano indicato dal cliente; https://www.auxair.com/it/products?categoryId=22, https://www.auxair.com/it/products/detail/450 e https://www.auxair.com/it/products/detail/460 — residenziale, commerciale leggero, commerciale VRF e pompe di calore. Non utilizzare auxitalia.it come fonte sostitutiva.
- Fiore: https://www.fiore.it/it/product/ e https://www.fiore.it/wp-content/uploads/2026/04/Catalogo_2026_LR.pdf — bagno, cucina, doccia, termostatici, incasso e docce esterne. Profilo aziendale ufficiale ICE: https://www.ice.it/en/my-home/find-your-italian-partner/company-details/463648/FIORE-RUBINETTERIE (rubinetteria tradizionale, elettronica e termostatica).
- La termocamino: https://www.latermocamino.it/prodotti e cataloghi collegati — sistemi fumari, terminali, ventilazione, collegamenti split, radiatori, energie alternative, accumulo e accessori. Denominazione visibile mantenuta come richiesta dal cliente.
- ITAP: https://www.itap.it/prodotti/ — quattro divisioni: valvole, riscaldamento, raccordi, riduttori e accessori. Sottofamiglie raggruppate per funzione senza nomi di sistemi proprietari.
- Facot: https://facotchemicals.com/prodotti/ — tutte le sei macrocollezioni, descritte con denominazioni generali senza nomi di linee commerciali. Nessuna istruzione d’impiego o promessa sanitaria.
- Ideal Clima: https://www.idealclima.eu/it/prodotti-soluzioni e https://www.idealclima.eu/it/ — radiante, regolazione, VMC e componenti, deumidificazione, radiatori, terminali idronici, climatizzatori senza unità esterna.

## Criteri editoriali e SEO

- Un’unica pagina per marchio, contenuto e gamma distinti: non vengono create pagine duplicate marchio × comune.
- Copertura dichiarata dal cliente: Forlì-Cesena, Ravenna, Rimini, Bologna per tutti i nove marchi. Unica sede: Viale Bologna 24, Forlì.
- Attività di agenzia/rappresentanza commerciale. Nessuna dichiarazione di esclusiva, centro assistenza, installatore certificato o magazzino disponibile.
- Le famiglie sono una panoramica generale; disponibilità, compatibilità e configurazione richiedono verifica dedicata. Aggiornare questa ricognizione quando il produttore modifica il catalogo.
- Collegamenti interni a marchi, aree e modulo con parametri `categoria`, `marchio`, `prodotto`. Sitemap con 19 URL canonici, `areaServed` sulle quattro province e breadcrumb a tre livelli sui marchi.
- Le immagini IA rappresentano ambientazioni e componenti generici; non documentano prodotti del marchio o lavori eseguiti. Didascalie visibili su ogni immagine.

## Catalogo unificato

Le 49 famiglie sono derivate da `src/data/brands.ts`, senza duplicare la gamma. `src/data/catalogue.ts` assegna sette ambiti applicativi di orientamento e valida la copertura di ogni famiglia. Una categoria specifica della famiglia, se presente, prevale sulla categoria principale del marchio nel modulo.

Il catalogo mostra 12 voci alla volta con JavaScript, conserva i filtri nell’URL e resta integralmente consultabile senza script. Il confronto dei marchi riporta le stesse famiglie. Le immagini di approfondimento sono collegate ad ancore delle famiglie verificate in fase di build.

HTTPS: nessuna modifica alla configurazione del dominio, come richiesto dal cliente in questo aggiornamento.
