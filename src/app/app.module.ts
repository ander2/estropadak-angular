import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatListModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
    MATERIAL_COMPATIBILITY_MODE } from '@angular/material';

// provider
import { HttpModule } from '@angular/http';
import { EstropadaService, UrteakService } from './shared/estropada.service';

import { AppComponent } from './app.component';

import { Routes, RouterModule} from '@angular/router';
import { EstropadakListComponent } from './estropadak-list/estropadak-list.component';
import { EstropadaDetailComponent } from './estropada-detail/estropada-detail.component';
import { EstropadaTandaComponent } from './estropada-tanda/estropada-tanda.component';
import { HeaderComponent } from './header.component';
import { EstropadakSailkapenaComponent } from './estropadak-sailkapena/estropadak-sailkapena.component';
import { EstropadakPortadaComponent } from './estropadak-portada/estropadak-portada.component';


const routes: Routes = [
  {
    path: '',
    component: EstropadakPortadaComponent
  },
  {
    path: 'estropadak/:league/:year',
    component: EstropadakListComponent
  },
  {
    path: 'estropada/:id',
    component: EstropadaDetailComponent
  },
  {
    path: 'sailkapena/:league/:year',
    component: EstropadakSailkapenaComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EstropadakListComponent,
    EstropadaDetailComponent,
    EstropadaTandaComponent,
    EstropadakSailkapenaComponent,
    EstropadakPortadaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MatButtonModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
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
