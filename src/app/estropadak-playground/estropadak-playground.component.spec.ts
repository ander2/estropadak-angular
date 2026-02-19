import { provideRouter, RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { of } from 'rxjs';

import { EstropadakPlaygroundComponent } from './estropadak-playground.component';
import { EstropadakSelectionFormComponent } from '../estropadak-selection-form/estropadak-selection-form.component';
import { UrteakService, EstropadaService } from '../shared/estropada.service';
import { EmaitzakService } from '../shared/emaitzak.service';
import { TaldeakService } from '../shared/taldeak.service';
import { TaldeakServiceStub } from '../shared/taldeak.service.stub';
import { EstropadaServiceStub, UrteakServiceStub } from '../shared/estropada.service.stub';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


describe('EstropadakPlaygroundComponent', () => {
  let component: EstropadakPlaygroundComponent;
  let fixture: ComponentFixture<EstropadakPlaygroundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EstropadakSelectionFormComponent,
        EstropadakPlaygroundComponent
      ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule,
        MatTooltipModule,
        RouterModule
      ],
      providers: [
        { provide: EmaitzakService, useValue: { getList: () => of([]) } },
        { provide: TaldeakService, useClass: TaldeakServiceStub },
        { provide: UrteakService, useClass: UrteakServiceStub },
        { provide: EstropadaService, useClass: EstropadaServiceStub },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakPlaygroundComponent);
    component = fixture.componentInstance;
    component.year = 2019;
    component.league = 'ACT';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
