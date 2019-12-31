import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakRowerHistorialTableComponent } from './estropadak-rower-historial-table.component';

describe('EstropadakRowerHistorialTableComponent', () => {
  let component: EstropadakRowerHistorialTableComponent;
  let fixture: ComponentFixture<EstropadakRowerHistorialTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadakRowerHistorialTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakRowerHistorialTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
