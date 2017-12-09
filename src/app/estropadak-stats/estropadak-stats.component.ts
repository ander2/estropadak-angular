import { Component, OnChanges, Input, ViewEncapsulation } from '@angular/core';
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
export class EstropadakStatsComponent implements OnChanges {
  options;
  data;
  estropadak = [];
  cumulative = [];

  @Input() year;
  @Input() league;

  constructor(private estropadaService: EstropadaService) { }

  ngOnChanges() {
    this.estropadaService.getList(this.league, this.year)
    .subscribe((estropadak) => {
      this.estropadak = estropadak.map((estropada) => estropada.key[2])
      .filter((estropada) => estropada.indexOf('Play') === -1)
      console.log(this.estropadak);
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
      this.estropadaService.getOne(`rank_${this.league.toUpperCase()}_${this.year}`)
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
        console.log(this.cumulative);
      });
    });
  }
}
