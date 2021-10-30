import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { MatTableModule} from '@angular/material/table';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { EstropadakSailkapenaComponent } from './estropadak-sailkapena.component';
import { EstropadaServiceStub, SailkapenaServiceStub } from '../shared/estropada.service.stub';
import { SailkapenakService } from '../shared/sailkapenak.service';
import { EstropadaService } from '../shared/estropada.service';
import { MatDividerModule } from '@angular/material/divider';

describe('EstropadakSailkapenaComponent', () => {
  let component: EstropadakSailkapenaComponent;
  let fixture: ComponentFixture<EstropadakSailkapenaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule,
        MatButtonToggleModule,
        MatDividerModule,
        RouterTestingModule
      ],
      declarations: [ EstropadakSailkapenaComponent ],
      providers: [
        {provide: SailkapenakService, useClass: SailkapenaServiceStub},
        {provide: EstropadaService, useClass: EstropadaServiceStub}
      ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakSailkapenaComponent);
    component = fixture.componentInstance;
    component.year = 2017;
    component.league = 'ACT';
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
