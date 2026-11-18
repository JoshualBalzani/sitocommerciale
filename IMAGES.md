# Immagini delle aree prodotto

Generate il 18 novembre 2026 con lo strumento integrato image_gen (skill imagegen), senza API o CLI esterne. Quattro ambientazioni originali senza marchi, persone o testo. Sono immagini illustrative e non documentano installazioni dell'azienda o specifici prodotti disponibili.

## File finali

- src/assets/areas/riscaldamento.webp
- src/assets/areas/climatizzazione.webp
- src/assets/areas/ventilazione.webp
- src/assets/areas/termoidraulica.webp

I PNG originali rimangono nella cartella .codex/generated_images dell'ambiente di generazione. I file di progetto sono copie WebP ottimizzate a 1600 pixel; Astro genera automaticamente le varianti responsive durante la build. Nessuna immagine viene caricata da siti esterni. La mappatura e i testi alternativi sono in src/data/imagery.ts.

## Prompt condiviso (anteposto a ciascun soggetto)

Create ONE photorealistic premium architectural editorial photograph for an Italian building comfort and plumbing supplier website. Landscape 3:2 composition, beautifully balanced restrained architecture-magazine photography, believable real materials, soft daylight entering from left, off-white plaster, pale limestone, brushed metal, a very small muted navy accent. No people, no text, no logos, no labels, no watermark, no recognizable branded product design, no collage, no graphic overlays. All equipment is generic and illustrative. Subject clearly visible near image center and safely framed for 16:9 crops. Not a technical diagram, not an illustration, not a dramatic CGI render.

## Soggetto riscaldamento

An elegant quiet contemporary interior with a generic slim vertical white panel radiator mounted on an off-white wall, a subtle visible brushed metal radiator valve near its base, pale limestone floor, small navy upholstered chair at far right edge. Radiator is the main subject. Gentle warm morning daylight, refined realistic details, no fireplace.

## Soggetto climatizzazione

A tranquil contemporary living room wall with a generic unbranded matte white wall-mounted split air conditioner, discreet slim rectangular housing, physically realistic horizontal outlet with dark slats underneath. Air conditioner is main subject, centered in upper-middle of composition, pale limestone floor, edge of navy upholstered sofa low in frame, soft cool-neutral daylight. No remote control, no screens, no visible numbers.

## Soggetto ventilazione

An architectural detail of a contemporary off-white plaster wall meeting a ceiling with a single elegant long narrow linear ventilation slot cleanly integrated at the wall-ceiling junction. Main subject is unmistakably the dark narrow horizontal ventilation grille with realistic evenly spaced tiny fins. Pale stone architectural surfaces below, soft daylight grazing plaster from left. Restrained ceiling and wall detail, not an air conditioner, no furniture dominating scene.

## Soggetto termoidraulica

A close architectural editorial still life of a generic unbranded brushed stainless steel single-lever basin mixer faucet over a simple white ceramic washbasin integrated in a pale limestone vanity, realistic gentle thin stream of clear water into basin. Faucet main subject centered, off-white plaster backsplash, subtle navy towel folded at far edge, left soft daylight, exquisite believable brushed metal and water detail.

## Integrazione

Homepage: quattro riquadri fotografici con loading lazy, srcset e dimensioni riservate per evitare salti di layout; testi separati dalle immagini e disclosure sotto la griglia. Sottopagine: immagine dedicata con testo alternativo descrittivo, caricamento prioritario e didascalia. Hero principale bianca mantenuta. Immagini decorative nei link della homepage con alt vuoto per evitare ripetizioni nel nome accessibile.
