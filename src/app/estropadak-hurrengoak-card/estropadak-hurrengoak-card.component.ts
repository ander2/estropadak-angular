import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';

import { Estropada } from '../shared/estropadak.model';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';
import { EstropadakListComponent } from '../estropadak-list/estropadak-list.component';
import { MatButtonToggleChange } from '@angular/material';

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

  updateEstropadak(league: string, year: string) {
    console.log(`update estropadak ${this.league}-${this.year}`)
    if (this.league && this.year) {
      this.estropadaService.getList(this.league, this.year).subscribe((estropadak: Estropada[]) => {
        const date = moment(); // new Date().toISOString();
        console.log(date);
        this.estropadak = estropadak
          .filter((estropada: Estropada) => moment(estropada.data) >= date)
          .filter((estropada, index) => index < 4);
      });
    }
  }

   onChangeLeague(event: MatButtonToggleChange) {
    this.league = event.value;
    this.updateEstropadak(this.league, this.year);
  }

}
