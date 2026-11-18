# Restyling corporate - novembre 2026

## Librerie selezionate

- Motion 14.14.0: https://github.com/motiondivision/motion - solo import `motion/mini`, con Web Animations API. Entrata breve tramite trasformazioni; nessun blocco dello scorrimento, contenuto sempre visibile e rispetto di prefers-reduced-motion anche quando cambia durante la visita.
- Lucide Astro 1.75.0: https://github.com/lucide-icons/lucide - icone SVG generate durante la build, senza runtime per le icone, font esterni o chiamate CDN. Usate come supporto decorativo a etichette testuali.

Le versioni sono bloccate nel package-lock. Le licenze dei due progetti e delle icone derivate sono incluse in public/third-party-licenses.txt.

## Direzione grafica

Hero bianca con titolo tipografico blu/navy e accesso immediato alle quattro aree prodotto. Simboli tecnici piatti al posto delle precedenti illustrazioni isometriche. Soluzioni su due colonne desktop e una mobile; catalogo compatto, filtri visibili, CTA gerarchiche, marchi tipografici, FAQ e modulo con superfici coerenti. Area azienda e contatti in navy per dare ritmo alla pagina.

Il foglio global.css contiene struttura, accessibilita e funzioni comuni. design.css definisce l'aspetto del restyling e viene importato dopo la base. Header, footer e sottopagine condividono gli stessi token. Non sono stati introdotti tracciamenti, foto, link ai produttori o rendering 3D.

## Funzionalita mantenute

Navigazione desktop/mobile e accesso alle aree prodotto, catalogo con ricerca e filtri, selezione del marchio/prodotto nella richiesta, preventivo precompilato, gestione errori e invio Web3Forms, documenti legali, vecchi URL, sitemap e dati strutturati.

## Verifiche

Controllo tipi su 42 file, build e collegamenti pubblici. 30 test Playwright desktop/mobile, inclusi axe, tastiera, menu aperti, filtri, richieste simulate, storico di scorrimento, preferenze di movimento ridotto e assenza di violazioni CSP. Nessuna email reale inviata durante le prove. Risultati di Lighthouse salvati in reports/verification.json; sono misure di laboratorio, non dati sul campo.

## Evoluzione editoriale e Lenis

Aggiunti segno grafico SVG originale FlowMark, frase iniziale piu esplicita, griglia asimmetrica delle soluzioni su desktop, catalogo a righe, composizione tipografica dei marchi e firma coordinata nelle aree prodotto. La sezione azienda esplicita ruolo commerciale, sede e informazioni utili per le richieste senza aggiungere testimonianze o risultati non documentati.

Lenis 1.3.27 (https://github.com/darkroomengineering/lenis) gestisce wheel e ancore interne; il touch rimane nativo (syncTouch false). L'istanza viene distrutta con movimento ridotto e ripristinata al cambio di preferenza. Gestiti history, focus, link modificati, skip link, scroll annidati e navigazione fra documenti. Le ancore compensano le dimensioni acquisite dalle righe del catalogo durante lo scorrimento. Nessun blocco della pagina o sezione pinnata.

Verifiche aggiuntive: ancore allineate al CSS scroll-padding, wheel input, disattivazione/riattivazione dal sistema, gesture touch emulata in Chrome. I test non equivalgono a una prova su tutti i dispositivi iOS reali. Suite portata a 32 test desktop/mobile.
