import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstropadaResultSearchComponent } from './estropada-result-search.component';



const routes: Routes = [
  {
    path: '',
    component: EstropadaResultSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstropadaResultSearchRoutingModule { }