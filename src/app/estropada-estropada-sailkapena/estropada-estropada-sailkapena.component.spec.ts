import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadaEstropadaSailkapenaComponent } from './estropada-estropada-sailkapena.component';

describe('EstropadaEstropadaSailkapenaComponent', () => {
  let component: EstropadaEstropadaSailkapenaComponent;
  let fixture: ComponentFixture<EstropadaEstropadaSailkapenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadaEstropadaSailkapenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadaEstropadaSailkapenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
