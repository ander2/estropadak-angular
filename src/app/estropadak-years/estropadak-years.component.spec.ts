import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakYearsComponent } from './estropadak-years.component';

describe('EstropadakYearsComponent', () => {
  let component: EstropadakYearsComponent;
  let fixture: ComponentFixture<EstropadakYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadakYearsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
