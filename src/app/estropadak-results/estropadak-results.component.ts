import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmaitzakService } from 'app/shared/estropada.service';
import { DataSource } from '@angular/cdk/table';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-estropadak-results',
  templateUrl: './estropadak-results.component.html',
  styleUrls: ['./estropadak-results.component.css']
})
export class EstropadakResultsComponent implements OnInit {

  public league: string;
  public team: string;
  public year: number;
  public results: any[] = [];
  public dataSource: any;
  displayedColumns = ['Data', 'Estropada', 'Posizioa', 'Puntuak'];

  constructor(
    private route: ActivatedRoute,
    private emaitzakService: EmaitzakService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.league = params.get('league');
      this.year = parseInt(params.get('year'), 10);
      this.team = params.get('team');
      this.emaitzakService.getList(this.league, '' + this.year, this.team)
        .subscribe(res => {
          const emaitzak = res.map(emaitza => {
            if (emaitza.sailkapena.length > 0) {
              emaitza.position = emaitza.sailkapena[0].posizioa;
              emaitza.points = emaitza.sailkapena[0].puntuazioa;
            } else {
              emaitza.position = undefined;
              emaitza.points = undefined;
            }
            return emaitza;
          });
          this.dataSource = new EstropadaDataSource(emaitzak)
      });
    });
  }

}

class EstropadaDataSource extends DataSource<any> {
  sailkapena;
  constructor(sailkapena) {
    super();
    this.sailkapena = sailkapena;
  }

  connect(): Observable<any> {
    return of(this.sailkapena);
  }

  disconnect() {}
}
