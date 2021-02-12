import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { QueryBuilderConfig } from 'angular2-query-builder';

import { EmaitzakService } from 'app/shared/emaitzak.service';
import { TaldeakService } from 'app/shared/taldeak.service';

@Component({
  selector: 'app-estropada-result-search',
  templateUrl: './estropada-result-search.component.html',
  styleUrls: ['./estropada-result-search.component.css']
})
export class EstropadaResultSearchComponent implements OnInit {
  public queryCtrl: FormControl;
  query = {
    condition: 'and',
    rules: [ ]
  };
  
  config: QueryBuilderConfig = {
    fields: {
      talde_izen_normalizatua: {
        name: 'Taldea', 
        type: 'category',
        options: []
      },
      liga: {name: 'Liga', 
        type: 'category',
        options: [
          {name: 'ACT', value: 'ACT'},
          {name: 'ARC1', value: 'ARC1'},
          {name: 'ARC2', value: 'ARC2'},
          {name: 'ETE', value: 'ETE'},
          {name: 'Euskotren', value: 'euskotren'}
        ]
      },
      posizioa: {name: 'Posizioa', type: 'number'},
      tanda_posizioa: {name: 'Tandako Posizioa', type: 'number'},
      estropada_data: {name: 'Data', type: 'date'},
      denbora: {name: 'Denbora', type: 'time'},
      tanda: {
        name: 'Tanda',
        type: 'category',
        options: [
          {name: 'Lehena', value: 1},
          {name: 'Bigarrena', value: 2},
          {name: 'Hirugarrena', value: 3}
        ]
      }
    }
  }
  public displayedColumns = ['estropada_data', 'liga', 'taldea', 'estropada_izena', 'denbora', 'posizioa'];
  public dataSource = new EstropadaDataSource([]);

  constructor(
    private fb: FormBuilder,
    private emaitzakService: EmaitzakService,
    private taldeakService: TaldeakService
    ) { 
    this.queryCtrl = this.fb.control(this.query);
    forkJoin({
      act: this.taldeakService.getList('act'),
      arc1: this.taldeakService.getList('arc1'),
      arc2: this.taldeakService.getList('arc2'),
      ete: this.taldeakService.getList('ete'),
      euskotren: this.taldeakService.getList('euskotren'),
    }).subscribe(res => {
      let taldeak = [];
      // @Todo: HAcK, the backend doesn't allow sending all the teams!!
      taldeak = res.act.map(t => ({name: t.name, value: t.name}));
      taldeak = taldeak.concat(res.arc1.map(t => ({name: t.name, value: t.name})));
      taldeak = taldeak.concat(res.arc2.map(t => ({name: t.name, value: t.name})));
      taldeak = taldeak.concat(res.ete.map(t => ({name: t.name, value: t.name})));
      taldeak = taldeak.concat(res.euskotren.map(t => ({name: t.name, value: t.name})));
      this.config.fields.talde_izen_normalizatua.options = taldeak.reduce((memo, taldea) => {
        if (!memo.find(t => t.name === taldea.name)){
          memo.push(taldea);
        }
        return memo;
      }, []).sort((a, b) => a.value.localeCompare(b.name));
    });
  }

  ngOnInit(): void {
  }

  search():void {
    console.log(this.query);
    this.queryCtrl.value;
    const query = this.queryToMango(this.query);
    console.log(query);
    this.emaitzakService.get(query).subscribe(
      res => this.dataSource.data.next(res),
      err => console.error(err)
    );
  }

  queryToMango(query: {[key: string]: any}) {
    if ('condition' in query) {
      return {
          ['$' + query.condition]: query.rules.map(rule => {
              if (rule.condition) {
                return this.queryToMango(rule);
              }
              let condition = {};
              const operator = this.operatorToMango(rule.operator);
              condition[rule.field] = {
                  [operator]: rule.value
              }
            return condition;
          })
        };
    } else {
      return query.map(rule => {
        let condition = {};
        const operator = this.operatorToMango(rule.operator);
        condition[rule.field] = {
            [operator]: rule.value
        }
        return condition;
      });
    }
  }

  operatorToMango(operator: string) {
    switch(operator) {
      case('>'):
        return '$gt';
      case('>='):
        return '$gte';
      case('<'):
        return '$lt';
      case('<='):
        return '$lte';
      case('='):
        return '$eq';
      case('!='):
        return '$neq';
      case('in'):
        return '$in';
      case('not in'):
        return '$nin';
    }
  }
}


class EstropadaDataSource extends DataSource<any> {
  sailkapena;
  sort;
  data: BehaviorSubject<any[]> = new BehaviorSubject([]);
  constructor(sailkapena) {
    super();
    this.sailkapena = sailkapena;
    this.data.next(sailkapena);
  }

  connect(): Observable<any> {
    return this.data;
  }

  disconnect() {}
}