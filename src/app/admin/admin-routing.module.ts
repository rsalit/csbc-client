import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
// import { ManageCrisesComponent } from '../admin/manage-crises.component';
// import { ManageHeroesComponent } from '../admin/manage-heroes.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { SeasonListComponent } from './season/seasonList.component';
import { DivisionListComponent } from './division/divisionList.component';
import { AdminGamesComponent } from './admin-games/admin-games.component';

import { AuthGuard } from '../auth-guard.service';
import { AdminShellComponent } from './containers/admin-shell/admin-shell.component';
import { TeamListComponent } from './team/teamList.component';
import { AdminSeasonShellComponent } from './containers/admin-season-shell/admin-season-shell.component';
import { AdminDivisionShellComponent } from './containers/admin-division-shell/admin-division-shell.component';

const adminRoutes: Routes = [
  // { path: '', component: AdminDashboardComponent },

  {
    path: '',
    component: AdminShellComponent,
    canActivate: [AuthGuard],

    children: [
      { path: 'seasons', component: AdminSeasonShellComponent },
      { path: 'division', component: AdminDivisionShellComponent },
      { path: 'content', loadChildren: './content/content.module#ContentModule' },
      { path: 'teams', component: TeamListComponent },
      { path: 'games', component: AdminGamesComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      {
        path: 'director',
        loadChildren: './director/director.module#DirectorModule'
      },
      { path: '', component: AdminDashboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
