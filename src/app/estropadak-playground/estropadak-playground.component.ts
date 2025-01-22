import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { UntypedFormBuilder } from '@angular/forms';

import { SeasonTeamSelection } from 'app/shared/stats.model';
import { TaldeakService } from 'app/shared/taldeak.service';
import { EstropadaService, UrteakService } from 'app/shared/estropada.service';
import { ActivatedRoute } from '@angular/router';
import { sanitizeLeague, sanitizeYear } from 'app/shared/utils';

@Component({
  selector: 'app-estropadak-playground',
  templateUrl: './estropadak-playground.component.html',
  styleUrls: ['./estropadak-playground.component.css']
})
export class EstropadakPlaygroundComponent implements OnInit {

  public dataSource: any;
  year:number;
  league = 'ACT';
  category = '';
  displayedColumns = ['estropada'];
  firstColumnProperty = 'data';
  displayColumnHeaders = [this.firstColumnProperty];
  displayProp = 'posizioa';
  properties = ['posizioa', 'puntuazioa', 'tanda', 'tanda_postua', 'kalea', 'denbora'];
  values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  teams = [];
  form;
  isMobile = false;
  loaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private estropadakService: EstropadaService,
    private taldeakService: TaldeakService,
    private urteakService: UrteakService,
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      teams: [],
      property: [this.displayProp],
      minVal: [1],
      maxVal: [12],
      minTime: ['19:00'],
      maxTime: ['23:00'],
    });
    if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('iPhone') > -1) {
      this.isMobile = true;
    }
    this.urteakService.getOne('active_year')
    .pipe(tap(urtea => this.year = urtea))
    .pipe(mergeMap(urtea => {
      return this.route.queryParams
    }))
    .subscribe((params) => {
      if (parseInt(sanitizeYear(params.year))) {
        this.year = parseInt(sanitizeYear(params.year));
      }
      this.league = sanitizeLeague(params.league) || 'ACT';
      this.form = this.fb.group({
        teams: [],
        property: [this.displayProp],
        minVal: [1],
        maxVal: [12],
        minTime: ['19:00'],
        maxTime: ['23:00'],
      });
      this.taldeakService.getList(this.league, this.year)
      .subscribe(res => {
        this.teams = res;
        if (this.isMobile) {
          this.form.get('teams').setValue(this.teams.map(t => t.short).slice(0, 4));
        } else {
          this.form.get('teams').setValue(this.teams.map(t => t.short));
        }
        this.getEmaitzak(this.league, this.year);
        this.loaded$.next(true);
      });
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
    if (this.category?.toLowerCase() === 'gbl') {
      this.properties = ['posizioa', 'puntuazioa', 'denbora'];
    } else {
      this.properties = ['posizioa', 'puntuazioa', 'tanda', 'tanda_postua', 'kalea', 'denbora'];
    }

    this.taldeakService.getList(this.league, this.year, this.category)
    .subscribe(res => {
      this.teams = res;
      if (this.isMobile) {
        this.form.get('teams').setValue(this.teams.map(t => t.short).slice(0, 4));
      } else {
        this.form.get('teams').setValue(this.teams.map(t => t.short));
      }
      this.getEmaitzak(newParams.league, newParams.year);
    });
  }

  resetTable() {
    this.displayColumnHeaders = [this.firstColumnProperty];
    this.displayedColumns = ['estropada'];
  }

  getEmaitzak(league, year) {
    this.estropadakService.getList(league, year)
      .subscribe(res => {
        const result = res.docs.filter(s => s.sailkapena);
        const emaitzak = result.map((emaitza, i) => {
          if (emaitza.izena.indexOf('Play') > -1) {
            return null;
          }
          const estropData = new Date(emaitza.data);
          const options = { month: '2-digit', day: '2-digit' } as const;
          const sailkapena = {
            izena: emaitza.izena,
            data: new Intl.DateTimeFormat('eu-ES', options).format(estropData)
          };
          if (this.category) {
            emaitza.sailkapena = emaitza.sailkapena
          }
          emaitza.sailkapena
          .filter( s => {
            if (this.category) {
              return s.kategoria === this.category;
            } else {
              return true;
            }
          })
          .forEach((taldeSailkapenDatuak) => {
            const izena = this.getTeamName(taldeSailkapenDatuak.talde_izena);
            sailkapena[izena] = taldeSailkapenDatuak;
          });
          return sailkapena;
        })
        .filter(emaitza => emaitza !== null);

        this.dataSource = new PlaygroundDataSource(emaitzak)
        this.changeTeams();
    });
  }

  getTeamName(team: string) {
    if (this.teams.find(t => t.alt_names.indexOf(team) > -1)) {
      return this.teams.find(t => t.alt_names.indexOf(team) > -1).short;
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

  changeTeams() {
    const teams = this.form.get('teams').value;
    this.displayColumnHeaders = [this.firstColumnProperty];
    this.displayColumnHeaders.push(...teams);
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
        if (teamName !== 'izena' && teamName !== 'data') {
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
