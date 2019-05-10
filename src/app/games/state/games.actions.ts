import { Game } from '../../domain/game';
import * as fromGames from './index';

/* NgRx */
import { Action, Store } from '@ngrx/store';
import { Division } from 'app/domain/division';
import { Team } from 'app/domain/team';
import { Season } from 'app/domain/season';

export enum GameActionTypes {
  ToggleGameCode = '[Game] Toggle Game Code',
  SetCurrentSeason = '[Games] Set Current Season',
  SetCurrentDivision = '[Game] Set Current Division',
  SetCurrentTeam = '[Game] Set Current Team',
  ClearCurrentGame = '[Game] Clear Current Game',
  SetGames = '[Games] Set Games',
  SetDivisions = '[Games] Set Divisions',
  SetTeams = '[Games] Set Teams',
  SetAllTeams = '[Games] Set AllTeams',
  InitializeCurrentGame = '[Game] Initialize Current Game',
  Load = '[Game] Load',
  LoadSuccess = '[Game] Load Success',
  LoadFail = '[Game] Load Fail',
  LoadFilteredGames = '[Game] Load  Filtered Games',
  LoadFilteredGamesSuccess = '[Game] Load Filtered Game Success',
  LoadFilteredGamesFail = '[Game] Load Filtered Games Fail',
  LoadDivisions = '[Game] Load Divisions',
  LoadDivisionsSuccess = '[Game] Load Divisions Success',
  LoadDivisionsFail = '[Game] Load Divisions Fail',
  LoadTeams = '[Game] Load Teams',
  LoadTeamsSuccess = '[Game] Load Teams Success',
  LoadTeamsFail = '[Game] Load Teams Fail'
}

// Action Creators
export class ToggleActionList implements Action {
  readonly type = GameActionTypes.ToggleGameCode;
  constructor(public payload: boolean) {}
}
export class SetCurrentSeason implements Action {
  readonly type = GameActionTypes.SetCurrentSeason;
  constructor(public payload: Season) {}
}
export class SetCurrentDivision implements Action {
  readonly type = GameActionTypes.SetCurrentDivision;
  constructor(public payload: Division) {
    
  }
}
export class SetCurrentTeam implements Action {
  readonly type = GameActionTypes.SetCurrentTeam;
  constructor(public payload: Team) {}
}

export class ClearCurrentGame implements Action {
  readonly type = GameActionTypes.ClearCurrentGame;
}

export class InitializeCurrentGame implements Action {
  readonly type = GameActionTypes.InitializeCurrentGame;
}

export class SetGames implements Action {
  readonly type = GameActionTypes.SetGames;
  constructor(public payload: Game[]) {}
}
export class SetDivisions implements Action {
  readonly type = GameActionTypes.SetDivisions;
  constructor(public payload: Division[]) {}
}

export class SetTeams implements Action {
  readonly type = GameActionTypes.SetTeams;
  constructor(public payload: Team[]) {}
}
export class SetAllTeams implements Action {
  readonly type = GameActionTypes.SetAllTeams;
  constructor(public payload: boolean) {}
}

export class Load implements Action {
  readonly type = GameActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = GameActionTypes.LoadSuccess;
  constructor(public payload: Game[]) {}
}

export class LoadFail implements Action {
  readonly type = GameActionTypes.LoadFail;

  constructor(public payload: string) {}
}
export class LoadFilteredGames implements Action {
  readonly type = GameActionTypes.LoadFilteredGames;
}

export class LoadFilteredGamesSuccess implements Action {
  readonly type = GameActionTypes.LoadFilteredGamesSuccess;
  constructor(public payload: Game[]) {}
}

export class LoadFilteredGamesFail implements Action {
  readonly type = GameActionTypes.LoadFilteredGamesFail;

  constructor(public payload: string) {}
}
export class LoadDivisions implements Action {
  readonly type = GameActionTypes.LoadDivisions;
}
export class LoadDivisionsSuccess implements Action {
  readonly type = GameActionTypes.LoadDivisionsSuccess;

  constructor(public payload: Division[], private store: Store<fromGames.State>) {
    // this.store.dispatch(
    //   new SetCurrentDivision(payload[0])
    // );
  }
}
export class LoadDivisionsFail implements Action {
  readonly type = GameActionTypes.LoadDivisionsFail;

  constructor(public payload: string) {}
}
export class LoadTeams implements Action {
  readonly type = GameActionTypes.LoadTeams;
}
export class LoadTeamsSuccess implements Action {
  readonly type = GameActionTypes.LoadTeamsSuccess;

  constructor(public payload: Team[]) {
    console.log(payload);
    console.log('LoadTeamSuccess');
    
  }
}
export class LoadTeamsFail implements Action {
  readonly type = GameActionTypes.LoadTeamsFail;

  constructor(public payload: string) {}
}

export type GameActions =
  | ToggleActionList
  | SetCurrentSeason
  | SetCurrentDivision
  | SetCurrentTeam
  | ClearCurrentGame
  | InitializeCurrentGame
  | SetGames
  | SetDivisions
  | SetTeams
  | SetAllTeams
  | Load
  | LoadSuccess
  | LoadFail
  | LoadFilteredGames
  | LoadFilteredGamesSuccess
  | LoadFilteredGamesFail
  | LoadDivisions
  | LoadDivisionsSuccess
  | LoadDivisionsFail
  | LoadTeams
  | LoadTeamsSuccess
  | LoadTeamsFail;

