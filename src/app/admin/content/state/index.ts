import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import * as fromRoot from '../../../state/app.state';
import * as fromContent from './content.reducer';

export interface State extends fromRoot.State {
    games: fromContent.ContentState;
  }

  const getContentFeatureState = createFeatureSelector<fromContent.ContentState>('content');

  export const getCurrentContentId = createSelector(
    getContentFeatureState,
    state => state.currentContentId
);
