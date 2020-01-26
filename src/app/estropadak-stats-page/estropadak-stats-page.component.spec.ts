import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule, MatToolbarModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { EstropadakStatsPageComponent } from './estropadak-stats-page.component';
import { NvD3Module } from 'ng2-nvd3';
import { UrteakServiceStub, EstropadaServiceStub, SailkapenaServiceStub } from 'app/shared/estropada.service.stub';
import { UrteakService, EstropadaService, SailkapenaService } from 'app/shared/estropada.service';
import { TaldeakService } from 'app/shared/taldeak.service';
import { TaldeakServiceStub } from 'app/shared/taldeak.service.stub';
import { StatsService } from 'app/shared/stats.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('EstropadakStatsPageComponent', () => {
  let component: EstropadakStatsPageComponent;
  let fixture: ComponentFixture<EstropadakStatsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSelectModule,
        MatToolbarModule,
        FormsModule,
        NoopAnimationsModule,
        NvD3Module,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ EstropadakStatsPageComponent ],
      providers: [
        {provide: UrteakService, useClass: UrteakServiceStub},
        {provide: EstropadaService, useClass: EstropadaServiceStub},
        {provide: SailkapenaService, useClass: SailkapenaServiceStub},
        {provide: TaldeakService, useClass: TaldeakServiceStub},
        {provide: StatsService, useValue: {
          getGraphPointsPerRace: () => of([]),
          getGraphCumulativePoints: () => of([]),
          getRank: () => of([]),
          getAges: () => of([]),
          getIncorporations: () => of([]),
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakStatsPageComponent);
    component = fixture.componentInstance;
    component.league = 'act';
    component.year = 2017;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
