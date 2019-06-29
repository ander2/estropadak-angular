import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { UrteakService } from 'app/shared/estropada.service';

@Component({
  selector: 'app-estropadak-portada',
  templateUrl: './estropadak-portada.component.html',
  styleUrls: ['./estropadak-portada.component.css']
})
export class EstropadakPortadaComponent implements OnInit {

  league = 'ACT';
  year = 2019;
  @ViewChild(MatSidenav) sidenav;
  constructor(
    private router: Router,
    private urteakService: UrteakService
  ) { }

  ngOnInit() {
    this.urteakService.getOne('active_year')
    .subscribe((res) => this.year = res);
   }

  sailkapenaToogle(liga: string) {
    this.league = liga;
    if (!this.sidenav.opened) {
      this.sidenav.toggle();
    }
  }
}
