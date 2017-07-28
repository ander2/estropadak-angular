import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// ddbb mock
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemStoreService } from '../api/in-mem-store.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InMemoryWebApiModule.forRoot(InMemStoreService, {apiBase: 'api/'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
