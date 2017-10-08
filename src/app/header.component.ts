import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { UrteakService } from "./shared/estropada.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []//['./app.component.css']
})
export class HeaderComponent implements OnInit{

    years;

    constructor(
        private urteakService: UrteakService
    ) {}

    ngOnInit(){
    this.urteakService.getList().subscribe((res) => this.years = res);
    }
}
