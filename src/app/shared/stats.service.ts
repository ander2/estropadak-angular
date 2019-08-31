import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {map, tap } from 'rxjs/operators';

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
    .pipe(map(res => res.json()))
    .pipe(map(res => {
      const results = res.map( stat => {
        return Object.keys(stat.stats).map(taldea => {
          return {
            key: team ? stat.urtea : taldea,
            color: year ? this.teamColors(taldea) : undefined,
            values: stat.stats[taldea].cumulative.map((pos, i, arr) => {
              const points = i === 0 ? arr[i] : arr[i] - arr[i - 1];
              return {
                label: i,
                value: points
              };
            }),
          }
        });
      });
      return results.reduce((memo, val) => memo.concat(val), []);
    }));
  }

  getGraphCumulativePoints(league: string, year?: number, team?: string) {
    const params = {league, year, team};

    return this.http.get(`${estropadakUrl}sailkapena`, {params})
    .pipe(map(res => res.json()))
    .pipe(map(res => {
      const results = res.map( stat => {
        return Object.keys(res[0].stats).map(taldea => {
          return {
            key: team ? stat.urtea : taldea,
            color: year ? this.teamColors(taldea) : undefined,
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
    }));
  }

  getTeamRank(league: string, team: string) {
    const params = {league, team};
    return this.http.get(`${estropadakUrl}sailkapena`, {params})
    .pipe(map(res => res.json()))
    .pipe(map(stats => {
      return [{
        key: team,
        color: this.teamColors(team),
        values: stats.map((stat, i) => ({label: stat.urtea, value: stat.stats[team].position}))
      }]
    }));
  }

  getRank(league: string, year?: number, team?: string) {
    const params = {league, year, team};

    return this.http.get(`${estropadakUrl}sailkapena`, {params})
    .pipe(map(res => res.json()))
    .pipe(map(res => {
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
    }));
  }

  getAges(league: string, year?: number, team?: string) {
    const params = {league, year, team};

    return this.http.get(`${estropadakUrl}sailkapena`, {params})
    .pipe(map(res => res.json()))
    .pipe(map(res => {
      if (team) {
        res = res.filter(u => u.stats[team].age);
        return [{
          key: 'Min',
          // color: this.teamColors(team),
          values: res.map((stat, i) => ({
            label: stat.urtea,
            value: stat.stats[team].age ? stat.stats[team].age.min_age : 0
          }))
        }, {
          key: 'Media',
          // color: this.teamColors(team),
          values: res.map((stat, i) => ({
            label: stat.urtea,
            value: stat.stats[team].age ? stat.stats[team].age.avg_age : 0
          }))
        }, {
          key: 'Max',
          // color: this.teamColors(team),
          values: res.map((stat, i) => ({
            label: stat.urtea,
            value: stat.stats[team].age ? stat.stats[team].age.max_age : 0
          }))
        }]
      } else {
        const stats = res[0].stats;
        return [{
          key: 'Min',
          values: 
            Object.keys(stats)
                  .map((teamName) => ({
                    label: teamName,
                    value: stats[teamName].age ? parseInt(stats[teamName].age.min_age, 10) : 0
                  }))
        }, {
          key: 'Media',
          values: Object.keys(stats)
                  .map((teamName) => ({
                    label: teamName,
                    value: stats[teamName].age ? stats[teamName].age.avg_age : 0
                  }))
        }, {
          key: 'Max',
          values: Object.keys(stats)
                  .map((teamName) => ({
                    label: teamName,
                    value: stats[teamName].age ? parseInt(stats[teamName].age.max_age, 10) : 0
                  }))
        }];
      }
    }));
  }

}
