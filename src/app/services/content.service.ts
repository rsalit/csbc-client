import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Response } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import '../rxjs-extensions';

import { Content } from '../domain/content';
import { DataService } from './data.service';
import { error } from 'selenium-webdriver';

@Injectable()
export class ContentService {
    private _webContentUrl: string;
    constructor(private _http: HttpClient, public dataService: DataService) {
       this._webContentUrl =  this.dataService.webUrl + '/api/WebContent';
     }

      getContents(): Observable<Content[]> {
          return this._http.get<Content[]>(this._webContentUrl)
              .pipe(
                  // map(response => <Content[]>
                  tap(content => console.log(content)),
              // catchError(this.handleError(response => response.error))
              );
    //          .do(data => console.log('All: ' + JSON.stringify(data))
     }

     getContent(id: number): Observable<Content> {
         return this.getContents()
             .pipe(
                 map((content: Content[]) => content.find(p => p.webContentId === id))
             );
     }

    private handleError(error: Response): Observable<Error> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
