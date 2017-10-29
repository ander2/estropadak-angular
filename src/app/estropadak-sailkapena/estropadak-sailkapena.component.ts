import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EstropadaService } from '../shared/estropada.service';

@Component({
  selector: 'app-estropadak-sailkapena',
  templateUrl: './estropadak-sailkapena.component.html',
  styleUrls: ['./estropadak-sailkapena.component.css']
})
export class EstropadakSailkapenaComponent implements OnInit {
  league;
  year;
  sailkapena = [];

  constructor(
    private estropadaService: EstropadaService,
      private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.league = this.route.snapshot.paramMap.get('league');
    this.year = this.route.snapshot.paramMap.get('year');
    const id = `rank_${this.league}_${this.year}`;
    this.estropadaService.getOne(id)
    .subscribe((res) => {
      delete res._id;
      delete res._rev;
      Object.keys(res).forEach((key) => this.sailkapena.push({izena: key, puntuazioa: res[key]}));
      this.sailkapena.sort((a, b) => b.puntuazioa - a.puntuazioa);
    });
  }
}
