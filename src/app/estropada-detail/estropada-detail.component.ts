import { Component, OnInit } from '@angular/core';
import { EstropadaService } from '../shared/estropada.service';

@Component({
  selector: 'app-estropada-detail',
  templateUrl: './estropada-detail.component.html',
  styleUrls: ['./estropada-detail.component.css']
})
export class EstropadaDetailComponent{

  estropada: any = {};
  id: string = '1';
  constructor( private estropadaService: EstropadaService) { 
    this.id = '1';
    this.estropadaService.getOne(this.id).subscribe((estropada)=>{
      console.log(estropada);
      this.estropada = estropada
    }
    );
  }
}
