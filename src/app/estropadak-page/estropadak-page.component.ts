import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-estropadak-page',
  templateUrl: './estropadak-page.component.html',
  styleUrls: ['./estropadak-page.component.css']
})
export class EstropadakPageComponent implements OnInit {

  league;
  year;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.league = params.get('league').toUpperCase();
      this.year = parseInt(params.get('year'), 10);
    });
  }

  resizeIfStats(ev: MatTabChangeEvent) {
    if (ev.index === 2) {
      setTimeout(() => {
        console.log('imeout');
        window.dispatchEvent(new Event('resize'));
      }, 300);
    }
  }
}
