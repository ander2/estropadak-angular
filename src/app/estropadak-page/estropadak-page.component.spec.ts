import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule, MatTabsModule, MatButtonModule, MatMenuModule, MatListModule, MatTableModule, MatButtonToggleModule } from '@angular/material';
import { NvD3Module } from 'ng2-nvd3';
import { Observable } from 'rxjs/Observable';

import { EstropadakPageComponent } from './estropadak-page.component';
import { EstropadakYearsComponent } from '../estropadak-years/estropadak-years.component';
import { EstropadakListComponent } from '../estropadak-list/estropadak-list.component';
import { EstropadakSailkapenaComponent } from '../estropadak-sailkapena/estropadak-sailkapena.component';
import { EstropadakStatsComponent } from '../estropadak-stats/estropadak-stats.component';
import { EstropadaService, UrteakService, SailkapenaService } from '../shared/estropada.service';
import { HttpModule } from '@angular/http';
import { EstropadaServiceStub, SailkapenaServiceStub, UrteakServiceStub } from '../shared/estropada.service.stub';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';

describe('EstropadakPageComponent', () => {
  let component: EstropadakPageComponent;
  let fixture: ComponentFixture<EstropadakPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatTabsModule,
        MatTableModule,
        NvD3Module,
        RouterTestingModule
      ],
      declarations: [
        EstropadakPageComponent,
        EstropadakYearsComponent,
        EstropadakListComponent,
        EstropadakSailkapenaComponent,
        EstropadakStatsComponent
      ],
      providers: [
        {provide: EstropadaService, useClass: EstropadaServiceStub},
        {provide: SailkapenaService, useClass: SailkapenaServiceStub},
        {provide: UrteakService, useClass: UrteakServiceStub},
        {provide: ActivatedRoute, useValue: {paramMap: Observable.of({get: (key) => {
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
