import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakStatsPageComponent } from './estropadak-stats-page.component';

describe('EstropadakStatsPageComponent', () => {
  let component: EstropadakStatsPageComponent;
  let fixture: ComponentFixture<EstropadakStatsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadakStatsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakStatsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
