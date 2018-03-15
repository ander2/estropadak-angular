import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstropadaNavegationComponent } from './estropada-navegation.component';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';

describe('EstropadaNavegationComponent', () => {
  let component: EstropadaNavegationComponent;
  let fixture: ComponentFixture<EstropadaNavegationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstropadaNavegationComponent ],
      providers: [
        EstropadakNavegationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadaNavegationComponent);
    component = fixture.componentInstance;
    const estropadakNavegationService = fixture.debugElement.injector.get(EstropadakNavegationService);
    estropadakNavegationService.estropadak = ['11', '22', '33', '44', '55'];
    component.estropadaId = '22';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a next id', () => {
    expect(component.next).toBe('33');
  });

  it('should have a prev id', () => {
    expect(component.prev).toBe('11');
  });
});
