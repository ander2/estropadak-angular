import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadaDetailComponent } from './estropada-detail.component';

describe('EstropadaDetailComponent', () => {
  let component: EstropadaDetailComponent;
  let fixture: ComponentFixture<EstropadaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
