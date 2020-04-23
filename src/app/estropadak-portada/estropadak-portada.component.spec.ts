import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatSidenavModule, MatTableModule, MatButtonToggleModule, MatListModule, MatToolbarModule, MatCardModule, MatIconModule, MatSelectModule, MatFormFieldModule } from '@angular/material';

import { EstropadakPortadaComponent } from './estropadak-portada.component';
import { EstropadakSailkapenaComponent } from '../estropadak-sailkapena/estropadak-sailkapena.component';
import { UrteakService, SailkapenaService, EmaitzakService, EstropadaService } from '../shared/estropada.service';
import { UrteakServiceStub, SailkapenaServiceStub, EmaitzakServiceStub, EstropadaServiceStub } from '../shared/estropada.service.stub';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstropadakAzkenEmaitzakCardComponent } from '../estropadak-azken-emaitzak-card/estropadak-azken-emaitzak-card.component';
import { EstropadakHurrengoakCardComponent } from '../estropadak-hurrengoak-card/estropadak-hurrengoak-card.component';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';
import { FormsModule } from '@angular/forms';

describe('EstropadakPortadaComponent', () => {
  let component: EstropadakPortadaComponent;
  let fixture: ComponentFixture<EstropadakPortadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatSidenavModule,
        MatTableModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatToolbarModule,
        MatListModule,
        RouterTestingModule
      ],
      declarations: [
        EstropadakPortadaComponent,
        EstropadakAzkenEmaitzakCardComponent,
        EstropadakHurrengoakCardComponent,
        EstropadakSailkapenaComponent
      ],
      providers: [
        {provide: EmaitzakService, useClass: EmaitzakServiceStub},
        {provide: EstropadaService, useClass: EstropadaServiceStub},
        EstropadakNavegationService,
        {provide: UrteakService, useClass: UrteakServiceStub},
        {provide: SailkapenaService, useClass: SailkapenaServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakPortadaComponent);
    component = fixture.componentInstance;
    component.year = 2017;
    component.league = 'act';
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
