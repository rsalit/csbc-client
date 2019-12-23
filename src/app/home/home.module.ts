import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ContentService } from '../admin/content/content.service';
import { HomeComponent } from './home.component';
import { HomeCenterComponent } from './home-center/home-center.component';
import { CsbcAnnouncementsComponent } from '../shared/announcements/csbc-announcements.component';
import { CsbcHomeSidebarComponent } from './home-sidebar/csbc-home-sidebar.component';

@NgModule({
  imports: [
    SharedModule,
    CoreModule
  ],
  declarations: [
    HomeComponent,
    HomeCenterComponent,
    CsbcAnnouncementsComponent,
    CsbcHomeSidebarComponent,

  ],
  providers: [
    ContentService
  ]
})
export class HomeModule { }
