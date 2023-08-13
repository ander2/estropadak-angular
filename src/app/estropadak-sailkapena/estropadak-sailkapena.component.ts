import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, of} from 'rxjs';

import { SailkapenakService } from 'app/shared/sailkapenak.service';
import { SailkapenaStat } from 'app/shared/sailkapenak.model';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSelectChange } from '@angular/material/select';
import { EstropadaService } from 'app/shared/estropada.service';

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
  sailkapena: SailkapenaStat[] = [];

  displayedColumns: string[] = ['Posizioa', 'Taldea', 'Puntuak', 'Garaipenak'];
  kategoriak: string[] = [];
  multikategoria = false;
  category = '';
  dataSource;

  constructor(
    private sailkapenaService: SailkapenakService,
    private estropadaService: EstropadaService,
  ) { }

  onChangeLeague(event: MatButtonToggleChange ) {
    this.league = event.value;
    this.getSailkapena(this.league, this.year);
  }

  onChangeCategory(event: MatSelectChange) {
    const category = event.value;
    this.getSailkapena(this.league, this.year, category);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.year) {
      this.year = changes.year.currentValue;
    }
    if (this.league === 'gbl' || this.league === 'btl' || this.league === 'gtl') {
      this.multikategoria = true;
    }
    if (this.league === 'gbl') {
      this.category = 'Haurra NESKAK';
    }
    if (this.league === 'btl' || this.league === 'gtl') {
      this.category = 'JG';
    }

    this.getSailkapena(this.league, this.year, this.category);
    this.estropadaService.getCategories(this.league)
      .subscribe(res => this.kategoriak = res);
  }

  getSailkapena(league, year, category?) {
    this.sailkapenaService.getOne(league, year, null, category)
    .subscribe((res) => {
      if (res.total > 0) {
        this.sailkapena = res.docs[0].stats;
        const ordered = this.sailkapena.sort((a, b) => a.value.position - b.value.position);
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
