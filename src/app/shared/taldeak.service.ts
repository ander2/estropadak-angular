import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const estropadakUrl = environment.apiUrl;

@Injectable()
export class TaldeakService {

  constructor(private http: Http) { }

  getList(league?: string, year?: number): Observable<any> {
      const endpoint = `${estropadakUrl}taldeak`;
      const params = {
        league,
        year
      };
      return this.http.get(endpoint, {params})
          .pipe(map(res => res.json()));
          // .pipe(map(res => res.filter(it => /^[A-Z]/.test(it))))
  }
}
