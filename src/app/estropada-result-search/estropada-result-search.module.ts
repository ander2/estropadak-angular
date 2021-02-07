import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstropadaResultSearchComponent } from './estropada-result-search.component';
import { QueryBuilderModule } from 'angular2-query-builder';
import { EstropadaResultSearchRoutingModule } from './estropada-result-search.routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [EstropadaResultSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EstropadaResultSearchRoutingModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    QueryBuilderModule
  ]
})
export class EstropadaResultSearchModule { }