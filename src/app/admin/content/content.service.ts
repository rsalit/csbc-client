import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import { Subject } from 'rxjs/Subject';
import '../../rxjs-extensions';

import { Content } from '../../domain/content';
import { DataService } from '../../services/data.service';
import { ConditionalExpr } from '@angular/compiler';

@Injectable()
export class ContentService {
  // private baseUrl = 'http://svc.csbchoops.net/api/WebContent';
  baseUrl = this.data.webUrl;

  getUrl = this.baseUrl + '/CurrentWebContent';
  postUrl = this.baseUrl + '/api/webcontent';
  putUrl = this.baseUrl + '/api/webcontent';
  private _selectedContent: any;
  selectedContent$: Observable<any>;
  public get selectedContent(): any {
    return this._selectedContent;
  }
  public set selectedContent(value: any) {
    this._selectedContent = value;
    this.selectedContent$ = of(value);
    console.log(value);
  }

  constructor(private http: HttpClient, public data: DataService) {}

  getContents(): Observable<Content[]> {
    return this.http.get<Content[]>(this.getUrl).pipe(
      // map((response: Response) => <Content[]>),
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.data.handleError('getContents', []))
    );
  }

  getContent(webContentId: number) {
    console.log(webContentId);
    if (webContentId === 0) {
      return of(this.initializeContent());
      // return Observable.create((observer: any) => {
      //     observer.next(this.initializeProduct());
      //     observer.complete();
      // });
    }
    return this.http.get(this.getUrl).pipe(
      map(this.extractData),
      tap(data => console.log('getContent: ' + JSON.stringify(data))),
      catchError(this.data.handleError('getContent', []))
    );
  }

  // deleteContent(webContentId: number): Observable<Response> {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   // To Do: add this back
  //   let options = { params: new HttpParams() };

  //   const url = `${this.baseUrl}/${webContentId}`;
  //   return this.http
  //     .delete(url, options)
  //     .pipe(
  //       tap(data => console.log('deleteContent: ' + JSON.stringify(data))),
  //       catchError(this.data.handleError('deleteContent', []))
  //     );
  // }

  saveContent(content: Content) {
    console.log(content);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = { headers: new HttpParams() };

    if (content.webContentId === 0) {
      // return this.createContent(content, options.headers);
    }

    return this.updateContent(content, options.headers);
  }

  // private createContent(
  //   content: Content,
  //   options: HttpParams
  // ): Observable<Content> {
  //   content.webContentId = undefined;
  //   return this.http
  //     .post(this.baseUrl, content) // , options)
  //     .pipe(
  //       map(this.extractData),
  //       tap(data => console.log('createContent: ' + JSON.stringify(data))),
  //       catchError(this.data.handleError('postContent', []))
  //     );
  // }

  private updateContent(content: Content, options: HttpParams) {
    // const url = `${this.baseUrl}/${content.webContentId}`;
    console.log('Updating');
    console.log(this.putUrl);
    content.webContentTypeId = 1;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http
      .put(this.postUrl, content, httpOptions).subscribe(x => {});
      // .pipe(
      //  //  map(() => content),
      //   tap(data => console.log('updateContent: ' + JSON.stringify(data))),
      //   catchError(this.data.handleError('updateContent', []))
      // );
  }

  private extractData(response: Response) {
    let body = ''; // response.json();
    console.log(response);
    // console.log(body);
    return body || {};
  }

  initializeContent(): Content {
    // Return an initialized object
    return {
      webContentId: 0,
      title: null,
      subTitle: null,
      body: null,
      dateAndTime: null,
      location: null,
      expirationDate: new Date(),
      webContentTypeId: 0
    };
  }
}
