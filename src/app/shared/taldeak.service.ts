import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

const estropadakUrl = environment.apiUrl;

@Injectable()
export class TaldeakService {

  constructor(private http: Http) { }

  getList(league?: string, year?: string): Observable<any> {
      const endpoint = `${estropadakUrl}taldeak`;
      return this.http.get(endpoint)
          .map(res => res.json())
          .map(res => res.filter(it => /^[A-Z]/.test(it)))
  }
}
