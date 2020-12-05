import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { EmaitzakService } from '../shared/estropada.service';
import { Estropada, TaldeSailkapena } from '../shared/estropadak.model';
import * as moment from 'moment';
import { MatTabChangeEvent } from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {Observable, of} from 'rxjs';

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
    private emaitzakService: EmaitzakService
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
    this.emaitzakService.getList(league, year)
      .subscribe((estropadak: Estropada[]) => {
        this.estropadak = estropadak
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
