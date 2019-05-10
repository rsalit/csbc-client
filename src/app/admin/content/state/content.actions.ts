/* NgRx */
import { Action } from '@ngrx/store';


export enum ContentActionTypes {
    Load = '[Content] Load',
}

export class Load implements Action {
    readonly type = ContentActionTypes.Load;
  }

export type ContentActions = Load;
