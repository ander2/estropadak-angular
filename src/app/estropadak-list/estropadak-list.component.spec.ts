import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { EstropadakListComponent } from './estropadak-list.component';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadaServiceStub } from '../shared/estropada.service.stub';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';

describe('EstropadakListComponent', () => {
  let component: EstropadakListComponent;
  let fixture: ComponentFixture<EstropadakListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatListModule,
        MatToolbarModule
      ],
      providers: [
        {provide: EstropadaService, useClass: EstropadaServiceStub },
        EstropadakNavegationService
      ],
      declarations: [ EstropadakListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
