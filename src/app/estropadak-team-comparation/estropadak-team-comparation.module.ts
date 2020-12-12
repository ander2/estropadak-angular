import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NvD3Module } from 'ng2-nvd3';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { EstropadakTeamComparationRoutingModule } from './estropadak-team-comparation-routing.module';
import { EstropadakTeamComparationComponent } from './estropadak-team-comparation.component';


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
