import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';

import { EstropadakStatsPageComponent } from './estropadak-stats-page.component';
import { UrteakServiceStub, EstropadaServiceStub, SailkapenaServiceStub } from 'app/shared/estropada.service.stub';
import { UrteakService, EstropadaService } from 'app/shared/estropada.service';
import { TaldeakService } from 'app/shared/taldeak.service';
import { TaldeakServiceStub } from 'app/shared/taldeak.service.stub';
import { StatsService } from 'app/shared/stats.service';
import { SailkapenakService } from 'app/shared/sailkapenak.service';

class ChartMock {
  public canvas;
  public options;
  public data;
  // this is not a complete mock. You may need to mock other properties as well.


  public constructor(canvas: any, options: any) {
    this.canvas = canvas;
    this.options = options;
    this.data = options.data;
  }

	public default() {
		return true;
	}
}

jest.mock('chart.js/auto', () => {
  return {
    default: jest.fn().mockImplementation(() => {
      return {
        Chart: ChartMock,
      }
    }),
  }
})

describe('EstropadakStatsPageComponent', () => {
  let component: EstropadakStatsPageComponent;
  let fixture: ComponentFixture<EstropadakStatsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSelectModule,
        MatToolbarModule,
        FormsModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ EstropadakStatsPageComponent ],
      providers: [
        {provide: UrteakService, useClass: UrteakServiceStub},
        {provide: EstropadaService, useClass: EstropadaServiceStub},
        {provide: TaldeakService, useClass: TaldeakServiceStub},
        {provide: StatsService, useValue: {
          getGraphPointsPerRace: () => of([]),
          getGraphCumulativePoints: () => of([]),
          getRank: () => of([]),
          getAges: () => of([]),
          getIncorporations: () => of([]),
          getDatasets: () => { return { labels: [], datasets: []}}
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    component.league = 'act';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
});
