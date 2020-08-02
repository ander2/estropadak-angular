import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

const estropadakUrl = environment.apiUrl;

@Injectable()
export class TaldeakService {

  constructor(private http: HttpClient) { }

  getList(league?: string, year?: number): Observable<any> {
      const endpoint = `${estropadakUrl}taldeak`;
      const params = {
        league,
      };
      if (year) {
        params['year'] = year;
      }
      return this.http.get(endpoint, {params});
  }

  getOne(team: string, league: string, year: number): Observable<any> {
      const endpoint = `${estropadakUrl}taldeak/${team}`;
      const params = {
        league,
        year: '' + year
      };
      return this.http.get(endpoint, {params});
  }
}
