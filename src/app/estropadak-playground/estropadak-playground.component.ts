import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';

import { SeasonTeamSelection } from 'app/shared/stats.model';
import { TaldeakService } from 'app/shared/taldeak.service';
import { EstropadaService } from 'app/shared/estropada.service';

@Component({
  selector: 'app-estropadak-playground',
  templateUrl: './estropadak-playground.component.html',
  styleUrls: ['./estropadak-playground.component.css']
})
export class EstropadakPlaygroundComponent implements OnInit {

  public dataSource: any;
  year = 2019;
  league = 'act';
  category = '';
  displayedColumns = ['estropada'];
  displayColumnHeaders = ['izena'];
  displayProp = 'posizioa';
  properties = ['posizioa', 'puntuazioa', 'tanda', 'tanda_postua', 'kalea', 'denbora'];
  values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  taldeak = [];
  form;

  constructor(
    private estropadakService: EstropadaService,
    private taldeakService: TaldeakService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      property: [this.displayProp],
      minVal: [1],
      maxVal: [12],
      minTime: ['19:00'],
      maxTime: ['23:00'],
    });
    this.taldeakService.getList(this.league, this.year)
    .subscribe(res => {
      this.taldeak = res;
      this.getEmaitzak('ACT', 2019);
      this.dataSource = new PlaygroundDataSource([]);
    });
  }

  paramsChanged(newParams: SeasonTeamSelection) {
    this.league = newParams.league;
    this.year = newParams.year;
    this.category = newParams.category;
    this.resetTable();
    if (this.league === 'ete' || this.league === 'euskotren') {
      this.form.get('minTime').setValue('11:00');
      this.form.get('maxTime').setValue('13:00');
    }
    if (this.category.toLowerCase() === 'gbl') {
      this.properties = ['posizioa', 'puntuazioa', 'denbora'];
    } else {
      this.properties = ['posizioa', 'puntuazioa', 'tanda', 'tanda_postua', 'kalea', 'denbora'];
    }

    this.taldeakService.getList(this.league, this.year)
    .subscribe(res => {
      this.taldeak = res;
      this.getEmaitzak(newParams.league, newParams.year);
    });
  }

  resetTable() {
    this.displayColumnHeaders = ['izena'];
    this.displayedColumns = ['estropada'];
  }

  getEmaitzak(league, year) {
    this.estropadakService.getList(league, year)
      .subscribe(res => {
        res = res.filter(s => s.sailkapena);
        const emaitzak = res.map((emaitza, i) => {
          if (emaitza.izena.indexOf('Play') > -1) {
            return null;
          }
          if (i === 0) {
            // if (this.league.toLowerCase() === 'gbl') {
            //   emaitza.sailkapena = emaitza.sailkapena.filter(s => s.kategoria === this.category);
            // }
            emaitza.sailkapena.forEach(taldea => {
              const izena = this.getTeamName(taldea.talde_izena);
              this.displayColumnHeaders.push(izena)
            });
          }
          const sailkapena = {izena: emaitza.izena};
          emaitza.sailkapena.forEach((taldea) => {
            const izena = this.getTeamName(taldea.talde_izena);
            sailkapena[izena] = taldea;
          });
          return sailkapena;
        })
        .filter(emaitza => emaitza !== null);
        this.dataSource = new PlaygroundDataSource(emaitzak)
    });
  }

  getTeamName(team: string) {
    if (this.taldeak.find(t => t.alt_names.indexOf(team) > -1)) {
      return this.taldeak.find(t => t.alt_names.indexOf(team) > -1).name;
    } else {
      return team;
    }
  }

  changeDisplayProp() {
    this.displayProp = this.form.get('property').value;
  }

  changeFilter() {
    let min;
    let max;
    if (this.displayProp === 'denbora') {
      min = this.form.get('minTime').value
      max = this.form.get('maxTime').value
    } else {
      min = this.form.get('minVal').value
      max = this.form.get('maxVal').value
    }
    this.dataSource.filterByValue(this.displayProp, min, max);
  }

  removeCol(colName: string) {
    this.displayColumnHeaders = this.displayColumnHeaders.filter(h => h !== colName);
  }

}

class PlaygroundDataSource extends DataSource<any> {
  sailkapena;
  sort;
  data: BehaviorSubject<any[]> = new BehaviorSubject([]);
  constructor(sailkapena) {
    super();
    this.sailkapena = sailkapena;
    this.data.next(sailkapena);
  }

  connect(): Observable<any> {
    return this.data;
  }

  filterByValue(displayProp, minVal, maxVal) {
    const emaitzaBerria = this.sailkapena.map(estropada => {
      const d = {};
      for (const teamName of Object.keys(estropada)) {
        if (teamName !== 'izena') {
          const result = Object.assign({}, estropada[teamName]);
          if (result[displayProp]) {
            if (result[displayProp] < minVal ||
                result[displayProp] > maxVal) {
                result[displayProp] = '-';
            }
          }
          d[teamName] = result;
        } else {
          d[teamName] = estropada[teamName];
        }
      };
      return d;
    });
    this.data.next(emaitzaBerria);
  }
  disconnect() {}
}
