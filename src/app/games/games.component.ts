import { Component, OnInit } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { SeasonService } from '../services/season.service';
import { DivisionService } from '../services/division.service';
import { TeamService } from '../services/team.service';
import { GameService } from '../services/game.service';
import { Season } from '../domain/season';
import { Division } from '../domain/division';
import { Team } from '../domain/team';
import { Game } from '../domain/game';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { CsbcStandingsComponent } from './components/standings/csbc-standings.component';

import { Store, select } from '@ngrx/store';

import * as fromGames from './state';
import * as gameActions from './state/games.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'csbc-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  // season: ISeason;
  errorMessage: string;
  public title: string;
  private _currentSeason: Season;
  get currentSeason() {
    return this._currentSeason;
  }
  set currentSeason(currentSeason: Season) {
    this._currentSeason = currentSeason;
    this._divisionService.seasonId = this._currentSeason.seasonID;
  }
  divisions: Division[];
  teams: Team[];
  games: Game[];
  allGames: Game[];
  allTeams: boolean;
  currentUrl: string;
  public teamList: Team[];

  constructor(
    private seasonService: SeasonService,
    private _divisionService: DivisionService,
    private _teamService: TeamService,
    private _gameService: GameService,
    private store: Store<fromGames.State>
  ) {
    this.title = 'Games!';
    this.allTeams = true;
    this.teamList = [];
  }

  ngOnInit() {

    console.log(this.games);
  }
  public onSelectTeam(teamId) {
    this.games = this._gameService.filterGamesByTeam(this.games, teamId);
    console.log(this.games);
  }
}
