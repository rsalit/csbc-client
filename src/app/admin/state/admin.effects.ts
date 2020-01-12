import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as adminActions from './admin.actions';
// import * as fromGames from './state';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { SeasonService } from 'app/services/season.service';
// import { GameService } from '../game.service';

@Injectable()
export class AdminEffects {
    constructor(
        private actions$: Actions,
        private seasonService: SeasonService

      ) {}

// tslint:disable-next-line:member-ordering
  @Effect()
  loadSeasons$: Observable<Action> = this.actions$.pipe(
    ofType(adminActions.AdminActionTypes.LoadSeasons),
    mergeMap(action =>
        this.seasonService.seasons$.pipe(
        map(seasons => (new adminActions.LoadSeasonsSuccess(seasons))),
        catchError(err => of(new adminActions.LoadSeasonsFail(err)))
      )
    )
  );
}
