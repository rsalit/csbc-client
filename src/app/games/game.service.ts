import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Division } from 'app/domain/division';
import { map, tap, catchError } from 'rxjs/operators';
import { DataService } from 'app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Game } from 'app/domain/game';
import * as fromGames from './state';
import * as gameActions from './state/games.actions';
import { Store, select } from '@ngrx/store';
import { CompileMetadataResolver } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  divisionUrl: string;
  divisions: Division[];
  gameUrl: string;
  games: Game[];
  divisionId: number;
  teamId: number
  allGames: Game[];

  constructor(private dataService: DataService, private http: HttpClient, private store: Store<fromGames.State>) {
    this.gameUrl = this.dataService.webUrl + '/api/gameschedule'
  }

  getGames(): Observable<Game[]> {
    const divId = fromGames.getCurrentDivisionId;
    return this.http
      .get<Game[]>(this.gameUrl)
      .pipe(
        map(response => this.games = response),
        // tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.dataService.handleError)
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

  filterGamesByDivision(): Observable<Game[]> {
    let games: Game[] = [];
    this.store.pipe(select(fromGames.getGames)).subscribe(g => {
      this.allGames = g;
    // console.log(this.allGames);
    });
    this.store.pipe(select(fromGames.getCurrentDivision))
    .subscribe( division => {
      if (division) {
        this.divisionId = division.divisionID;
        console.log(this.divisionId);
        if (this.allGames) {
          for (let i = 0; i < this.allGames.length; i++) {
             // console.log(this.allGames[i]);
             // console.log(this.allGames[i].divisionID);
            if ( this.allGames[i].divisionID === this.divisionId ) {
              // console.log(this.allGames[i]);
              games.push(this.allGames[i]);
            }
          }
        }
        // games.sort()
        let sortedDate = games.sort((a, b) => {
          return this.compare(a.gameDate, b.gameDate, true)
        });
        // console.log(sortedDate);
        // return of(sortedDate);
        console.log(games);
      }
    });

    return of(games);
  }

  public filterGamesByTeam(): Observable<Game[]> {
    this.store.pipe(select(fromGames.getCurrentTeamId))
    .subscribe( id => {
      this.teamId = id;
      console.log(this.teamId);
    });
    this.store.pipe(select(fromGames.getGames)).subscribe(g => {
      this.allGames = g;
    });
    let games: Game[] = [];
    if (this.allGames) {
      for (let i = 0; i < this.allGames.length; i++) {
        if (
          this.allGames[i].visitingTeamId === this.teamId ||
          this.allGames[i].homeTeamId === this.teamId
        ) {
          games.push(this.allGames[i]);
        }
      }
    }
    let sortedDate = games.sort((a, b) => {
      return this.compare(a.gameDate, b.gameDate, true)
    });
    console.log(games);
    return of(games);
  }

  // public filterGamesByTeam(allGames: Game[], teamId: number): Game[] {
  //   let games: Game[] = [];
  //   if (allGames) {
  //     for (let i = 0; i < allGames.length; i++) {
  //       if (
  //         allGames[i].visitingTeamId === teamId ||
  //         allGames[i].homeTeamId === teamId
  //       ) {
  //         games.push(allGames[i]);
  //       }
  //     }
  //   }
  //   let sortedDate = games.sort((a, b) => {
  //     return this.compare(a.gameDate, b.gameDate, true)
  //   });
  //   console.log(sortedDate);
  //   return sortedDate;
  // }
  compare(a: Date | string, b: Date | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  getDivisions(seasonId: number): Observable<Division[]> {
    console.log('SeasonId:' + seasonId);
    if (seasonId === undefined) {
      seasonId = 2085;
    }
    this.divisionUrl =
      this.dataService.webUrl +
      '/api/division/GetSeasonDivisions/' +
      seasonId;
    return this.http
      .get<Division[]>(this.divisionUrl)
      .pipe(
        map(response => this.divisions = response),
        // tap(data => console.log('All: ' + JSON.stringify(data))),
        // tap(divisions => gameActions.gameActionTypes.SetCurrentDivision = ),
        catchError(this.dataService.handleError)
      );
  }
}
