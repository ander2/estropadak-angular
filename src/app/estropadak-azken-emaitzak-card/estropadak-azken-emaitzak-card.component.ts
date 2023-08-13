import { Component, OnInit, OnChanges, Input } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import { MatTabChangeEvent } from '@angular/material/tabs';

import * as moment from 'moment';
import {Observable, of} from 'rxjs';

import { EstropadaService } from '../shared/estropada.service';
import { Estropada, EstropadakList } from '../shared/estropadak.model';

class EstropadaDataSource extends DataSource<any> {
    sailkapena;
    constructor(sailkapena) {
      super();
      this.sailkapena = sailkapena;
    }

    connect(): Observable<any> {
      return of(this.sailkapena);
    }

    disconnect() {}
}


@Component({
  selector: 'app-estropadak-azken-emaitzak-card',
  templateUrl: './estropadak-azken-emaitzak-card.component.html',
  styleUrls: ['./estropadak-azken-emaitzak-card.component.css']
})
export class EstropadakAzkenEmaitzakCardComponent implements OnInit, OnChanges {

  @Input() league;
  @Input() year;
  estropadak = [];
  displayedColumns = ['Taldea', 'Denbora'];
  dataSource: any;
  dataSource2: any;
  tabs = ['ACT', 'ARC1', 'ARC2', 'EUSKOTREN', 'ETE'];

  constructor(
    private estropadakService: EstropadaService
  ) { }

  ngOnInit() {
    this.showEmaitzak(this.league, this.year);
  }

  ngOnChanges() {
    this.showEmaitzak(this.league, this.year);
  }

  onChangeLeague(event: MatTabChangeEvent) {
    this.league = event.tab.textLabel;
    this.showEmaitzak(this.league, this.year);

  }

  showEmaitzak(league, year) {
    const date = moment(); // new Date().toISOString();
    this.estropadakService.getList(league, year)
      .subscribe((estropadak: EstropadakList) => {
        this.estropadak = estropadak.docs
        .filter((estropada: Estropada) => moment(estropada.data) <= date)
        .filter((estropada: Estropada) => estropada.sailkapena && estropada.sailkapena.length)
        .reverse()
        .filter((estropada: Estropada, index) => index <= 1)
        .map((estropada: Estropada) => {
          estropada.sailkapena = estropada.sailkapena
            .sort((a, b) => a.posizioa - b.posizioa)
            .filter((_, index) => index < 4);
          return estropada;
        });
        if (this.estropadak.length) {
          this.dataSource = new EstropadaDataSource(this.estropadak[0].sailkapena);
          this.dataSource2 = new EstropadaDataSource(this.estropadak[1].sailkapena);
        }
      })
  }
}
