import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatListModule, MatButtonToggleModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { EstropadakAzkenEmaitzakCardComponent } from './estropadak-azken-emaitzak-card.component';
import { EmaitzakServiceStub } from '../shared/estropada.service.stub';
import { EmaitzakService } from '../shared/estropada.service';
import { Estropada } from '../shared/estropadak.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('EstropadakAzkenEmaitzakCardComponent', () => {
  let component: EstropadakAzkenEmaitzakCardComponent;
  let fixture: ComponentFixture<EstropadakAzkenEmaitzakCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonToggleModule,
        MatListModule,
        MatTableModule,
        MatToolbarModule,
        RouterTestingModule
      ],
      declarations: [ EstropadakAzkenEmaitzakCardComponent ],
      providers: [
        {provide: EmaitzakService, useClass: EmaitzakServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakAzkenEmaitzakCardComponent);
    component = fixture.componentInstance;
    component.league = 'ACT';
    component.year = 2017;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a list of two estropadak', () => {
    expect(component.estropadak.length).toEqual(2);
  });

  it('should return four teams for every estropadak', () => {
    component.estropadak.forEach((e: Estropada) => {
      expect(e.sailkapena.length).toEqual(4);
    });
  });
});
