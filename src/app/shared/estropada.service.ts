import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const estropadakUrl = 'http://estropadak.net:5984/estropadak/';

@Injectable()
export class EstropadaService {

    constructor(private http: Http) { }

    getList() {
        const endpoint = `${estropadakUrl}/_design/estropadak/_view/all?startkey=["ACT","2007"]&endkey=["ACT","2008"]`;
        return this.http.get(endpoint)
            .map(res => res.json()['rows'])
    }

    getOne(id: string) {        
        return this.http.get(`${estropadakUrl}${id}`)
            .map(res => res.json())
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
