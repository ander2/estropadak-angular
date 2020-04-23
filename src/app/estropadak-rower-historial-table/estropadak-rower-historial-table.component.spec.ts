import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakRowerHistorialTableComponent } from './estropadak-rower-historial-table.component';
import { MatTableModule, MatButtonModule, MatIconModule, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EstropadakRowerHistorialTableComponent', () => {
  let component: EstropadakRowerHistorialTableComponent;
  let fixture: ComponentFixture<EstropadakRowerHistorialTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatSortModule,
        MatTableModule
      ],
      declarations: [ EstropadakRowerHistorialTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakRowerHistorialTableComponent);
    component = fixture.componentInstance;
    component.rower = {
      historial: []
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
