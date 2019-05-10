import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* NgRx */
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/user.reducer';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class UserModule { }
