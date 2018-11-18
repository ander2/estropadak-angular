import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { EstropadaService } from '../shared/estropada.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EstropadaTandaComponent } from '../estropada-tanda/estropada-tanda.component';

@Component({
  selector: 'app-estropada-detail',
  templateUrl: './estropada-detail.component.html',
  styleUrls: ['./estropada-detail.component.css']
})

export class EstropadaDetailComponent implements OnInit {

  estropada: any = {};
  id = '1';
  datasource;
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
      const tandak = [];
      const sailkapena = estropada.sailkapena || [];
      const tanda1 = sailkapena.filter((el) => el.tanda === 1);
      if (tanda1.length > 0) {
        tandak.push(tanda1);
      }
      const tanda2 = sailkapena.filter((el) => el.tanda === 2);
      if (tanda2.length > 0) {
        tandak.push(tanda2);
      }
      const tanda3 = sailkapena.filter((el) => el.tanda === 3);
      if (tanda3.length > 0) {
        tandak.push(tanda3);
      }
      this.estropada = {
        izena: estropada.izena,
        lekua: estropada.lekua,
        data: estropada.data,
        tandak: tandak,
        sailkapena: sailkapena
      };
    });
  }
}
