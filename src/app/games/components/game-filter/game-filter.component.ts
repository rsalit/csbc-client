import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormControlDirective
} from '@angular/forms';
import { Store, select } from '@ngrx/store';

import * as fromGames from '../../state';
import * as gameActions from '../../state/games.actions';
import { Division } from 'app/domain/division';
import { Team } from 'app/domain/team';
import { DivisionService } from 'app/services/division.service';
import { catchError, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { GameService } from 'app/games/game.service';

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
  divisions$ = this.divisionService.divisions$.pipe(
    tap(data => console.log(data)),
    catchError(err => {
      // this.errorMessage$ = err;
      return EMPTY;
    })
  );

  constructor(
    private fb: FormBuilder,
    private divisionService: GameService,
    private store: Store<fromGames.State>
  ) {}

  ngOnInit() {
    this.showAllTeams = true;
    this.createForm();
    this.setStateSubscriptions();
    //this.setControlSubscriptions();
    // this.criteriaForm.get('divisions').setValue(this.divisions[0]);
    // console.log(this.criteriaForm.get('divisions').value);
  }

  createForm() {
    this.criteriaForm = this.fb.group({
      divisions: this.divisions$,
      teams: null,
      allTeams: true
    });
  }
  setControlSubscriptions() {
    this.criteriaForm.get('divisions').valueChanges.subscribe(val => {
      console.log(val[0]);
      this.store.dispatch(new gameActions.SetCurrentDivision(val[0]));
      this.divisionSelected(val[0]);
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
    this.divisionService.divisions$.subscribe(divisions => {
      console.log(divisions);
      // this.divisions = divisions;
      const defaultDivision = divisions[0];
      this.criteriaForm.get('divisions').setValue(defaultDivision);
      // console.log(defaultDivision);
      this.store.dispatch(new gameActions.SetCurrentDivision(defaultDivision));
      this.divisionSelected(defaultDivision);
      // });
      // const d = this.store.pipe(select(fromGames.divisions));
      // this.store.pipe(select(fromGames.getTeams)).subscribe(teams => {
      //   console.log(teams);
      //   this.teams = teams;
      // });
    });
  }
  divisionSelected(division: Division): void {
    if (division === undefined) {
      division = this.divisions[0];
      this.store.dispatch(new gameActions.SetCurrentDivision(division));
    console.log(division);
    // console.log(this.user$);
    // if (division !== undefined) {
    //   this.canEdit = this.getCanEdit(this.user, division.divisionID);
    //   this.store.dispatch(new gameActions.SetCanEdit(this.canEdit));
    //   console.log(this.canEdit);
    }
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
