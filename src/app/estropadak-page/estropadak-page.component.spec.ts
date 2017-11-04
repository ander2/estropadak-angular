import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakPageComponent } from './estropadak-page.component';

describe('EstropadakPageComponent', () => {
  let component: EstropadakPageComponent;
  let fixture: ComponentFixture<EstropadakPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadakPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
