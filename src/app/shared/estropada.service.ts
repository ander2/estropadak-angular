import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


import { Estropada } from './estropadak.model';
import { environment } from '../../environments/environment';

const estropadakUrl = environment.apiUrl;

// @TODO: Improve categories handling
const categories = [
    {
        name: 'Senior neskak',
        code: 'SN'
    },
    {
        name: 'Senior gizonak',
        code: 'SG'
    },
    {
        name: 'Alebin gizonak',
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
        name: 'Promesa neskak',
        code: 'PN'
    },
    {
        name: 'Promesa mutilak',
        code: 'PG'
    }
];

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
        if (['gbl', 'bbl', 'btl', 'gtl', 'txapelketak'].indexOf(league.toLowerCase()) > -1) {
            return true;
        }
        return false;
    }

    getCategoryFromCode(code: string) {
        return categories.find(c => c.code === code);
    }

    getCategoriesFromEstropada(estropada: Estropada) {
        return estropada.kategoriak.map(kategoria => categories.find(c => c.code === kategoria));
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
        } else if(['btl'].indexOf(liga.toLowerCase()) > -1) {
            kategoriak = [
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
        } else if(['gtl'].indexOf(liga.toLowerCase()) > -1) {
            kategoriak = [
                {
                    name: 'Jubenil mutilak',
                    code: 'JG'
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
        } else if(['txapelketak'].indexOf(liga.toLowerCase()) > -1){
            kategoriak = [
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
                code: 'IG'
            },
            {
                name: 'Infantil neskak',
                code: 'IN'
            },
            {
                name: 'Promesa mutilak',
                code: 'PG'
            },
            {
                name: 'Promesa neskak',
                code: 'PN'
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
