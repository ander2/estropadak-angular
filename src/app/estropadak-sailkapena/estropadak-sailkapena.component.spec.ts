import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakSailkapenaComponent } from './estropadak-sailkapena.component';

describe('EstropadakSailkapenaComponent', () => {
  let component: EstropadakSailkapenaComponent;
  let fixture: ComponentFixture<EstropadakSailkapenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadakSailkapenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakSailkapenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
