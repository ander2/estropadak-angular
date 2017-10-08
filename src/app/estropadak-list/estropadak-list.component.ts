import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.updateEstropadak(params.get('league'), params.get('year'));
    });
  }

  updateEstropadak(league: string, year: string) {
    this.estropadaService.getList(league.toUpperCase(), year).subscribe((estropadak) => this.estropadak = estropadak);
  }

  onSelect(estropada) {
    this.router.navigate(['/estropada', estropada.id]);
  }
}
