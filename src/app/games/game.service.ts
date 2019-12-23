import { Injectable } from '@angular/core';
import { Observable, of, combineLatest, throwError, pipe } from 'rxjs';
import { Division } from 'app/domain/division';
import {
  map,
  tap,
  catchError,
  shareReplay,
  switchMap,
  filter,
  groupBy
} from 'rxjs/operators';
import { DataService } from 'app/services/data.service';
import { HttpClient } from '@angular/common/http';
import { Game } from 'app/domain/game';
import * as fromGames from './state';
import * as gameActions from './state/games.actions';
import { Store, select } from '@ngrx/store';
import { CompileMetadataResolver } from '@angular/compiler';
import { Standing } from 'app/domain/standing';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';
import { User } from 'app/domain/user';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  seasonId: number = 2192; // TO DO make this is passed in!
  currentSeasonId$ = this.store.pipe(
    select(fromGames.getCurrentSeason),
    map(season => (this.seasonId = season.seasonID)),
    tap(data => console.log('Season', JSON.stringify(data)))
  );

  divisions: Division[];
  private gameUrl =
    this.dataService.webUrl +
    '/api/games/getSeasonGames/' + this.seasonId
//    this.seasonId;
  private standingsUrl = this.dataService.webUrl + '/api/gameStandings';
  // private divisionUrl = this.dataService.webUrl + '/api/divisions';
  private divisionUrl =
    this.dataService.webUrl +
    '/api/division/GetSeasonDivisions/' +
    this.seasonId;
  games: Game[];
  divisionId: number;
  teamId: number;
  allGames: Game[];
  standing: any[];
  // divisions$: Observable<Division>;
  games$ = this.http.get<Game[]>(this.gameUrl).pipe(
    tap(data => console.log('All games: ' + JSON.stringify(data))),
    shareReplay(1),
    catchError(this.dataService.handleError)
  );

  divisions$ = this.http.get<Division[]>(this.divisionUrl).pipe(
    tap(data => console.log('Divisions', JSON.stringify(data))),
    shareReplay(1),
    catchError(this.handleError)
  );
  gameDivisions$ = this.http.get<Division[]>(this.divisionUrl).pipe(
    tap(data => console.log('Divisions', JSON.stringify(data))),
    shareReplay(1),
    catchError(this.handleError)
  );

  gamesWithDivision$ = combineLatest([this.games$, this.gameDivisions$]).pipe(
    map(
      ([games, divisions]) =>
        games.map(
          game =>
            ({
              ...game
              // divisionId: divisions.find(d => divisions. === d.divisionID).div_desc,
            } as Game)
        ),
      tap(games => console.log(games))
    ),
    shareReplay(1)
  );
  vm$ = combineLatest([this.games$, this.divisions$]).pipe(
    map(([games, divisions]) => ({ games, divisions }))
  );
  currentDivision$ = this.store
    .pipe(select(fromGames.getCurrentDivision))
    .subscribe(division => {
      if (division) {
        console.log(division);
        return (this.divisionId = division.divisionID);
      }
    });
  allGames$ = this.store.pipe(
    select(fromGames.getGames),
    tap(data => console.log(data))
  );
  selectedDivision$ = this.store.pipe(
    select(fromGames.getCurrentDivision),
    map(division => (this.divisionId = division.divisionID)),
    tap(data => console.log('Division', JSON.stringify(data)))
  );
  divisionGames$ = this.games$.pipe(
    map(games => games.filter(game => game.divisionID === this.divisionId)),
    
  );
  // divisionGames$ = this.allGames$.pipe(
  //   map(games => this.getDivisionGames(games, this.divisionId))
  // );

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private store: Store<fromGames.State>
  ) {}

  private getDivisionGames(games: Game[], divisionId: number) {
    let g: Game[] = [];
    console.log(divisionId);
    console.log(games);
    for (let i = 0; i < games.length; i++) {
      console.log('looking for a match');
      console.log(games[i].divisionID);
      if (games[i].divisionID === divisionId) {
        g.push(games[i]);
        console.log('got a match');
      }
    }
    console.log(g);
    return g;
  }
  getGames(): Observable<Game[]> {
    const divId = fromGames.getCurrentDivisionId;
    return this.http.get<Game[]>(this.gameUrl).pipe(
      map(response => (this.games = response)),
      // tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.dataService.handleError)
    );
  }

  getGame(id: number): Observable<Game> {
    return this.getGames().pipe(
      map((content: Game[]) => content.find(p => p.gameId === id))
    );
  }

  filterGamesByDivision(div: number): Observable<Game[]> {
    let games: Game[] = [];
    this.store.pipe(select(fromGames.getGames)).subscribe(g => {
      this.allGames = g;
      console.log(this.allGames);
      if (this.allGames) {
        for (let i = 0; i < this.allGames.length; i++) {
          // console.log(this.allGames[i]);
          // console.log(this.allGames[i].divisionID);
          if (this.allGames[i].divisionID === div) {
            // console.log(this.allGames[i]);
            games.push(this.allGames[i]);
          }
        }
        // games.sort()
        // let sortedDate = games.sort((a, b) => {
        //   return this.compare(a.gameDate, b.gameDate, true);
        // });
        // console.log(sortedDate);
        // return of(sortedDate);
        // console.log(games);
      }
      // });
      // }
    });
    return of(games);
  }

  public filterGamesByTeam(): Observable<Game[]> {
    this.store.pipe(select(fromGames.getCurrentTeamId)).subscribe(id => {
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
      return this.compare(a.gameDate, b.gameDate, true);
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
  private sort(a, b) {
    return this.compare(a.gameDate, b.gameDate, true);
  };

  compare(a: Date | string, b: Date | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  getDivisions(seasonId: number): Observable<Division[]> {
    return this.http.get<Division[]>(this.divisionUrl).pipe(
      map(response => (this.divisions = response)),
      shareReplay(1),
      tap(data => console.log('All: ' + JSON.stringify(data))),
      // tap(divisions => gameActions.gameActionTypes.SetCurrentDivision = ),
      catchError(this.dataService.handleError)
    );
  }
  // getStandings(): Observable<Standing[]> {
  //   this.store
  //     .pipe(select(fromGames.getCurrentDivisionId))
  //     .subscribe(divisionId => {
  //       return this.getStandingsByDivision(divisionId);
  //     });
  // }
  getStandingsByDivision(divisionId: number): Observable<Standing[]> {
    return this.http.get<any[]>(this.standingsUrl + '/' + divisionId).pipe(
      map(response => (this.standing = response)),
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.dataService.handleError('getStandings', []))
    );
  }
  getCanEdit(user: User, divisionId: number): boolean {
    console.log(divisionId);
    if (user) {
      user.divisions.forEach(element => {
        if (divisionId === element.divisionID) {
          return true;
          console.log('found ' + divisionId);
        }
      });
    }
    return false;
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
