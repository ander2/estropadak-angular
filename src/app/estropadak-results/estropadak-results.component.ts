import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SailkapenaService } from 'app/shared/estropada.service';

@Component({
  selector: 'app-estropadak-results',
  templateUrl: './estropadak-results.component.html',
  styleUrls: ['./estropadak-results.component.css']
})
export class EstropadakResultsComponent implements OnInit {

  public league: string;
  public team: string;
  public year: number;

  constructor(
    private route: ActivatedRoute,
    private sailkapenaService: SailkapenaService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.league = params.get('league');
      this.year = parseInt(params.get('year'), 10);
      this.team = params.get('team');
      this.sailkapenaService.getList(this.league, ''+this.year, this.team)
        .subscribe(res => console.log(res));
    });
  }

}
