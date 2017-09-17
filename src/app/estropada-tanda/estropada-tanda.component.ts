import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-estropada-tanda',
  templateUrl: './estropada-tanda.component.html',
  styleUrls: ['./estropada-tanda.component.css']
})
export class EstropadaTandaComponent implements OnInit {

  @Input()
  tanda;
  constructor() { }

  ngOnInit() {
    console.log(this.tanda.tanda);
  }

}
