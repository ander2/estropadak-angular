import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Http, Response } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


import { Estropada } from './estropadak.model';
import { environment } from '../../environments/environment';

const estropadakUrl = environment.apiUrl;

@Injectable()
export class EstropadaService {

    constructor(private http: Http) { }

    getList(league: string, year: string): Observable<Estropada[]> {
        const endpoint = `${estropadakUrl}estropadak`;
        const params = {league, year};
        return this.http.get(endpoint, {params})
            .pipe(map(res => res.json()))
    }

    getOne(id: string): Observable<Estropada> {
        return this.http.get(`${estropadakUrl}estropada/${id}`)
            .pipe(map(res => res.json()))
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

    constructor(private http: Http) { }

    getList(historial: boolean=false) {
        const endpoint = `${estropadakUrl}years`;
        const params = {historial};
        return this.http.get(endpoint, {params})
                .pipe(map(res => res.json()))
    }

    getOne(id: string) {
        return this.http.get(`${estropadakUrl}${id}`)
            .pipe(map(res => res.json()))
    }
}

@Injectable()
export class SailkapenaService {

    constructor(private http: Http) { }

    getList(league: string, year: string, team?: string) {
        const params = {league, year, team};
        const endpoint = `${estropadakUrl}estropadak`;
        return this.http.get(endpoint, {params})
            .pipe(map(res => res.json()));
    }

    getOne(league: string, year: string, team?: string, category?: string): any {
        const params = {league, year};
        if (team) {
            params['team'] = team;
        }
        if (category) {
            params['category'] = category;
        }
        return this.http.get(`${estropadakUrl}sailkapena`, {params})
            .pipe(map(res => res.json()));
    }
}

@Injectable()
export class EmaitzakService {

    constructor(private http: Http) { }

    getList(league: string, year: string, team?: string) {
        const endpoint = `${estropadakUrl}emaitzak`;
        const params = {league, year};
        if (team) {
            params['team'] = team;
        }
        return this.http.get(endpoint, {params})
            .pipe(map(res => res.json()));
    }

    getOne(id: string): Observable<Estropada> {
        return this.http.get(`${estropadakUrl}estropada/${id}`)
            .pipe(map(res => res.json()));
    }
}
