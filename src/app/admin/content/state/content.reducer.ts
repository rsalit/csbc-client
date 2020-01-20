import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../state/app.state';
import { ContentActions, ContentActionTypes } from './content.actions';
import { Content } from 'app/domain/content';

export interface ContentState {
  currentContentId: number;
  selectedContent: Content;
  contentList: Content[];
  isActiveOnly: boolean;
}

const initialState: ContentState = {
  currentContentId: null,
  selectedContent: null,
  contentList: [],
  isActiveOnly: true
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
    case ContentActionTypes.SetAllContent:
      return {
        ...state,
        contentList: action.payload
      };
    case ContentActionTypes.SetActiveContent:
      return {
        ...state,
        contentList: action.payload
      };
case ContentActionTypes.SetIsActiveOnly:
  return {
    ...state,
    isActiveOnly: action.payload
  };
    default: {
      return state;
    }
  }
}
