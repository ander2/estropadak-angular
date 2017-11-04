import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-estropadak-page',
  templateUrl: './estropadak-page.component.html',
  styleUrls: ['./estropadak-page.component.css']
})
export class EstropadakPageComponent implements OnInit{

  league;
  year;
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.league = params.get('league');
      this.year = params.get('year');
    });
  }
}
