import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { EstropadaDetailComponent } from './estropada-detail.component';
import { EstropadaEstropadaSailkapenaComponent } from '../estropada-estropada-sailkapena/estropada-estropada-sailkapena.component';
import { EstropadaTandaComponent } from '../estropada-tanda/estropada-tanda.component';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadaServiceStub } from '../shared/estropada.service.stub';
import { EstropadaNavegationComponent } from '../estropada-navegation/estropada-navegation.component';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';

describe('EstropadaDetailComponent', () => {
  let component: EstropadaDetailComponent;
  let fixture: ComponentFixture<EstropadaDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatDividerModule,
        MatTableModule,
        MatToolbarModule,
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
