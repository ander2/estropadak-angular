import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-estropadak-page',
  templateUrl: './estropadak-page.component.html',
  styleUrls: ['./estropadak-page.component.css']
})
export class EstropadakPageComponent implements OnInit{

  league;
  year;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      this.league = params.get('league');
      this.year = params.get('year');
    });
    this.router.events.subscribe((ev) => {
      console.log(ev);
      if (ev instanceof(NavigationEnd)) {
        // this.league = 'act';//params.get('league');
        // this.year = 2016;// params.get('year');
      }
    });
  }
}
