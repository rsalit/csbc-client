import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { CsbcSharedModule } from '../shared/csbc-Shared.module';
import { ContentService } from '../admin/content/content.service';
import { CsbcHomeComponent } from './csbc-home.component';
import { CsbcHomeCenterComponent } from './home-center/csbc-home-center.component';
import { CsbcAnnouncementsComponent } from '../shared/announcements/csbc-announcements.component';
import { CsbcHomeSidebarComponent } from './home-sidebar/csbc-home-sidebar.component';

@NgModule({
  imports: [
    CsbcSharedModule,
    CoreModule
  ],
  declarations: [
    CsbcHomeComponent,
    CsbcHomeCenterComponent,
    CsbcAnnouncementsComponent,
    CsbcHomeSidebarComponent,

  ],
  providers: [
    ContentService
  ]
})
export class HomeModule { }
