import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estropadak-portada',
  templateUrl: './estropadak-portada.component.html',
  styleUrls: ['./estropadak-portada.component.css']
})
export class EstropadakPortadaComponent implements OnChanges {

  @Input() league;
  @Input() year;
  @ViewChild(MatSidenav) sidenav;
  liga = 'ACT';
  constructor(
    private router: Router
  ) { }

  ngOnChanges() { }

  sailkapenaToogle(liga: string) {
    this.liga = liga;
    if (!this.sidenav.opened) {
      this.sidenav.toggle();
    }
  }
}
