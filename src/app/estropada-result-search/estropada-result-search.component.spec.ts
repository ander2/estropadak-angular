import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { NgxAngularQueryBuilderModule } from 'ngx-angular-query-builder';

import { EmaitzakService } from 'app/shared/emaitzak.service';
import { UrteakService } from 'app/shared/estropada.service';
import { EmaitzakServiceStub, UrteakServiceStub } from 'app/shared/estropada.service.stub';
import { TaldeakService } from 'app/shared/taldeak.service';
import { TaldeakServiceStub } from 'app/shared/taldeak.service.stub';

import { EstropadaResultSearchComponent } from './estropada-result-search.component';

describe('EstropadaResultSearchComponent', () => {
  let component: EstropadaResultSearchComponent;
  let fixture: ComponentFixture<EstropadaResultSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxAngularQueryBuilderModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatRadioModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule,
      ],
      declarations: [ EstropadaResultSearchComponent ],
      providers: [
        { provide: EmaitzakService, useClass: EmaitzakServiceStub },
        { provide: UrteakService, useClass: UrteakServiceStub },
        { provide: TaldeakService, useClass: TaldeakServiceStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadaResultSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a Mango query', () => {
    const query = {
      condition: "and",
      rules: [
        {field: 'liga', operator: '=', value: 'act'},
        {field: 'posizioa', operator: '=', value: 1}
      ]
    }
    const mango = {
      "$and": [{
        liga: {
          "$eq": "act"
        }}, {
        posizioa: {
          "$eq": 1
        }
      }]
    };
    expect(component.queryToMango(query)).toEqual(mango)
  })

  it('should return a Mango query with != operator', () => {
    const query = {
      condition: "and",
      rules: [
        {field: 'liga', operator: '=', value: 'act'},
        {field: 'posizioa', operator: '!=', value: 1}
      ]
    }
    const mango = {
      "$and": [{
        liga: {
          "$eq": "act"
        }}, {
        posizioa: {
          "$neq": 1
        }
      }]
    };
    expect(component.queryToMango(query)).toEqual(mango)
  })

  it('should return a Mango query with a nested condition', () => {
    const query = {
      condition: "or",
      rules: [{
        condition: "and",
        rules: [
          {field: 'liga', operator: '=', value: 'act'},
          {field: 'posizioa', operator: '=', value: 1}
        ]
      }, {
        condition: "and",
        rules: [
        {field: 'liga', operator: '=', value: 'arc'},
        {field: 'posizioa', operator: '!=', value: 1}
      ]}
      ]
    };
    const mango = {
      "$or": [{
        "$and": [{
          liga: {
            "$eq": "act"
          }}, {
          posizioa: {
            "$eq": 1
          }
        }]
      }, {
        "$and": [{
          liga: {
            "$eq": "arc"
          }}, {
          posizioa: {
            "$neq": 1
          }
        }]
      }]
    };
    expect(component.queryToMango(query)).toEqual(mango)
  })

  it('should return a Mango query with a mixed nested condition', () => {
    const query = {
      condition: "and",
      rules: [
        {field: 'taldea', operator: '=', value: 'Donostiarra'},
        {condition: "or",
          rules:[{
            condition: "and",
            rules:[
              {field: 'liga', operator: '=', value: 'act'},
              {field: 'posizioa', operator: '=', value: 1}
            ]
          },
          {
            condition: "and",
            rules: [
              {field: 'liga', operator: '=', value: 'arc'},
              {field: 'posizioa', operator: '=', value: 1}
            ]
          }
        ]
      }]
    };
    const mango = {
      "$and": [
        { "taldea": { "$eq": "Donostiarra"}},
        { "$or": [{
            "$and": [{
              liga: {
                "$eq": "act"
              }}, {
              posizioa: {
                "$eq": 1
              }}
            ]}, {
            "$and": [{
              liga: {
                "$eq": "arc"
              }}, {
              posizioa: {
                "$eq": 1
              }}
            ]}
          ]
        }
      ]
    };
    expect(component.queryToMango(query)).toEqual(mango)
  })
});
