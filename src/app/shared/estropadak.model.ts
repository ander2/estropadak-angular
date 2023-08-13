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
  kategoria: string;
}

export class BiEgunekoSailkapena {
  lehen_jardunaldiko_denbora: string;
  bigarren_jardunaldiko_denbora: string;
  denbora_batura: string;
  posizioa: number;
  talde_izena: string;
}

export class Estropada {
  izena: string;
  data: string;
  id: string;
  lekua: string;
  liga: string;
  urla: string;
  tandak?: TaldeSailkapena[];
  kategoriak?: string[];
  sailkapena: TaldeSailkapena[];
  puntuagarria?: boolean;
  oharrak?: string;
  bi_jardunaldiko_bandera?: boolean;
  jardunaldia?: number;
  bi_eguneko_sailkapena?: BiEgunekoSailkapena[];
  related_estropada?: string;
}

export class EstropadakList {
  total: number;
  docs: Estropada[];
}