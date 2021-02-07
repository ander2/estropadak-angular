import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadaResultSearchComponent } from './estropada-result-search.component';

describe('EstropadaResultSearchComponent', () => {
  let component: EstropadaResultSearchComponent;
  let fixture: ComponentFixture<EstropadaResultSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstropadaResultSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadaResultSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
