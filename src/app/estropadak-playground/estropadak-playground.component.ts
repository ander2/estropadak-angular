import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmaitzakService } from 'app/shared/estropada.service';
import { TaldeakService } from 'app/shared/taldeak.service';
import { filter } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { SeasonTeamSelection } from 'app/shared/stats.model';

@Component({
  selector: 'app-estropadak-playground',
  templateUrl: './estropadak-playground.component.html',
  styleUrls: ['./estropadak-playground.component.css']
})
export class EstropadakPlaygroundComponent implements OnInit {

  public dataSource: any;
  year = 2019;
  league = 'ACT'
  displayedColumns = ['estropada'];
  displayColumnHeaders = ['izena'];
  displayProp = 'posizioa';
  properties = ['posizioa', 'puntuazioa', 'tanda', 'tanda_postua', 'kalea', 'denbora'];
  values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  taldeak = [];
  form;

  constructor(
    private emaitzakService: EmaitzakService,
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
    this.resetTable();
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
    this.emaitzakService.getList(league, year)
      .subscribe(res => {
        const emaitzak = res.map((emaitza, i) => {
          if (emaitza.izena.indexOf('Play') > -1) {
            return null;
          }
          if (i === 0) {
            console.log(this.displayColumnHeaders);
            emaitza.sailkapena.forEach(taldea => {
              const izena = this.taldeak.find(t => t.alt_names.indexOf(taldea.talde_izena) > -1).name;
              this.displayColumnHeaders.push(izena)
            });
          }
          const sailkapena = {izena: emaitza.izena};
          emaitza.sailkapena.forEach((taldea) => {
            const izena = this.taldeak.find(t => t.alt_names.indexOf(taldea.talde_izena) > -1).name;
            sailkapena[izena] = taldea;
          });
          return sailkapena;
        })
        .filter(emaitza => emaitza !== null);
        this.dataSource = new PlaygroundDataSource(emaitzak)
    });
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
    console.log(`removing ${colName} col`);
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
    // this.data.next([{izena: 'Kontxa', Donostiarra: {name: 'Donos', position: 1}}]);
    return this.data;
    // this.sort.sortChange
    //   .subscribe(ev => {
    //     const sailk = this.sailkapena.sort((a, b) => {
    //       if (['denbora', 'data'].indexOf(ev.active) > -1) {
    //         if (a[ev.active] < b[ev.active]) {
    //           return ev.direction === 'asc' ? -1 : 1;
    //         } else if (a[ev.active] > b[ev.active]) {
    //           return ev.direction === 'asc' ? 1 : -1;
    //         } else {
    //           return 0;
    //         }
    //       } else {
    //         return ev.direction === 'asc' ? a[ev.active] - b[ev.active] : b[ev.active] - a[ev.active];
    //       }
    //     });
    //     this.data.next(this.sailkapena);
    //   });
    // return this.data;
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
