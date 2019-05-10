import { NgModule } from '@angular/core';
import { CsbcSharedModule } from '../shared/csbc-Shared.module';
import { CsbcClubDocsComponent } from './csbc-club-docs.component';

@NgModule({
  imports: [
    CsbcSharedModule
  ],
  declarations: [
    CsbcClubDocsComponent
  ]
})
export class CsbcClubDocsModule { }
