import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BiEgunekoSailkapena } from 'app/shared/estropadak.model';

@Component({
  selector: 'app-estropadak-bi-jardunaldiko-sailkapena',
  templateUrl: './estropadak-bi-jardunaldiko-sailkapena.component.html',
  styleUrls: ['./estropadak-bi-jardunaldiko-sailkapena.component.css']
})
export class EstropadakBiJardunaldikoSailkapenaComponent implements OnInit {

  @ViewChild(MatTable, {static: true}) table: MatTable<BiEgunekoSailkapena>;
  @Input() sailkapena: BiEgunekoSailkapena[] = [];

  displayedColumns = [
    'posizioa',
    'talde_izena', 
    'lehen_jardunaldiko_denbora',
    'bigarren_jardunaldiko_denbora',
    'denborak',
    'denbora_batura'
  ]
  constructor() { }

  ngOnInit(): void {
  }

  announceSortChange(ev: Sort) {
    this.sailkapena.sort( (a ,b) => {
      if (a[ev.active] < b[ev.active]) {
        return ev.direction == 'asc' ? -1 : 1;
      } if (b[ev.active] < a[ev.active]) {
        return ev.direction == 'asc' ? 1 : -1;
      } return 0;
    });
    this.table.renderRows();
  }

}
