import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGamesListComponent } from './components/admin-games-list/admin-games-list.component';
import { AdminGamesShellComponent } from './containers/admin-games-shell/admin-games-shell.component';
import { AdminGamesRoutingModule } from './admin-games-routing.module';



@NgModule({
  declarations: [AdminGamesListComponent, AdminGamesShellComponent],
  imports: [
    CommonModule,
    AdminGamesRoutingModule,

  ]
})
export class AdminGamesModule { }
