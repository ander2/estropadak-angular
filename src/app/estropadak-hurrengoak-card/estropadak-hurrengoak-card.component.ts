import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Estropada } from '../shared/estropadak.model';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';
import { EstropadakListComponent } from '../estropadak-list/estropadak-list.component';

@Component({
  selector: 'app-estropadak-hurrengoak-card',
  templateUrl: './estropadak-hurrengoak-card.component.html',
  styleUrls: ['./estropadak-hurrengoak-card.component.css']
})
export class EstropadakHurrengoakCardComponent extends EstropadakListComponent implements OnChanges {

  constructor(
    estropadaService: EstropadaService,
    navigationService: EstropadakNavegationService,
    router: Router,
  ) {
    super(estropadaService, navigationService, router);
  }

  ngOnChanges() {
    this.estropadaService.getList(this.league, this.year).subscribe((estropadak: Estropada[]) => {
      const date = new Date().toISOString();
      console.log(date);
      this.estropadak = estropadak
        .filter((estropada: Estropada) => estropada.data >= date)
        .filter((estropada, index) => index < 4);
    });
  }

}
