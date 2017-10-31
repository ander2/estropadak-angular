import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakPortadaComponent } from './estropadak-portada.component';

describe('EstropadakPortadaComponent', () => {
  let component: EstropadakPortadaComponent;
  let fixture: ComponentFixture<EstropadakPortadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadakPortadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakPortadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
