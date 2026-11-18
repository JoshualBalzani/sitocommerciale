import heat from '../assets/areas/riscaldamento.webp';
import air from '../assets/areas/climatizzazione.webp';
import ventilation from '../assets/areas/ventilazione.webp';
import water from '../assets/areas/termoidraulica.webp';
import type { ImageMetadata } from 'astro';

const imagery: Record<string, { image: ImageMetadata; alt: string }> = {
  riscaldamento: { image: heat, alt: 'Radiatore verticale bianco in un ambiente contemporaneo con luce naturale.' },
  climatizzazione: { image: air, alt: 'Climatizzatore a parete senza marchio in un soggiorno luminoso.' },
  ventilazione: { image: ventilation, alt: 'Bocchetta lineare di ventilazione integrata tra parete e soffitto.' },
  termoidraulica: { image: water, alt: 'Miscelatore in metallo spazzolato su un lavabo con piano in pietra chiara.' },
};
export function areaImagery(slug: string) {
  const asset = imagery[slug];
  if (!asset) throw new Error(`Missing area image: ${slug}`);
  return asset;
}
