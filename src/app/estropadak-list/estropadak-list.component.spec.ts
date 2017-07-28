import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakListComponent } from './estropadak-list.component';

describe('EstropadakListComponent', () => {
  let component: EstropadakListComponent;
  let fixture: ComponentFixture<EstropadakListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
