import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule, MatListModule } from '@angular/material';

import { EstropadakHurrengoakCardComponent } from './estropadak-hurrengoak-card.component';
import { EstropadaServiceStub } from '../shared/estropada.service.stub';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('EstropadakHurrengoakCardComponent', () => {
  let component: EstropadakHurrengoakCardComponent;
  let fixture: ComponentFixture<EstropadakHurrengoakCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatListModule,
        RouterTestingModule
      ],
      declarations: [ EstropadakHurrengoakCardComponent ],
      providers:[ 
        { provide: EstropadaService, useClass: EstropadaServiceStub },
        EstropadakNavegationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakHurrengoakCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
