import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Division } from 'app/domain/division';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  webUrl: string;

  constructor(private _http: HttpClient) {
    // this.webUrl = 'http://svc.csbchoops.net';
    // this.webUrl = 'http://localhost:29784';
    // this.webUrl = 'http://csbc-webapi.azurewebsites.net';
    this.webUrl = 'https://apicsbc.azurewebsites.net';
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  log(arg0: string) {
    throw new Error('Method not implemented.');
  }
}
