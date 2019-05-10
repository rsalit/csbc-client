import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AdminActions, AdminActionTypes } from './admin.actions';
import * as fromRoot from '../../state/app.state';
import { Season } from 'app/domain/season';

export interface AdminState {
  currentSeasonId: number | null;
  currentDivisionId: number | null;
  currentTeamId: number | null;
  seasons: Season[];
}

const initialState: AdminState = {
  currentSeasonId: null,
  currentDivisionId: null,
  currentTeamId: null,
  seasons: []
};

export function reducer(
  state = initialState,
  action: AdminActions
): AdminState {
  switch (action.type) {
    case AdminActionTypes.LoadSeasonsSuccess:
      return {
        ...state,
        seasons: action.payload
      };
    default: {
      return state;
    }
  }
}
