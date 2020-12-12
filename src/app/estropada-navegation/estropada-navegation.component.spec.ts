import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule} from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';

import { EstropadaNavegationComponent } from './estropada-navegation.component';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadaServiceStub } from '../shared/estropada.service.stub';


describe('EstropadaNavegationComponent', () => {
  let component: EstropadaNavegationComponent;
  let fixture: ComponentFixture<EstropadaNavegationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatButtonModule,
        RouterTestingModule
      ],
      declarations: [ EstropadaNavegationComponent ],
      providers: [
        EstropadakNavegationService,
        {provide: EstropadaService, useClass: EstropadaServiceStub}
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
