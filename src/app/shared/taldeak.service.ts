import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const estropadakUrl = environment.apiUrl;

export class Team {
  name: string;
  alt_names: string[];
  short: string;
  rowers?: any[];
}


@Injectable()
export class TaldeakService {

  constructor(private http: HttpClient) { }

  getList(league?: string, year?: number): Observable<Team[]> {
      const endpoint = `${estropadakUrl}taldeak`;
      const params = {
        league,
      };
      if (year) {
        params['year'] = year;
      }
      return this.http.get(endpoint, {params}) as Observable<Team[]>;
  }

  getOne(team: string, league: string, year: number): Observable<Team> {
      const endpoint = `${estropadakUrl}taldeak/${team}`;
      const params = {
        league,
        year: '' + year
      };
      return this.http.get(endpoint, {params}) as Observable<Team>;
  }
}
