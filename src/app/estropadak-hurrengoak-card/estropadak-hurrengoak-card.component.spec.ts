import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakHurrengoakCardComponent } from './estropadak-hurrengoak-card.component';

describe('EstropadakHurrengoakCardComponent', () => {
  let component: EstropadakHurrengoakCardComponent;
  let fixture: ComponentFixture<EstropadakHurrengoakCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadakHurrengoakCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakHurrengoakCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
