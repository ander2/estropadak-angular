import { Component, OnInit, ViewEncapsulation, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import * as d3 from 'd3';
import 'nvd3';

import { EstropadaService, UrteakService } from 'app/shared/estropada.service';
import { SailkapenakService } from 'app/shared/sailkapenak.service';
import { TaldeakService } from 'app/shared/taldeak.service';
import { StatsService } from 'app/shared/stats.service';
import { ActivatedRoute } from '@angular/router';
import { sanitizeYear, sanitizeLeague, sanitizeChart } from 'app/shared/utils';


@Component({
  selector: 'app-estropadak-stats-page',
  templateUrl: './estropadak-stats-page.component.html',
  styleUrls: ['./estropadak-stats-page.component.css',
    '../../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class EstropadakStatsPageComponent implements OnInit, OnChanges {

  @Input()
  league;
  @Input()
  year;
  form: FormGroup;
  leagues: string[];
  years: number[];
  teams: string[] = [];
  allYears: {[key: string]: number[]};
  team = undefined;
  options: any;
  lineChartOptions: any = {};
  lineChartReversedOptions: any = {};
  discreteBarChartOptions: any = {};
  statsData;
  points_per_race: any = [];
  points_per_year: any = [];
  positions_per_race: any = [];
  rank: any = [];
  cumulative: any = [];
  estropadak: string[] = [];
  ages: any = [];
  incorporations: any = [];
  allEstropadak: {[key: string]: any[]}
  chartData: any;
  charts: {[key: string]: any[]};
  showYears = false;
  showTeams = false;
  chart: string;
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
  category = this.kategoriak[0];
  estropadaIzena = '';
  interval;
  @ViewChild('nvd3') nvChart;

  constructor(
    private fb: FormBuilder,
    private yearService: UrteakService,
    private estropadaService: EstropadaService,
    private sailkapenaService: SailkapenakService,
    private taldeakService: TaldeakService,
    private statsService: StatsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      league: [this.league],
      year: [this.year],
      chart: [this.chart],
      team: [this.team],
      category: [this.category]
    });
    this.yearService.getList().subscribe( years => {
      this.allYears = years.reduce((memo, year) => {
        memo[year.name] = year.years;
        return memo;
      }, {});
      this.leagues = years.map(year => year.name).sort();
      this.updateYears();
    });
    this.initGraphSettings();
    this.route.queryParams.subscribe((params) => {
      this.year = sanitizeYear(params.year) || '2020';
      this.league = sanitizeLeague(params.league) || 'act';
      this.chart = sanitizeChart(params.chart) || 'general_rank';
      this.form.patchValue({
        league: this.league,
        year: this.year,
        chart: this.chart,
      });
      this.taldeakService.getList(this.league, this.year)
        .subscribe(teams => {
          this.teams = teams.map(t => t.name);
        });
      this.updateChart();
    });
  }

  initGraphSettings() {
    this.charts = {
      liga: [
        {
          name: 'Puntuak estropadako',
          value: 'points_per_race'
        },
        {
          name: 'Puntu bilakaera',
          value: 'cumulative'
        },
        {
          name: 'Sailkapen orokorra',
          value: 'general_rank'
        },
        {
          name: 'Sailkapen orokorra(eboluzioa)',
          value: 'general_rank_animation'
        },
        {
          name: 'Arraunlarien adina',
          value: 'ages'
        },
        {
          name: 'Arraunlarien alta eta bajak',
          value: 'incorporations'
        }
      ],
      taldea: [
        {
          name: 'Sailkapen nagusiko puntuak',
          value: 'tpoints_total'
        },
        {
          name: 'Sailkapen nagusiko postua',
          value: 'trank'
        },
        {
          name: 'Arraunlarien adina',
          value: 'tages'
        }
      ]
    };

    this.lineChartReversedOptions = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 70,
          left: 65
        },
        x: (d) => d.label,
        y: (d) => d.value,
        xAxis: {
          axisLabel: 'Estropadak',
          tickFormat: (d) => d,
          rotateLabels: 25,
          showMaxMin: false
        },
        yDomain: [12, 0],
        yRange: [360, 10]
      }
    }

    this.lineChartOptions = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 70,
          left: 65
        },
        x: (d) => d.x,
        y: (d) => parseInt(d.value, 10),
        xAxis: {
          axisLabel: 'Estropadak',
          tickFormat: (d) => {
            const last = this.chartData.length - 1;
            if (this.chartData[last].values[d]) {
              return this.chartData[last].values[d]['label'];
            } else if (d > 2000) {
              return d;
            } else {
              return '';
            }
          },
          rotateLabels: 25,
          showMaxMin: false
        },
        yAxis: {
          axisLabel: 'Puntuak'
        },
      }
    };

    this.discreteBarChartOptions = {
      chart: {
        // type: 'multiBarHorizontalChart',
        type: 'discreteBarChart',
        height: 450,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 65
        },
        x: (d) => d.label,
        y: (d) => d.value,
        valueFormat: d3.format('.2'),
        showValues: true,
        staggerLabels: true,
        duration: 800,
        interpolate: 'linear',
        barColor: d => d.color,
        yAxis: {
          axisLabel: 'Puntuak',
          tickFormat: d3.format('.2'),
        },
      }
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.year) {
      this.year = changes.year.currentValue;
    }
    if (changes.league) {
      this.league = changes.league.currentValue;
    }
    this.updateChart();
  }

  updateChart() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    const year = this.form.get('year').value;
    const league = this.form.get('league').value;
    this.team = this.form.get('team').value;
    this.category = this.form.get('category').value;
    this.updateData(year, league, this.team, this.category);
  }

  updateData(year: string, league: string, team?: string, category?: string) {
    const chartType = this.form.get('chart').value;
    if (chartType === 'points_per_race' || chartType === 'cumulative') {
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

      });
    }
    if (chartType.indexOf('t') === 0) {
      this.loadTeamData(league, team);
    } else {
      this.loadYearData(league, year, category);
    }
  }

  changeChart() {
    let chartType = this.form.get('chart').value;
    this.setEnabledFields(chartType);
    if (chartType === 'trank') {
      this.lineChartReversedOptions.chart.yAxis = {
        axisLabel: 'Postua'
      };
    } else {
      this.lineChartReversedOptions.chart.yAxis = {
        axisLabel: 'Puntuak'
      };
    }
    if (chartType.indexOf('t') === 0) {
      chartType = chartType.slice(1);
    }
    this.options = this.lineChartOptions;
    this.chartData = this.statsData;
    if (chartType === 'points_per_race') {
      const maxVals = Math.max(...this.chartData.map(g => Math.max(...g.values.map(k => k.value))));
      this.options.chart.yDomain = [0, maxVals]
    } else if (chartType === 'positions_per_race') {
      const maxVals = Math.max(...this.chartData.map(g => Math.max(...g.values.map(k => k.value))));
      this.options.chart.yDomain = [0, maxVals]
    } else if (chartType.indexOf('general_rank') > -1 ) {
      this.options = this.discreteBarChartOptions;
    } else if (chartType === 'rank') {
      this.options = this.lineChartReversedOptions;
    } else if (chartType === 'ages') {
      this.options = this.discreteBarChartOptions;
      this.options.chart.type = 'multiBarChart';
      this.options.chart.yAxis.axisLabel = 'Adina';
      this.options.chart.reduceXTicks = false;
    } else if (chartType === 'incorporations') {
      this.options = this.discreteBarChartOptions;
      this.options.chart.type = 'multiBarChart';
      this.options.chart.yAxis.axisLabel = 'Alta/Baja';
      this.options.chart.reduceXTicks = false;
    } else if (chartType === 'points_total') {
      this.options = this.lineChartOptions;
    } else {
      const maxVals = Math.max(...this.chartData.map(g => Math.max(...g.values.map(k => k.value))));
      this.options.chart.yDomain = [0, maxVals]
    }
  }


  setEnabledFields(chartType) {
    if (chartType[0] === 't') {
      this.showYears = false;
      this.showTeams = true;
      this.form.get('year').reset();
    } else {
      this.showYears = true;
      this.showTeams = false;
      this.form.get('team').reset();
    }
  }

  updateYearsAndRefresh() {
    this.updateYears();
    this.form.get('year').setValue(this.years[0]);
    this.updateChart();
  }

  updateYears() {
    const league = this.form.get('league').value || 'act';
    this.taldeakService.getList(league, this.year)
    .subscribe( res => this.teams = res.map(taldea => taldea.name));
    this.years = this.allYears[league].sort((a, b) => b - a);
  }

  loadYearData(league: string, year: string, category: string) {
    const chartType = this.form.get('chart').value;
    if (year === null) {
      this.statsData = [];
      this.changeChart();
      return;
    }
    if (chartType === 'points_per_race') {
      this.statsService.getGraphPointsPerRace(league, parseInt(year, 10), null, category)
      .subscribe(res => {
        this.points_per_race = res;
        this.statsData = res;
        this.changeChart();
      });
    } else if (chartType === 'cumulative') {
      this.statsService.getGraphCumulativePoints(league, parseInt(year, 10), null, category)
      .subscribe(res => {
        this.cumulative = res;
        this.statsData = res;
        this.changeChart();
      });
    } else if (chartType === 'general_rank') {
      this.statsService.getRank(league, parseInt(year, 10), null, category)
      .subscribe( res => {
        this.rank = res;
        this.statsData = res;
        this.changeChart();
      });
    } else if (chartType === 'general_rank_animation') {
      this.statsService.getGraphCumulativePoints(league, parseInt(year, 10), null, category)
      .subscribe(res => {
        this.rank = res;
        let i = 0;
        const _this = this;
        const changeData = () => {
          try {
            this.estropadaIzena = this.rank[0].values[i].label;
          } catch (err) {
            clearInterval(this.interval);
            return;
          }
          const values = res.map( r => {
            return {
              label: r.key,
              color: r.color,
              value: r.values[i].value
            }
          }).sort((a, b) => b.value - a.value);
          i++;
          this.statsData = [{
            key: 'Taldea',
            values
          }];
          this.chartData = this.statsData;
        };
        this.interval = setInterval(changeData, 1500);
        this.changeChart();
      });
    } else if (chartType === 'ages') {
      this.statsService.getAges(league, parseInt(year, 10))
      .subscribe( res => {
        this.ages = res;
        this.statsData = res;
        this.changeChart();
      });
    } else if (chartType === 'incorporations') {
      this.statsService.getIncorporations(league, parseInt(year, 10))
      .subscribe( res => {
        this.incorporations = res;
        this.statsData = res;
        this.changeChart();
      });
    }
  }

  loadTeamData(league: string, team: string) {
    const chartType = this.form.get('chart').value;
    if (team === null) {
      this.statsData = [];
      this.changeChart();
      return;
    }
    if (chartType === 'tpoints_total') {
      this.statsService.getGraphPointsPerRace(league, undefined, team)
      .subscribe(res => {
        this.points_per_year = res;
        this.statsData = res;
        this.changeChart();
      });
    } else if (chartType === 'trank') {
      this.statsService.getTeamRank(league, team)
      .subscribe( res => {
        this.rank = res;
        this.statsData = res;
        this.changeChart();
      });
    } else if (chartType === 'tages') {
      this.statsService.getAges(league, undefined, team)
      .subscribe( res => {
        this.ages = res;
        this.statsData = res;
        this.changeChart();
      });
    }
    // this.statsService.getGraphCumulativePoints(league, undefined, team)
    // .subscribe(res => {
    //   this.cumulative = res;
    //   this.changeChart();
    // });
  }

}
