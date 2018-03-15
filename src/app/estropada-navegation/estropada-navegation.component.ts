import { Component, OnInit, Input } from '@angular/core';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';

@Component({
  selector: 'app-estropada-navegation',
  templateUrl: './estropada-navegation.component.html',
  styleUrls: ['./estropada-navegation.component.css']
})
export class EstropadaNavegationComponent implements OnInit {

  @Input()
  estropadaId: string;
  next: string;
  prev: string;
  constructor(
    private estropadakNavigationService: EstropadakNavegationService
  ) { }

  ngOnInit() {
    this.next = this.estropadakNavigationService.next(this.estropadaId);
    this.prev = this.estropadakNavigationService.prev(this.estropadaId);
  }

}
