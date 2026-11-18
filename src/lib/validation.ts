import { z } from 'zod';
import { requestCategories, requestTypes } from '../data/site';
z.config({ jitless: true });

export const requestSchema = z.object({
  'tipo-richiesta': z.enum(requestTypes, { error: 'Seleziona il tipo di richiesta.' }),
  profilo: z.string().max(80),
  categoria: z.enum(requestCategories, { error: 'Seleziona una categoria.' }),
  marchio: z.string().trim().max(100),
  prodotto: z.string().trim().max(180, 'Usa al massimo 180 caratteri.'),
  messaggio: z.string().trim().min(15, 'Descrivi la richiesta usando almeno 15 caratteri.').max(3000, 'Usa al massimo 3.000 caratteri.'),
  nome: z.string().trim().min(2, 'Inserisci nome e cognome.').max(100),
  azienda: z.string().trim().max(150),
  email: z.email('Inserisci un indirizzo email valido.').max(254),
  telefono: z.string().trim().max(30, 'Controlla il numero di telefono.'),
});
export type CommercialRequest = z.infer<typeof requestSchema>;
