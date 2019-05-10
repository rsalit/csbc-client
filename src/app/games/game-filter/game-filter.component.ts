import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormControlDirective
} from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromGames from '../state';
import * as gameActions from '../state/games.actions';
import { Division } from 'app/domain/division';
import { Team } from 'app/domain/team';

@Component({
  selector: 'csbc-game-filter',
  templateUrl: './game-filter.component.html',
  styleUrls: ['./game-filter.component.scss']
})
export class GameFilterComponent implements OnInit {
  @Input() divisions: Division[];
  @Input() currentDivision: Division;
  @Input() teams: Team[];
  @Input() currentTeam: Team;
  @Input() showAllTeams: boolean;
  @Output() selectedDivision = new EventEmitter<Division>();
  @Output() selectedTeam = new EventEmitter<Team>();
  criteriaForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<fromGames.State>) {}

  ngOnInit() {
    this.showAllTeams = true;
    this.createForm();
    this.setStateSubscriptions();
    this.setControlSubscriptions();
    // this.criteriaForm.get('divisions').setValue(this.divisions[0]);
    console.log(this.criteriaForm.get('divisions').value);
    // this.
    // console.log(this.division);
    // this.
  }

  createForm() {
    this.criteriaForm = this.fb.group({
      divisions: this.divisions,
      teams: null,
      allTeams: true
    });
  }
  setControlSubscriptions() {
    this.criteriaForm.get('divisions').valueChanges.subscribe(val => {
      console.log(val);
      this.store.dispatch(new gameActions.SetCurrentDivision(val));
    });
    this.criteriaForm.get('teams').valueChanges.subscribe(val => {
      console.log(val);
      this.store.dispatch(new gameActions.SetCurrentTeam(val));
    });
    this.criteriaForm.get('teams').valueChanges.subscribe(val => {
      console.log(val);
      this.store.dispatch(new gameActions.SetCurrentTeam(val));
    });
  }

  setStateSubscriptions() {
    this.store.pipe(select(fromGames.getDivisions)).subscribe(divisions => {
      // console.log(divisions);
      this.divisions = divisions;
      const defaultDivision = this.divisions[0];
      this.criteriaForm.get('divisions').setValue(defaultDivision);
      console.log(defaultDivision);
      this.store.dispatch(new gameActions.SetCurrentDivision(defaultDivision));
      this.divisionSelected(defaultDivision);
    });
    this.store.pipe(select(fromGames.getTeams)).subscribe(teams => {
      console.log(teams);
      this.teams = teams;
    });
  }
  divisionSelected(division: Division): void {
    console.log(division);
    this.selectedDivision.emit(division);
  }
  teamSelected(team: Team): void {
    this.selectedTeam.emit(team);
  }
  changeDivision(division: Division): void {
    console.log(division);
    this.selectedDivision.emit(division);
  }
}
