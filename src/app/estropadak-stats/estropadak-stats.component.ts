import { Component, OnInit, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { EstropadaService, SailkapenaService } from 'app/shared/estropada.service';
import 'nvd3';
import { Estropadak } from 'app/shared/estropadak.model';
declare let d3: any;

@Component({
  selector: 'app-estropadak-stats',
  templateUrl: './estropadak-stats.component.html',
  styleUrls: [
    '../../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class EstropadakStatsComponent implements OnInit, OnChanges {
  options;
  piechartOptions;
  data;
  estropadak: string[] = [];
  cumulative = [];
  rank = [];
  wins = [];

  @Input() year;
  @Input() league;

  constructor(
    private estropadaService: EstropadaService,
    private sailkapenaService: SailkapenaService
  ) { }

  ngOnInit() {
    this.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: (d) => d.label,
        y: (d) => d.value,
        xAxis: {
          axisLabel: 'Estropadak',
          tickFormat: (d) => this.estropadak[d],
          rotateLabels: 25,
          showMaxMin: false
        },
        yAxis: {
          axisLabel: 'Puntuak',
        },
      }
    };
    this.piechartOptions = {
      chart: {
        type: 'pieChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: (d) => d.label,
        y: (d) => d.value,
        showValues: true
      }
    };
  }

  ngOnChanges() {
    this.estropadaService.getList(this.league, this.year)
    .subscribe((estropadak) => {
      this.estropadak = estropadak.map((estropada) => estropada.izena)
      .filter((estropada) => estropada.indexOf('Play') === -1)
      this.sailkapenaService.getOne(this.league, this.year)
      .subscribe((res) => {
        const stats = res;
        this.data = Object.keys(stats).map((teamName) => {
          const values = stats[teamName].positions.map((pos, i) => {
            return {label: i, value: 13 - pos};
          });
          return {
            key: teamName,
            values: values
          }
        });
        this.cumulative = Object.keys(stats).map((teamName) => {
          const values = stats[teamName].positions.reduce((memo, val, pos) => {
            if (memo.length === 0) {
              memo.push({label: pos, value: (13 - val) });
            } else {
              memo.push({label: pos, value: (13 - val) + memo[pos - 1].value});
            }
            return memo;
          }, []);
          return {
            key: teamName,
            values: values
          }
        });
        this.rank = Object.keys(stats).map((teamName) => {
          return {
            label: teamName,
            value: stats[teamName].points
          };
        });
        this.wins = Object.keys(stats).reduce((memo, teamName) => {
          if (stats[teamName].wins > 0) {
            memo.push({
              label: teamName,
              value: stats[teamName].wins
            });
          }
          return memo;
        }, []);
      });
    });
  }
}
