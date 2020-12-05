import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstropadakStatsPageComponent } from './estropadak-stats-page.component';



const routes: Routes = [
  {
    path: '',
    component: EstropadakStatsPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstropadakStatsPageRoutingModule { }
