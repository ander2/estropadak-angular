import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule, 
  MatMenuModule} from '@angular/material';
import { UrteakService } from './shared/estropada.service';
import { UrteakServiceStub } from './shared/estropada.service.stub';

describe('AppComponent', () => {
  beforeEach(async(() => {
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

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Estropadak.net');
  }));

});
