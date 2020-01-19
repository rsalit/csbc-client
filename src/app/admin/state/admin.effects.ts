import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as adminActions from './admin.actions';
// import * as fromGames from './state';
import {
  map,
  switchMap,
  mergeMap,
  catchError,
  concatMap,
  withLatestFrom
} from 'rxjs/operators';
import { Store, Action, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SeasonService } from 'app/services/season.service';
import { DivisionService } from 'app/services/division.service';
// import { GameService } from '../game.service';
import * as fromAdmin from './';

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private seasonService: SeasonService,
    private divisionService: DivisionService,
    private store: Store<fromAdmin.State>
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect()
  loadSeasons$: Observable<Action> = this.actions$.pipe(
    ofType(adminActions.AdminActionTypes.LoadSeasons),
    mergeMap(action =>
      this.seasonService.seasons$.pipe(
        map(seasons => new adminActions.LoadSeasonsSuccess(seasons)),
        catchError(err => of(new adminActions.LoadSeasonsFail(err)))
      )
    )
  );

  @Effect()
  loadDivisions$ = this.actions$.pipe(
    ofType(adminActions.AdminActionTypes.LoadDivisions),
    withLatestFrom(this.store.select(fromAdmin.getCurrentSeasonId)),
    map(([action, seasonId]) => {
      this.divisionService.getDivisions(seasonId).pipe(
        map(divisions => new adminActions.LoadDivisionsSuccess(divisions)),
        catchError(err => of(new adminActions.LoadDivisionsFail(err)))
      );
    })
  );
}
