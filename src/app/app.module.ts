import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MdListModule } from '@angular/material';

// ddbb mock
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemStoreService } from '../api/in-mem-store.service';

//provider
import { HttpModule } from '@angular/http';
import { EstropadaService } from './shared/estropada.service';

import { AppComponent } from './app.component';

import { Routes, RouterModule} from '@angular/router';
import { EstropadakListComponent } from './estropadak-list/estropadak-list.component';
import { EstropadaDetailComponent } from './estropada-detail/estropada-detail.component';


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
    EstropadakListComponent,
    EstropadaDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MdListModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false}
    ),
    // InMemoryWebApiModule.forRoot(InMemStoreService, {apiBase: 'api/'})
  ],
  providers: [EstropadaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
