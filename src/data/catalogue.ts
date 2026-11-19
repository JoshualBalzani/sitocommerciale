import { brands, brandRequestUrl } from './brands';

export const applications = [
  { id: 'comfort', name: 'Comfort degli ambienti' },
  { id: 'acqua-calda', name: 'Acqua calda sanitaria' },
  { id: 'impianti', name: 'Centrali e sistemi integrati' },
  { id: 'distribuzione', name: 'Distribuzione e regolazione' },
  { id: 'aria', name: 'Ricambio e trattamento aria' },
  { id: 'manutenzione', name: 'Protezione e manutenzione' },
  { id: 'bagno-cucina', name: 'Bagno, doccia e cucina' },
] as const;
type ApplicationId = typeof applications[number]['id'];
// Editorial classification follows the existing family order; never infer a brand's
// complete range from its main commercial category.
const familyApplications: Record<string, ApplicationId[][]> = {
  chaffoteaux: [['comfort','acqua-calda'],['comfort','impianti'],['acqua-calda'],['acqua-calda','impianti'],['comfort','distribuzione']],
  beretta: [['comfort','acqua-calda'],['impianti'],['comfort','impianti'],['comfort'],['acqua-calda','impianti'],['distribuzione','impianti']],
  sylber: [['comfort','impianti'],['comfort','acqua-calda'],['impianti'],['acqua-calda'],['acqua-calda','impianti'],['comfort','distribuzione']],
  aux: [['comfort'],['comfort'],['comfort','impianti'],['comfort','acqua-calda']],
  fiore: [['bagno-cucina'],['bagno-cucina'],['bagno-cucina'],['bagno-cucina','distribuzione'],['bagno-cucina']],
  'la-termocamino': [['impianti'],['impianti'],['aria','distribuzione'],['comfort','distribuzione','impianti'],['impianti','acqua-calda'],['comfort']],
  itap: [['distribuzione'],['comfort','distribuzione'],['distribuzione'],['distribuzione'],['manutenzione','distribuzione'],['distribuzione']],
  facot: [['manutenzione'],['manutenzione'],['aria','manutenzione'],['manutenzione'],['distribuzione','impianti'],['manutenzione']],
  'ideal-clima': [['comfort'],['distribuzione','comfort'],['aria'],['aria','comfort'],['comfort']],
};
export const catalogue = brands.flatMap(brand => {
  const classification = familyApplications[brand.slug];
  if (!classification || classification.length !== brand.families.length) throw new Error(`Incomplete catalogue classification: ${brand.slug}`);
  return brand.families.map((family,index) => ({
    id: `${brand.slug}-${index+1}`, order: index, brand: brand.value, brandName: brand.name,
    title: family.title, items: family.items, applications: classification[index]!,
    brandUrl: `/marchi/${brand.slug}/#famiglia-${index+1}`,
    requestUrl: brandRequestUrl(brand,family.title),
  }));
}).sort((a,b) => a.order - b.order);
export function catalogueUrl(brand?: string) {
  return brand ? `/catalogo/?${new URLSearchParams({ marchio: brand }).toString()}#catalogo` : '/catalogo/';
}
