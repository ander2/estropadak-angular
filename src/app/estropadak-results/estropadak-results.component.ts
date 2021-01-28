import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material/sort';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { EmaitzakService } from 'app/shared/emaitzak.service';
import { SeasonTeamSelection } from 'app/shared/stats.model';

@Component({
  selector: 'app-estropadak-results',
  templateUrl: './estropadak-results.component.html',
  styleUrls: ['./estropadak-results.component.css']
})
export class EstropadakResultsComponent implements OnInit, AfterViewInit {

  public league: string;
  public team: string;
  public year: number;
  public results: any[] = [];
  public emaitzak = [];
  displayedColumns = ['estropada_data', 'estropada_izena', 'denbora', 'posizioa', 'puntuazioa'];
  public dataSource = new EstropadaDataSource([]);
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private emaitzakService: EmaitzakService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.league = params.get('league');
      this.year = parseInt(params.get('year'), 10);
      this.team = params.get('team');
    });
  }

  ngAfterViewInit() {
    this.getEmaitzak(this.league, '' + this.year, this.team)
  }

  getEmaitzak(league, year, team) {
    this.emaitzakService.getList(league, year, team)
      .subscribe(res => {
        this.emaitzak = res;
        this.dataSource.data.next(this.emaitzak);
        this.sort.sortChange
          .subscribe(ev => {
            console.log(ev);
            const sailk = this.emaitzak.sort((a, b) => {
              if (['denbora', 'estropada_data'].indexOf(ev.active) > -1) {
                if (a[ev.active] < b[ev.active]) {
                  return ev.direction === 'asc' ? -1 : 1;
                } else if (a[ev.active] > b[ev.active]) {
                  return ev.direction === 'asc' ? 1 : -1;
                } else {
                  return 0;
                }
              } else {
                return ev.direction === 'asc' ? a[ev.active] - b[ev.active] : b[ev.active] - a[ev.active];
              }
            });
            this.dataSource.data.next(sailk);
          });
    });
  }

  paramsChanged(newParams: SeasonTeamSelection) {
    this.league = newParams.league;
    this.year = newParams.year;
    this.team = newParams.team;
    this.getEmaitzak(newParams.league, newParams.year, newParams.team);
  }

}

class EstropadaDataSource extends DataSource<any> {
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

  disconnect() {}
}
