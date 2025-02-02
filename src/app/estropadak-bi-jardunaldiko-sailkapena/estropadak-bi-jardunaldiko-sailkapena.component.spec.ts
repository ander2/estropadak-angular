import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { EstropadakBiJardunaldikoSailkapenaComponent } from './estropadak-bi-jardunaldiko-sailkapena.component';

describe('EstropadakBiJardunaldikoSailkapenaComponent', () => {
  let component: EstropadakBiJardunaldikoSailkapenaComponent;
  let fixture: ComponentFixture<EstropadakBiJardunaldikoSailkapenaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        NoopAnimationsModule,
        MatTableModule,
        MatSortModule
      ],
      declarations: [ EstropadakBiJardunaldikoSailkapenaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstropadakBiJardunaldikoSailkapenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
