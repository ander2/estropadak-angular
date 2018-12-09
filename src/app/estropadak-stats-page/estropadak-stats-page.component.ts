import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EstropadaService, SailkapenaService, UrteakService } from 'app/shared/estropada.service';
import { MatSelectionListChange, MatSelect } from '@angular/material';
import { TaldeakService } from 'app/shared/taldeak.service';

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
  charts: {[key: string]: string}[] = [];
  @ViewChild('chart') chart: MatSelect;

  constructor(
    private fb: FormBuilder,
    private yearService: UrteakService,
    private estropadaService: EstropadaService,
    private sailkapenaService: SailkapenaService,
    private taldeakService: TaldeakService
  ) { }

  ngOnInit() {
    this.yearService.getList().subscribe( years => {
      this.allYears = years;
      this.leagues = Object.keys(years).sort();
    });
    this.taldeakService.getList().subscribe(teams => {
      this.teams = teams;
    });
    this.charts = [{
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
    // {
    //   name: 'Talde sailkapenak',
    //   value: 'team_ranks'
    // }
    ];
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
          tickFormat: (d) => this.estropadak[d],
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
    const chartType = this.form.get('chart').value;
    this.options = this.lineChartOptions;
    if (chartType === 'points_per_race') {
      this.chartData = this.points_per_race;
    } else if (chartType === 'positions_per_race') {
      this.chartData = this.positions_per_race;
    } else if (chartType === 'general_rank') {
      this.chartData = this.rank;
      this.options = this.discreteBarChartOptions;
    } else {
      this.chartData = this.cumulative;
    }
  }

  updateYears() {
    const league = this.form.get('league').value;
    this.years = this.allYears[league].sort((a, b) => b - a);
    this.form.get('year').setValue(this.years[0]);
    this.updateChart();
  }
  teamColors(team: string) {
    switch (team) {
      case 'Arkote':
        return 'yellow'
        break;
      case 'Astillero':
        return 'navy'
        break;
      case 'Cabo':
        return 'red'
        break;
      case 'Castro':
        return 'red'
        break;
      case 'Deustu':
        return 'red'
        break;
      case 'Donostiarra':
        return 'LightBlue'
        break;
      case 'Getaria':
        return 'wheat'
        break;
      case 'Hondarribia':
        return 'LimeGreen'
        break;
      case 'Hibaika':
        return 'black'
        break;
      case 'Isuntza':
        return 'LightBlue'
        break;
      case 'Orio':
        return 'yellow'
        break;
      case 'Itsasoko ama':
        return 'purple'
        break;
      case 'Kaiku':
        return 'green'
        break;
      case 'Ondarroa':
        return 'red'
        break;
      case 'Portugalete':
        return 'yellow'
        break;
      case 'San Juan':
        return 'pink'
        break;
      case 'San Pedro':
        return 'purple'
        break;
      case 'Tiran':
        return 'blue'
        break;
      case 'Urdaibai':
        return 'blue'
        break;
      case 'Zarautz':
        return 'blue'
        break;
      case 'Zumaia':
        return 'red'
        break;
      case 'Zierbena':
        return 'chocolate'
        break;
    }
  }

  loadYearData(league: string, year: string) {
    this.sailkapenaService.getOne(league, year)
    .subscribe((res) => {
      const stats = res;
      this.points_per_race = Object.keys(stats).map((teamName) => {
        return {
          key: teamName,
          color: this.teamColors(teamName),
          values: stats[teamName].positions.map((pos, i) => {
            return {label: i, value: 13 - pos};
          }),
        }
      });
      this.positions_per_race = Object.keys(stats).map((teamName) => {
        return {
          key: teamName,
          color: this.teamColors(teamName),
          values: stats[teamName].positions.map((pos, i) => {
            return {label: i, value: pos};
          }),
        }
      });
      this.cumulative = Object.keys(stats).map((teamName) => {
        return {
          key: teamName,
          color: this.teamColors(teamName),
          values: stats[teamName].cumulative.map((points, i) => ({label: i, value: points}))
        }
      });
      this.rank = [{
        key: 'sailkapena',
        values: Object.keys(stats)
                      .map((teamName) => ({
                        label: teamName,
                        color: this.teamColors(teamName),
                        value: stats[teamName].points
                      }))
                      .sort((a, b) => b.value - a.value)
      }];
      this.changeChart();
    });
  }


  loadTeamData(league: string, team: string) {
    this.sailkapenaService.getOne(league, undefined, team)
    .subscribe((res) => {
      const stats = res;
      this.points_per_race = stats.map((stat) => {
        return {
          key: stat.id,
          values: stat.stats.positions.map((pos, i) => {
            return {label: i, value: 13 - pos};
          }),
        }
      });
      this.cumulative = stats.map((stat) => {
        return {
          key: stat.id,
          values: stat.stats.cumulative.map((points, i) => ({label: i, value: points}))
        }
      });
      this.rank = [{
        key: 'sailkapena',
        values: Object.keys(stats)
                      .map((teamName) => ({label: teamName, value: stats[teamName].points}))
                      .sort((a, b) => b.value - a.value)
      }];
      this.changeChart();
    });
  }

  teamChange() {
    const team = this.form.get('team').value;
    if (team) {
      this.form.get('year').disable();
      this.lineChartOptions.chart.xAxis.tickFormat = (i) => i;
      this.chart.options.forEach( (item, index) => {
        if (index === 2) {
          item.disabled = true;
        }
      });
    } else {
      this.form.get('year').enable();
      this.lineChartOptions.chart.xAxis.tickFormat = (i) => this.estropadak[i];
      this.chart.options.forEach( (item, index) => {
        item.disabled = false;
      });
    }
    this.updateChart();
  }

}

