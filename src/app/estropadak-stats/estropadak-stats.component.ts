import { Component, OnInit, OnChanges, Input, ViewEncapsulation } from '@angular/core';
import { EstropadaService } from 'app/shared/estropada.service';
import 'nvd3';
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
  estropadak = [];
  cumulative = [];
  rank = [];
  wins = [];

  @Input() year;
  @Input() league;

  constructor(private estropadaService: EstropadaService) { }

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
    this.estropadaService.getList(this.league, this.year)
    .subscribe((estropadak) => {
      this.estropadak = estropadak.map((estropada) => estropada.key[2])
      .filter((estropada) => estropada.indexOf('Play') === -1)
      this.estropadaService.getOne(`rank_${liga}_${this.year}`)
      .subscribe((res) => {
        const stats = res.stats;
        this.data = Object.keys(stats).map((teamName) => {
          const values = res.stats[teamName].positions.map((pos, i) => {
            return {label: i, value: 13 - pos};
          });
          return {
            key: teamName,
            values: values
          }
        });
        this.cumulative = Object.keys(stats).map((teamName) => {
          const values = res.stats[teamName].positions.reduce((memo, val, pos) => {
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
