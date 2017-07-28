import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const estropadakUrl = 'api/estropadak/';

@Injectable()
export class EstropadaService {

    constructor(private http: Http) { }

    getList() {
        return this.http.get(estropadakUrl)
            .map(res => res.json()['data'])
    }

    getOne(id: string) {
        return this.http.get(`${estropadakUrl}${id}`)
            .map(res => res.json()['data'])
    }

    delete(id: number) {
        return this.http.delete(`${estropadakUrl}/${id}`)
            .map((res) => res.json());
    }

    create(joke: any) {
        return this.http.post(estropadakUrl, joke)
            .map((res) => res.json());
    }

    update(joke: any) {
        return this.http.put(`${estropadakUrl}/${joke.id}`, joke)
            .map((res) => res.json());
    }
}
