import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const estropadakUrl = environment.apiUrl;

@Injectable()
export class TaldeakService {

  constructor(private http: HttpClient) { }

  getList(league?: string, year?: number): Observable<any> {
      const endpoint = `${estropadakUrl}taldeak`;
      const params = {
        league,
        year: '' + year
      };
      return this.http.get(endpoint, {params});
          //.pipe(map(res => res.json()));
  }

  getOne(team: string, league: string, year: number): Observable<any> {
      const endpoint = `${estropadakUrl}taldeak/${team}/plantilla`;
      const params = {
        league,
        year: '' + year
      };
      return this.http.get(endpoint, {params});
          //.pipe(map(res => res.json()));
  }
}
