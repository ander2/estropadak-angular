import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {tap} from 'rxjs/operators';

import { environment } from '../../environments/environment';

const estropadakUrl = environment.apiUrl;

@Injectable()
export class StatsService {

  constructor(private http: Http) { }

  teamColors(team: string) {
    switch (team) {
      case 'Arkote':
        return 'yellow'
      case 'Astillero':
        return 'navy'
      case 'Cabo':
        return 'red'
      case 'Castro':
        return 'red'
      case 'Deustu':
        return 'red'
      case 'Donostiarra':
        return 'LightBlue'
      case 'Getaria':
        return 'wheat'
      case 'Hondarribia':
        return 'LimeGreen'
      case 'Hibaika':
        return 'black'
      case 'Isuntza':
        return 'LightBlue'
      case 'Orio':
        return 'yellow'
      case 'Itsasoko ama':
        return 'purple'
      case 'Kaiku':
        return 'green'
      case 'Ondarroa':
        return 'red'
      case 'Portugalete':
        return 'yellow'
      case 'San Juan':
        return 'pink'
      case 'San Pedro':
        return 'purple'
      case 'Tiran':
        return 'blue'
      case 'Urdaibai':
        return 'blue'
      case 'Zarautz':
        return 'blue'
      case 'Zumaia':
        return 'red'
      case 'Zierbena':
        return 'chocolate'
    }
  }

  getGraphPointsPerRace(league: string, year?: number, team?: string) {
    const params = {league, year, team};

    return this.http.get(`${estropadakUrl}sailkapena`, {params})
    .map(res => res.json())
    .map(res => {
      const results = res.map( stat => {
        return Object.keys(stat.stats).map(taldea => {
          return {
            key: team ? stat.urtea : taldea,
            color: this.teamColors(taldea),
            values: stat.stats[taldea].positions.map((pos, i) => {
              return {
                label: i,
                value: pos
              };
            }),
          }
        });
      });
      return results.reduce((memo, val) => memo.concat(val), []);
    });
  }

  getGraphCumulativePoints(league: string, year?: number, team?: string) {
    const params = {league, year, team};

    return this.http.get(`${estropadakUrl}sailkapena`, {params})
    .map(res => res.json())
    .map(res => {
      const results = res.map( stat => {
        return Object.keys(res[0].stats).map(taldea => {
          return {
            key: team ? stat.urtea : taldea,
            color: this.teamColors(taldea),
            values: stat.stats[taldea].cumulative.map((points, i) => {
              return {
                label: i,
                value: points
              };
            }),
          }
        });
      });
      return results.reduce((memo, val) => memo.concat(val), []);
    });
  }

  getTeamRank(league: string, team: string) {
    const params = {league, team};
    return this.http.get(`${estropadakUrl}sailkapena`, {params})
    .map(res => res.json())
    .map(stats => {
      return [{
        key: team,
        color: this.teamColors(team),
        values: stats.map((stat, i) => ({label: stat.urtea, value: stat.stats[team].position}))
      }]
    });
  }

  getRank(league: string, year?: number, team?: string) {
    const params = {league, year, team};

    return this.http.get(`${estropadakUrl}sailkapena`, {params})
    .map(res => res.json())
    .map(res => {
      const stats = res[0].stats;
      return [{
        key: 'Taldea',
        values: Object.keys(stats)
                      .map((teamName) => ({
                        label: teamName,
                        color: this.teamColors(teamName),
                        value: stats[teamName].points
                      }))
                      .sort((a, b) => b.value - a.value)
      }]
    });
  }

}
