import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { UrteakService } from './shared/estropada.service';
import { UrteakServiceStub } from './shared/estropada.service.stub';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatMenuModule,
        RouterTestingModule.withRoutes(
          [{path: '', component: AppComponent}]
        )
      ],
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      providers: [
        {provide: UrteakService, useClass: UrteakServiceStub}
      ]
    }).compileComponents();
  }));

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Estropadak.net');
  }));

});
