import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadaEstropadaSailkapenaComponent } from './estropada-estropada-sailkapena.component';
import { MatCardModule, MatTableModule } from '@angular/material';
import { estropada } from '../shared/estropada.fixture';

describe('EstropadaEstropadaSailkapenaComponent', () => {
  let component: EstropadaEstropadaSailkapenaComponent;
  let fixture: ComponentFixture<EstropadaEstropadaSailkapenaComponent>;

  beforeEach(async(() => {
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
