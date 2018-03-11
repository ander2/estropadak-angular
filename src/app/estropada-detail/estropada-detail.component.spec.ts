import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadaDetailComponent } from './estropada-detail.component';
import { MatIconModule, MatTableModule } from '@angular/material';
import { EstropadaEstropadaSailkapenaComponent } from '../estropada-estropada-sailkapena/estropada-estropada-sailkapena.component';
import { EstropadaTandaComponent } from '../estropada-tanda/estropada-tanda.component';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadaServiceStub } from '../shared/estropada.service.stub';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('EstropadaDetailComponent', () => {
  let component: EstropadaDetailComponent;
  let fixture: ComponentFixture<EstropadaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatTableModule,
        RouterTestingModule
      ],
      declarations: [
        EstropadaDetailComponent,
        EstropadaEstropadaSailkapenaComponent,
        EstropadaTandaComponent
       ],
       providers: [
         { provide: EstropadaService, useClass: EstropadaServiceStub }
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
