import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EstropadaService, SailkapenaService } from 'app/shared/estropada.service';

@Component({
  selector: 'app-estropadak-stats-page',
  templateUrl: './estropadak-stats-page.component.html',
  styleUrls: ['./estropadak-stats-page.component.css',
    '../../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class EstropadakStatsPageComponent implements OnInit {

  form: FormGroup;
  leagues: string[];
  years: string[];
  league = 'ACT';
  year = '2013';
  options: any = {};
  data: any = [];
  cumulative: any = [];
  estropadak: string[] = [];
  chartData: any;
  charts: {[key: string]: string}[] = [];

  constructor(
    private fb: FormBuilder,
    private estropadaService: EstropadaService,
    private sailkapenaService: SailkapenaService
  ) { }

  ngOnInit() {
    this.leagues = ['ACT', 'ARC1', 'ARC2', 'EUSKOTREN', 'ETE'];
    this.years = ['2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012',
                  '2013', '2014', '2015', '2016', '2017', '2018'];
    this.charts = [ {
      name: 'Puntuak estropadako',
      value: 'points_per_race'
    }, {
      name: 'Puntu bilakaera',
      value: 'points_total'
    }];
    this.form = this.fb.group({
      'league': [this.league],
      'year': [this.year],
      'chart': ['points_per_race']
    });
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

  }

  updateChart() {
    this.year = this.form.get('year').value;
    this.league = this.form.get('league').value;
    this.updateData(this.year, this.league);
  }

  updateData(year: string, league: string) {
    this.estropadaService.getList(league, year)
    .subscribe((estropadak) => {
      this.estropadak = estropadak.filter((estropada) => {
        if ('puntuagarria' in estropada) {
          return estropada.puntuagarria;
        } else {
          return true;
        }
      })
      .map((estropada) => estropada.izena)
      .filter((estropada) => estropada.indexOf('Play') === -1)
      this.sailkapenaService.getOne(league, year)
      .subscribe((res) => {
        const stats = res;
        this.data = Object.keys(stats).map((teamName) => {
          return {
            key: teamName,
            values: stats[teamName].positions.map((pos, i) => {
              return {label: i, value: 13 - pos};
            }),
          }
        });
        this.cumulative = Object.keys(stats).map((teamName) => {
          return {
            key: teamName,
            values: stats[teamName].cumulative.map((points, i) => ({label: i, value: points}))
          }
        });
        this.chartData = this.data;
      });
    });
  }

  changeChart() {
    const chartType = this.form.get('chart').value;
    if (chartType === 'points_per_race') {
      this.chartData = this.data;
    } else {
      this.chartData = this.cumulative;
    }
  }

}

