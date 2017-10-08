import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatMenuModule,
    MATERIAL_COMPATIBILITY_MODE } from '@angular/material';

// ddbb mock
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemStoreService } from '../api/in-mem-store.service';

//provider
import { HttpModule } from '@angular/http';
import { EstropadaService, UrteakService } from './shared/estropada.service';

import { AppComponent } from './app.component';

import { Routes, RouterModule} from '@angular/router';
import { EstropadakListComponent } from './estropadak-list/estropadak-list.component';
import { EstropadaDetailComponent } from './estropada-detail/estropada-detail.component';
import { EstropadaTandaComponent } from './estropada-tanda/estropada-tanda.component';
import { HeaderComponent } from "./header.component";


const routes: Routes = [
  {
    path: 'estropadak',
    component: EstropadakListComponent
  },
  {
    path: 'estropada/:id',
    component: EstropadaDetailComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EstropadakListComponent,
    EstropadaDetailComponent,
    EstropadaTandaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatMenuModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false}
    ),
    // InMemoryWebApiModule.forRoot(InMemStoreService, {apiBase: 'api/'})
  ],
  providers: [
    EstropadaService, 
    UrteakService,
    { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
