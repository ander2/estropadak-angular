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

export class SeasonTeamSelection {
  league: string;
  year: number;
  team: string;
  category?: string;
}
