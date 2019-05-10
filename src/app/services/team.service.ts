import { Injectable } from '@angular/core';

import { map, tap } from 'rxjs/operators';
import { Response } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import '../rxjs-extensions';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Team } from '../domain/team';
import { DataService } from './data.service';

@Injectable()
export class TeamService {
    private _TeamUrl: string;
    teams: Team[];
    constructor(private _http: HttpClient, public dataService: DataService) {
        this._TeamUrl = this.dataService.webUrl + '/api/team/GetSeasonTeams/2192';
    }

    getTeams(): Observable<Team[]> {
        return this._http.get<Team[]>(this._TeamUrl)
            .pipe(
                map(response => this.teams = response),
            // tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
            );
    }

    getTeam(id: number): Observable<Team> {
        return this.getTeams()
            .pipe(
            map((content: Team[]) => content.find(p => p.id === id))
            );
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
