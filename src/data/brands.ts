import { z } from 'zod';

export const provinces = ['Forlì-Cesena', 'Ravenna', 'Rimini', 'Bologna'] as const;
export const administrativeAreas = provinces.map(name => ({ '@type': 'AdministrativeArea', name: `Provincia di ${name}` }));
const familySchema = z.object({ title: z.string().min(1), items: z.array(z.string().min(1)).min(1), category: z.enum(['Riscaldamento','Climatizzazione','Aria e ventilazione','Termoidraulica']).optional() });
const brandSchema = z.object({
  slug: z.string().regex(/^[a-z-]+$/), name: z.string().min(1), value: z.string().min(1),
  category: z.string().min(1), area: z.enum(['riscaldamento','climatizzazione','ventilazione','termoidraulica']),
  tagline: z.string().min(1), intro: z.string().min(1), context: z.string().min(1),
  image: z.string(), secondary: z.string(), families: z.array(familySchema).min(1),
});
export const brands = z.array(brandSchema).length(9).parse([
  {
    slug: 'chaffoteaux', name: 'Chaffoteaux', value: 'Chaffoteaux', category: 'Riscaldamento', area: 'riscaldamento',
    tagline: 'Riscaldamento, acqua calda e sistemi integrati.', image: 'chaffoteaux-comfort', secondary: 'solare-termico',
    intro: 'Dalla generazione del calore alla produzione di acqua calda sanitaria: la gamma Chaffoteaux comprende tecnologie a gas, elettriche e rinnovabili. Commerciale Clima Plus è il riferimento commerciale per orientare la richiesta tra le diverse famiglie.',
    context: 'Per una sostituzione o un nuovo impianto, indicare la destinazione degli ambienti, il sistema esistente e le esigenze di acqua calda aiuta a inquadrare la richiesta commerciale.',
    families: [
      { title: 'Caldaie', items: ['Caldaie a condensazione', 'Caldaie convenzionali'] },
      { title: 'Pompe di calore e sistemi ibridi', items: ['Pompe di calore', 'Sistemi ibridi per il riscaldamento'] },
      { title: 'Acqua calda sanitaria', items: ['Scaldacqua a pompa di calore', 'Scaldacqua a gas', 'Scaldacqua elettrici'] },
      { title: 'Solare e accumulo', items: ['Solare termico', 'Bollitori e accumuli'] },
      { title: 'Terminali e controllo', items: ['Ventilconvettori', 'Termoregolazione e gestione connessa'] },
    ],
  },
  {
    slug: 'beretta', name: 'Beretta', value: 'Beretta', category: 'Riscaldamento', area: 'riscaldamento',
    tagline: 'Soluzioni per il comfort residenziale e professionale.', image: 'beretta-centrale', secondary: 'climatizzazione',
    intro: 'La gamma Beretta riunisce riscaldamento, climatizzazione e produzione di acqua calda, con soluzioni per abitazioni e impianti professionali. Seguiamo le richieste commerciali mettendo in relazione la famiglia di prodotto con il contesto di utilizzo.',
    context: 'Impianto autonomo, centrale termica o ambiente commerciale: specificare il tipo di intervento permette di distinguere le esigenze di generazione, distribuzione e regolazione del comfort.',
    families: [
      { title: 'Caldaie residenziali', items: ['Caldaie murali a condensazione', 'Caldaie convenzionali', 'Caldaie a basamento'] },
      { title: 'Impianti professionali', items: ['Caldaie professionali', 'Soluzioni per centrali termiche'] },
      { title: 'Pompe di calore e sistemi ibridi', items: ['Refrigeratori e pompe di calore aria-acqua', 'Sistemi ibridi'] },
      { title: 'Climatizzazione e terminali', category: 'Climatizzazione', items: ['Climatizzazione', 'Unità terminali per il comfort ambiente'] },
      { title: 'Acqua calda e solare', items: ['Scaldabagni a gas', 'Scaldacqua a pompa di calore', 'Solare termico'] },
      { title: 'Complementi di impianto', items: ['Regolazione', 'Accumulo e accessori di impianto'] },
    ],
  },
  {
    slug: 'sylber', name: 'Sylber', value: 'Sylber', category: 'Riscaldamento', area: 'riscaldamento',
    tagline: 'Generazione del calore e acqua calda sanitaria.', image: 'sylber-acqua-calda', secondary: 'impianto',
    intro: 'Sylber propone una gamma dedicata al riscaldamento e all’acqua calda, dalle utenze residenziali agli impianti centralizzati. La nostra attività di rappresentanza accompagna la richiesta commerciale tra generatori, accumuli, terminali e complementi.',
    context: 'La richiesta può riguardare il solo generatore oppure più parti dell’impianto. Indicare gli elementi già presenti e la tipologia di utenza rende più preciso il confronto commerciale.',
    families: [
      { title: 'Pompe di calore e sistemi ibridi', items: ['Pompe di calore', 'Sistemi ibridi'] },
      { title: 'Caldaie per la residenza', items: ['Caldaie murali', 'Caldaie a basamento'] },
      { title: 'Riscaldamento centralizzato', items: ['Caldaie professionali', 'Sistemi per impianti centralizzati'] },
      { title: 'Acqua calda sanitaria', items: ['Scaldabagni a gas', 'Scaldacqua a pompa di calore'] },
      { title: 'Solare e accumulo', items: ['Solare termico', 'Bollitori'] },
      { title: 'Terminali e complementi', items: ['Unità terminali', 'Complementi di impianto'] },
    ],
  },
  {
    slug: 'aux', name: 'AUX', value: 'AUX', category: 'Climatizzazione', area: 'climatizzazione',
    tagline: 'Climatizzazione e pompe di calore.', image: 'climatizzazione', secondary: 'ventilazione',
    intro: 'La gamma italiana AUX comprende climatizzazione residenziale, commerciale leggero e sistemi per applicazioni commerciali, oltre alle pompe di calore. Raccogliamo le richieste per individuare la famiglia coerente con gli ambienti da servire.',
    context: 'Numero di locali, destinazione d’uso e preferenza tra unità a vista o canalizzate sono informazioni utili per una prima richiesta. La configurazione e il dimensionamento richiedono una verifica tecnica dedicata.',
    families: [
      { title: 'Climatizzazione residenziale', items: ['Climatizzatori a parete', 'Sistemi monosplit e multisplit', 'Unità interne ed esterne'] },
      { title: 'Commerciale leggero', items: ['Unità a cassetta e cassette compatte', 'Climatizzatori canalizzabili', 'Unità a console', 'Unità soffitto-pavimento'] },
      { title: 'Sistemi commerciali', items: ['Sistemi VRF', 'Unità esterne e terminali interni per impianti commerciali'] },
      { title: 'Pompe di calore', items: ['Pompe di calore aria-acqua per riscaldamento e acqua calda'] },
    ],
  },
  {
    slug: 'fiore', name: 'Fiore Rubinetterie', value: 'Fiore', category: 'Termoidraulica', area: 'termoidraulica',
    tagline: 'Rubinetteria per bagno, cucina e ambiente doccia.', image: 'termoidraulica', secondary: 'materiali',
    intro: 'Fiore Rubinetterie offre famiglie dedicate ai punti acqua della casa e agli spazi collettivi. Il nostro riferimento commerciale consente di descrivere la tipologia di rubinetteria e il contesto di installazione senza dover partire da un codice articolo.',
    context: 'Lavabo, bidet, vasca, doccia o cucina: indicare il punto acqua e la modalità di installazione, esterna o a incasso, permette di circoscrivere la richiesta.',
    families: [
      { title: 'Bagno', items: ['Miscelatori lavabo e bidet', 'Rubinetteria tradizionale a due comandi', 'Miscelatori vasca e bordo vasca'] },
      { title: 'Doccia', items: ['Miscelatori doccia esterni e a incasso', 'Colonne doccia', 'Soffioni, doccette e accessori'] },
      { title: 'Cucina', items: ['Miscelatori per lavello e cucina'] },
      { title: 'Regolazione e incasso', items: ['Rubinetteria termostatica', 'Corpi e sistemi a incasso', 'Rubinetteria elettronica'] },
      { title: 'Spazi esterni', items: ['Colonne doccia per esterni e bordo piscina'] },
    ],
  },
  {
    slug: 'la-termocamino', name: 'La termocamino', value: 'La termocamino', category: 'Termoidraulica', area: 'termoidraulica',
    tagline: 'Fumisteria, canalizzazione e integrazione di impianto.', image: 'fumisteria', secondary: 'impianto',
    intro: 'La termocamino propone una gamma che parte dai sistemi fumari e si estende alla distribuzione del calore e alle energie alternative. Seguiamo le richieste commerciali per famiglie di componenti, accessori e sistemi integrati.',
    context: 'Per fumisteria e canalizzazioni sono utili il tipo di generatore e la destinazione dell’impianto. Compatibilità, percorso e caratteristiche dei componenti vanno definiti dal professionista incaricato.',
    families: [
      { title: 'Sistemi fumari metallici', items: ['Canne fumarie in acciaio inox e rame', 'Sistemi monoparete, doppia parete e coibentati', 'Condotti ovali e flessibili'] },
      { title: 'Condotti e accessori fumo', items: ['Canali per biomassa', 'Sistemi coassiali per condensazione', 'Terminali, comignoli e passaggi a tetto'] },
      { title: 'Aria e collegamenti', category: 'Aria e ventilazione', items: ['Ventilazione e canalizzazione', 'Sistemi di collegamento per split'] },
      { title: 'Distribuzione del calore', category: 'Riscaldamento', items: ['Radiatori e termoarredi', 'Moduli di gestione del calore', 'Bollitori e puffer'] },
      { title: 'Energie alternative', category: 'Riscaldamento', items: ['Solare termico e fotovoltaico', 'Sistemi integrati e biomassa'] },
      { title: 'Stufe e camini', category: 'Riscaldamento', items: ['Accessori per stufe e caminetti', 'Complementi di design'] },
    ],
  },
  {
    slug: 'itap', name: 'ITAP', value: 'ITAP', category: 'Termoidraulica', area: 'termoidraulica',
    tagline: 'Valvole, raccordi e distribuzione per gli impianti.', image: 'materiali', secondary: 'componenti',
    intro: 'ITAP comprende componenti per acqua, gas e riscaldamento: intercettazione, distribuzione, regolazione e protezione dell’impianto. La richiesta commerciale può essere organizzata per funzione del componente e tipologia di collegamento.',
    context: 'Materiale della tubazione, applicazione e funzione richiesta aiutano a distinguere raccordi, valvole e gruppi di distribuzione. Le caratteristiche di esercizio devono essere verificate nella documentazione tecnica.',
    families: [
      { title: 'Valvole e rubinetti', items: ['Valvole di ritegno e di fondo', 'Valvole a sfera e saracinesche', 'Rubinetti di erogazione, sottolavabo, incasso e lavatrice', 'Valvole e dispositivi di sicurezza gas'] },
      { title: 'Riscaldamento e regolazione', category: 'Riscaldamento', items: ['Valvole termostatizzabili, manuali e detentori', 'Teste termostatiche e valvole bitubo', 'Servocomandi e valvole di zona', 'Termostati e cronotermostati'] },
      { title: 'Distribuzione', items: ['Collettori in acciaio inox e ottone', 'Gruppi di regolazione a punto fisso', 'Gruppi e accessori di distribuzione'] },
      { title: 'Raccordi', items: ['Raccordi per multistrato, PEX, polibutilene e rame', 'Raccordi a innesto rapido', 'Raccordi per polietilene', 'Raccordi meccanici e accessori'] },
      { title: 'Protezione e trattamento acqua', items: ['Riduttori di pressione e filtri', 'Dosatori di polifosfati e defangatori magnetici', 'Gruppi di riempimento e valvole di sicurezza', 'Valvole antigelo per pompe di calore e sfiati aria'] },
      { title: 'Accessori', items: ['Manometri e termometri', 'Accessori per solare termico'] },
    ],
  },
  {
    slug: 'facot', name: 'Facot', value: 'Facot', category: 'Termoidraulica', area: 'termoidraulica',
    tagline: 'Trattamento, manutenzione e protezione degli impianti.', image: 'componenti', secondary: 'materiali',
    intro: 'La gamma Facot comprende prodotti chimici e componenti per trattamento dell’acqua, manutenzione e protezione delle installazioni. Organizziamo le richieste per ambito applicativo, dalla termoidraulica alla manutenzione civile e industriale.',
    context: 'Per orientare la richiesta sono utili il tipo di impianto, il materiale da trattare e lo scopo dell’intervento. Impiego, dosaggi e compatibilità fanno riferimento alle schede tecniche e di sicurezza del produttore.',
    families: [
      { title: 'Sigillatura e adesione', items: ['Mastici, sigillanti, siliconi e stucchi', 'Adesivi e polimeri ibridi', 'Preparazione delle superfici e additivi per calcestruzzo'] },
      { title: 'Trattamento acqua', items: ['Addolcimento e filtrazione', 'Prodotti per impianti termici e refrigeranti', 'Trattamento e protezione dei circuiti'] },
      { title: 'Climatizzazione e manutenzione', category: 'Climatizzazione', items: ['Prodotti per trattamento aria e condizionamento', 'Manutenzione civile e industriale'] },
      { title: 'Protezione e riparazione', items: ['Nastri anticorrosivi e isolanti', 'Sistemi termorestringenti', 'Collari di riparazione'] },
      { title: 'Solare termico', items: ['Tubazioni solari binate preisolate e accessori'] },
      { title: 'Pulizia e sanificazione', items: ['Detergenti e sanificanti', 'Disinfettanti, biocidi e prodotti biologici'] },
    ],
  },
  {
    slug: 'ideal-clima', name: 'Ideal Clima', value: 'Ideal Clima', category: 'Aria e ventilazione', area: 'ventilazione',
    tagline: 'Comfort radiante, ricambio d’aria e terminali ambiente.', image: 'ventilazione', secondary: 'riscaldamento',
    intro: 'Ideal Clima riunisce soluzioni per riscaldamento e raffrescamento radiante, ventilazione e trattamento del comfort ambiente. La nostra rappresentanza offre un contatto commerciale per le diverse parti del sistema, dalla distribuzione ai terminali.',
    context: 'Nuova costruzione e riqualificazione possono richiedere soluzioni differenti per ricambio d’aria, umidità e distribuzione del calore. Indicare gli ambienti e l’impianto previsto aiuta a organizzare la richiesta.',
    families: [
      { title: 'Sistemi radianti', category: 'Riscaldamento', items: ['Riscaldamento e raffrescamento a pavimento', 'Sistemi radianti a soffitto', 'Tubi, pannelli e accessori'] },
      { title: 'Distribuzione e regolazione', category: 'Riscaldamento', items: ['Collettori, distributori e cassette', 'Termoregolazione, sensori e controllo per zone'] },
      { title: 'Ventilazione meccanica', items: ['VMC decentralizzata e canalizzata', 'Unità di recupero del calore', 'Condotti, silenziatori, collettori e plenum', 'Griglie e terminali di presa ed espulsione aria'] },
      { title: 'Trattamento del comfort', items: ['Deumidificatori per sistemi radianti', 'Comandi e accessori di ventilazione'] },
      { title: 'Terminali e climatizzazione', category: 'Climatizzazione', items: ['Radiatori', 'Terminali idronici e idronici canalizzati', 'Climatizzatori senza unità esterna'] },
    ],
  },
]);
export type Brand = z.infer<typeof brandSchema>;
export function brandRequestUrl(brand: Brand, product?: string) {
  const category = brand.families.find(family => family.title === product)?.category ?? brand.category;
  const query = new URLSearchParams({ categoria: category, marchio: brand.value });
  if (product) query.set('prodotto', product);
  return `/?${query.toString()}#richiesta`;
}
