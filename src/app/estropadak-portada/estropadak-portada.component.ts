import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-estropadak-portada',
  templateUrl: './estropadak-portada.component.html',
  styleUrls: ['./estropadak-portada.component.css']
})
export class EstropadakPortadaComponent implements OnChanges {

  @Input() league;
  @Input() year;
  constructor() { }

  ngOnChanges() { }

}
