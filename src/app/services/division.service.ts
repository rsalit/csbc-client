import { Injectable, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Response } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import '../rxjs-extensions';

import { Division } from '../domain/division';
import { Season } from '../domain/season';
import { DataService } from './data.service';
import { SeasonService } from './season.service';

@Injectable()
export class DivisionService {
  private _divisionUrl: string;
  private season: Season;
    private _seasonId: number;
    get seasonId () {
        return this._seasonId;
  }
    set seasonId (seasonId: number) {
        this._seasonId = seasonId;
  }
    divisions: Division[];
  constructor(
    private _http: HttpClient,
    public dataService: DataService,
    public seasonService: SeasonService
  ) {

//      SeasonService.getCurrent().subscribe(season => (this.season = season));
    //  SeasonService.selectedSeason..currentSeason.subscribe(
      //  season =>

      // this.seasonId = SeasonService.selectedSeason.seasonID;
    // this._divisionUrl =
    //   this.DataService.webUrl +
    //   '/api/division/GetSeasonDivisions/' +
    //   this.season.seasonID;
  }

  getDivisions(seasonId: number): Observable<Division[]> {
    console.log(seasonId);
    if (seasonId === undefined) {
      seasonId = 2085;
    }
    this._divisionUrl =
      this.dataService.webUrl +
      '/api/division/GetSeasonDivisions/' +
      seasonId;
    return this._http
      .get<Division[]>(this._divisionUrl)
      .pipe(
        map(response => this.divisions = response),
        // tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getSeasonDivisions(season: Observable<Season>): Observable<Division[]> {
    console.log(season);
    season.subscribe(
      d =>
        (this._divisionUrl =
          this.dataService.webUrl +
          '/api/division/GetSeasonDivisions/' +
          d.seasonID)
    );
    this.seasonId = 2192;
    if (season !== null) {
      if (this.season.seasonID === undefined) {
        this.seasonId = 2192;
      } else {
          season.subscribe(s => (this.seasonId = s.seasonID));
        console.log(this.seasonId);
      }
    }
    console.log(season);
    if (this.seasonId === undefined) {
      this.seasonId = 2192;
    }
    // console.log(season.seasonID);
    // season.su
    this._divisionUrl =
      this.dataService.webUrl + '/api/division/GetSeasonDivisions/2083'; // + this.seasonId;
    return this._http
      .get(this._divisionUrl)
      .pipe(
        map((response: Response) => <Division[]>response.json()),
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }
  getDivision(id: number): Observable<Division> {
    console.log('Getting divisions');
    return this.getDivisions(this.seasonId ).pipe(
      map((content: Division[]) => content.find(p => p.divisionID === id))
    );
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
