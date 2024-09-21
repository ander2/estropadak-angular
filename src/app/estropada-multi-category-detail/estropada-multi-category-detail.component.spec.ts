import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatDividerModule } from '@angular/material/divider';

import { EstropadaMultiCategoryDetailComponent } from './estropada-multi-category-detail.component';
import { EstropadaEstropadaSailkapenaComponent } from '../estropada-estropada-sailkapena/estropada-estropada-sailkapena.component';
import { EstropadaTandaComponent } from '../estropada-tanda/estropada-tanda.component';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadaMulticategoryServiceStub } from '../shared/estropada.service.stub';
import { EstropadaNavegationComponent } from '../estropada-navegation/estropada-navegation.component';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';


describe('EstropadaMultiDetailComponent', () => {
  let component: EstropadaMultiCategoryDetailComponent;
  let fixture: ComponentFixture<EstropadaMultiCategoryDetailComponent>;

  beforeEach(waitForAsync(() => {
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
        { provide: EstropadaService, useClass: EstropadaMulticategoryServiceStub },
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
