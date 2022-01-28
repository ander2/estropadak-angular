import { Component, OnInit, Input } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable, of} from 'rxjs';
import { EstropadaService } from 'app/shared/estropada.service';


@Component({
  selector: 'app-estropada-tanda',
  templateUrl: './estropada-tanda.component.html',
  styleUrls: ['./estropada-tanda.component.css']
})
export class EstropadaTandaComponent implements OnInit {

  @Input() tanda;
  @Input() league;
  _baseColumns = ['Postua', 'Taldea', 'Kalea', 'Denbora'];
  displayedColumns = ['Postua', 'Taldea', 'Kalea', 'Denbora'];
  dataSource;
  categories = [];
  categoryName = '';
  ziabogak = 3;
  constructor(
    private estropadaService: EstropadaService
  ) { }

  ngOnInit() {
    if (this.tanda[0].kategoria && this.league){
      this.categoryName = this.estropadaService.getCategoryFromCode(this.tanda[0].kategoria).name;
    }
    this.ziabogak = this.tanda[0]['ziabogak'].length;
    this.displayedColumns = this._baseColumns.slice();
    this.tanda[0]['ziabogak'].forEach((z, i) => {
      if (z) {
        this.displayedColumns.splice(3 + i, 0, i + '.z');
      }
    });
    const orderedTanda = this.tanda.sort((a, b) => a.tanda_postua > b.tanda_postua);
    this.dataSource = orderedTanda;
  }

}