import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Season } from '../domain/season';
import { Division } from '../domain/division';
import { Team } from '../domain/team';
import { Game } from '../domain/game';


@Component({
  selector: 'app-csbc-schedule',
  templateUrl: './csbc-schedule.component.html',
  styleUrls: ['./csbc-schedule.component.css']
})
export class CsbcScheduleComponent implements OnInit {
  errorMessage: string;
  public title: string;
  games: Game[];

  constructor(
    private _gameService: GameService) {
    this.title = 'Schedule!';

  }

  ngOnInit() {
    this._gameService.getGames()
      .subscribe(games => this.games = games,
      error => this.errorMessage = <any>error);

  }

}
