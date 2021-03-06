import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import './rxjs-extensions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

/* ngrx */
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { GamesModule } from './games/games.module';
import { CsbcClubDocsModule } from './club-docs/csbc-club-docs.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

// import { CsbcGamesComponent} from './csbc-games/csbc-games.component';
import { TopNavComponent } from './shared/top-nav/top-nav.component';
import { CsbcPhotosComponent } from './photos/csbc-photos.component';
import { CsbcContactsComponent } from './csbc-contacts/csbc-contacts.component';
import { AdminModule } from './admin/admin.module';
import { ComposeMessageComponent } from './compose-message.component';

import { SeasonService } from './services/season.service';
import { DivisionService } from './services/division.service';
import { TeamService } from './services/team.service';
import { GameService } from './services/game.service';
import { DataService } from './services/data.service';
import { PageNotFoundComponent } from './app.not-found.component';
import { GamesPipe } from './games.pipe';
import { CsbcNavComponent } from './csbc-nav/csbc-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CsbcDashboardComponent } from './csbc-dashboard/csbc-dashboard.component';
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import { MatTabsModule, MatSidenavModule } from '@angular/material';

import { AppEffects } from './app.effects';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { LoginDialogComponent } from './shared/login-dialog/login-dialog.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { SidenavListComponent } from './shared/sidenav-list/sidenav-list.component';

// import { ContentComponent } from './admin/content/content.component';
// import { CsbcSeasonSelectComponent } from './shared/season-select/csbc-season-select.component';
// import { DivisionSelectComponent } from './division-select/division-select.component';
// import { GamesListComponent } from './games-list/games-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SidenavListComponent,
    CsbcPhotosComponent,
    CsbcContactsComponent,
    LoginComponent,
    PageNotFoundComponent,
    ComposeMessageComponent,
    GamesPipe,
    CsbcNavComponent,
    CsbcDashboardComponent
    //    ContentComponent

    // CsbcSeasonSelectComponent
    // DivisionSelectComponent,
    // GamesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    CoreModule,
    HttpClientModule,
    HomeModule,
    // GamesModule,
    CsbcClubDocsModule,
    SharedModule,
    AdminModule,
    LoginRoutingModule,
    LayoutModule,
    UserModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatSidenavModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'CSBC Site',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
    //  ContentComponent
  ],

  providers: [
    SeasonService,
    DivisionService,
    TeamService,
    // GameService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
