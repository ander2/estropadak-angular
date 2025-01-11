export class Sailkapena {
  id: string;
  year: number;
  stats: SailkapenaStat[]
}
export class SailkapenaList {
  total: number;
  docs: Sailkapena[];
}

export class SailkapenaStat {
  name: string;
  value: Stat;
}

class Stat {
  best: number;
  cumulative: number[];
  points: number;
  position: number;
  positions: number[];
  wins: number;
  worst: number;
}
