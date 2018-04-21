import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { EmaitzakService } from '../shared/estropada.service';
import { Estropada, TaldeSailkapena } from '../shared/estropadak.model';

@Component({
  selector: 'app-estropadak-azken-emaitzak-card',
  templateUrl: './estropadak-azken-emaitzak-card.component.html',
  styleUrls: ['./estropadak-azken-emaitzak-card.component.css']
})
export class EstropadakAzkenEmaitzakCardComponent implements OnInit, OnChanges {

  @Input() league;
  @Input() year;
  estropadak = [];
  constructor(
    private emaitzakService: EmaitzakService
  ) { }

  ngOnInit() {
    this.showEmaitzak(this.league, this.year);
  }

  ngOnChanges() {
    this.showEmaitzak(this.league, this.year);
  }
  showEmaitzak(league, year) {
    const date = new Date().toISOString();
    this.emaitzakService.getList(league, year)
      .subscribe((estropadak: Estropada[]) => {
        this.estropadak = estropadak
        .filter((estropada: Estropada) => estropada.data <= date)
        .reverse()
        .filter((estropada: Estropada, index) => index <= 2)
        .map((estropada: Estropada) => {
          estropada.sailkapena = estropada.sailkapena
            .sort((a, b) => a.posizioa - b.posizioa)
            .filter((taldea: TaldeSailkapena) => taldea.posizioa < 5);
          return estropada;
        });
      })
  }
}
