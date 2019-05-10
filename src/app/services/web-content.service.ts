import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/throw';

import './data.service';

import { Content } from '../domain/content';

@Injectable()
export class WebContentService {
    private _webContentUrl: string;
    private _webContentApi: '/api/WebContent';
    constructor(private _http: Http, public DataService) {
     this._webContentUrl = this.DataService.webUrl + this._webContentApi;
 }

//   getWebContents(): Observable<Content[]> {
//         return this._http.get(this._webContentUrl)
//             .map((response: Response) => <Content[]> response.json())
//             .do(data => console.log('All: ' +  JSON.stringify(data)))
//             .catch(this.handleError);
//     }

    // getWebContent(id: number): Observable<Content> {
    //     return this.getWebContents()
    //         .map((webContent: Content[]) => webContent.find(p => p.webContentId === id));
    // }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
