import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule} from '@angular/material/tabs';
import { MatTableModule} from '@angular/material/table';
import { MatMenuModule} from '@angular/material/menu';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select';
import { MatSortModule} from '@angular/material/sort';
import { MatTooltipModule} from '@angular/material/tooltip';
import {  MatChipsModule } from '@angular/material/chips';

// provider
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';

import { EstropadaService, UrteakService } from './shared/estropada.service';
import { EmaitzakService } from './shared/emaitzak.service';
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
import { EstropadakYearsComponent } from './estropadak-years/estropadak-years.component';
import { EstropadaNavegationComponent } from './estropada-navegation/estropada-navegation.component';
import { EstropadakNavegationService } from './shared/estropadak-navegation.service';
import { EstropadakHurrengoakCardComponent } from './estropadak-hurrengoak-card/estropadak-hurrengoak-card.component';
import { EstropadakAzkenEmaitzakCardComponent } from './estropadak-azken-emaitzak-card/estropadak-azken-emaitzak-card.component';
import { TaldeakService } from './shared/taldeak.service';
import { StatsService } from './shared/stats.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EstropadakResultsComponent } from './estropadak-results/estropadak-results.component';
import { EstropadakSelectionFormComponent } from './estropadak-selection-form/estropadak-selection-form.component';
import { EstropadakPlaygroundComponent } from './estropadak-playground/estropadak-playground.component';
import { NgCytoComponent } from './ng-cyto/ng-cyto.component';
import { EstropadakRowerGraphComponent } from './estropadak-rower-graph/estropadak-rower-graph.component';
import { EstropadakRowerHistorialTableComponent } from './estropadak-rower-historial-table/estropadak-rower-historial-table.component';
import { CacheMapService } from './shared/cache-map.service';
import { httpInterceptorProviders } from './http-interceptors';
import { SailkapenakService } from './shared/sailkapenak.service';

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
    path: 'estropada/:liga/:id',
    component: EstropadaMultiCategoryDetailComponent
  },
  {
    path: 'estropada/txapelketak/:id',
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
    loadChildren: () => import('./estropadak-stats-page/estropadak-stats-page.module').then( m => m.EstropadakStatsPageModule)
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
  {
    path: 'konparaketak',
    loadChildren: () => import('./estropadak-team-comparation/estropadak-team-comparation.module').then(m => m.EstropadakTeamComparationModule)
  },
  {
    path: 'bilaketak',
    loadChildren: () => import('./estropada-result-search/estropada-result-search.module').then(m => m.EstropadaResultSearchModule)
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
    EstropadakYearsComponent,
    EstropadaNavegationComponent,
    EstropadakHurrengoakCardComponent,
    EstropadakAzkenEmaitzakCardComponent,
    EstropadakResultsComponent,
    PageNotFoundComponent,
    EstropadakSelectionFormComponent,
    EstropadakPlaygroundComponent,
    EstropadakRowerGraphComponent,
    EstropadakRowerHistorialTableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatSidenavModule,
    MatSortModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false, relativeLinkResolution: 'legacy' }
    ),
    // InMemoryWebApiModule.forRoot(InMemStoreService, {apiBase: 'api/'})
  ],
  providers: [
    CacheMapService,
    httpInterceptorProviders,
    EstropadaService,
    EmaitzakService,
    EstropadakNavegationService,
    SailkapenakService,
    TaldeakService,
    UrteakService,
    StatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
