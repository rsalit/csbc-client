import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as gameActions from './games.actions';
import * as fromGames from './';
import { map, switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { GameService } from '../game.service';
import { TeamService } from 'app/services/team.service';

@Injectable()
export class GameEffects {
  index: number;
  currentSeasonId = 2190;

// @Effect()
//   divisions$ = this.actions$.pipe(
//     ofType(gameActions.GameActionTypes.LoadDivisions),
//     mergeMap(action =>
//      this.dataService
//         .getDivisions(2909)
//         .pipe(map(data => new gameActions.LoadDivisionsSuccess(data)))
//     )
//   );
  constructor(
    private actions$: Actions,
    private gameService: GameService,
    private teamService: TeamService,
    private store: Store<fromGames.State>
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect()
  loadGames$: Observable<Action> = this.actions$.pipe(
    ofType(gameActions.GameActionTypes.Load),
    mergeMap(action =>
      this.gameService.getGames().pipe(
        map(games => (new gameActions.LoadSuccess(games))),
        catchError(err => of(new gameActions.LoadFail(err)))
      )
    )
  );
  // tslint:disable-next-line:member-ordering
  @Effect()
    loadDivisions$: Observable<Action> = this.actions$.pipe(
    ofType(gameActions.GameActionTypes.LoadDivisions),
    mergeMap(action =>
      this.gameService.getDivisions(2192).pipe(
        map(divisions => (new gameActions.LoadDivisionsSuccess(divisions, this.store))),
        catchError(err => of(new gameActions.LoadDivisionsFail(err)))
      )
    )
  );
  // tslint:disable-next-line:member-ordering
  @Effect()
    loadTeams$: Observable<Action> = this.actions$.pipe(
    ofType(gameActions.GameActionTypes.LoadTeams),
    mergeMap(action =>
      this.teamService.getTeams().pipe(
        map(teams => (new gameActions.LoadTeamsSuccess(teams))),
        tap(response => 'got Teams'),
        catchError(err => of(new gameActions.LoadDivisionsFail(err)))
      )
    )
  );
  // tslint:disable-next-line:member-ordering
  @Effect()
  loadFilteredGames$: Observable<Action> = this.actions$.pipe(
    ofType(gameActions.GameActionTypes.LoadFilteredGames),
    mergeMap(action =>
      this.gameService.filterGamesByDivision().pipe(
        map(games => (new gameActions.LoadFilteredGamesSuccess(games))),
        catchError(err => of(new gameActions.LoadFilteredGamesFail(err)))
      )
    )
  );
  // tslint:disable-next-line:member-ordering
  // @Effect()
  // loadFilteredGamesByTeam$: Observable<Action> = this.actions$.pipe(
  //   ofType(gameActions.GameActionTypes.LoadFilteredGames),
  //   mergeMap(action =>
  //     this.gameService.filterGamesByTeam().pipe(
  //       // map(games => (new gameActions.LoadFilteredGamesSuccess(games))),
  //       catchError(err => of(new gameActions.LoadFilteredGamesFail(err)))
  //     )
  //   )
  // );
}
