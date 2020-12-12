import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule} from '@angular/material/table';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { EstropadakSailkapenaComponent } from './estropadak-sailkapena.component';
import { SailkapenakService } from '../shared/sailkapenak.service';
import { SailkapenaServiceStub } from '../shared/estropada.service.stub';
import { FormsModule } from '@angular/forms';

describe('EstropadakSailkapenaComponent', () => {
  let component: EstropadakSailkapenaComponent;
  let fixture: ComponentFixture<EstropadakSailkapenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatSelectModule,
        MatTableModule,
        MatToolbarModule,
        MatButtonToggleModule,
        RouterTestingModule
      ],
      declarations: [ EstropadakSailkapenaComponent ],
      providers: [
        {provide: SailkapenakService, useClass: SailkapenaServiceStub}
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
