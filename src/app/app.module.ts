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
  MatInputModule,
  MatCardModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSortModule
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
import { EstropadaMultiCategoryDetailComponent } from './estropada-multi-category-detail/estropada-multi-category-detail.component';
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
import { EstropadakSelectionFormComponent } from './estropadak-selection-form/estropadak-selection-form.component';
import { EstropadakPlaygroundComponent } from './estropadak-playground/estropadak-playground.component';
import { NgCytoComponent } from './ng-cyto/ng-cyto.component';
import { EstropadakRowerGraphComponent } from './estropadak-rower-graph/estropadak-rower-graph.component';
import { EstropadakRowerHistorialTableComponent } from './estropadak-rower-historial-table/estropadak-rower-historial-table.component';

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
    path: 'estropada/batel-liga/:id',
    component: EstropadaMultiCategoryDetailComponent
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
  {
    path: 'jolastokia',
    component: EstropadakPlaygroundComponent
  },
  {
    path: 'arraunlariak',
    component: EstropadakRowerGraphComponent
  },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NgCytoComponent,
    EstropadakListComponent,
    EstropadaDetailComponent,
    EstropadaMultiCategoryDetailComponent,
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
    EstropadakSelectionFormComponent,
    EstropadakPlaygroundComponent,
    EstropadakRowerGraphComponent,
    EstropadakRowerHistorialTableComponent
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
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatSortModule,
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
