import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CsbcPhotosComponent } from './photos/csbc-photos.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CsbcClubDocsComponent } from './club-docs/csbc-club-docs.component';
import { HomeComponent } from './home/home.component';
import { GamesModule } from './games/games.module';
import { AdminComponent } from './admin/admin.component';
import { PageNotFoundComponent } from './app.not-found.component';
import { AdminDashboardComponent } from './admin/dashboard/admin-dashboard.component';
import { SeasonListComponent } from './admin/season/seasonList.component';
import { DivisionMasterComponent } from './admin/division-master/division-master.component';
import { TeamListComponent } from './admin/team/teamList.component';
import { PlayerListComponent } from './admin/player/player-list.component';
import { AdminGamesComponent } from './admin/admin-games/admin-games.component';
import { CsbcDashboardComponent } from './csbc-dashboard/csbc-dashboard.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'games',
    loadChildren: './games/games.module#GamesModule',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'photos',
    component: CsbcPhotosComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'clubDocs',
    component: CsbcClubDocsComponent
  },

  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
      },
  //         children: [

  //     { path: 'seasons', component: SeasonListComponent },
  //     { path: 'division', component: DivisionMasterComponent },
  //     { path: 'team', component: TeamListComponent },
  //     { path: 'content', component: ContentListComponent },
  //     { path: 'contentEdit/:webContentId', component: ContentEditComponent },
  //     { path: 'dashboard', component: AdminDashboardComponent },
  //     { path: 'player', component: PlayerListComponent },
  //     { path: 'games', component: AdminGamesComponent }
  //   ]

  // },
  {
    path: 'dashboard',
    component: CsbcDashboardComponent,

  },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent
  // },
  // {
  //   path: 'compose',
  //   component: ComposeMessageComponent,
  //   outlet: 'popup'
  // },
  // {
  //   path: 'detail/:id',
  //   component: SeasonDetailComponent
  // }
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
