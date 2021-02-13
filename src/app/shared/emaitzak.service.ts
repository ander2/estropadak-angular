import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Estropada } from './estropadak.model';

import { environment } from '../../environments/environment';
import { Emaitza, EmaitzaResult } from './emaitzak.model';

const estropadakUrl = environment.apiUrl;

@Injectable()
export class EmaitzakService {

    constructor(private http: HttpClient) { }

    getList(league: string, year: string, team?: string): Observable<Emaitza[]> {
        const endpoint = `${estropadakUrl}emaitzak`;
        const criteria = {
            type: "emaitza",
            liga: league.toUpperCase(),
            estropada_data: { 
                "$and": [{
                    "$gt": `${year}-01-01`
                }, {
                    "$lt": `${year}-12-01` 
                }
            ]}, 
            talde_izen_normalizatua: `${team}`
        };
        const params = {criteria: JSON.stringify(criteria)};
        return this.http.get(endpoint, {params}) as Observable<Emaitza[]>;
    }

    getOne(id: string): Observable<Estropada> {
        return this.http.get(`${estropadakUrl}estropadak/${id}`) as Observable<Estropada>;
    }

    get(criteria: any, from: number, count: number): Observable<EmaitzaResult> {
        const endpoint = `${estropadakUrl}emaitzak`;
        criteria['type'] = "emaitza";
        const params = {
            criteria: JSON.stringify(criteria),
            page: '' + from,
            count: '' + count
        };
        return this.http.get(endpoint, {params}) as Observable<EmaitzaResult>;
    }
}