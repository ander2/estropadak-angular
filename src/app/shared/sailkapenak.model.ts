export class Sailkapena {
  id: string;
  urtea: number;
  stats: SailkapenaStat[]
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
