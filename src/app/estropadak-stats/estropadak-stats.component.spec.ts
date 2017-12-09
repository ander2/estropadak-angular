import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakStatsComponent } from './estropadak-stats.component';

describe('EstropadakStatsComponent', () => {
  let component: EstropadakStatsComponent;
  let fixture: ComponentFixture<EstropadakStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadakStatsComponent ]
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
