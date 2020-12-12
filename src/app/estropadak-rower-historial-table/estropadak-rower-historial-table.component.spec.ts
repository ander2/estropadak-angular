import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';

import { EstropadakRowerHistorialTableComponent } from './estropadak-rower-historial-table.component';

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
