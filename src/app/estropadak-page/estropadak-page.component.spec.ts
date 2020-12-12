import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule} from '@angular/material/tabs';
import { MatTableModule} from '@angular/material/table';
import { MatMenuModule} from '@angular/material/menu';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NvD3Module } from 'ng2-nvd3';
import { of } from 'rxjs';

import { EstropadakPageComponent } from './estropadak-page.component';
import { EstropadakYearsComponent } from '../estropadak-years/estropadak-years.component';
import { EstropadakListComponent } from '../estropadak-list/estropadak-list.component';
import { EstropadakSailkapenaComponent } from '../estropadak-sailkapena/estropadak-sailkapena.component';
import { EstropadaService, UrteakService, } from '../shared/estropada.service';
import { SailkapenakService } from '../shared/sailkapenak.service';
import { EstropadaServiceStub, SailkapenaServiceStub, UrteakServiceStub } from '../shared/estropada.service.stub';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';

describe('EstropadakPageComponent', () => {
  let component: EstropadakPageComponent;
  let fixture: ComponentFixture<EstropadakPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatFormFieldModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        MatTableModule,
        MatToolbarModule,
        NvD3Module,
        RouterTestingModule
      ],
      declarations: [
        EstropadakPageComponent,
        EstropadakYearsComponent,
        EstropadakListComponent,
        EstropadakSailkapenaComponent,
      ],
      providers: [
        {provide: EstropadaService, useClass: EstropadaServiceStub},
        {provide: SailkapenakService, useClass: SailkapenaServiceStub},
        {provide: UrteakService, useClass: UrteakServiceStub},
        {provide: ActivatedRoute, useValue: {paramMap: of({get: (key) => {
          if (key === 'year') {
            return 2017;
          } else {
            return 'ACT';
          }}})}},
        EstropadakNavegationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakPageComponent);
    component = fixture.componentInstance;
    component.league = 'ACT';
    component.year = 2017;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
