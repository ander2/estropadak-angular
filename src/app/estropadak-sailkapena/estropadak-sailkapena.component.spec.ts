import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatTableModule, MatButtonToggleModule, MatToolbarModule } from '@angular/material';

import { EstropadakSailkapenaComponent } from './estropadak-sailkapena.component';
import { SailkapenaService } from '../shared/estropada.service';
import { SailkapenaServiceStub } from '../shared/estropada.service.stub';

describe('EstropadakSailkapenaComponent', () => {
  let component: EstropadakSailkapenaComponent;
  let fixture: ComponentFixture<EstropadakSailkapenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatTableModule,
        MatToolbarModule,
        MatButtonToggleModule,
        RouterTestingModule
      ],
      declarations: [ EstropadakSailkapenaComponent ],
      providers: [
        {provide: SailkapenaService, useClass: SailkapenaServiceStub}
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
