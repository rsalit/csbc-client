import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Response } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import '../rxjs-extensions';

import { Season } from '../domain/season';
import { DataService } from './data.service';

@Injectable()
export class SeasonService {
  private webUrl: string;
  private _seasonUrl: string;
  private _seasonsUrl: string;
  public currentSeason: Observable<Season>;
  // private selectedSeason = new Subject<Season>();
  selectedSeason: Season;
  public selectedSeason$: Observable<Season>;
  seasons: Season[];

  constructor(private _http: HttpClient, public dataService: DataService) {
    this._seasonUrl = this.dataService.webUrl + '/api/season/getcurrentseason';
    // .currentSeason = this.getCurrent();
    this.selectedSeason$ = this.currentSeason;
    this._seasonsUrl = this.dataService.webUrl + '/api/season/GetAll';
    // this.currentSeason.toPromise()
    //   .then((result) => this.selectedSeason = result);
  }

  setSelectedSeason(season: Observable<Season>) {
    console.log(season);
    this.selectedSeason$ = season;
  }
  getSeasons(): Observable<Season[]> {
    return this._http
      .get<Season[]>(this._seasonsUrl)
      .pipe(
        map(response => this.seasons = response),
   //     tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getSeason(id: number): Observable<Season> {
    return this.getSeasons().pipe(
      map((season: Season[]) => season.find(p => p.seasonID === id))
    );
  }

  getCurrent(): Observable<Season> {
    return this._http.get<Season>(this._seasonUrl)
      .pipe(
      map(response => this.selectedSeason = response),
      tap(data => (this.selectedSeason = data)),
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
