import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EstropadaService } from '../shared/estropada.service';

@Component({
  selector: 'app-estropadak-list',
  templateUrl: './estropadak-list.component.html',
  styleUrls: ['./estropadak-list.component.css']
})
export class EstropadakListComponent implements OnInit {

  estropadak: any = [];
  constructor(
    private estropadaService: EstropadaService,
    private router: Router
  ) { }

  ngOnInit(){
    this.updateEstropadak();
  }
  
  updateEstropadak(){
    this.estropadaService.getList().subscribe((estropadak) => this.estropadak = estropadak);
  }

  onSelect(estropada){
    console.log(estropada.name + 'Selected');
    this.router.navigate(['/estropada', estropada.id]);
  }
}
