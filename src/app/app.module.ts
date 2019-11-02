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
  MatCardModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatSelectModule
} from '@angular/material';

// provider
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { NvD3Module } from 'ng2-nvd3';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';

import { EstropadaService, UrteakService, SailkapenaService, EmaitzakService } from './shared/estropada.service';
import { EstropadakListComponent } from './estropadak-list/estropadak-list.component';
import { EstropadaDetailComponent } from './estropada-detail/estropada-detail.component';
import { EstropadaTandaComponent } from './estropada-tanda/estropada-tanda.component';
import { HeaderComponent } from './header.component';
import { EstropadakSailkapenaComponent } from './estropadak-sailkapena/estropadak-sailkapena.component';
import { EstropadakPortadaComponent } from './estropadak-portada/estropadak-portada.component';
import { EstropadakPageComponent } from './estropadak-page/estropadak-page.component';
import { EstropadaEstropadaSailkapenaComponent } from './estropada-estropada-sailkapena/estropada-estropada-sailkapena.component';
import { EstropadakHoniBuruzComponent } from './estropadak-honi-buruz/estropadak-honi-buruz.component';
import { EstropadakStatsComponent } from './estropadak-stats/estropadak-stats.component';
import { EstropadakYearsComponent } from './estropadak-years/estropadak-years.component';
import { EstropadaNavegationComponent } from './estropada-navegation/estropada-navegation.component';
import { EstropadakNavegationService } from './shared/estropadak-navegation.service';
import { EstropadakHurrengoakCardComponent } from './estropadak-hurrengoak-card/estropadak-hurrengoak-card.component';
import { EstropadakAzkenEmaitzakCardComponent } from './estropadak-azken-emaitzak-card/estropadak-azken-emaitzak-card.component';
import { EstropadakStatsPageComponent } from './estropadak-stats-page/estropadak-stats-page.component';
import { TaldeakService } from './shared/taldeak.service';
import { StatsService } from './shared/stats.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EstropadakResultsComponent } from './estropadak-results/estropadak-results.component';



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
  },
  {
    path: 'estatistikak',
    component: EstropadakStatsPageComponent
  },
  {
    path: 'estropadak/:league/:year/:team',
    component: EstropadakResultsComponent
  },
  { path: '**', component: PageNotFoundComponent }

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
    EstropadakAzkenEmaitzakCardComponent,
    EstropadakStatsPageComponent,
    EstropadakResultsComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    NvD3Module,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false}
    ),
    // InMemoryWebApiModule.forRoot(InMemStoreService, {apiBase: 'api/'})
  ],
  providers: [
    EstropadaService,
    EmaitzakService,
    EstropadakNavegationService,
    SailkapenaService,
    TaldeakService,
    UrteakService,
    StatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
