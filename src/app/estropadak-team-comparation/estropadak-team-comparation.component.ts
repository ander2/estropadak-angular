import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';

import * as d3 from 'd3';
import 'nvd3';

import { SailkapenakService } from 'app/shared/sailkapenak.service';
import { Sailkapena } from 'app/shared/sailkapenak.model';
import { TaldeakService } from 'app/shared/taldeak.service';
import { FormBuilder } from '@angular/forms';
import { StatsService } from 'app/shared/stats.service';

@Component({
  selector: 'app-estropadak-team-comparation',
  templateUrl: './estropadak-team-comparation.component.html',
  styleUrls: [
    './estropadak-team-comparation.component.css',
    '../../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class EstropadakTeamComparationComponent implements OnInit {

  @Input() league = 'ACT';
  displayedColumns = ['urtea'];
  dataSource;
  taldeak;
  taldeGuztiak;
  aukeratutakoTaldeak: string[] = [];
  form;
  konparaketaEnabled = false;
  aukeraketaEnabled = true;
  removable = true;
  metrics = [
    {code: 'points', name: 'Puntuak'},
    {code: 'position', name: 'Sailkapen nagusiko postua'},
    {code: 'best', name: 'Estropada sailkapen onena'},
    {code: 'worst', name: 'Estropada sailkapen okerrena'},
  ];
  ligak = ['ACT', 'ARC1', 'ARC2', 'ETE', 'euskotren'];
  chartData = [];
  options = {
    chart: {
      type: 'lineChart',
      height: 450,
      margin : {
        top: 20,
        right: 20,
        bottom: 20,
        left: 65
      },
      x: (d) => d.label,
      y: (d) => {
        return parseInt(d.value[this.form.get('metric').value], 10);
      },
      xAxis: {
        axisLabel: 'Urtea',
        showMaxMin: true
      },
      yAxis: {
        axisLabel: 'Puntuak',
        tickFormat: d => d
      },
    }
  };
  viewMode = 'table';

  constructor(
    private saikapenakService: SailkapenakService,
    private taldeakService: TaldeakService,
    private statsService: StatsService,
    private fb: FormBuilder
  ) {
    const taldea1 = 'Urdaibai';
    const taldea2 = 'Hondarribia';
    this.taldeakLoad(this.league);
    this.dataSource = new EstropadaDataSource();
  }

  ngOnInit() {
    this.form = this.fb.group({
      liga: [this.league],
      team: [],
      metric: ['points']
    });
    this.form.get('liga').valueChanges.subscribe((change) => {
      this.taldeakLoad(change);
      this.chartData = [];
      this.dataSource.data.next([]);
    });
    this.form.get('metric').valueChanges.subscribe((change) => {
      const options = Object.assign({}, this.options);
      if (change === 'points') {
        delete options.chart['yDomain'];
      } else {
        options.chart['yDomain'] = [12, 1];
        options.chart['yRange'] = [360, 10];
      }
      this.options = options;
    })
  }


  taldeakLoad(league: string) {
    this.taldeakService.getList(league)
      .subscribe(res => {
        this.aukeratutakoTaldeak = [];
        this.displayedColumns = [];
        this.taldeGuztiak = res;
        this.taldeak = res;
      })
  }

  taldeaGehitu() {
    const taldea = this.form.get('team').value;
    if (taldea) {
      this.aukeratutakoTaldeak.push(taldea);
      this.taldeak = this.taldeak.filter(t => t.name !== taldea);
      if (this.aukeratutakoTaldeak.length > 1) {
        this.konparaketaEnabled = true;
      }
      if (this.aukeratutakoTaldeak.length > 6) {
        this.aukeraketaEnabled = false;
      }
    }
  }

  taldeaKendu(taldea: string) {
    this.aukeratutakoTaldeak = this.aukeratutakoTaldeak.filter(t => t !== taldea);
    this.displayedColumns = this.displayedColumns.filter(t => t !== taldea);

    this.taldeak.push(this.taldeGuztiak.filter(t => t.name === taldea).pop());
    this.taldeak = this.taldeak.sort((a, b) => a.name.localeCompare(b.name));

    if (this.aukeratutakoTaldeak.length < 6) {
      this.aukeraketaEnabled = true;
    }
  }

  compare() {
    const liga = this.form.get('liga').value;
    this.saikapenakService.getList(liga, undefined, this.aukeratutakoTaldeak)
    .subscribe(res => {
      this.displayedColumns = ['urtea'];
      this.displayedColumns.push(...this.aukeratutakoTaldeak);
      this.dataSource.data.next(res);
      const data = res.reduce((memo, stat) => {
        Object.keys(stat.stats)
          .map(k => {
            if (!memo[k]) {
              memo[k] = [];
            }
            memo[k].push({
              label: stat.urtea,
              value: stat.stats[k]
            });
            return {
              key: k,
              values: [{
                label: stat.urtea,
                value: stat.stats[k][this.form.get('metric').value]
              }]
            }
          });
        return memo;
      }, {});
      this.chartData = Object.keys(data).map(k => {
        return {
          key: k,
          color: this.statsService.teamColors(k),
          values: data[k]
        };
      });
    })
  }

  changeMode(mode: string) {
    this.viewMode = mode;
  }

}


class EstropadaDataSource extends DataSource<any> {
  sailkapena;
  sort;
  data: BehaviorSubject<any[]> = new BehaviorSubject([]);
  constructor(
  ) {
    super();
  }

  connect(): Observable<any> {
    return this.data;
  }

  disconnect() {}
}
