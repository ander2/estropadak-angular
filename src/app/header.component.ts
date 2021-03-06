import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UrteakService } from './shared/estropada.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [] // ['./app.component.css']
})
export class HeaderComponent implements OnInit {

  years;
  @Output()
  menuClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private urteakService: UrteakService,
    private router: Router
  ) {}

  ngOnInit() {
    this.urteakService.getList().subscribe((res) => this.years = res);
  }

  goToEstropadak(league: string) {
    const year = Math.max(...this.years[league]);
    this.router.navigate(['estropadak', league, year]);
  }

  goToPortada() {
    this.router.navigate(['/']);
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

  goTo(component: string) {
    this.router.navigate([component]);
  }

  emitClick() {
    this.menuClicked.emit();
  }
}
