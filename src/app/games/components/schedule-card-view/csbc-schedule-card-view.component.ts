import { Component, OnInit } from '@angular/core';
import { SeasonService } from '../../../services/season.service';
import { DivisionService } from '../../../services/division.service';
import { TeamService } from '../../../services/team.service';
import { GameService } from '../../../services/game.service';
import { Season } from '../../../domain/season';
import { Division } from '../../../domain/division';
import { Team } from '../../../domain/team';
import { Game } from '../../../domain/game';
import { ScheduleComponent } from '../schedule/schedule.component';
import { CsbcStandingsComponent } from '../standings/csbc-standings.component';

@Component({
  selector: 'app-csbc-schedule-card-view',
  templateUrl: './csbc-schedule-card-view.component.html',
  styleUrls: ['./csbc-schedule-card-view.component.scss']
})
export class CsbcScheduleCardViewComponent implements OnInit {
errorMessage: string;
  public title: string;
  divisions: Division[];
  teams: Team[];
  games: Game[];
  allTeams: boolean;

  constructor(
    private _divisionService: DivisionService,
    private _teamService: TeamService,
  private _gameService: GameService) {
    this.title = 'Games!';
    this.allTeams = true;
  }

  ngOnInit() {
    // this._divisionService.getDivisions(2090)
    //   .subscribe(divisions => this.divisions = divisions,
    //   error => this.errorMessage = <any>error);
    // this._teamService.getTeams()
    //   .subscribe(teams => this.teams = teams,
    //   error => this.errorMessage = <any>error);
    // this._gameService.getGames()
    //   .subscribe(games => this.games = games,
    //   error => this.errorMessage = <any>error);

  }
}
