import { Component, OnInit } from '@angular/core';
import { EstropadaService } from '../shared/estropada.service';

@Component({
  selector: 'app-estropadak-list',
  templateUrl: './estropadak-list.component.html',
  styleUrls: ['./estropadak-list.component.css']
})
export class EstropadakListComponent {

  estropadak: any = [];
  constructor(private estropadaService: EstropadaService) { 
    this.updateEstropadak();
  }

  updateEstropadak(){
    this.estropadaService.getList().subscribe((estropadak) => this.estropadak = estropadak);
  }
}
