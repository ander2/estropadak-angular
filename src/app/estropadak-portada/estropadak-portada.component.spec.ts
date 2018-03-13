import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatSidenavModule, MatTableModule } from '@angular/material';

import { EstropadakPortadaComponent } from './estropadak-portada.component';
import { EstropadakSailkapenaComponent } from '../estropadak-sailkapena/estropadak-sailkapena.component';
import { UrteakService, SailkapenaService } from '../shared/estropada.service';
import { UrteakServiceStub, SailkapenaServiceStub } from '../shared/estropada.service.stub';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EstropadakPortadaComponent', () => {
  let component: EstropadakPortadaComponent;
  let fixture: ComponentFixture<EstropadakPortadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatSidenavModule,
        MatTableModule,
        RouterTestingModule
      ],
      declarations: [
        EstropadakPortadaComponent,
        EstropadakSailkapenaComponent
      ],
      providers: [
        {provide: UrteakService, useClass: UrteakServiceStub},
        {provide: SailkapenaService, useClass: SailkapenaServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakPortadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
