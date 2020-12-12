import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

import * as moment from 'moment';

import { Estropada } from '../shared/estropadak.model';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';

@Component({
  selector: 'app-estropadak-hurrengoak-card',
  templateUrl: './estropadak-hurrengoak-card.component.html',
  styleUrls: ['./estropadak-hurrengoak-card.component.css']
})
export class EstropadakHurrengoakCardComponent implements OnChanges {

  @Input() league;
  @Input() year;
  estropadak: any = [];

  constructor(
    private estropadaService: EstropadaService,
    navigationService: EstropadakNavegationService,
    router: Router
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.league) {
      this.league = changes.league.currentValue;
    }
    if (changes.year) {
      this.year = changes.year.currentValue;
    }
    this.updateEstropadak(this.league, this.year);
  }

  updateEstropadak(league: string, year: string) {
    if (this.league && this.year) {
      this.estropadaService.getList(this.league, this.year).subscribe((estropadak: Estropada[]) => {
        const date = moment();
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
