export const defaultRequestGuidance = 'Indica il comune o la provincia, la destinazione d’uso e se si tratta di un nuovo impianto, una sostituzione o un’integrazione.';
export const requestGuidance: Record<string, string> = {
  Riscaldamento: 'Specifica il comune, il tipo di edificio, il generatore presente e le esigenze di riscaldamento o acqua calda. Aggiungi quantità e caratteristiche note.',
  Climatizzazione: 'Specifica il comune, il numero e l’uso degli ambienti, la superficie indicativa se nota e se l’impianto è nuovo o da sostituire.',
  'Aria e ventilazione': 'Specifica il comune, l’uso e il numero degli ambienti, l’esigenza di ricambio d’aria e l’eventuale sistema già presente.',
  Termoidraulica: 'Specifica il comune, il punto d’impiego, la funzione del componente e la quantità. Se note, aggiungi misure, materiale e tipo di collegamento.',
};
