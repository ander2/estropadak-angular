import { Component, OnInit, Input } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-estropada-tanda',
  templateUrl: './estropada-tanda.component.html',
  styleUrls: ['./estropada-tanda.component.css']
})
export class EstropadaTandaComponent implements OnInit {

  @Input()
  tanda;
  displayedColumns = ['Postua', 'Taldea', 'Kalea', '1.z',
  '2.z', '3.z', 'Denbora'];
  dataSource;
  constructor() { }

  ngOnInit() {
    this.dataSource = new EstropadaDataSource(this.tanda);
  }

}

class EstropadaDataSource extends DataSource<any>{
    tanda;
    constructor(tanda) {
    super();
    this.tanda = tanda;
    }

    connect(): Observable<any> {
        return Observable.of(this.tanda);
    }

    disconnect(){}
}
