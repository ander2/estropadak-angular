import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EstropadaService } from '../shared/estropada.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-estropadak-sailkapena',
  templateUrl: './estropadak-sailkapena.component.html',
  styleUrls: ['./estropadak-sailkapena.component.css']
})
export class EstropadakSailkapenaComponent implements OnInit {
  league;
  year;
  sailkapena = [];

  displayedColumns = ['Taldea', 'Puntuak'];
  dataSource;

  constructor(
    private estropadaService: EstropadaService,
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.league = this.route.snapshot.paramMap.get('league');
    this.year = this.route.snapshot.paramMap.get('year');
    if (this.league === null || this.league === undefined){
      this.league = 'ACT';
    }
    if (this.year === null || this.year === undefined){
      this.year = '2017';
    }
    const id = `rank_${this.league}_${this.year}`;
    this.estropadaService.getOne(id)
    .subscribe((res) => {
      delete res._id;
      delete res._rev;
      Object.keys(res).forEach((key) => this.sailkapena.push({izena: key, puntuazioa: res[key]}));
      this.sailkapena.sort((a, b) => b.puntuazioa - a.puntuazioa);
      this.dataSource = new EstropadaDataSource(this.sailkapena);
    });
  }
}


class EstropadaDataSource extends DataSource<any> {
  sailkapena;
  constructor(sailkapena) {
    super();
    this.sailkapena = sailkapena;
  }

  connect(): Observable<any> {
    return Observable.of(this.sailkapena);
  }

  disconnect() {}
}