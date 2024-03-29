import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'; 
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { UrteakService, EstropadaService } from '../shared/estropada.service';
import { EstropadakSelectionFormComponent } from './estropadak-selection-form.component';
import { TaldeakService } from '../shared/taldeak.service';
import { TaldeakServiceStub } from '../shared/taldeak.service.stub';
import { EstropadaServiceStub, UrteakServiceStub } from '../shared/estropada.service.stub';

describe('EstropadakSelectionFormComponent', () => {
  let component: EstropadakSelectionFormComponent;
  let fixture: ComponentFixture<EstropadakSelectionFormComponent>;

  beforeEach(waitForAsync(() => {
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
        { provide: EstropadaService, useClass: EstropadaServiceStub },
        { provide: TaldeakService, useClass: TaldeakServiceStub },
        { provide: UrteakService, useClass: UrteakServiceStub }
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
