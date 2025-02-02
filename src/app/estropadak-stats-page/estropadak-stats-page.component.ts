import { Component, OnInit, ViewEncapsulation, ViewChild, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';

import { EstropadaService, UrteakService } from 'app/shared/estropada.service';
import { TaldeakService } from 'app/shared/taldeak.service';
import { StatsService } from 'app/shared/stats.service';
import { ActivatedRoute } from '@angular/router';
import { sanitizeYear, sanitizeLeague, sanitizeChart } from 'app/shared/utils';
import { ChartType } from 'chart.js';
import Chart from 'chart.js/auto';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-estropadak-stats-page',
  templateUrl: './estropadak-stats-page.component.html',
  styleUrls: ['./estropadak-stats-page.component.css',
  ],
  encapsulation: ViewEncapsulation.None
})
export class EstropadakStatsPageComponent implements OnInit, OnChanges {

  @Input()
  league = 'ACT';
  @Input()
  year:number = 2024;
  form: UntypedFormGroup;
  leagues: string[];
  years: number[];
  teams: string[] = [];
  allYears: {[key: string]: number[]};
  team = undefined;
  options: any;
  lineChartOptions: any = {};
  statsData;
  estropadak: string[] = [];
  chartType: ChartType = 'bar';
  chartData: any;
  charts: {[key: string]: any[]};
  showYears = true;
  showTeams = false;
  chart: string = 'general_rank';
  kategoriak = [ ];
  multikategoria = false;
  category:string; // = '' this.kategoriak[0];
  estropadaIzena = '';
  interval;
  myChart;
  noData: string = '';
  @ViewChild('canvas', {static: true}) private canvas: ElementRef;

  constructor(
    private fb: UntypedFormBuilder,
    private yearService: UrteakService,
    private estropadaService: EstropadaService,
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
    if (this.league === 'gbl' || this.league === 'btl'|| this.league === 'gtl') {
      this.multikategoria = true;
      this.estropadaService.getCategories(this.league)
        .subscribe(res => this.kategoriak = res);
    }
    this.initGraphSettings();
    this.route.queryParams.subscribe((params) => {
      this.loadYears().subscribe(() => {
        if (Object.keys(params).length > 0) {
          this.year = parseInt(sanitizeYear(params.year), 10) || 2021;
          this.league = sanitizeLeague(params.league) || 'act';
          this.chart = sanitizeChart(params.chart) || 'general_rank';
          this.years = this.allYears[this.league];
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
        } else {
          this.years = this.allYears[this.league];
        }
      });
    });
    this.createChart();
    this.updateChart();
  }

  loadYears() {
    return this.yearService.getList()
    .pipe(map( years => {
      this.allYears = years.reduce((memo, year) => {
        memo[year.name] = year.years;
        return memo;
      }, {});
      this.leagues = years.map(year => year.name).sort();
    }));
  }

  createChart() {
    const data = {
      labels: [],
      datasets: []
    };
    this.myChart = new Chart(this.canvas.nativeElement, {
        type: this.chartType,
        data: this.statsData,
        options: this.options
    });
  }

  reCreateChart() {
    this.myChart.destroy();
    this.createChart();
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
        // {
        //   name: 'Sailkapen orokorra(eboluzioa)',
        //   value: 'general_rank_animation'
        // },
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

    this.lineChartOptions = {
      scales: {
        x: {
          ticks: {
            display: true,
            callback: function format(value, index, ticks) {
              if (this.getLabelForValue(value).length > 15) {
                return this.getLabelForValue(value).slice(0, 15) + '...';
              } else {
                return this.getLabelForValue(value);
              }
            }
          }
        }
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
    if (this.league === 'gbl' || this.league === 'btl'|| this.league === 'gtl') {
      this.multikategoria = true;
      this.estropadaService.getCategories(this.league)
        .subscribe(res => this.kategoriak = res);
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
    if (league === 'gbl' || league === 'btl'|| league === 'gtl') {
      this.estropadaService.getCategories(league)
        .subscribe(res => {
          this.kategoriak = res
          this.multikategoria = true;
          this.category = this.form.get('category').value;
          this.updateData(year, league, this.team, this.category);
        });
    } else {
      this.updateData(year, league, this.team, this.category);
    }
  }

  updateData(year: string, league: string, team?: string, category?: string) {
    const chartType = this.form.get('chart').value;
    if (chartType === 'points_per_race' || chartType === 'cumulative') {
      this.estropadaService.getList(league, year)
      .subscribe((estropadak) => {
        this.estropadak = estropadak.docs.filter((estropada) => {
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
      this.lineChartOptions.scales.y =  {
        reverse: true,
        min: 1
      };
    } else {
      this.lineChartOptions.scales.y =  {
        reverse: false,
        min: 0
      };
    }
    return ;
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
    const year = this.form.get('chart').value.startsWith('t') ? null : this.form.get('year').value;
    this.taldeakService.getList(league, year)
      .subscribe( res => this.teams = res.map(taldea => taldea.name));
    this.years = this.allYears[league].sort((a, b) => b - a);
  }

  loadYearData(league: string, year: string, category: string) {
    const chartType = this.form.get('chart').value;
    this.changeChart();
    this.noData = '';
    if (year === null) {
      this.statsData = [];
      this.changeChart();
      return;
    }
    if (chartType === 'points_per_race') {
      this.statsService.getGraphPointsPerRace(league, parseInt(year, 10), null, category)
      .subscribe(res => {
        this.statsData = this.statsService.getDatasets(res);
        this.chartType = 'line' ;
        this.options = this.lineChartOptions;
        this.reCreateChart();
      });
    } else if (chartType === 'cumulative') {
      this.statsService.getGraphCumulativePoints(league, parseInt(year, 10), null, category)
      .subscribe(res => {
        this.statsData = this.statsService.getDatasets(res);
        this.chartType = 'line' ;
        this.options = this.lineChartOptions;
        this.reCreateChart();
      });
    } else if (chartType === 'general_rank') {
      this.statsService.getRank(league, parseInt(year, 10), null, category)
      .subscribe( res => {
        this.statsData = this.statsService.getDatasets(res);
        this.chartType = 'bar' ;
        this.options = {
          plugins: {
            legend: {
              display: false
            }
          }
        };
        this.reCreateChart();
      });
    } else if (chartType === 'general_rank_animation') {
      this.statsService.getGraphCumulativePoints(league, parseInt(year, 10), null, category)
      .subscribe(res => {
        let i = 0;
        const _this = this;
        const changeData = () => {
          try {
            this.estropadaIzena = '';
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
        };
        this.interval = setInterval(changeData, 1500);
        this.changeChart();
      });
    } else if (chartType === 'ages') {
      this.statsService.getAges(league, parseInt(year, 10))
      .subscribe( res => {
        this.statsData = this.statsService.getDatasets(res);
        this.chartType = 'bar' ;
        this.options = {};
        this.reCreateChart();
      }, err => {
        this.statsData = [];
        this.chartType = 'bar' ;
        this.options = {};
        this.noData = 'Ez dago daturik';
        this.reCreateChart();
      });
    } else if (chartType === 'incorporations') {
      this.statsService.getIncorporations(league, parseInt(year, 10))
      .subscribe( res => {
        this.statsData = this.statsService.getDatasets(res);
        this.chartType = 'bar' ;
        this.options = {};
        this.reCreateChart();
      });
    }
  }

  loadTeamData(league: string, team: string) {
    const chartType = this.form.get('chart').value;
    this.changeChart();
    if (team === null) {
      this.statsData = [];
      return;
    }
    if (chartType === 'tpoints_total') {
      this.statsService.getGraphPointsPerRace(league, undefined, team)
      .subscribe(res => {
        this.statsData = this.statsService.getDatasets(res);
        this.chartType = 'line' ;
        this.reCreateChart();
      });
    } else if (chartType === 'trank') {
      this.statsService.getTeamRank(league, team)
      .subscribe( res => {
        this.statsData = this.statsService.getDatasets(res);
        this.chartType = 'line' ;
        this.options = this.lineChartOptions;
        this.reCreateChart();
      });
    } else if (chartType === 'tages') {
      this.statsService.getAges(league, undefined, team)
      .subscribe( res => {
        this.statsData = this.statsService.getDatasets(res);
        this.chartType = 'bar' ;
        this.options = {};
        this.reCreateChart();
      });
    }
  }

}
