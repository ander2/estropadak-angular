import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

import { UrteakService } from 'app/shared/estropada.service';
import { parseTwoDigitYear } from 'moment';

@Component({
  selector: 'app-estropadak-portada',
  templateUrl: './estropadak-portada.component.html',
  styleUrls: ['./estropadak-portada.component.css']
})
export class EstropadakPortadaComponent implements OnInit {

  league = 'act';
  year = new Date().getFullYear();
  this_or_before_year = new Date().getFullYear();

  @ViewChild(MatSidenav) sidenav;
  constructor(
    private router: Router,
    private urteakService: UrteakService
  ) { }

  ngOnInit() {
    this.urteakService.getOne('active_year')
    .subscribe((res) => {
      const date = new Date();
      const month = date.getMonth();
      if (month < 6){
        this.this_or_before_year = res - 1;
      } else {
        this.this_or_before_year = res;
      }
      this.year = res;
    });
   }

  sailkapenaToogle(liga: string) {
    this.league = liga;
    if (!this.sidenav.opened) {
      this.sidenav.toggle();
    }
  }
}
