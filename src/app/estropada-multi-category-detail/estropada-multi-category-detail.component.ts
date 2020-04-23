import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { EstropadaService } from '../shared/estropada.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EstropadaTandaComponent } from '../estropada-tanda/estropada-tanda.component';

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
      this.estropadaService.getCategories(estropada.liga).subscribe(res => this.kategoriak = res);
      const tandak = [];
      const sailkapena = estropada.sailkapena || [];
      const catMap = estropada.sailkapena.reduce((memo, sailk) => {
        if (!memo.find(e => e.name === sailk['kategoria'])) {
          memo.push({
            name: sailk['kategoria'],
            index: memo.length
          });
        }
        return memo;
      }, [])
      // const tanda1 = sailkapena.filter((el) => el.tanda === 1);
      sailkapena.forEach(sailk => {
        const cat = catMap.find(e => e.name === sailk['kategoria']);
        if (tandak[cat['index']]) {
          tandak[cat['index']].push(sailk);
        } else {
          tandak[cat['index']] = [sailk];
        }
      });

      this.estropada = {
        izena: estropada.izena,
        lekua: estropada.lekua,
        data: estropada.data,
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
      tandak.push(sailkapena.filter(t => t.kategoria === event.value));
    }

    this.estropada.tandak = tandak;
  }
}
