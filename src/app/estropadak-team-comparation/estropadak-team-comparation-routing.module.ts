import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstropadakTeamComparationComponent } from './estropadak-team-comparation.component';



const routes: Routes = [
  {
    path: '',
    component: EstropadakTeamComparationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstropadakTeamComparationRoutingModule { }
