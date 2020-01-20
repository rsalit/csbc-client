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
  SetSelectedSeason = '[Admin] Set Selected Season',
  SetSelectedSeasonId = '[Admin] Set Selected Season ID',
  LoadDivisions = '[Admin] Load All Season Divisions',
  LoadDivisionsSuccess = '[Admin API] Load Divisions Success',
  LoadDivisionsFail = '[Admin API] Load Divisions File',
  SetSelectedDivision = '[Admin] Set Selected Division',
  LoadTeams = '[Admin] Load All Season Divisions',
  LoadTeamsSuccess = '[Admin API] Load Divisions Success',
  LoadTeamsFail = '[Admin API] Load Divisions File',
  SetSelectedTeam = '[Admin] Set Selected Division'

}
export class Load implements Action {
  readonly type = AdminActionTypes.Load;
}
export class LoadSeasons implements Action {
  readonly type = AdminActionTypes.LoadSeasons;
}
export class LoadSeasonsSuccess implements Action {
  readonly type = AdminActionTypes.LoadSeasonsSuccess;
  constructor(public payload: Season[]) {}
}

export class LoadSeasonsFail implements Action {
  readonly type = AdminActionTypes.LoadSeasonsFail;
  constructor(public payload: string) {}
}
export class GetCurrentSeason implements Action {
  readonly type = AdminActionTypes.GetCurrentSeason;
  constructor(public payload: Season) {}
}
export class SetSelectedSeason implements Action {
  readonly type = AdminActionTypes.SetSelectedSeason;
  constructor (public payload: Season){
    // currentS
  }
}
export class SetSelectedSeasonId implements Action {
  readonly type = AdminActionTypes.SetSelectedSeasonId;
  constructor (public payload: number){
    // currentS
  }
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
export class SetSelectedDivision implements Action {
  readonly type = AdminActionTypes.SetSelectedDivision;
  constructor (public payload: Division){}
}
export class LoadTeams implements Action {
  readonly type = AdminActionTypes.LoadTeams;
}
export class LoadTeamsSuccess implements Action {
  readonly type = AdminActionTypes.LoadTeamsSuccess;
  constructor(public payload: Division[]) {
    console.log(payload);
  }
}

export class LoadTeamsFail implements Action {
  readonly type = AdminActionTypes.LoadTeamsFail;
  constructor(public payload: string) {}
}
export class SetSelectedTeam implements Action {
  readonly type = AdminActionTypes.SetSelectedTeam;
  constructor (public payload: Team){}
}

export type AdminActions =
  | Load
  | LoadSeasons
  | LoadSeasonsSuccess
  | LoadSeasonsFail
  | GetCurrentSeason
  | SetSelectedSeason
  | SetSelectedSeasonId
  | LoadDivisions
  | LoadDivisionsSuccess
  | LoadDivisionsFail
  | SetSelectedDivision
  | LoadTeams
  | LoadTeamsSuccess
  | LoadTeamsFail
  | SetSelectedTeam;
