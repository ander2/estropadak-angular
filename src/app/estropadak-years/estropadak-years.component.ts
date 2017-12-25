import { Component, Input, OnInit } from '@angular/core';
import { UrteakService } from '../shared/estropada.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estropadak-years',
  templateUrl: './estropadak-years.component.html',
  styleUrls: ['./estropadak-years.component.css']
})
export class EstropadakYearsComponent implements OnInit {

  years = [];
  @Input() league: string;

  constructor(
    private urteakService: UrteakService,
    private router: Router
  ) { }

  ngOnInit() {
    this.urteakService.getList().subscribe((res) => {
      const liga = this.league.toLowerCase();
      if (res[liga]) {
        this.years = res[liga];
      }
    });
  }

  goToEstropadak(league, year) {
    this.router.navigate([`/estropadak/${league}/${year}`]);
  }

}
