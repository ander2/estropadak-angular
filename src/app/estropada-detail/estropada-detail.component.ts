import { Component, OnInit } from '@angular/core';
import { EstropadaService } from '../shared/estropada.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-estropada-detail',
  templateUrl: './estropada-detail.component.html',
  styleUrls: ['./estropada-detail.component.css']
})

export class EstropadaDetailComponent implements OnInit{

  estropada: any = {};
  id: string = '1';
  constructor( 
    private estropadaService: EstropadaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){
    // this.route.paramMap.subscribe((par)=>console.log(par));
    // this.route.paramMap.switchMap(
    //   (params: ParamMap) => {
    //     if (params.get('id')){
    //       return this.estropadaService.getOne(params.get('id'))
    //     } else{
    //       return this.estropadaService.getOne(this.id)
    //     }
    //   }
    // )
    this.id = this.route.snapshot.paramMap.get('id');
    this.estropadaService.getOne(this.id)
    .subscribe((estropada) => {
      console.log(estropada);
      return this.estropada = estropada;
    });
  }
}
