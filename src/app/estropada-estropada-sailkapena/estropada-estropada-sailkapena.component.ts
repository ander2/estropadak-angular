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
  _baseColumns = ['Postua', 'Taldea', 'Kalea', 'Denbora', 'Puntuak'];
  displayedColumns = ['Postua', 'Taldea', 'Kalea', 'Denbora', 'Puntuak'];
  dataSource;
  ziabogak;
  constructor() { }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if ('sailkapena' in simpleChanges) {
      this.sailkapena = simpleChanges.sailkapena.currentValue;
      this.ziabogak = this.sailkapena[0]['ziabogak'].length;
      this.displayedColumns = this._baseColumns.slice();
      this.sailkapena[0]['ziabogak'].forEach((z, i) => {
        if (z) {
          this.displayedColumns.splice(3 + i, 0, i+'.z');
        }
      });
      let orderedSailkapena = this.sailkapena.sort((a, b) => (parseInt(a.posizioa, 10) - parseInt(b.posizioa, 10)));
      if (this.txapelketa && this.federazioSaria) {
        const tandaKop = orderedSailkapena.reduce((memo, sailkapena) => sailkapena.tanda > memo ? sailkapena.tanda : memo, 0);
        orderedSailkapena = orderedSailkapena.filter(s => s.tanda === tandaKop);
      }
      this.dataSource = orderedSailkapena;
    }
  }
}
