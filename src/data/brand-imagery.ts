import type { ImageMetadata } from 'astro';
import impianto from '../assets/brands/impianto.webp';
import componenti from '../assets/brands/componenti.webp';
import fumisteria from '../assets/brands/fumisteria.webp';
import materiali from '../assets/materiali-componenti.webp';
import panorama from '../assets/hero-panorama.webp';
import { areaImagery } from './imagery';
const images: Record<string, { image: ImageMetadata; alt: string }> = {
  impianto: { image: impianto, alt: 'Locale tecnico illustrativo con generatore bianco, accumulo cilindrico e tubazioni isolate, senza marchi.' },
  componenti: { image: componenti, alt: 'Composizione illustrativa di collettore, filtro acqua e componenti per la manutenzione, senza marchi.' },
  fumisteria: { image: fumisteria, alt: 'Tubi, raccordi e terminale per fumisteria in acciaio su un piano in pietra, senza marchi.' },
  materiali: { image: materiali, alt: 'Raccordi in ottone e componenti idraulici generici su un piano chiaro.' },
  panorama: { image: panorama, alt: 'Ambiente residenziale illustrativo con soluzioni integrate per il comfort.' },
};
export function brandImagery(key: string) { return images[key] ?? areaImagery(key); }
