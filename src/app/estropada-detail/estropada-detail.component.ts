import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { EstropadaService } from '../shared/estropada.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EstropadaTandaComponent } from '../estropada-tanda/estropada-tanda.component';

@Component({
  selector: 'app-estropada-detail',
  templateUrl: './estropada-detail.component.html',
  styleUrls: ['./estropada-detail.component.css']
})

export class EstropadaDetailComponent implements OnInit{

  estropada: any = {};
  id: string = '1';
  datasource;
  constructor(
    private estropadaService: EstropadaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.datasource = this.estropadaService.getOne(this.id);
    this.estropadaService.getOne(this.id)
    .subscribe((estropada) => {
      const tanda1 = estropada.sailkapena.filter((el) => el.tanda === 1);
      const tanda2 = estropada.sailkapena.filter((el) => el.tanda === 2);
      const tanda3 = estropada.sailkapena.filter((el) => el.tanda === 3);
      const tandak = [tanda1, tanda2, tanda3];
      console.log(tandak);
      this.estropada = {
        izena: estropada.izena,
        lekua: estropada.lekua,
        data: estropada.data,
        tandak: tandak
      };
      // return this.estropada = estropada;
    });
  }
}
