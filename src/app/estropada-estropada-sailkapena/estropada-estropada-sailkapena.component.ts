import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, of} from 'rxjs';


@Component({
  selector: 'app-estropada-estropada-sailkapena',
  templateUrl: './estropada-estropada-sailkapena.component.html',
  styleUrls: ['./estropada-estropada-sailkapena.component.css']
})
export class EstropadaEstropadaSailkapenaComponent implements OnChanges {

  @Input() sailkapena;
  @Input() txapelketa;
  @Input() federazioSaria;
  displayedColumns = ['Postua', 'Taldea', 'Kalea', '1.z',
  '2.z', '3.z', 'Denbora', 'Puntuak'];
  dataSource;
  constructor() { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if ('sailkapena' in simpleChanges) {
      this.sailkapena = simpleChanges.sailkapena.currentValue;
      let orderedSailkapena = this.sailkapena.sort((a, b) => (parseInt(a.posizioa, 10) - parseInt(b.posizioa, 10)));
      if (this.txapelketa && this.federazioSaria) {
        const tandaKop = orderedSailkapena.reduce((memo, sailkapena) => sailkapena.tanda > memo ? sailkapena.tanda : memo, 0);
        orderedSailkapena = orderedSailkapena.filter(s => s.tanda === tandaKop);
      }
      this.dataSource = new EstropadaDataSource(orderedSailkapena);
    }
  }
}

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

