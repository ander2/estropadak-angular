import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NvD3Module } from 'ng2-nvd3';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { EstropadakStatsPageRoutingModule } from './estropadak-stats-page-routing.module';
import { EstropadakStatsPageComponent } from './estropadak-stats-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EstropadakStatsPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NvD3Module,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    EstropadakStatsPageRoutingModule
  ]
})
export class EstropadakStatsPageModule { }
