import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule} from '@angular/material/table';
import { MatIconModule} from '@angular/material/icon';
import { MatSelectModule} from '@angular/material/select';
import { MatSortModule} from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { EstropadakSelectionFormComponent } from '../estropadak-selection-form/estropadak-selection-form.component';
import { EstropadakResultsComponent } from './estropadak-results.component';
import { EmaitzakService, UrteakService, EstropadaService } from '../shared/estropada.service';
import { TaldeakService } from '../shared/taldeak.service';
import { TaldeakServiceStub } from '../shared/taldeak.service.stub';
import { EstropadaServiceStub } from 'app/shared/estropada.service.stub';


describe('EstropadakResultsComponent', () => {
  let component: EstropadakResultsComponent;
  let fixture: ComponentFixture<EstropadakResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule
      ],
      declarations: [
        EstropadakSelectionFormComponent,
        EstropadakResultsComponent
      ],
      providers: [
        { provide: EstropadaService, useClass: EstropadaServiceStub},
        { provide: EmaitzakService, useValue: {getList: () => of([])}},
        { provide: TaldeakService, useClass: TaldeakServiceStub },
        { provide: UrteakService, useValue: {getList: () => of({'act': [2019]})} },
        { provide: ActivatedRoute, useValue: {paramMap: of({get: (key) => {
            if (key === 'year') {
              return 2019;
            } else if (key == 'team') {
              return 'Orio';
            } else {
              return 'act';
            }
          }})}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakResultsComponent);
    component = fixture.componentInstance;
    component.league = 'act';
    component.year = 2019;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
