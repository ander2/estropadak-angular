import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakHoniBuruzComponent } from './estropadak-honi-buruz.component';

describe('EstropadakHoniBuruzComponent', () => {
  let component: EstropadakHoniBuruzComponent;
  let fixture: ComponentFixture<EstropadakHoniBuruzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadakHoniBuruzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakHoniBuruzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
