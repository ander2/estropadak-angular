import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Estropadak, Stats } from 'app/shared/estropadak.model';
import { environment } from '../../environments/environment';

const estropadakUrl = environment.apiUrl;

@Injectable()
export class EstropadaService {

    constructor(private http: Http) { }

    getList(league: string, year: string): Observable<Estropadak[]> {
        const endpoint = `${estropadakUrl}estropadak/${league}/${year}`;
        return this.http.get(endpoint)
            .map(res => res.json())
    }

    getOne(id: string): Observable<Estropadak> {
        return this.http.get(`${estropadakUrl}estropada/${id}`)
            .map(res => res.json())
    }
}

@Injectable()
export class UrteakService {

    constructor(private http: Http) { }

    getList() {
        const endpoint = `${estropadakUrl}years`;
        return this.http.get(endpoint)
                .map(res => res.json())
    }

    getOne(id: string) {
        return this.http.get(`${estropadakUrl}${id}`)
            .map(res => res.json())
    }
}

@Injectable()
export class SailkapenaService {

    constructor(private http: Http) { }

    getList(league: string, year: string) {
        const endpoint = `${estropadakUrl}estropadak/${league}/${year}`;
        return this.http.get(endpoint)
            .map(res => res.json())
    }

    getOne(league: string, year: string): Observable<Stats> {
        return this.http.get(`${estropadakUrl}sailkapena/${league}/${year}`)
            .map(res => res.json())
    }
}

@Injectable()
export class EmaitzakService {

    constructor(private http: Http) { }

    getList(league: string, year: string) {
        const endpoint = `${estropadakUrl}emaitzak/${league}/${year}`;
        return this.http.get(endpoint)
            .map(res => res.json())
    }

    getOne(id: string): Observable<Estropadak> {
        return this.http.get(`${estropadakUrl}estropada/${id}`)
            .map(res => res.json())
    }
}
