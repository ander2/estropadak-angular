import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';
import { EstropadaService } from '../shared/estropada.service';

@Component({
  selector: 'app-estropada-navegation',
  templateUrl: './estropada-navegation.component.html',
  styleUrls: ['./estropada-navegation.component.css']
})
export class EstropadaNavegationComponent implements OnInit, OnChanges {

  @Input()
  estropadaId: string;
  next: string;
  prev: string;
  constructor(
    private estropadakNavigationService: EstropadakNavegationService,
    private estropadaService: EstropadaService

  ) { }

  ngOnInit() {
    this.next = this.estropadakNavigationService.next(this.estropadaId);
    this.prev = this.estropadakNavigationService.prev(this.estropadaId);
    if (this.next === undefined) {
      this.estropadaService.getOne(this.estropadaId)
      .subscribe( res => {
        const year = res.data.slice(0, 4);
        this.estropadaService.getList(res.liga, year).subscribe( r => {
          this.estropadakNavigationService.estropadak = r.map(e => e.id);
          this.calculateNavigation();
        });
      })
    }
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if ('estropadaId' in simpleChanges) {
      this.estropadaId = simpleChanges.estropadaId.currentValue;
      this.calculateNavigation();
    }
  }

  calculateNavigation() {
    this.next = this.estropadakNavigationService.next(this.estropadaId);
    this.prev = this.estropadakNavigationService.prev(this.estropadaId);
  }

}
