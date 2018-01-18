export class TaldeSailkapena {
  denbora: string;
  kalea: number;
  postua: number;
  puntuazioa: number;
  talde_id: string;
  talde_izena: string;
  tanda: number;
  tanda_postua: number;
  ziabogak: string[];
}

export class Estropadak {
  izena: string;
  data: string;
  id: string;
  lekua: string;
  liga: 'ACT' | 'ARC1' | 'ARC2' | 'euskotren';
  urla: string;
  sailkapena: TaldeSailkapena[];
  puntuagarria?: boolean;
  oharra?: string;
}

class Stat {
  best: number;
  cumulative: number[];
  points: number;
  positions: number[];
  wins: number;
  worst: number;
  izena: string;
}

export class Stats {
  [key: string]: Stat;
}
