import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSelect } from '@angular/material';

import { EstropadaService, SailkapenaService, UrteakService } from 'app/shared/estropada.service';
import { TaldeakService } from 'app/shared/taldeak.service';
import { StatsService } from 'app/shared/stats.service';


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
  years: number[];
  teams: string[] = [];
  allYears: {[key: string]: number[]};
  league = 'ACT';
  year = '2013';
  team = undefined;
  options: any;
  lineChartOptions: any = {};
  lineChartReversedOptions: any = {};
  discreteBarChartOptions: any = {};
  points_per_race: any = [];
  positions_per_race: any = [];
  rank: any = [];
  cumulative: any = [];
  estropadak: string[] = [];
  allEstropadak: {[key: string]: any[]}
  chartData: any;
  charts: {[key: string]: any[]};
  showYears = false;
  showTeams = false;
  @ViewChild('chart') chart: MatSelect;

  constructor(
    private fb: FormBuilder,
    private yearService: UrteakService,
    private estropadaService: EstropadaService,
    private sailkapenaService: SailkapenaService,
    private taldeakService: TaldeakService,
    private statsService: StatsService
  ) { }

  ngOnInit() {
    this.yearService.getList().subscribe( years => {
      this.allYears = years;
      this.leagues = Object.keys(years).sort();
    });
    this.taldeakService.getList().subscribe(teams => {
      this.teams = teams;
    });
    this.charts = {
      liga: [
        {
          name: 'Puntuak estropadako',
          value: 'points_per_race'
        },
        {
          name: 'Puntu bilakaera',
          value: 'points_total'
        },
        {
          name: 'Sailkapen orokorra',
          value: 'general_rank'
        }
      ],
      taldea: [
        {
          name: 'Puntuak estropadako',
          value: 'tpoints_per_race'
        },
        {
          name: 'Puntu bilakaera',
          value: 'tpoints_total'
        },
        {
          name: 'Sailkapen orokorra',
          value: 'trank'
        }
      ]
    };
    this.form = this.fb.group({
      'league': [this.league],
      'year': [this.year],
      'chart': ['points_per_race'],
      'team': [this.team]
    });

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
        yAxis: {
          axisLabel: 'Puntuak'
        },
        yDomain: [12, 1]
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
        x: (d) => d.label,
        y: (d) => d.value,
        xAxis: {
          axisLabel: 'Estropadak',
          tickFormat: (d) => this.estropadak[d],
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
        showValues: true,
        xAxis: {
          axisLabel: 'Taldeak',
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
    this.team = this.form.get('team').value;
    this.updateData(this.year, this.league, this.team);
  }

  updateData(year: string, league: string, team?: string) {
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

      if (team) {
        this.loadTeamData(league, team);
      } else {
        this.loadYearData(league, year);
      }
    });
  }

  changeChart() {
    let chartType = this.form.get('chart').value;
    this.setEnabledFields(chartType);
    if (chartType.indexOf('t') === 0) {
      this.lineChartOptions.chart.xAxis.axisLabel = 'Jardunaldia';
      chartType = chartType.slice(1);
    }
    this.options = this.lineChartOptions;
    if (chartType === 'points_per_race') {
      this.chartData = this.points_per_race;
      const maxVals = Math.max(...this.chartData.map(g => Math.max(...g.values.map(k => k.value))));
      this.options.chart.yDomain = [1, maxVals]
    } else if (chartType === 'positions_per_race') {
      this.chartData = this.positions_per_race;
      const maxVals = Math.max(...this.chartData.map(g => Math.max(...g.values.map(k => k.value))));
      this.options.chart.yDomain = [1, maxVals]
    } else if (chartType === 'general_rank') {
      this.chartData = this.rank;
      this.options = this.discreteBarChartOptions;
    } else if (chartType === 'rank') {
      this.chartData = this.rank;
      this.options = this.lineChartReversedOptions;
    } else {
      this.chartData = this.cumulative;
      this.options = this.lineChartOptions;
      const maxVals = Math.max(...this.chartData.map(g => Math.max(...g.values.map(k => k.value))));
      this.options.chart.yDomain = [1, maxVals]
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

  updateYears() {
    const league = this.form.get('league').value;
    this.taldeakService.getList(league)
    .subscribe( res => this.teams = res);
    this.years = this.allYears[league].sort((a, b) => b - a);
    this.form.get('year').setValue(this.years[0]);
    this.updateChart();
  }

  loadYearData(league: string, year: string) {
    this.statsService.getGraphPointsPerRace(league, parseInt(year, 10))
    .subscribe(res => {
      this.points_per_race = res;
      this.changeChart();
    });
    this.statsService.getGraphCumulativePoints(league, parseInt(year, 10))
    .subscribe(res => {
      this.cumulative = res;
      this.changeChart();
    });
    this.statsService.getRank(league, parseInt(year, 10))
    .subscribe( res => {
      this.rank = res;
      this.changeChart();
    });
  }

  loadTeamData(league: string, team: string) {
    this.statsService.getGraphPointsPerRace(league, undefined, team)
    .subscribe(res => {
      this.points_per_race = res;
      this.changeChart();
    });
    this.statsService.getGraphCumulativePoints(league, undefined, team)
    .subscribe(res => {
      this.cumulative = res;
      this.changeChart();
    });
    this.statsService.getTeamRank(league, team)
    .subscribe( res => {
      this.rank = res;
      this.changeChart();
    });
  }

  teamChange() {
    const team = this.form.get('team').value;
    if (team) {
      this.lineChartOptions.chart.xAxis.tickFormat = (i) => i;
    } else {
      this.form.get('year').enable();
      this.lineChartOptions.chart.xAxis.tickFormat = (i) => this.estropadak[i];
    }
    this.updateChart();
  }

}

