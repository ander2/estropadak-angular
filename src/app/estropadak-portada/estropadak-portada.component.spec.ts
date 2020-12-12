import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material/list';
import { MatTableModule} from '@angular/material/table';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { EstropadakPortadaComponent } from './estropadak-portada.component';
import { EstropadakSailkapenaComponent } from '../estropadak-sailkapena/estropadak-sailkapena.component';
import { UrteakService, EmaitzakService, EstropadaService } from '../shared/estropada.service';
import { SailkapenakService } from '../shared/sailkapenak.service';
import { UrteakServiceStub, SailkapenaServiceStub, EmaitzakServiceStub, EstropadaServiceStub } from '../shared/estropada.service.stub';
import { EstropadakAzkenEmaitzakCardComponent } from '../estropadak-azken-emaitzak-card/estropadak-azken-emaitzak-card.component';
import { EstropadakHurrengoakCardComponent } from '../estropadak-hurrengoak-card/estropadak-hurrengoak-card.component';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';

describe('EstropadakPortadaComponent', () => {
  let component: EstropadakPortadaComponent;
  let fixture: ComponentFixture<EstropadakPortadaComponent>;

  beforeEach(waitForAsync(() => {
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
        {provide: SailkapenakService, useClass: SailkapenaServiceStub}
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
