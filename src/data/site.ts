import hosting from '../../pages.config.json';

export const siteUrl = (hosting.siteUrl || 'https://www.commercialeclimaplus.it').replace(/\/$/, '');
export const verification = hosting.googleSiteVerification;
export const company = {
  name: 'Commerciale Clima Plus', legalName: 'COMMERCIALE CLIMA PLUS SRL',
  vat: '04789550409', rea: 'FO-441136', capital: 'Euro 10.000,00 interamente versato',
  register: 'Romagna – Forlì-Cesena e Rimini', sdi: 'M5UXCR1',
  street: 'Viale Bologna 24', city: 'Forlì', postalCode: '47121', province: 'FC',
  phone: '349 680 8840', telephone: '+393496808840',
  email: 'info@commercialeclimaplus.it', pec: 'legale@pec.commercialeclimaplus.it',
  hours: 'Lunedì–Venerdì: 08:30–12:30 / 14:00–17:00',
  web3FormsKey: '86947d65-214f-44aa-90ff-6d11826ee799',
} as const;
export const requestTypes = ['Informazioni', 'Preventivo', 'Disponibilità prodotto'] as const;
export const requestCategories = ['Riscaldamento', 'Climatizzazione', 'Aria e ventilazione', 'Termoidraulica', 'Richiesta di orientamento'] as const;
export const publicRoutes = ['/', '/riscaldamento/', '/climatizzazione/', '/ventilazione/', '/termoidraulica/', '/catalogo/', '/marchi/', ...['chaffoteaux','beretta','sylber','aux','fiore','la-termocamino','itap','facot','ideal-clima'].map(slug => `/marchi/${slug}/`), '/zone-servite/', '/privacy/', '/note-legali/'];
export const policy = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://api.web3forms.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https://api.web3forms.com; upgrade-insecure-requests";
