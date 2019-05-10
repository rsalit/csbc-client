import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Season } from 'app/domain/season';
import { Division } from 'app/domain/division';
import { Team } from 'app/domain/team';
import { Store, select } from '@ngrx/store';

import * as fromGames from '../../state';
import * as gameActions from '../../state/games.actions';

import { Game } from 'app/domain/game';

@Component({
  selector: 'csbc-schedule-shell',
  templateUrl: './schedule-shell.component.html',
  styleUrls: ['./schedule-shell.component.css']
})
export class ScheduleShellComponent implements OnInit {
  filteredGames$:  Observable<Game[]>;
  currentSeason$: Observable<Season>;
  divisions$: Observable<Division[]>;
  selectedDivisionId$: Observable<number>;
  teams$: Observable<Team[]>;
  selectedTeam$: Observable<Team>;
  errorMessage$: Observable<string>;
  selectedDivision$: Observable<any>;
  constructor( private store: Store<fromGames.State>) { }

  ngOnInit() {
    this.setStateSubscriptions();
  }

  setStateSubscriptions() {
    this.filteredGames$ = this.store.pipe(select(fromGames.getFilteredGames));
  }
  divisionSelected(division: Division): void {
    this.store.dispatch(new gameActions.SetCurrentDivision(division));
    console.log(division);
    this.store.dispatch(new gameActions.LoadFilteredGames());
  }
}
