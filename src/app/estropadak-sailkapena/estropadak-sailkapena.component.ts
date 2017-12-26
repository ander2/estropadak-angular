import { Component, Input, OnChanges } from '@angular/core';
import { EstropadaService } from '../shared/estropada.service';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

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
    private estropadaService: EstropadaService,
  ) { }

  ngOnChanges() {
    if (this.league === null || this.league === undefined) {
      this.league = 'ACT';
    }
    if (this.year === null || this.year === undefined) {
      this.year = '2017';
    }
    const id = `rank_${this.league.toUpperCase()}_${this.year}`;
    this.estropadaService.getOne(id)
    .subscribe((res) => {
      delete res._id;
      delete res._rev;
      this.sailkapena = res.stats;
      const sailk = Object.keys(res.stats).reduce((memo: any[], taldeIzena: string) => {
        res.stats[taldeIzena].izena = taldeIzena;
        memo.push(res.stats[taldeIzena]);
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
