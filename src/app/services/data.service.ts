import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Division } from 'app/domain/division';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  webUrl: string;

  constructor(private _http: HttpClient) {
    // this.webUrl = 'http://svc.csbchoops.net';
    this.webUrl = 'http://localhost:29784';
    // this.webUrl = 'http://csbc-webapi.azurewebsites.net';
  }

  handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.log(error);
    return Observable.throw(error || 'Server error');
  }
}
