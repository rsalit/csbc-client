import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamesShellComponent } from './containers/games-shell/games-shell.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CsbcStandingsComponent } from './components/standings/csbc-standings.component';
import { CsbcScheduleCardViewComponent } from './components/schedule-card-view/csbc-schedule-card-view.component';
import { CsbcGameCardComponent } from './components/game-card/csbc-game-card.component';
import { ScheduleShellComponent } from './containers/schedule-shell/schedule-shell.component';
import { ScoresComponent } from './components/scores/scores.component';


const gamesRoutes: Routes = [
    {
        path: '',
        component: GamesShellComponent,
         children: [
             { path: '', component: ScheduleShellComponent },
             { path: 'schedule', component: ScheduleShellComponent },
             { path: 'list', component: ScheduleComponent },
             { path: 'standings', component: CsbcStandingsComponent },
             { path: 'card', component: CsbcScheduleCardViewComponent },
             { path: 'scores', component: ScoresComponent },
             { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
         ]
}];

@NgModule({
    imports: [
        RouterModule.forChild(gamesRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class CsbcGamesRoutingModule { }
