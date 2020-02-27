import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
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
}

@Injectable()
export class UrteakService {

    constructor(private http: Http) { }

    getList() {
        const endpoint = `${estropadakUrl}years`;
        return this.http.get(endpoint)
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
