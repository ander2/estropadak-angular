import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MatButtonModule, MatSelectModule, MatToolbarModule } from '@angular/material';
import { of } from 'rxjs';

import { EmaitzakService, UrteakService } from '../shared/estropada.service';
import { EstropadakSelectionFormComponent } from './estropadak-selection-form.component';
import { TaldeakService } from '../shared/taldeak.service';
import { TaldeakServiceStub } from '../shared/taldeak.service.stub';

describe('EstropadakSelectionFormComponent', () => {
  let component: EstropadakSelectionFormComponent;
  let fixture: ComponentFixture<EstropadakSelectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatSelectModule,
        MatToolbarModule
      ],
      declarations: [ EstropadakSelectionFormComponent ],
      providers: [
        { provide: TaldeakService, useClass: TaldeakServiceStub },
        { provide: UrteakService, useValue: {getList: () => of({'act': [2019]})} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakSelectionFormComponent);
    component = fixture.componentInstance;
    component.year = 2019;
    component.league = 'act';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
