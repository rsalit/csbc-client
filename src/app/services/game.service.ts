import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Response } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import '../rxjs-extensions';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DataService } from './data.service';
import { Game } from '../domain/game';

@Injectable()
export class GameService {
  private _gameUrl: string;
  private _games: Game[];
  get games () {
    return this._games;
  }
  set games (games: Game[]) {
    this._games = games;
  }
  public currentTeamId: string;
  constructor(private _http: HttpClient, public dataService: DataService) {
    this._gameUrl = this.dataService.webUrl + '/api/gameschedule';
  }
  getGames(): Observable<Game[]> {
    return this._http
      .get<Game[]>(this._gameUrl)
      .pipe(
        map(response => this.games = response),
        // tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getGame(id: number): Observable<Game> {
      return this.getGames()
          .pipe(
              map((content: Game[]) =>
                  content.find(p => p.gameId === id)
          )
        );
  }

  filterGamesByDivision(allGames: Game[], divisionId: number): Game[] {
    let games: Game[] = [];
    console.log(divisionId);

    console.log(allGames);
    if (allGames) {
      for (let i = 0; i < allGames.length; i++) {
        console.log(allGames[i].divisionID);
        if ( allGames[i].divisionID === divisionId ) {
          games.push(allGames[i]);
        }
      }
    }
    return games;
  }

  public filterGamesByTeam(allGames: Game[], teamId: number): Game[] {
    let games: Game[] = [];
    if (allGames) {
      for (let i = 0; i < allGames.length; i++) {
        if (
          allGames[i].visitingTeamId === teamId ||
          allGames[i].homeTeamId === teamId
        ) {
          games.push(allGames[i]);
        }
      }
    }
    return games;
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
