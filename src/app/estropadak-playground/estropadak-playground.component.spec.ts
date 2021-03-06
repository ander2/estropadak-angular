import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { of } from 'rxjs';

import { EstropadakPlaygroundComponent } from './estropadak-playground.component';
import { EstropadakSelectionFormComponent } from '../estropadak-selection-form/estropadak-selection-form.component';
import { UrteakService, EstropadaService } from '../shared/estropada.service';
import { EmaitzakService } from '../shared/emaitzak.service';
import { TaldeakService } from '../shared/taldeak.service';
import { TaldeakServiceStub } from '../shared/taldeak.service.stub';
import { EstropadaServiceStub } from 'app/shared/estropada.service.stub';


describe('EstropadakPlaygroundComponent', () => {
  let component: EstropadakPlaygroundComponent;
  let fixture: ComponentFixture<EstropadakPlaygroundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule
      ],
      declarations: [
        EstropadakSelectionFormComponent,
        EstropadakPlaygroundComponent
      ],
      providers: [
        { provide: EmaitzakService, useValue: {getList: () => of([])}},
        { provide: TaldeakService, useClass: TaldeakServiceStub },
        { provide: UrteakService, useValue: {getList: () => of({act: [2019]})} },
        { provide: EstropadaService, useClass: EstropadaServiceStub}
      ]
    })
    .compileComponents();
  }));

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
