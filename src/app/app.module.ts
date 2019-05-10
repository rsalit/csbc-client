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
import { environment } from 'environments/environment';

import { AppComponent } from './app.component';
import { HomeModule } from './home/csbc-home.module';
import { GamesModule } from './games/games.module';
import { CsbcClubDocsModule } from './club-docs/csbc-club-docs.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

// import { CsbcGamesComponent} from './csbc-games/csbc-games.component';
import { CsbcTopNavComponent } from './shared/top-nav/csbc-top-nav.component';
import { CsbcPhotosComponent } from './photos/csbc-photos.component';
import { CsbcContactsComponent } from './csbc-contacts/csbc-contacts.component';
import { CsbcSharedComponent } from './shared/csbc-shared.component';
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
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';

// import { ContentComponent } from './admin/content/content.component';
// import { CsbcSeasonSelectComponent } from './shared/season-select/csbc-season-select.component';
// import { DivisionSelectComponent } from './division-select/division-select.component';
// import { GamesListComponent } from './games-list/games-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CsbcTopNavComponent,
    CsbcPhotosComponent,
    CsbcContactsComponent,
    CsbcSharedComponent,
    LoginComponent,
    PageNotFoundComponent,
    ComposeMessageComponent,
    GamesPipe,
    CsbcNavComponent,
    CsbcDashboardComponent,
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
    AdminModule,
    LoginRoutingModule,
    LayoutModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'CSBC Site',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([])
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
