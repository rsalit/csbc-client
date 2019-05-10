import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentShellComponent } from './containers/content-shell/content-shell.component';
import { ContentListComponent } from './components/content-list/contentList.component';
import { ContentEditComponent } from './components/content-edit/content-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CsbcSharedModule } from 'app/shared/csbc-Shared.module';
import { CoreModule } from 'app/core/core.module';

import { StoreModule } from '@ngrx/store';
import { reducer } from './state/content.reducer';


@NgModule({
  imports: [CommonModule,
    ReactiveFormsModule,
    // BrowserModule,
    FormsModule,
    CsbcSharedModule,
    CoreModule,
ContentRoutingModule,
StoreModule.forFeature('content', reducer),
],
  declarations: [
    ContentShellComponent,
    ContentListComponent,
    ContentEditComponent
  ]
})
export class ContentModule {}
