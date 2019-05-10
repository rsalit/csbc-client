import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Game } from '../../domain/game';
import { GamesComponent } from '../games.component';
import { GameActions, GameActionTypes } from './games.actions';
import * as fromRoot from '../../state/app.state';
import { Division } from 'app/domain/division';
import { Team } from 'app/domain/team';
import { Season } from 'app/domain/season';

export interface GameState {
  currentSeason: Season;
  currentSeasonId: number;
  currentDivisionId: number | null;
  currentDivision: Division | null;
  currentTeamId: number | null;
  currentTeam: Team | null;
  games: Game[];
  filteredGames: Game[];
  showListView: boolean;
  divisions: Division[];
  teams: Team[];
  showAllteams: boolean;
}

const initialState: GameState = {
  showListView: true,
  currentSeasonId: 2192,
  currentSeason: null,
  currentDivisionId: null,
  currentDivision: null,
  currentTeamId: null,
  currentTeam: null,
  games: [],
  filteredGames: [],
  divisions: [],
  teams: [],
  showAllteams: true
};

export function reducer(state = initialState, action: GameActions): GameState {
  switch (action.type) {
    case GameActionTypes.SetCurrentSeason:
      return {
        ...state,
        currentSeason: action.payload
      };
    case GameActionTypes.ToggleGameCode:
      return {
        ...state,
        showListView: action.payload
      };
    case GameActionTypes.SetCurrentDivision:
      return {
        ...state,
        currentDivision: action.payload
      };
    case GameActionTypes.SetCurrentTeam:
      return {
        ...state,
        currentTeam: action.payload
      };
    case GameActionTypes.SetGames:
      return {
        ...state,
        games: action.payload
      };
    case GameActionTypes.SetDivisions:
      return {
        ...state,
        divisions: action.payload
      };
    case GameActionTypes.SetTeams:
      return {
        ...state,
        teams: action.payload
      };
    case GameActionTypes.SetAllTeams:
      return {
        ...state,
        showAllteams: action.payload
      };
    case GameActionTypes.LoadDivisionsSuccess:
      return {
        ...state,
        divisions: action.payload
      };
      case GameActionTypes.LoadTeamsSuccess:
        return {
          ...state,
          teams: action.payload
        };
    case GameActionTypes.LoadSuccess:
      return {
        ...state,
        games: action.payload
      };
      case GameActionTypes.LoadFilteredGamesSuccess:
      return {
        ...state,
        filteredGames: action.payload
      };
    default: {
      return state;
    }
  }
}
