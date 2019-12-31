import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material';
// import { Component, OnInit, OnChanges, Renderer, ElementRef, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-estropadak-rower-historial-table',
  templateUrl: './estropadak-rower-historial-table.component.html',
  styleUrls: ['./estropadak-rower-historial-table.component.css']
})
export class EstropadakRowerHistorialTableComponent implements OnInit, OnChanges {

  @Input() public rower: any;
  @Output() public teamClicked: EventEmitter = new EventEmitter();
  displayedColumns = ['Urtea', 'Taldea'];
  public dataSource = new HistorialDataSource([]);
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.data.next(this.rower.historial);
  }

  ngOnChanges(changes) {
    this.dataSource.data.next(changes.rower.currentValue.historial.sort((a, b) => b.year - a.year));
  }

  clubYearClicked(historial) {
    this.teamClicked.emit(historial);
  }

}


class HistorialDataSource extends DataSource<any> {
  historial;
  sort;
  data: BehaviorSubject<any[]> = new BehaviorSubject([]);
  constructor(historial) {
    super();
    this.historial = historial;
    this.data.next(historial);
  }

  connect(): Observable<any> {
    return this.data;
  }

  disconnect() {}
}
