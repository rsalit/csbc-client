import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule  } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';

import { AdminRoutingModule } from './admin-routing.module';
import { SeasonDetailComponent } from './season/seasonDetail.component';
import { SeasonListComponent } from './season/seasonList.component';
import { DivisionDetailComponent } from './division/divisionDetail.component';
import { DivisionListComponent } from './division/divisionList.component';
import { TeamListComponent } from './team/teamList.component';
import { PlayerListComponent } from './player/player-list.component';
import { AdminGamesComponent } from './admin-games/admin-games.component';
import { DivisionSelectComponent } from '../division-select/division-select.component';
import { CsbcSeasonSelectComponent } from '../shared/season-select/csbc-season-select.component';
import { DivisionMasterComponent } from './division-master/division-master.component';

import { CoreModule } from '../core/core.module';
import { CsbcSharedModule } from '../shared/csbc-Shared.module';
import { AdminShellComponent } from './containers/admin-shell/admin-shell.component';
import { StoreModule } from '@ngrx/store';
import { reducer } from 'app/user/state/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects } from './state/admin.effects';
import { AdminSeasonShellComponent } from './containers/admin-season-shell/admin-season-shell.component';
import { AdminSeasonListComponent } from './components/admin-season-list/admin-season-list.component';
import { AdminDivisionListComponent } from './components/admin-division-list/admin-division-list.component';
import { AdminTeamListComponent } from './components/admin-team-list/admin-team-list.component';
import { AdminDivisionShellComponent } from './containers/admin-division-shell/admin-division-shell.component';
import { ContentModule } from './content/content.module';
import { DirectorModule } from './director/director.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // BrowserModule,
    FormsModule,
    CsbcSharedModule,
    CoreModule,
    AdminRoutingModule,
    ContentModule,
    DirectorModule,
    StoreModule.forFeature('admin', reducer),
    EffectsModule.forFeature([AdminEffects])
  ],
  declarations: [
    AdminComponent,
    AdminDashboardComponent,
    SeasonDetailComponent,
    SeasonListComponent,
    DivisionDetailComponent,
    DivisionListComponent,
    TeamListComponent,
    PlayerListComponent,
    AdminGamesComponent,
    DivisionSelectComponent,
    CsbcSeasonSelectComponent,
    DivisionMasterComponent,
    AdminShellComponent,
    AdminSeasonShellComponent,
    AdminSeasonListComponent,
    AdminDivisionListComponent,
    AdminTeamListComponent,
    AdminDivisionShellComponent
  ]
})
export class AdminModule {}
