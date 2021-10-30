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
  displayedColumns = ['Postua', 'Taldea', 'Kalea', '1.z',
  '2.z', '3.z', 'ziab', 'Denbora'];
  dataSource;
  categories = [];
  categoryName = '';
  constructor(
    private estropadaService: EstropadaService
  ) { }

  ngOnInit() {
    if (this.tanda[0].kategoria && this.league){
      this.estropadaService.getCategories(this.league)
        .subscribe(res => {
          this.categories = res;
          this.categoryName = this.categories.find(c => c.code === this.tanda[0].kategoria)['name'];
        });
    }
    const orderedTanda = this.tanda.sort((a, b) => a.tanda_postua > b.tanda_postua);
    this.dataSource = new EstropadaDataSource(orderedTanda);
  }

}

class EstropadaDataSource extends DataSource<any> {
    tanda;
    constructor(tanda) {
    super();
    this.tanda = tanda;
    }

    connect(): Observable<any> {
        return of(this.tanda);
    }

    disconnect() {}
}
