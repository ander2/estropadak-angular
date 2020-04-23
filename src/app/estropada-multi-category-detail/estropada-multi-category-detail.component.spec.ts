import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatIconModule,
  MatTableModule,
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
} from '@angular/material';
import {MatDividerModule } from '@angular/material/divider';

import { EstropadaMultiCategoryDetailComponent } from './estropada-multi-category-detail.component';
import { EstropadaEstropadaSailkapenaComponent } from '../estropada-estropada-sailkapena/estropada-estropada-sailkapena.component';
import { EstropadaTandaComponent } from '../estropada-tanda/estropada-tanda.component';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadaServiceStub } from '../shared/estropada.service.stub';
import { EstropadaNavegationComponent } from '../estropada-navegation/estropada-navegation.component';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EstropadaMultiDetailComponent', () => {
  let component: EstropadaMultiCategoryDetailComponent;
  let fixture: ComponentFixture<EstropadaMultiCategoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatDividerModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule,
        RouterTestingModule
      ],
      declarations: [
        EstropadaMultiCategoryDetailComponent,
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
    fixture = TestBed.createComponent(EstropadaMultiCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
