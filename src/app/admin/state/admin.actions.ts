/* NgRx */
import { Action } from '@ngrx/store';
import { Division } from 'app/domain/division';
import { Team } from 'app/domain/team';
import { Season } from 'app/domain/season';

export enum AdminActionTypes {
  Load = '[Admin] Load',
  LoadSeasons = '[Admin] Load Seasons',
  LoadSeasonsSuccess = '[Admin] Load Seasons Success',
  LoadSeasonsFail = '[Admin] Load Seasons Fail',
  GetCurrentSeason = '[Admin] Get Current Season',
  LoadDivisions = '[Admin] Load All Season Divisions',
  LoadDivisionsSuccess = '[Admin API] Load Divisions Success',
  LoadDivisionsFail = '[Admin API] Load Divisions File',

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
export class GetCurrentSeason implements Action {
  readonly type = AdminActionTypes.GetCurrentSeason;
  constructor(public payload: Season) {}
}
export class LoadDivisions implements Action {
  readonly type = AdminActionTypes.LoadDivisions;
}
export class LoadDivisionsSuccess implements Action {
  readonly type = AdminActionTypes.LoadDivisionsSuccess;
  constructor(public payload: Division[]) {
      console.log(payload);   
  }
}

export class LoadDivisionsFail implements Action {
  readonly type = AdminActionTypes.LoadDivisionsFail;
  constructor(public payload: string) {}
}

export type AdminActions =
  | Load
  | LoadSeasons
  | LoadSeasonsSuccess
  | LoadSeasonsFail
  | GetCurrentSeason
  | LoadDivisions
  | LoadDivisionsSuccess
  | LoadDivisionsFail
;
