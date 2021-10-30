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
      
      const sailkapena = estropada.sailkapena || [];
      const tanda_kop = sailkapena.reduce((memo, sailk) => {
        if (sailk.tanda > memo) { 
          return sailk.tanda; 
        } 
        return memo;
      }, 0);

      const tandak = [];
      for (let i=1; i<=tanda_kop; i++){
        tandak[i - 1] = sailkapena.filter(s => s.tanda === i);
      }

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
}
