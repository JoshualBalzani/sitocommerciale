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

## Hero panoramica

File finale: src/assets/hero-panorama.webp. Generato con lo strumento integrato image_gen, senza trasparenza incorporata nel bitmap: la velatura bianca e applicata in CSS, separatamente dal testo. Immagine ottimizzata in WebP con varianti responsive, caricamento prioritario e risoluzione adattata al ritaglio mobile. Su desktop foto a tutta larghezza con dissolvenza verso il bianco; su mobile testo e fotografia sono disposti in sequenza. Scena illustrativa, non un lavoro documentato dell'azienda.

### Prompt finale

Create ONE photorealistic premium architectural editorial photograph for the homepage of an Italian building comfort and plumbing supplier. Very wide panoramic landscape 2:1 composition. A coherent beautiful open-plan contemporary Italian apartment, off-white plaster, pale limestone, warm neutral daylight from large left windows, a quiet navy upholstered sofa. The RIGHT TWO THIRDS of this ONE real-looking room must clearly and naturally show all four comfort categories together: a generic unbranded matte-white wall-mounted split air conditioner on the far upper wall; a slim vertical white radiator on a pier near that wall with plausible small valve; a discreet dark narrow linear ventilation slot at wall-ceiling junction; in the right foreground, a brushed stainless-steel single-lever kitchen faucet over a pale stone island sink. Faucet must be clearly visible and proportionate, with no running water necessary. Beautiful architectural depth connects living and kitchen zones, not a showroom of machines. LEFT THIRD is calm bright pale wall and soft window light, suitable as a quiet backdrop for a white translucent HTML text panel that will be added by the website (DO NOT draw any panel or text). Photography should match an architecture magazine, subtle tactile material detail, soft restrained contrast, realistic proportions, clean upright verticals, no fisheye. No people, no logos, no labels, no lettering, no watermarks, no screens, no recognizable brand designs, no collage, no split panels, no diagram, no blueprint, no 3D technical illustration. Subject arrangement safe for a centered wide crop. This is an illustrative architectural environment, not a real claimed installation.

## Materiali e componenti - 19 novembre 2026

File finale: src/assets/materiali-componenti.webp. Generato con lo strumento integrato image_gen (skill imagegen); originale PNG conservato nell'archivio generated_images. Copia WebP di progetto a 1600 pixel, varianti responsive ottimizzate da Astro e caricamento differito. Inserita accanto all'introduzione della sezione interlocutori su desktop, sotto il testo su mobile; i tre percorsi rimangono sotto. Composizione illustrativa senza marchi, non rappresentativa di scorte reali.

### Prompt finale

Create one photorealistic premium editorial still-life photograph for an Italian plumbing and building comfort commercial supplier website. Landscape 3:2 framing. On a pale matte limestone work surface, a restrained balanced arrangement of five or six generic unbranded plumbing components: two well-made brass threaded elbows and a straight union, one small realistic brass ball valve with a simple navy-blue lever, and a brushed stainless steel basin mixer faucet standing upright as a material detail. Add a couple of small white ceramic and pale stone finish sample tiles, one discreet folded navy fabric swatch. The components should have physically plausible threaded openings, coherent geometry and realistic proportions. No random mechanical parts. Objects spaced naturally, not in rows, with the valve and fittings in the foreground and the faucet slightly behind. Gentle daylight from the left, soft tactile shadows, off-white background with plenty of breathing room, subtle warm-neutral palette, brass and brushed metal clearly differentiated. Shot by an architectural/product photographer on a normal lens from a slightly elevated three-quarter angle. Quiet, precise, refined, believable, not a glossy CGI render or futuristic machinery. All meaningful objects grouped in the central 70% so the photograph can crop to 16:9. No people, hands, logos, brand names, labels, packaging, writing, paperwork, watermarks or graphic overlays. This is an illustrative composition, not a depiction of a company's real stock.

## Brand pages and service areas - 2026-11-19

Mode: built-in imagegen, new image generation. Original PNGs preserved at the generator paths. Project assets optimized with sharp to WebP; Astro emits responsive variants.

### impianto

Asset: `src/assets/brands/impianto.webp`

Original: `C:\Users\nebbia\.codex\generated_images\01a1d4fc-11fc-7591-94b7-db6a4a44a577\exec-cae9448c-dba8-4ee2-b96f-1b1be3b0beb5.png`

Prompt:
> Photorealistic premium Italian corporate website editorial photograph, landscape 3:2. An immaculate generic residential technical room, one unbranded plain white wall mounted boiler and a tall cylindrical white domestic hot water storage tank, carefully routed insulated pipes, minimal realistic installation, pale limestone flooring, daylight. Soft natural side lighting, restrained navy blue accents, realistic metal and glass materials, sophisticated clean composition with breathing space. No logos, no brands, no lettering, no numbers, no labels, no people, no watermark. Illustrative generic equipment, not an identifiable commercial model.

### componenti

Asset: `src/assets/brands/componenti.webp`

Original: `C:\Users\nebbia\.codex\generated_images\01a1d4fc-11fc-7591-94b7-db6a4a44a577\exec-aaa28c5f-a379-4826-9192-668bdd8f8f70.png`

Prompt:
> Photorealistic premium Italian corporate website editorial photograph, landscape 3:2. Editorial still life of generic HVAC water treatment and hydraulic components on a pale stone workshop bench: brass distribution manifold with blue valve handles, clear unlabelled water filter housing, stainless magnetic dirt separator and two plain opaque white maintenance bottles with entirely blank surfaces, orderly realistic arrangement. Soft natural side lighting, restrained navy blue accents, realistic metal and glass materials, sophisticated clean composition with breathing space. No logos, no brands, no lettering, no numbers, no labels, no people, no watermark. Illustrative generic equipment, not an identifiable commercial model.

### fumisteria

Asset: `src/assets/brands/fumisteria.webp`

Original: `C:\Users\nebbia\.codex\generated_images\01a1d4fc-11fc-7591-94b7-db6a4a44a577\exec-7adf304f-df92-4afa-9856-3e6b8c01c050.png`

Prompt:
> Photorealistic premium Italian corporate website editorial photograph, landscape 3:2. Premium architectural product still life of unbranded stainless steel chimney flue components: straight polished double wall tubes, one elbow fitting, roof terminal cap and circular connecting collars, arranged on a warm pale stone plinth in a bright minimalist industrial showroom. Soft natural side lighting, restrained navy blue accents, realistic metal and glass materials, sophisticated clean composition with breathing space. No logos, no brands, no lettering, no numbers, no labels, no people, no watermark. Illustrative generic equipment, not an identifiable commercial model.

All new pages use two illustrative photographs, with visible AI disclosure. Existing generated area imagery is reused where relevant. No manufacturer photograph is used.
