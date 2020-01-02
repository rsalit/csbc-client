import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../state/app.state';
import { ContentActions, ContentActionTypes } from './content.actions';
import { Content } from 'app/domain/content';

export interface ContentState {
  currentContentId: number;
  selectedContent: Content;
}

const initialState: ContentState = {
  currentContentId: null,
  selectedContent: null
};

export function reducer(
  state = initialState,
  action: ContentActions
): ContentState {
  switch (action.type) {
    case ContentActionTypes.SetSelectedContent:
        return {
          ...state,
          selectedContent: action.payload
        };
    default: {
      return state;
    }
  }
}
