import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { CsbcSharedModule } from '../shared/csbc-Shared.module';
// import { GamesComponent } from './games.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CsbcStandingsComponent } from './components/standings/csbc-standings.component';
import { CsbcScheduleCardViewComponent } from './components/schedule-card-view/csbc-schedule-card-view.component';
import { CsbcGameCardComponent } from './components/game-card/csbc-game-card.component';
import { CsbcGamesRoutingModule } from './games-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/games.reducer';
import { GameEffects } from './state/game.effects';
import { GameFilterComponent } from './game-filter/game-filter.component';
import { GamesShellComponent } from './containers/games-shell/games-shell.component';
import { EffectsModule } from '@ngrx/effects';
import { GameService} from './game.service';
import { GameSortPipe } from './game-sort.pipe';
import { GamesTopMenuComponent } from './components/games-top-menu/games-top-menu.component';
import { ScheduleShellComponent } from './containers/schedule-shell/schedule-shell.component';
import { ScoresComponent } from './components/scores/scores.component';


@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    CoreModule,
    CsbcSharedModule,
    CsbcGamesRoutingModule,
    StoreModule.forFeature('games', reducer),
    EffectsModule.forFeature(
      [ GameEffects ]
    ),
  ],
  exports: [CsbcGamesRoutingModule],
  declarations: [
    // GamesComponent,
    ScheduleComponent,
    CsbcStandingsComponent,
    CsbcScheduleCardViewComponent,
    CsbcGameCardComponent,
    GameFilterComponent,
    GamesShellComponent,
    GameSortPipe,
    GamesTopMenuComponent,
    ScheduleShellComponent,
    ScoresComponent,
  ],
  providers: [GameService]
})
export class GamesModule {}
