import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { SailkapenaList } from './sailkapenak.model';

const estropadakUrl = environment.apiUrl;


@Injectable()
export class SailkapenakService {

    constructor(private http: HttpClient) { }

    getList(league: string, year: string, teams?: string[]): Observable<SailkapenaList> {
        const params = {league};
        if (year) {
            params['year'] = parseInt(year, 10)
        }
        if (teams) {
            params['teams'] = teams;
        }
        const endpoint = `${estropadakUrl}sailkapenak`;
        return this.http.get(endpoint, {params}) as Observable<SailkapenaList>;
    }

    getOne(league: string, year: string, team?: string, category?: string): any {
        const params = {league, year};
        if (team) {
            params['team'] = team;
        }
        if (category) {
            params['category'] = category;
        }
        return this.http.get(`${estropadakUrl}sailkapenak`, {params});
    }
}
