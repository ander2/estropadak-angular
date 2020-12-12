import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NvD3Module } from 'ng2-nvd3';
import { of } from 'rxjs';

import { EstropadakTeamComparationComponent } from './estropadak-team-comparation.component';
import { SailkapenakService } from 'app/shared/sailkapenak.service';
import { SailkapenaServiceStub } from 'app/shared/estropada.service.stub';
import { TaldeakService } from 'app/shared/taldeak.service';
import { TaldeakServiceStub } from 'app/shared/taldeak.service.stub';
import { StatsService } from 'app/shared/stats.service';


describe('EstropadakTeamComparationComponent', () => {
  let component: EstropadakTeamComparationComponent;
  let fixture: ComponentFixture<EstropadakTeamComparationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatChipsModule,
        MatIconModule,
        MatTableModule,
        MatToolbarModule,
        MatSelectModule,
        NvD3Module,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: SailkapenakService, useClass: SailkapenaServiceStub },
        { provide: TaldeakService, useClass: TaldeakServiceStub },
        {provide: StatsService, useValue: {
          getGraphPointsPerRace: () => of([]),
          getGraphCumulativePoints: () => of([]),
          getRank: () => of([]),
          getAges: () => of([]),
          getIncorporations: () => of([]),
        }}
      ],
      declarations: [ EstropadakTeamComparationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakTeamComparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
