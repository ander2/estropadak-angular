import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { MatSort } from '@angular/material/sort';

export class RowerHistorial {
  year: number;
  name: string;
}


@Component({
  selector: 'app-estropadak-rower-historial-table',
  templateUrl: './estropadak-rower-historial-table.component.html',
  styleUrls: ['./estropadak-rower-historial-table.component.css']
})
export class EstropadakRowerHistorialTableComponent implements OnInit, OnChanges {

  @Input() public rower: any;
  @Output() public teamClicked: EventEmitter<RowerHistorial> = new EventEmitter();
  displayedColumns = ['Urtea', 'Taldea'];
  public dataSource = new HistorialDataSource([]);
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.data.next(this.rower.historial);
    this.sort.sortChange
      .subscribe(ev => {
        if (ev.direction === 'asc') {
          this.dataSource.historial = this.rower.historial.sort((a, b) => a.year - b.year);
        } else {
          this.dataSource.historial = this.rower.historial.sort((a, b) => b.year - a.year);
        }
      });
  }

  ngOnChanges(changes) {
    this.dataSource.historial = changes.rower.currentValue.historial.sort((a, b) => b.year - a.year);
  }

  clubYearClicked(historial: RowerHistorial) {
    this.teamClicked.emit(historial);
  }
}


class HistorialDataSource extends DataSource<any> {
  _historial: RowerHistorial[];
  set historial(historial: RowerHistorial[]) {
    this._historial = historial;
    this.data.next(this._historial);
  }
  sort;
  data: BehaviorSubject<RowerHistorial[]> = new BehaviorSubject([]);
  constructor(historial: RowerHistorial[]) {
    super();
    this.historial = historial;
  }

  connect(): Observable<any> {
    return this.data;
  }

  disconnect() {}
}
