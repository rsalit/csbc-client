import { Component, OnInit } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { MatTableDataSource, MatSort, MatPaginator, MatCard } from '@angular/material';

import { Content } from '../../domain/content';
import { ContentService } from '../../admin/content/content.service';


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

  constructor(private _webContentService: ContentService) {
    this.seasonInfoCount = 1;
    this.latestNewsCount = 0;
    this.meetingNoticeCount = 2;
    // this.getWebContent();
  }

  ngOnInit() {
    this.getWebContent();

  }

  getWebContent(): void {
    this._webContentService.getContents()
      .subscribe(webContents => this.activeWebContent = webContents,
      error => this.errorMessage = <any>error);
  }
  showNews(): boolean {
    return this.latestNewsCount > 0;
  }
  showSeasonInfo(): boolean {
    return (this.seasonInfoCount > 0);
  }

  setImageClass(): string {
    if (this.showSidebar()) {
      return 'col-sm-9';
    } else {
      return 'col-sm-12 center-block';
    }
  }
  showSidebar(): boolean {
    return (this.meetingNoticeCount > 0);
  }
  setSeasonInfoClass() {
    if (this.showNews()) {
      return 'col-sm-10 col-sm-offset-0 col-xs-12';
    } else {
      return 'col-sm-10 col-sm-offset-0 col-xs-12';
    }
  }

  setNewsClass(): string {
    if (this.showSeasonInfo() || this.latestNewsCount > 0) {
      return 'col-sm-10 col-sm-offset-0 col-xs-12';
    } else {
      return 'col-sm-10 col-sm-offset-0 col-xs-12';
    }
  }
  setSeasonListClass(): string {
    if (this.seasonInfoCount > 1) {
      return 'showMultiItemList';
    }
  }
}