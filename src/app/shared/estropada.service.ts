import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


import { Estropada } from './estropadak.model';
import { environment } from '../../environments/environment';

const estropadakUrl = environment.apiUrl;

@Injectable()
export class EstropadaService {

    constructor(private http: HttpClient) { }

    getList(league: string, year: string): Observable<Estropada[]> {
        const endpoint = `${estropadakUrl}estropadak`;
        const params = {league};
        if (year) {
            params['year'] = year;
        }
        return this.http.get(endpoint, {params}) as Observable<Estropada[]>;
    }

    getOne(id: string): Observable<Estropada> {
        return this.http.get(`${estropadakUrl}estropadak/${id}`) as Observable<Estropada>;
    }

    isMulticategory(league: string): boolean {
        if (['gbl', 'bbl'].indexOf(league.toLowerCase()) > -1) {
            return true;
        }
        return false;
    }

    getCategories(liga: string) {
        // 'AG', 'IG', 'IN', 'KG', 'KN', 'JG', 'JN', 'SN', 'SG'
        let kategoriak;
        if (liga.toLowerCase() === 'bbl') {
            kategoriak = [
            {
                name: 'Alebin mutilak',
                code: 'AG'
            },
            {
                name: 'Alebin neskak',
                code: 'AN'
            },
            {
                name: 'Infantil mutilak',
                code: 'IG'
            },
            {
                name: 'Infantil neskak',
                code: 'IN'
            },
            {
                name: 'Kadete mutilak',
                code: 'KG'
            },
            {
                name: 'Kadete neskak',
                code: 'KN'
            },
            {
                name: 'Jubenil mutilak',
                code: 'JG'
            },
            {
                name: 'Jubenil neskak',
                code: 'JN'
            },
            {
                name: 'Senior mutilak',
                code: 'SG'
            },
            {
                name: 'Senior neskak',
                code: 'SN'
            }
        ];
        } else {
            // 0: "Promesa NESKAK"
            kategoriak = [
            {
                name: 'Infantil mutilak',
                code: 'Infantila MUTILAK'
            },
            {
                name: 'Infantil neskak',
                code: 'Haurra NESKAK'
            },
            {
                name: 'Kadete mutilak',
                code: 'Kadete MUTILAK'
            },
            {
                name: 'Kadete neskak',
                code: 'Promesa NESKAK'
            },
            {
                name: 'Jubenil mutilak',
                code: 'Jubenil MUTILAK'
            },
            {
                name: 'Jubenil neskak',
                code: 'Jubenil NESKAK'
            },
            {
                name: 'Senior mutilak',
                code: 'Senior MUTILAK'
            },
            {
                name: 'Senior neskak',
                code: 'Absolut NESKAK'
            }
            ];

        }
        return of(kategoriak);
    }
}

@Injectable()
export class UrteakService {

    constructor(private http: HttpClient) { }

    getList(historial: boolean = false) {
        const endpoint = `${estropadakUrl}years`;
        const params = {
            historial: historial.toString()
        };
        return this.http.get(endpoint, {params}) as Observable<[{name: string, years: [number]}]>
    }

    getOne(id: string): Observable<number> {
        return this.http.get(`${estropadakUrl}${id}`) as Observable<number>;
    }
}
