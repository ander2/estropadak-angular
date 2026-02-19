import { RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { EstropadakListComponent } from './estropadak-list.component';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadaServiceStub } from '../shared/estropada.service.stub';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';

describe('EstropadakListComponent', () => {
  let component: EstropadakListComponent;
  let fixture: ComponentFixture<EstropadakListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatToolbarModule,
        RouterModule
      ],
      providers: [
        {provide: EstropadaService, useClass: EstropadaServiceStub },
        EstropadakNavegationService
      ],
      declarations: [ EstropadakListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
