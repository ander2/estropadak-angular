import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { QueryBuilderConfig } from 'angular2-query-builder';

import { EmaitzakService } from 'app/shared/emaitzak.service';
import { BehaviorSubject, Observable } from 'rxjs';

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
      talde_izen_normalizatua: {name: 'Taldea', type: 'string'},
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
    private emaitzakService: EmaitzakService
    ) { 
    this.query = {
      condition: 'and',
      rules: [{
        field: 'talde_izen_normalizatua', 
        operator: '=',
        value: 'Donostiarra' 
      }]
  };
    this.queryCtrl = this.fb.control(this.query);
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
      case('<='):
        return '$lte';
      case('='):
        return '$eq';
      case('!='):
        return '$neq';
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