import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakPlaygroundComponent } from './estropadak-playground.component';

describe('EstropadakPlaygroundComponent', () => {
  let component: EstropadakPlaygroundComponent;
  let fixture: ComponentFixture<EstropadakPlaygroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadakPlaygroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
