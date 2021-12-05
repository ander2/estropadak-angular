import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { of, Observable } from 'rxjs';

const estropadakUrl = environment.apiUrl;

@Injectable()
export class StatsService {

  constructor(private http: HttpClient) { }

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

  getGraphPointsPerRace(league: string, year?: number, team?: string, category?: string): Observable<any> {
    const params = {league};
    if (year) {
      params['year'] = year;
    }
    if (team) {
      params['team'] = team;
    }
    if (category) {
      params['category'] = category;
    }
    params['stat'] = 'points';

    return this.http.get(`${estropadakUrl}estatistikak`, {params});
  }

  getGraphCumulativePoints(league: string, year?: number, team?: string, category?: string): Observable<any[]> {
    const params = {league};
    if (year) {
      params['year'] = year;
    }
    if (team) {
      params['team'] = team;
    }
    if (category) {
      params['category'] = category;
    }

    return this.http.get(`${estropadakUrl}estatistikak`, {params}) as Observable<any []>;
  }

  getTeamRank(league: string, team: string) {
    const params = {
      league,
      team,
      stat: 'rank'
    };
    return this.http.get(`${estropadakUrl}estatistikak`, {params}) as Observable<any[]>;
  }

  getRank(league: string, year?: number, team?: string, category?: string) {
    const params = {league};
    if (year) {
      params['year'] = year;
    }
    if (team) {
      params['team'] = team;
    }
    if (category) {
      params['category'] = category;
    }
    params['stat'] = 'rank'

    return this.http.get(`${estropadakUrl}estatistikak`, {params}) as Observable<any[]>;
  }

  getAges(league: string, year?: number, team?: string) {
    const params = {
      league,
      stat: 'ages'
    };
    if (year) {
      params['year'] = year;
    }
    if (team) {
      params['team'] = team;
    }
    if (league.toLowerCase() === 'gbl') {
      return of([]);
    }

    return this.http.get(`${estropadakUrl}estatistikak`, {params}) as Observable<any[]>;
  }


  getIncorporations(league: string, year?: number, team?: string) {
    const params = {
      league,
      year: '' + year,
      stat: 'incorporations'
    };

    if (team) {
      params['team'] = team;
    }

    if (league.toLowerCase() === 'gbl') {
      return of([]);
    }

    return (this.http.get(`${estropadakUrl}estatistikak`, {params}) as Observable<any[]>);
  }

  getDatasets(res: any[]) {
    return {
      labels: res[0]?.values.map(val => val.label),
      datasets: res.map((val, i) => {
        let backgroundColor = ''
        if (val.key === 'Min') {
          backgroundColor = 'yellow';
        }
        if (val.key === 'Max') {
          backgroundColor = 'blue';
        }
        if (val.key === 'Media' || val.key == 'Altak') {
          backgroundColor = 'green';
        }
        if (val.key == 'Bajak') {
          backgroundColor = 'red';
        }
        return {
            label: val.key,
            data:  val.values.map(v => v.value),
            borderColor: val.key === 'Taldea' ? val.values.map(v => v.color) : res[i].color || res[i].values[0].color || backgroundColor,
            backgroundColor: val.key === 'Taldea' ? val.values.map(v => v.color) : res[i].color || res[i].values[0].color || backgroundColor
          }
      })
    }
  }

}
