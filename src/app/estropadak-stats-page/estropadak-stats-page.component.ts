import { Component, OnInit, ViewEncapsulation, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSelect } from '@angular/material';

import * as d3 from 'd3';
import 'nvd3';

import { EstropadaService, SailkapenaService, UrteakService } from 'app/shared/estropada.service';
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
  points_per_race: any = [];
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

  constructor(
    private fb: FormBuilder,
    private yearService: UrteakService,
    private estropadaService: EstropadaService,
    private sailkapenaService: SailkapenaService,
    private taldeakService: TaldeakService,
    private statsService: StatsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      'league': [this.league],
      'year': [this.year],
      'chart': [this.chart],
      'team': [this.team]
    });
    this.yearService.getList().subscribe( years => {
      this.allYears = years;
      this.leagues = Object.keys(years).sort();
      this.updateYears();
    });
    this.taldeakService.getList().subscribe(teams => {
      this.teams = teams;
    });
    this.initGraphSettings();
    this.route.queryParams.subscribe((params) => {
      this.year = sanitizeYear(params.year) || '2019';
      this.league = sanitizeLeague(params.league) || 'act';
      this.chart = sanitizeChart(params.chart) || 'general_rank';
      this.form.patchValue({
        league: this.league,
        year: this.year,
        chart: this.chart,
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
          value: 'points_total'
        },
        {
          name: 'Sailkapen orokorra',
          value: 'general_rank'
        },
        {
          name: 'Arraunlarien adina',
          value: 'ages'
        },{
          name: 'Arraunlarien alta eta bajak',
          value: 'incorporations'
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
        yAxis: {
          axisLabel: 'Puntuak'
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
        x: (d) => d.label,
        y: (d) => parseInt(d.value, 10),
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
        y: (d) => parseInt(d.value, 10),
        valueFormat: d3.format('d'),
        showValues: true,
        xAxis: {
          axisLabel: 'Taldeak',
        },
        staggerLabels: false,
        yAxis: {
          axisLabel: 'Puntuak',
          tickFormat: d3.format('d'),
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
    const year = this.form.get('year').value;
    const league = this.form.get('league').value;
    this.team = this.form.get('team').value;
    this.updateData(year, league, this.team);
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
    } else if (chartType === 'trank') {
      this.lineChartOptions.chart.yAxis.axisLabel = 'Sailkapena';
    } else {
      this.lineChartOptions.chart.yAxis.axisLabel = 'Puntuak';
    }
    this.options = this.lineChartOptions;
    if (chartType === 'points_per_race') {
      this.chartData = this.points_per_race;
      const maxVals = Math.max(...this.chartData.map(g => Math.max(...g.values.map(k => k.value))));
      this.options.chart.yDomain = [0, maxVals]
    } else if (chartType === 'positions_per_race') {
      this.chartData = this.positions_per_race;
      const maxVals = Math.max(...this.chartData.map(g => Math.max(...g.values.map(k => k.value))));
      this.options.chart.yDomain = [0, maxVals]
    } else if (chartType === 'general_rank') {
      this.chartData = this.rank;
      this.options = this.discreteBarChartOptions;
    } else if (chartType === 'rank') {
      this.chartData = this.rank;
      this.options = this.lineChartReversedOptions;
    } else if (chartType === 'ages') {
      this.chartData = this.ages;
      this.options = this.discreteBarChartOptions;
      this.options.chart.type = 'multiBarChart';
      this.options.chart.yAxis.axisLabel = 'Urteak';
      this.options.chart.reduceXTicks = false;
      this.options.chart.xAxis.staggerLabels = true;
    } else if (chartType === 'incorporations') {
      this.chartData = this.incorporations;
      this.options = this.discreteBarChartOptions;
      this.options.chart.type = 'multiBarChart';
      this.options.chart.yAxis.axisLabel = 'Urteak';
      this.options.chart.reduceXTicks = false;
      this.options.chart.xAxis.staggerLabels = true;
    } else {
      this.chartData = this.cumulative;
      this.options = this.lineChartOptions;
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
    const league = this.form.get('league').value;
    this.taldeakService.getList(league)
    .subscribe( res => this.teams = res);
    this.years = this.allYears[league].sort((a, b) => b - a);
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
    this.statsService.getAges(league, parseInt(year, 10))
    .subscribe( res => {
      this.ages = res;
      this.changeChart();
    });
    this.statsService.getIncorporations(league, parseInt(year, 10))
    .subscribe( res => {
      this.incorporations = res;
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
    this.statsService.getAges(league, undefined, team)
    .subscribe( res => {
      this.ages = res;
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
