import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakResultsComponent } from './estropadak-results.component';

describe('EstropadakResultsComponent', () => {
  let component: EstropadakResultsComponent;
  let fixture: ComponentFixture<EstropadakResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadakResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
