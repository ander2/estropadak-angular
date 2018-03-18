import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatMenuModule } from '@angular/material';

import { EstropadakYearsComponent } from './estropadak-years.component';
import { UrteakServiceStub } from '../shared/estropada.service.stub';
import { UrteakService } from '../shared/estropada.service';

describe('EstropadakYearsComponent', () => {
  let component: EstropadakYearsComponent;
  let fixture: ComponentFixture<EstropadakYearsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        RouterTestingModule
      ],
      declarations: [ EstropadakYearsComponent ],
      providers: [
        {provide: UrteakService, useClass: UrteakServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakYearsComponent);
    component = fixture.componentInstance;
    component.league = 'ACT';
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
