import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EstropadaService } from '../shared/estropada.service';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-estropada-multi-category-detail',
  templateUrl: './estropada-multi-category-detail.component.html',
  styleUrls: ['./estropada-multi-category-detail.component.css']
})

export class EstropadaMultiCategoryDetailComponent implements OnInit {

  estropada: any = {};
  id = '1';
  datasource;
  kategoriak = [];
  category = 'guztiak';
  sailkapena = [];
  federazioSaria = true;

  constructor(
    private estropadaService: EstropadaService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.refresh();
    });
  }

  refresh( ) {
    this.estropadaService.getOne(this.id)
    .subscribe((estropada) => {
      if (estropada.izena.toLowerCase().indexOf('traineru') > -1) {
        this.federazioSaria = false;
      }
      if (['btl', 'gtl', 'bbl', 'gbl'].indexOf(estropada.liga.toLowerCase()) > -1) {
        this.federazioSaria = false;
      }
      this.kategoriak = this.estropadaService.getCategoriesFromEstropada(estropada);
      let tandak = [];
      const sailkapena = estropada.sailkapena || [];
      this.kategoriak.forEach(kategoria => {
        const kategoria_emaitzak = sailkapena.filter(_sailkapena => kategoria.code.toLowerCase() === _sailkapena['kategoria'].toLowerCase());
        const filtered_by_tanda_number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(tanda_zenb => kategoria_emaitzak.filter(ke => ke.tanda === tanda_zenb));
        tandak = tandak.concat(filtered_by_tanda_number);
      });

      this.sailkapena = sailkapena.filter(sailk => sailk['kategoria'].toLowerCase() === this.kategoriak[0].code.toLowerCase());
      
      tandak = tandak.filter(t => t.length > 0);

      this.estropada = {
        izena: estropada.izena,
        lekua: estropada.lekua,
        data: estropada.data,
        liga: estropada.liga,
        tandak: tandak,
        sailkapena: sailkapena,
        oharrak: estropada.oharrak
      };
    });
  }

  onChangeCategory(event) {
    const tandak = [];
    const sailkapena = this.estropada.sailkapena || [];
    if (event.value === 'guztiak') {
      sailkapena.forEach(sailk => {
        const index = sailk.tanda - 1;
        if (tandak[index]) {
          tandak[index].push(sailk);
        } else {
          tandak[index] = [sailk];
        }
      });
    } else {
      const kategoria_sailkapenak = sailkapena.filter(t => t.kategoria.toLowerCase() === event.value.toLowerCase());
      this.sailkapena = kategoria_sailkapenak;
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach( tandaInd => {
        const tanda = kategoria_sailkapenak.filter((el) => el.tanda === tandaInd);
        if (tanda.length > 0) {
          tandak.push(tanda);
        }
      });
    }

    this.estropada.tandak = tandak;
  }
}
