import { z } from 'zod';
import homeJson from './home.json';
import areasJson from './areas.json';
import pagesJson from './pages.json';

const text = z.string().min(1);
const homeSchema = z.object({
  hero: z.object({ eyebrow: text, lead: text }),
  areas: z.array(z.object({ slug: text, name: text, description: text, image: text, number: text })).length(4),
  audiences: z.array(z.object({ name: text, description: text, bullets: z.array(text), profile: text, cta: text })),
  catalog: z.array(z.object({ id: text, category: text, search: text, title: text, description: text, hint: text, product: text, includes: z.array(text).min(1), aliases: z.array(text), brands: z.array(text) })).length(10),
  brands: z.array(z.object({ name: text, value: text, category: text, description: text, className: text })).length(9),
  faq: z.array(z.object({ question: text, answerHtml: text })),
  guide: z.object({ intro: text, steps: z.array(z.object({ title: text, description: text })).length(3), note: text }),
});
const areaSchema = z.object({
  slug: text, name: text, title: text, description: text, heroTitle: text, lead: text,
  introTitle: text, intro: text, products: z.array(z.object({ title: text, description: text })).min(1),
});
export const home = homeSchema.parse(homeJson);
for (const item of home.catalog) {
  for (const brand of item.brands) {
    if (!home.brands.some(entry => entry.value === brand && entry.category === item.category)) throw new Error(`Unconfirmed catalogue brand: ${brand}`);
  }
}
export const areas = z.array(areaSchema).length(4).parse(areasJson);
export type Area = z.infer<typeof areaSchema>;
export const metadata = z.record(z.string(), z.object({ title: text, description: text, robots: text })).parse(pagesJson);
export function pageMetadata(key: string) {
  const entry = metadata[key];
  if (!entry) throw new Error(`Missing metadata: ${key}`);
  return entry;
}
export function requestUrl(category: string, product?: string): string {
  const query = new URLSearchParams({ categoria: category });
  if (product) query.set('prodotto', product);
  return `/?${query.toString()}#richiesta`;
}
