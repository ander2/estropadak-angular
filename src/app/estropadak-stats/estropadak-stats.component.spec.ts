import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NvD3Module } from 'ng2-nvd3';

import { EstropadakStatsComponent } from './estropadak-stats.component';
import { EstropadaService, SailkapenaService } from '../shared/estropada.service';

xdescribe('EstropadakStatsComponent', () => {
  let component: EstropadakStatsComponent;
  let fixture: ComponentFixture<EstropadakStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NvD3Module,
      ],
      declarations: [ EstropadakStatsComponent ],
      providers: [
        EstropadaService,
        SailkapenaService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
