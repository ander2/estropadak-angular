import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

import { EstropadakHurrengoakCardComponent } from './estropadak-hurrengoak-card.component';
import { EstropadaServiceStub } from '../shared/estropada.service.stub';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';
import { RouterTestingModule } from '@angular/router/testing';
import { EstropadakListComponent } from '../estropadak-list/estropadak-list.component';

describe('EstropadakHurrengoakCardComponent', () => {
  let component: EstropadakHurrengoakCardComponent;
  let fixture: ComponentFixture<EstropadakHurrengoakCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatButtonToggleModule,
        MatToolbarModule,
        RouterTestingModule
      ],
      declarations: [
        EstropadakListComponent,
        EstropadakHurrengoakCardComponent
      ],
      providers: [
        { provide: EstropadaService, useClass: EstropadaServiceStub },
        EstropadakNavegationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakHurrengoakCardComponent);
    component = fixture.componentInstance;
    component.year = 2018;
    component.league = 'ACT';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
