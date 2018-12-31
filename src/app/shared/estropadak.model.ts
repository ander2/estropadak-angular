export class TaldeSailkapena {
  denbora: string;
  kalea: number;
  postua: number;
  posizioa: number;
  puntuazioa: number;
  talde_id: string;
  talde_izena: string;
  tanda: number;
  tanda_postua: number;
  ziabogak: string[];
}

export class Estropada {
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
