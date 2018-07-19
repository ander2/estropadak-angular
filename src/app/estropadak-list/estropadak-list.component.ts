import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EstropadaService } from '../shared/estropada.service';
import { EstropadakNavegationService } from '../shared/estropadak-navegation.service';

@Component({
  selector: 'app-estropadak-list',
  templateUrl: './estropadak-list.component.html',
  styleUrls: ['./estropadak-list.component.css']
})
export class EstropadakListComponent implements OnChanges {

  @Input() league;
  @Input() year;
  estropadak: any = [];
  constructor(
    protected estropadaService: EstropadaService,
    private navigationService: EstropadakNavegationService,
    private router: Router,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('Changes');
    console.log(changes);
    if (changes.league) {
      this.league = changes.league.currentValue;
    }
    if (changes.year) {
      this.year = changes.year.currentValue;
    }
    this.updateEstropadak(this.league, this.year);
  }

  updateEstropadak(league: string, year: string) {
    if (league === null || league === undefined) {
      league = 'ACT';
    }
    if (year === null || year === undefined) {
      year = '2017';
    }
    this.estropadaService.getList(league, year).subscribe((estropadak) => {
      this.estropadak = estropadak
      this.navigationService.estropadak = estropadak.map(estropada => estropada.id);
    });
  }

  onSelect(estropada) {
    this.router.navigate(['/estropada', estropada.id]);
  }
}
