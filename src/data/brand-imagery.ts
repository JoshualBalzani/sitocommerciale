import type { ImageMetadata } from 'astro';
import impianto from '../assets/brands/impianto.webp';
import componenti from '../assets/brands/componenti.webp';
import fumisteria from '../assets/brands/fumisteria.webp';
import materiali from '../assets/materiali-componenti.webp';
import panorama from '../assets/hero-panorama.webp';
import chaffoteaux from '../assets/brands/chaffoteaux-comfort.webp';
import beretta from '../assets/brands/beretta-centrale.webp';
import sylber from '../assets/brands/sylber-acqua-calda.webp';
import solare from '../assets/brands/solare-termico.webp';
import { areaImagery } from './imagery';
interface BrandVisual { image: ImageMetadata; alt: string; caption?: string; }
const images: Record<string, BrandVisual> = {
  'chaffoteaux-comfort': { image: chaffoteaux, alt: 'Pompa di calore generica all’esterno di un’abitazione, con accumulo per acqua calda visibile nel locale adiacente.', caption: 'Pompe di calore e accumulo per acqua calda.' },
  'beretta-centrale': { image: beretta, alt: 'Centrale termica illustrativa con tre caldaie murali generiche e collettori di distribuzione.', caption: 'Caldaie e sistemi per centrali termiche.' },
  'sylber-acqua-calda': { image: sylber, alt: 'Scaldacqua murale generico in un locale domestico con lavabo e rubinetto per l’acqua calda.', caption: 'Scaldacqua per il comfort domestico.' },
  'solare-termico': { image: solare, alt: 'Due collettori solari termici generici installati sul tetto di un’abitazione.', caption: 'Solare termico per la produzione di acqua calda.' },
  impianto: { image: impianto, alt: 'Locale tecnico illustrativo con generatore bianco, accumulo cilindrico e tubazioni isolate, senza marchi.' },
  componenti: { image: componenti, alt: 'Composizione illustrativa di collettore, filtro acqua e componenti per la manutenzione, senza marchi.' },
  fumisteria: { image: fumisteria, alt: 'Tubi, raccordi e terminale per fumisteria in acciaio su un piano in pietra, senza marchi.' },
  materiali: { image: materiali, alt: 'Raccordi in ottone e componenti idraulici generici su un piano chiaro.' },
  panorama: { image: panorama, alt: 'Ambiente residenziale illustrativo con soluzioni integrate per il comfort.' },
};
export function brandImagery(key: string): BrandVisual { return images[key] ?? areaImagery(key); }
