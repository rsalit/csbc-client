import { Component, OnInit } from '@angular/core';

import { Content } from '../../../domain/content';
import { ContentService } from '../../../admin/content/content.service';
import *  as moment from 'moment';
import { Store } from '@ngrx/store';

import * as fromHome from '../../state/';
//import * as homeActions from '../../state/home.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'csbc-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class CsbcAnnouncementsComponent implements OnInit {
  seasonInfoCount: number;
  latestNewsCount: number;
  meetingNoticeCount: number;
  activeWebContent: Content[];
  errorMessage: string;
  content$ = this.store
    .select(fromHome.getContent)
    .pipe(map((result) => result.filter((c) => c.webContentTypeId < 3)));


  constructor(private _webContentService: ContentService, private store: Store<fromHome.State>
    ) {
    this.seasonInfoCount = 1;
    this.latestNewsCount = 0;
    this.meetingNoticeCount = 2;
  }

  ngOnInit() {
    // this.getWebContent();
  }

  getWebContent(): void {
    this.activeWebContent = [];
    this.store.select(fromHome.getContent).subscribe(
      webContents => {
        if (webContents !== undefined) {
          const today = moment();
          // console.log(webContents);
          for (let i = 0; i < webContents.length; i++) {
            const expirationDate = moment(webContents[i].expirationDate);
            if (expirationDate >= today) {
              // console.log(webContents[i]);
              this.activeWebContent.push(webContents[i]);
            }
          }
        }
        // this.activeWebContent = webContents;
        console.log(this.activeWebContent);
      },
      error => (this.errorMessage = <any>error)
    );
  }
  showNews(): boolean {
    return this.latestNewsCount > 0;
  }
  showSeasonInfo(): boolean {
    return this.seasonInfoCount > 0;
  }

  setImageClass(): string {
    if (this.showSidebar()) {
      return 'col-sm-9';
    } else {
      return 'col-sm-12 center-block';
    }
  }
  showSidebar(): boolean {
    return this.meetingNoticeCount > 0;
  }
  setSeasonInfoClass() {
      return 'col-8 offset-4 col-xs-12';
  }

  setNewsClass(): string {
    if (this.showSeasonInfo() || this.latestNewsCount > 0) {
      return 'col-sm-8 offset-sm-2 col-xs-12';
    } else {
      return 'col-sm-8 offset-sm-2 col-xs-12';
    }
  }
  setSeasonListClass(): string {
    if (this.seasonInfoCount > 1) {
      return 'showMultiItemList';
    }
  }
}
