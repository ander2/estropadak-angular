import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule,
  MatListModule,
  MatTabsModule,
  MatTableModule,
  MatMenuModule,
  MatSidenavModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

// provider
import { HttpModule } from '@angular/http';
import { EstropadaService, UrteakService, SailkapenaService } from './shared/estropada.service';

import { AppComponent } from './app.component';

import { Routes, RouterModule} from '@angular/router';
import { EstropadakListComponent } from './estropadak-list/estropadak-list.component';
import { EstropadaDetailComponent } from './estropada-detail/estropada-detail.component';
import { EstropadaTandaComponent } from './estropada-tanda/estropada-tanda.component';
import { HeaderComponent } from './header.component';
import { EstropadakSailkapenaComponent } from './estropadak-sailkapena/estropadak-sailkapena.component';
import { EstropadakPortadaComponent } from './estropadak-portada/estropadak-portada.component';
import { EstropadakPageComponent } from './estropadak-page/estropadak-page.component';
import { EstropadaEstropadaSailkapenaComponent } from './estropada-estropada-sailkapena/estropada-estropada-sailkapena.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EstropadakHoniBuruzComponent } from './estropadak-honi-buruz/estropadak-honi-buruz.component';
import { EstropadakStatsComponent } from './estropadak-stats/estropadak-stats.component';
import { NvD3Module } from 'ng2-nvd3';
import { EstropadakYearsComponent } from './estropadak-years/estropadak-years.component';
import { EstropadaNavegationComponent } from './estropada-navegation/estropada-navegation.component';
import { EstropadakNavegationService } from './shared/estropadak-navegation.service';
import { EstropadakHurrengoakCardComponent } from './estropadak-hurrengoak-card/estropadak-hurrengoak-card.component';



const routes: Routes = [
  {
    path: '',
    component: EstropadakPortadaComponent
  },
  {
    path: 'estropadak/:league/:year',
    component: EstropadakPageComponent
  },
  {
    path: 'estropada/:id',
    component: EstropadaDetailComponent
  },
  {
    path: 'sailkapena/:league/:year',
    component: EstropadakSailkapenaComponent
  },
  {
    path: 'honi-buruz',
    component: EstropadakHoniBuruzComponent
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
    EstropadakPortadaComponent,
    EstropadakPageComponent,
    EstropadaEstropadaSailkapenaComponent,
    EstropadakHoniBuruzComponent,
    EstropadakStatsComponent,
    EstropadakYearsComponent,
    EstropadaNavegationComponent,
    EstropadakHurrengoakCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    NvD3Module,
    RouterModule.forRoot(
      routes,
      { enableTracing: false}
    ),
    // InMemoryWebApiModule.forRoot(InMemStoreService, {apiBase: 'api/'})
  ],
  providers: [
    EstropadaService,
    EstropadakNavegationService,
    SailkapenaService,
    UrteakService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
