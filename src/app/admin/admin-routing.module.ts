import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './dashboard/admin-dashboard.component';
import { AdminGamesComponent } from './admin-games/admin-games.component';

// import { AuthGuard } from '../auth-guard.service';
import { AdminShellComponent } from './containers/admin-shell/admin-shell.component';
import { TeamListComponent } from './team/teamList.component';
import { AdminSeasonShellComponent } from './containers/admin-season-shell/admin-season-shell.component';
import { AdminDivisionShellComponent } from './containers/admin-division-shell/admin-division-shell.component';
import { PageNotFoundComponent } from 'app/app.not-found.component';

import { AuthGuard }                from '../auth/auth.guard';

const adminRoutes: Routes = [

  {
    path: '',
    component: AdminShellComponent,
    canActivate: [AuthGuard],

    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'seasons', component: AdminSeasonShellComponent },
      { path: 'division', component: AdminDivisionShellComponent },
      {
        path: 'content',
        loadChildren: () =>
          import('./content/content.module').then(mod => mod.ContentModule)
      },
      { path: 'teams', component: TeamListComponent },
      { path: 'games', component: AdminGamesComponent },
      { path: 'dashboard', component: AdminDashboardComponent },
      {
        path: 'director',
        loadChildren: () => import('./director/director.module').then(m => m.DirectorModule),
      },
      { path: '**', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
