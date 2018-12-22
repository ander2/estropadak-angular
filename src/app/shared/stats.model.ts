export class Stat {
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
