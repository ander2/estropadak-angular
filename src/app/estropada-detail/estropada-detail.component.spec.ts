import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadaDetailComponent } from './estropada-detail.component';
import { MatIconModule, MatTableModule, MatButtonModule } from '@angular/material';
import {MatDividerModule } from '@angular/material/divider';
import { EstropadaEstropadaSailkapenaComponent } from '../estropada-estropada-sailkapena/estropada-estropada-sailkapena.component';
import { EstropadaTandaComponent } from '../estropada-tanda/estropada-tanda.component';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadaServiceStub } from '../shared/estropada.service.stub';
import { RouterTestingModule } from '@angular/router/testing';
import { EstropadaNavegationComponent } from '../estropada-navegation/estropada-navegation.component';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';

describe('EstropadaDetailComponent', () => {
  let component: EstropadaDetailComponent;
  let fixture: ComponentFixture<EstropadaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatTableModule,
        RouterTestingModule
      ],
      declarations: [
        EstropadaDetailComponent,
        EstropadaEstropadaSailkapenaComponent,
        EstropadaTandaComponent,
        EstropadaNavegationComponent
      ],
      providers: [
        { provide: EstropadaService, useClass: EstropadaServiceStub },
        EstropadakNavegationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
