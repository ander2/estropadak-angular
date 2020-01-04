import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrteakService } from 'app/shared/estropada.service';
import { TaldeakService } from 'app/shared/taldeak.service';

@Component({
  selector: 'app-estropadak-selection-form',
  templateUrl: './estropadak-selection-form.component.html',
  styleUrls: ['./estropadak-selection-form.component.css']
})
export class EstropadakSelectionFormComponent implements OnInit {

  @Input()
  league: string;
  @Input()
  year: number;
  @Input()
  team: string;
  @Input()
  showYears = true;
  @Input()
  showTeams = true;
  @Input()
  historial = false;
  @Output()
  selectionChanged: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  leagues: string[];
  years: number[];
  teams: string[] = [];
  allYears: {[key: string]: number[]};
  constructor(
    private fb: FormBuilder,
    private yearService: UrteakService,
    private taldeakService: TaldeakService,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      league: [this.league.toLowerCase(), Validators.required],
      year: [this.year, Validators.required],
      team: [this.team]
    });
    if (this.showTeams) {
      this.form.get('team').setValidators(Validators.required);
      this.form.get('team').updateValueAndValidity();
    }
    this.yearService.getList(this.historial).subscribe( years => {
      this.allYears = years;
      this.leagues = Object.keys(years).sort();
      this.updateYears();
    });
    this.taldeakService.getList(this.league, this.year)
      .subscribe(teams => {
        this.teams = teams.map(t => t.name).sort();
      });
  }

  updateYears() {
    let league = this.form.get('league').value;
    if (league) {
      league = league.toLowerCase();
    }
    const year = this.form.get('year').value;
    this.years = this.allYears[league].sort((a, b) => b - a);
    this.yearChange();
  }

  updateYearsAndRefresh() {
    this.updateYears();
    this.form.get('year').setValue(this.years[0]);
  }

  selectedData() {
    const values = this.form.getRawValue();
    this.selectionChanged.emit(values);
  }

  teamChange() {

  }

  yearChange() {
    const year = this.form.get('year').value;
    const league = this.form.get('league').value;

    this.taldeakService.getList(league, year).subscribe(res => {
      this.teams = res.map(t => t.name).sort();
    });
  }

}
