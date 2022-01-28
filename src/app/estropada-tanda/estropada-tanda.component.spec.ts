import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { EstropadaTandaComponent } from './estropada-tanda.component';
import { estropada, euskotrenEstropada } from '../shared/estropada.fixture';
import { EstropadaService } from 'app/shared/estropada.service';
import { EstropadaServiceStub } from 'app/shared/estropada.service.stub';

describe('EstropadaTandaComponent', () => {
  let component: EstropadaTandaComponent;
  let fixture: ComponentFixture<EstropadaTandaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatTableModule,
        FlexLayoutModule
      ],
      declarations: [ EstropadaTandaComponent ],
      providers: [
        {provide: EstropadaService, useClass: EstropadaServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadaTandaComponent);
    component = fixture.componentInstance;
    component.tanda = estropada.sailkapena.filter(estrop => estrop.tanda === 1);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show tanda number in title', () => {
    expect(fixture.debugElement.query(By.css('mat-card-title')).nativeElement.textContent).toContain('1. tanda');
  });

  it('should show one row per team', () => {
    expect(fixture.debugElement.queryAll(By.css('mat-row')).length).toEqual(4);
  });

  it('should have 7 columns per row(team) in ACT league', () => {
    expect(fixture.debugElement.queryAll(By.css('mat-row mat-cell')).length).toEqual(28);
  });

  it('should have 5 columns per row(team) in Euskotren league', () => {
    component.tanda = euskotrenEstropada.sailkapena.filter(s => s.tanda === 1);
    component.ngOnInit();
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('mat-row mat-cell')).length).toEqual(20);
  });
});
