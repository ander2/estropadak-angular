import { Component, OnInit, Input } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-estropada-estropada-sailkapena',
  templateUrl: './estropada-estropada-sailkapena.component.html',
  styleUrls: ['./estropada-estropada-sailkapena.component.css']
})
export class EstropadaEstropadaSailkapenaComponent implements OnInit {

  @Input() sailkapena;
  displayedColumns = ['Postua', 'Taldea', 'Kalea', '1.z',
  '2.z', '3.z', 'Denbora', 'Puntuak'];
  dataSource;
  constructor() { }

  ngOnInit() {
    const orderedSailkapena = this.sailkapena.sort((a, b) => (parseInt(a.posizioa, 10) - parseInt(b.posizioa, 10)));
    this.dataSource = new EstropadaDataSource(orderedSailkapena);
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

