import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { EstropadaEstropadaSailkapenaComponent } from './estropada-estropada-sailkapena.component';
import { estropada } from '../shared/estropada.fixture';


describe('EstropadaEstropadaSailkapenaComponent', () => {
  let component: EstropadaEstropadaSailkapenaComponent;
  let fixture: ComponentFixture<EstropadaEstropadaSailkapenaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatTableModule
      ],
      declarations: [ EstropadaEstropadaSailkapenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadaEstropadaSailkapenaComponent);
    component = fixture.componentInstance;
    component.sailkapena = estropada.sailkapena;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
