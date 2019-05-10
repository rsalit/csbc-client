import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '../../../state/app.state';
import { ContentActions, ContentActionTypes } from './content.actions';

export interface ContentState {
currentContentId: number;
}

const initialState: ContentState = {
currentContentId: null
}

export function reducer(state = initialState, action: ContentActions): ContentState {
    switch (action.type) {
        default: {
            return state;
          }
    }
}
