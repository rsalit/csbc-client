import { Action } from '@ngrx/store';
import { Content } from 'app/domain/content';

export enum HomeActionTypes {
  LoadContent = '[Home] Load Content',
  LoadContentSuccess = '[Home] Load Content Success',
  LoadContentFail = '[Home] Load Content Fail',
}

export class LoadContent implements Action {
  readonly type = HomeActionTypes.LoadContent;
}
export class LoadContentSuccess implements Action {
  readonly type = HomeActionTypes.LoadContentSuccess;
  constructor(public payload: Content[]) {
    console.log(payload);
  }
}

export class LoadContentFail implements Action {
  readonly type = HomeActionTypes.LoadContentFail;
  constructor(public payload: string) {}
}

export type HomeActions = 
| LoadContent 
| LoadContentSuccess 
| LoadContentFail;