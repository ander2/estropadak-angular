import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estropadak-honi-buruz',
  templateUrl: './estropadak-honi-buruz.component.html',
  styleUrls: ['./estropadak-honi-buruz.component.css']
})
export class EstropadakHoniBuruzComponent implements OnInit {
  year: number;

  constructor() { }

  ngOnInit() {
    this.year = 2017;
  }

}
