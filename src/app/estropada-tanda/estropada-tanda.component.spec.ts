import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadaTandaComponent } from './estropada-tanda.component';

describe('EstropadaTandaComponent', () => {
  let component: EstropadaTandaComponent;
  let fixture: ComponentFixture<EstropadaTandaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadaTandaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadaTandaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
