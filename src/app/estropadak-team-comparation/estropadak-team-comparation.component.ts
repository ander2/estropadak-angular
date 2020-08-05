import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';

import * as d3 from 'd3';
import 'nvd3';

import { SailkapenakService } from 'app/shared/sailkapenak.service';
import { Sailkapena } from 'app/shared/sailkapenak.model';
import { TaldeakService } from 'app/shared/taldeak.service';
import { FormBuilder } from '@angular/forms';

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
  aukeratutakoTaldeak: string[] = [];
  form;
  konparaketaEnabled = false;
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
        bottom: 70,
        left: 65
      },
      x: (d) => d.label,
      y: (d) => parseInt(d.value, 10),
      xAxis: {
        axisLabel: 'Urtea',
        rotateLabels: 25,
        showMaxMin: false
      },
      yAxis: {
        axisLabel: 'Puntuak'
      },
    }
  };

  constructor(
    private saikapenakService: SailkapenakService,
    private taldeakService: TaldeakService,
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
      console.log(change);
      this.taldeakLoad(change);
    })
  }


  taldeakLoad(league: string) {
    this.taldeakService.getList(league)
      .subscribe(res => {
        this.aukeratutakoTaldeak = [];
        this.displayedColumns = [];
        this.taldeak = res;
      })
  }

  taldeaGehitu() {
    const taldea = this.form.get('team').value;
    this.aukeratutakoTaldeak.push(taldea);
    this.taldeak = this.taldeak.filter(t => t.name !== taldea);
    if (this.aukeratutakoTaldeak.length > 1) {
      this.konparaketaEnabled = true;
    }
  }

  taldeaKendu(taldea: string) {
    console.log('Kendu', taldea);
    this.aukeratutakoTaldeak = this.aukeratutakoTaldeak.filter(t => t !== taldea);
    this.displayedColumns = this.displayedColumns.filter(t => t !== taldea);
    this.taldeak.push(taldea);
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
              value: stat.stats[k][this.form.get('metric').value]
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
          values: data[k]
        };
      });
      console.table(this.chartData);
    })
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
