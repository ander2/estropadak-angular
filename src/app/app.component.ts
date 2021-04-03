import { Component, OnInit } from '@angular/core';
import { UrteakService } from './shared/estropada.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Estropadak.net';
  activeYear = new Date().getFullYear();

  constructor(private urteakService: UrteakService) {}

  ngOnInit() {
    this.urteakService.getOne('active_year')
    .subscribe((res) => {
      this.activeYear = res;
    });
  }
}
