import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { SailkapenakService } from 'app/shared/sailkapenak.service';
import { Sailkapena } from 'app/shared/sailkapenak.model';
import { TaldeakService } from 'app/shared/taldeak.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-estropadak-team-comparation',
  templateUrl: './estropadak-team-comparation.component.html',
  styleUrls: ['./estropadak-team-comparation.component.css']
})
export class EstropadakTeamComparationComponent implements OnInit {

  displayedColumns = ['urtea'];
  dataSource;
  taldeak;
  aukeratutakoTaldeak: string[] = [];
  form;
  konparaketaEnabled = false;
  league = 'ACT';
  metrics = [
    {code: 'points', name: 'Puntuak'},
    {code: 'position', name: 'Sailkapen nagusiko postua'},
    {code: 'best', name: 'Estropada sailkapen onena'},
    {code: 'worst', name: 'Estropada sailkapen okerrena'},
  ];

  constructor(
    private saikapenakService: SailkapenakService,
    private taldeakService: TaldeakService,
    private fb: FormBuilder
  ) {
    const taldea1 = 'Urdaibai';
    const taldea2 = 'Hondarribia';
    this.taldeakService.getList(this.league)
    .subscribe(res => {
      this.taldeak = res;
    })
    this.dataSource = new EstropadaDataSource();
  }

  ngOnInit() {
    this.form = this.fb.group({
      team: [],
      metric: ['points']
    })
  }

  taldeaGehitu() {
    const taldea = this.form.get('team').value;
    this.aukeratutakoTaldeak.push(taldea);
    if (this.aukeratutakoTaldeak.length > 1) {
      this.konparaketaEnabled = true;
    }
  }

  compare() {
    this.saikapenakService.getList(this.league, undefined, this.aukeratutakoTaldeak)
    .subscribe(res => {
      this.displayedColumns = ['urtea'];
      this.displayedColumns.push(...this.aukeratutakoTaldeak);
      this.dataSource.data.next(res);
    })
  }

}


class EstropadaDataSource extends DataSource<any> {
  sailkapena;
  sort;
  data: BehaviorSubject<any[]> = new BehaviorSubject([]);
  constructor(
  ) {
    super();
  }

  connect(): Observable<any> {
    return this.data;
  }

  disconnect() {}
}
