import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ContentService } from '../services/content.service';
import { HomeComponent } from './home.component';
import { HomeCenterComponent } from './home-center/home-center.component';
import { CsbcAnnouncementsComponent } from './components/announcements/announcements.component';
import { CsbcHomeSidebarComponent } from './components/home-sidebar/csbc-home-sidebar.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './state/home.effects';
import { AnnouncementComponent } from './components/announcement/announcement.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    StoreModule.forFeature('home', reducer),
    EffectsModule.forFeature([HomeEffects])
  ],
  declarations: [
    HomeComponent,
    HomeCenterComponent,
    CsbcAnnouncementsComponent,
    CsbcHomeSidebarComponent,
    AnnouncementComponent,

  ],
  providers: [
     ContentService
  ]
})
export class HomeModule { }
