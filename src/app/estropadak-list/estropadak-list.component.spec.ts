import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakListComponent } from './estropadak-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadaServiceStub } from '../shared/estropada.service.stub';
import { MatListModule } from '@angular/material';

describe('EstropadakListComponent', () => {
  let component: EstropadakListComponent;
  let fixture: ComponentFixture<EstropadakListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatListModule
      ],
      providers: [
        {provide: EstropadaService, useClass: EstropadaServiceStub }
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
