import { Component, Input, OnChanges } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { SailkapenaService } from 'app/shared/estropada.service';

@Component({
  selector: 'app-estropadak-sailkapena',
  templateUrl: './estropadak-sailkapena.component.html',
  styleUrls: ['./estropadak-sailkapena.component.css']
})
export class EstropadakSailkapenaComponent implements OnChanges {
  @Input() league;
  @Input() year;
  sailkapena = [];

  displayedColumns = ['Posizioa', 'Taldea', 'Puntuak', 'Banderak'];
  dataSource;

  constructor(
    private sailkapenaService: SailkapenaService,
  ) { }

  ngOnChanges() {
    if (this.league === null || this.league === undefined) {
      this.league = 'ACT';
    }
    if (this.year === null || this.year === undefined) {
      this.year = '2017';
    }
    let liga = this.league;
    if (this.league.toLowerCase() !== 'euskotren') {
     liga = this.league.toUpperCase();
    } else {
      liga = this.league.toLowerCase();
    }
    this.sailkapenaService.getOne(this.league, this.year)
    .subscribe((res) => {
      this.sailkapena = res;
      const sailk = Object.keys(this.sailkapena).reduce((memo: any[], taldeIzena: string) => {
        this.sailkapena[taldeIzena].izena = taldeIzena;
        memo.push(this.sailkapena[taldeIzena]);
        return memo;
      }, []);
      const ordered = sailk.sort((a, b) => b.points - a.points);
      this.dataSource = new EstropadaDataSource(ordered);
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
