/* NgRx */
import { Action } from '@ngrx/store';
import { Content } from 'app/domain/content';

export enum ContentActionTypes {
  Load = '[Content] Load',
  SetSelectedContent = '[Content] Set Selected Content'
}

export class Load implements Action {
  readonly type = ContentActionTypes.Load;
}
export class SetSelectedContent implements Action {
  readonly type = ContentActionTypes.SetSelectedContent;
  constructor(public payload: Content) {}
}
export type ContentActions = Load | SetSelectedContent;
