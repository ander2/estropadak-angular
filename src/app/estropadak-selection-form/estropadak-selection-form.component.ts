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
  year: string;
  @Input()
  team: string;
  @Output()
  teamChanged: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  leagues: string[];
  years: number[];
  teams: string[] = [];
  showYears = true;
  showTeams = true;
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
      team: [this.team, Validators.required]
    });
    this.yearService.getList().subscribe( years => {
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

  teamSelected() {
    const values = this.form.getRawValue();
    this.teamChanged.emit(values);
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
