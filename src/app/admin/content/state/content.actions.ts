/* NgRx */
import { Action } from '@ngrx/store';
import { Content } from 'app/domain/content';

export enum ContentActionTypes {
  Load = '[Content] Load',
  SetSelectedContent = '[Content] Set Selected Content',
  SetAllContent = '[Content] Show all content',
  SetActiveContent = '[Content] Show only active content',
  SetIsActiveOnly = '[Content] Set Is Active Content Only'
}

export class Load implements Action {
  readonly type = ContentActionTypes.Load;
}
export class SetAllContent implements Action {
  readonly type = ContentActionTypes.SetAllContent;
  constructor(public payload: Content[]) {}
}
export class SetActiveContent implements Action {
  readonly type = ContentActionTypes.SetActiveContent;
  constructor(public payload: Content[]) {}
}

export class SetSelectedContent implements Action {
  readonly type = ContentActionTypes.SetSelectedContent;
  constructor(public payload: Content) {}
}
export class SetIsActiveOnly implements Action {
  readonly type = ContentActionTypes.SetIsActiveOnly;
  constructor(public payload: boolean) {}
}

export type ContentActions =
  | Load
  | SetSelectedContent
  | SetAllContent
  | SetActiveContent
  | SetIsActiveOnly;
