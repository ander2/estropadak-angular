import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatIconModule,
  MatTabsModule,
  MatButtonModule,
  MatMenuModule,
  MatListModule,
  MatTableModule,
  MatButtonToggleModule,
  MatToolbarModule,
  MatSelectModule,
  MatFormFieldModule,
} from '@angular/material';
import { NvD3Module } from 'ng2-nvd3';
import { of } from 'rxjs';

import { EstropadakPageComponent } from './estropadak-page.component';
import { EstropadakYearsComponent } from '../estropadak-years/estropadak-years.component';
import { EstropadakListComponent } from '../estropadak-list/estropadak-list.component';
import { EstropadakSailkapenaComponent } from '../estropadak-sailkapena/estropadak-sailkapena.component';
import { EstropadaService, UrteakService, SailkapenaService } from '../shared/estropada.service';
import { EstropadaServiceStub, SailkapenaServiceStub, UrteakServiceStub } from '../shared/estropada.service.stub';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';
import { FormsModule } from '@angular/forms';

describe('EstropadakPageComponent', () => {
  let component: EstropadakPageComponent;
  let fixture: ComponentFixture<EstropadakPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        MatTableModule,
        MatToolbarModule,
        NvD3Module,
        RouterTestingModule
      ],
      declarations: [
        EstropadakPageComponent,
        EstropadakYearsComponent,
        EstropadakListComponent,
        EstropadakSailkapenaComponent,
      ],
      providers: [
        {provide: EstropadaService, useClass: EstropadaServiceStub},
        {provide: SailkapenaService, useClass: SailkapenaServiceStub},
        {provide: UrteakService, useClass: UrteakServiceStub},
        {provide: ActivatedRoute, useValue: {paramMap: of({get: (key) => {
          if (key === 'year') {
            return 2017;
          } else {
            return 'ACT';
          }}})}},
        EstropadakNavegationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakPageComponent);
    component = fixture.componentInstance;
    component.league = 'ACT';
    component.year = 2017;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
