import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, of} from 'rxjs';

import { SailkapenakService } from 'app/shared/sailkapenak.service';
import { Stats } from 'app/shared/stats.model';
import { MatButtonToggleChange, MatSelectChange } from '@angular/material';

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
  kategoriak = [
    'Promesa NESKAK',
    'Infantila MUTILAK',
    'Absolut NESKAK',
    'Kadete MUTILAK',
    'Jubenil MUTILAK',
    'Senior MUTILAK',
    'Jubenil NESKAK',
    'Haurra NESKAK'
  ];
  dataSource;

  constructor(
    private sailkapenaService: SailkapenakService,
  ) { }

  onChangeLeague(event: MatButtonToggleChange) {
    this.league = event.value;
    this.getSailkapena(this.league, this.year);
  }

  onChangeCategory(event: MatSelectChange) {
    const category = event.value;
    console.log(category);
    this.getSailkapena(this.league, this.year, category);
  }

  ngOnChanges(changes: SimpleChanges) {
    let category;
    if (changes.year) {
      this.year = changes.year.currentValue;
    }
    if (this.league === 'gbl') {
      category = 'Haurra NESKAK';
    }

    this.getSailkapena(this.league, this.year, category);
  }

  getSailkapena(league, year, category?) {
    this.sailkapenaService.getOne(league, year, null, category)
    .subscribe((res) => {
      if (res.length > 0) {
        this.sailkapena = res[0];
        const sailk = Object.keys(this.sailkapena.stats).reduce((memo: any[], taldeIzena: string) => {
          this.sailkapena.stats[taldeIzena].izena = taldeIzena;
          memo.push(this.sailkapena.stats[taldeIzena]);
          return memo;
        }, []);
        const ordered = sailk.sort((a, b) => parseInt(a.position, 10) - parseInt(b.position, 10));
        this.dataSource = new EstropadaDataSource(ordered);
      }
    }, (err) => {
        this.dataSource = new EstropadaDataSource([]);
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
