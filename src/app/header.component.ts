import { Component, OnInit } from '@angular/core';
import { UrteakService } from './shared/estropada.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [] // ['./app.component.css']
})
export class HeaderComponent implements OnInit {

  years;

  constructor(
    private urteakService: UrteakService,
    private router: Router
  ) {}

  ngOnInit() {
    this.urteakService.getList().subscribe((res) => this.years = res);
  }

  goToEstropada(league?: string, year?: string) {
    if (league && year) {
      this.router.navigate(['estropadak', league, year]);
    } else {
      this.router.navigate(['/']);
    }
  }

  goToEstatistikak() {
    this.router.navigate(['estatistikak']);
  }

  goToPlayground() {
    this.router.navigate(['jolastokia']);
  }

  goToArraunlariak() {
    this.router.navigate(['arraunlariak']);
  }
}
