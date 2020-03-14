import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../state/app.state';
import {
  ContentActions,
  ContentActionTypes,
  SetActiveContentSuccess
} from './content.actions';
import { Content } from 'app/domain/content';
import { WebContentType } from 'app/domain/webContentType';

export interface ContentState {
  currentContentId: number;
  selectedContent: Content;
  contentList: Content[];
  isActiveOnly: boolean;
  filteredList: Content[];
contentTypeList: WebContentType[];
}

const initialState: ContentState = {
  currentContentId: null,
  selectedContent: null,
  contentList: [],
  isActiveOnly: true,
  filteredList: [],
  contentTypeList: []
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
    case ContentActionTypes.SetAllContentSuccess:
      return {
        ...state,
        filteredList: action.payload
      };
    case ContentActionTypes.SetIsActiveOnly:
      return {
        ...state,
        isActiveOnly: action.payload
      };
    case ContentActionTypes.LoadSuccess:
      return {
        ...state,
        contentList: action.payload
      };
    case ContentActionTypes.SetActiveContentSuccess:
      return {
        ...state,
        filteredList: action.payload
      };
case ContentActionTypes.LoadContentTypeListSuccess:
  return {
    ...state,
    contentTypeList: action.payload
  };

    default: {
      return state;
    }
  }
}
