import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakSelectionFormComponent } from './estropadak-selection-form.component';

describe('EstropadakSelectionFormComponent', () => {
  let component: EstropadakSelectionFormComponent;
  let fixture: ComponentFixture<EstropadakSelectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadakSelectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakSelectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
