/* NgRx */
import { Action } from '@ngrx/store';
import { Division } from 'app/domain/division';
import { Team } from 'app/domain/team';
import { Season } from 'app/domain/season';

export enum AdminActionTypes {
  Load = '[Admin] Load',
  LoadSeasons = '[Admin] Load Seasons',
  LoadSeasonsSuccess = '[Admin] Load Seasons Success',
  LoadSeasonsFail = '[Admin] Load Seasons Fail'
}
export class Load implements Action {
  readonly type = AdminActionTypes.Load;
}
export class LoadSeasons implements Action {
  readonly type = AdminActionTypes.LoadSeasons;
}
export class LoadSeasonsSuccess implements Action {
  readonly type = AdminActionTypes.LoadSeasonsSuccess;
  constructor(public payload: Season[]) {
      // console.log(seasons);
  }
}

export class LoadSeasonsFail implements Action {
  readonly type = AdminActionTypes.LoadSeasonsFail;
  constructor(public payload: string) {}
}

export type AdminActions =
  | Load
  | LoadSeasons
  | LoadSeasonsSuccess
  | LoadSeasonsFail;
