import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, of} from 'rxjs';

import { SailkapenaService } from 'app/shared/estropada.service';
import { Stats } from 'app/shared/stats.model';
import { MatButtonToggleChange } from '@angular/material';

@Component({
  selector: 'app-estropadak-sailkapena',
  templateUrl: './estropadak-sailkapena.component.html',
  styleUrls: ['./estropadak-sailkapena.component.css']
})
export class EstropadakSailkapenaComponent implements OnChanges {
  @Input() league;
  @Input() year;
  _showTitle = true;
  @Input()
  set showTitle(val) {
    this._showTitle = val;
  }
  get showTitle() {
    return this._showTitle;
  }
  sailkapena: Stats;

  displayedColumns = ['Posizioa', 'Taldea', 'Puntuak', 'Garaipenak'];
  dataSource;

  constructor(
    private sailkapenaService: SailkapenaService,
  ) { }

  onChangeLeague(event: MatButtonToggleChange) {
    this.league = event.value;
    this.getSailkapena(this.league, this.year);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.year) {
      this.year = changes.year.currentValue;
    }
    this.getSailkapena(this.league, this.year);
  }

  getSailkapena(league, year) {
    this.sailkapenaService.getOne(league, year)
    .subscribe((res) => {
      this.sailkapena = res[0];
      const sailk = Object.keys(this.sailkapena.stats).reduce((memo: any[], taldeIzena: string) => {
        this.sailkapena.stats[taldeIzena].izena = taldeIzena;
        memo.push(this.sailkapena.stats[taldeIzena]);
        return memo;
      }, []);
      const ordered = sailk.sort((a, b) => parseInt(a.position, 10) - parseInt(b.position, 10));
      this.dataSource = new EstropadaDataSource(ordered);
    }, (err) => {
      this.dataSource = new EstropadaDataSource([]);
      console.log('Error');
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
    return of(this.sailkapena);
  }

  disconnect() {}
}
