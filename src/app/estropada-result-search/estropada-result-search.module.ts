import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstropadaResultSearchComponent } from './estropada-result-search.component';
import { QueryBuilderModule } from 'angular2-query-builder';
import { EstropadaResultSearchRoutingModule } from './estropada-result-search.routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [EstropadaResultSearchComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EstropadaResultSearchRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatToolbarModule,
    QueryBuilderModule
  ]
})
export class EstropadaResultSearchModule { }