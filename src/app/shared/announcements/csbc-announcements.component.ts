import { Component, OnInit } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatCard
} from '@angular/material';

import { Content } from '../../domain/content';
import { ContentService } from '../../admin/content/content.service';
import *  as moment from 'moment';
import { Store } from '@ngrx/store';

import * as fromContent from '../../admin/content/state';
import * as contentActions from '../../admin/content/state/content.actions';

@Component({
  selector: 'csbc-announcements',
  templateUrl: './csbc-announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class CsbcAnnouncementsComponent implements OnInit {
  seasonInfoCount: number;
  latestNewsCount: number;
  meetingNoticeCount: number;
  activeWebContent: Content[];
  errorMessage: string;

  constructor(private _webContentService: ContentService, private store: Store<fromContent.State>
    ) {
    this.seasonInfoCount = 1;
    this.latestNewsCount = 0;
    this.meetingNoticeCount = 2;
    // this.getWebContent();
  }

  ngOnInit() {
    this.getWebContent();
  }

  getWebContent(): void {
    this.activeWebContent = [];
    this.store.select(fromContent.getContentList).subscribe(
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
