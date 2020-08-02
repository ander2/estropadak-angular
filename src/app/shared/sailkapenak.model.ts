export class Sailkapena {
  id: string;
  urtea: number;
  stats: SailkapenaStat[]
}

class SailkapenaStat {
  best: number;
  cumulative: number[];
  points: number;
  positions: number[];
  wins: number;
  worst: number;
}
