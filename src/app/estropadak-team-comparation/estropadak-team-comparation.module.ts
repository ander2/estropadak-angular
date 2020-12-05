import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstropadakTeamComparationRoutingModule } from './estropadak-team-comparation-routing.module';
import { EstropadakTeamComparationComponent } from './estropadak-team-comparation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatButtonModule, MatChipsModule, MatIconModule, MatTableModule, MatToolbarModule } from '@angular/material';
import { NvD3Module } from 'ng2-nvd3';



@NgModule({
  declarations: [
    EstropadakTeamComparationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    NvD3Module,
    ReactiveFormsModule,
    EstropadakTeamComparationRoutingModule
  ]
})
export class EstropadakTeamComparationModule { }
