import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadakTeamComparationComponent } from './estropadak-team-comparation.component';

describe('EstropadakTeamComparationComponent', () => {
  let component: EstropadakTeamComparationComponent;
  let fixture: ComponentFixture<EstropadakTeamComparationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadakTeamComparationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakTeamComparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
