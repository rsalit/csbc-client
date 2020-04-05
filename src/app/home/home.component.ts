import { Component, OnInit } from '@angular/core';

import { Content } from '../domain/content';
import { ContentService } from '../services/content.service';
import { SeasonService } from '../services/season.service';
import * as fromHome from './state';
import * as homeActions from './state/home.actions';
import { Store, select } from '@ngrx/store';
import { map, count } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'csbc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  coverImage: string;
  seasonInfoCount: number;
  latestNewsCount: number;
  meetingNoticeCount: number;
  topImage: string;
  errorMessage: string;

  activeWebContent: any[];
  webContents: Content[];
  //   currentSeason$ = this.seasonService.getCurrent();
  content$ = this.store.select(fromHome.getContent);
  showSidebar$ = of(true);
  showSidebar = false;
  // meetingNotices$: Observable<Content[]>;
  meetingNotices$: Observable<Content[]>; 
  imageClass: string;
  meetingNoticeClass = 'col-sm-0 col-xs-0';

  constructor(
    private _contentService: ContentService,
    private seasonService: SeasonService,
    private store: Store<fromHome.State>
  ) {
    // this.store.dispatch(new homeActions.LoadContent);
    this.seasonInfoCount = 1;
    this.latestNewsCount = 0;
    this.meetingNoticeCount = 0;
    this.coverImage = 'images/sky.jpg';
    this.topImage = '../../assets/images/CSBCTopImage.jpg';
  }

  ngOnInit(): void {
    this.store.dispatch(new homeActions.LoadContent());
    this.meetingNotices$ = this.content$.pipe(
        map((results) => results.filter(r => r.webContentTypeId === 3))
      );
    //     this._contentService.getContents().subscribe(result => console.log(result));
    // this.meetingNotices$.subscribe((result) => {
    //   this.showSidebar = result.length > 0;
    // });
    this.setImageClass();
  }

  showSeasonInfo(): boolean {
    return this.seasonInfoCount > 0;
  }

  setImageClass(): void {
    this.meetingNotices$.subscribe((results) => {
        this.showSidebar = results.length > 0;
      console.log(results);
      if (results.length > 0) {
        this.imageClass = 'col-sm-9';
        this.meetingNoticeClass = 'col-sm-3 col-xs-12';
      } else {
        this.imageClass = 'col-sm-12 center-block';
        this.meetingNoticeClass = 'col-sm-0 col-xs-0';
      }
    });
  }

  setSeasonInfoClass() {
    if (this.showNews()) {
      return 'col-sm-6 col-xs-12';
    } else {
      return 'col-sm-10 col-sm-offset-1 col-xs-12';
    }
  }

  //   setMeetingNoticeClass(): void {
  //     if (this.showSidebar()) {
  //       return 'col-sm-3 col-xs-12';
  //     } else {
  //       return 'col-sm-0 col-xs-0';
  //     }
  //   }

  setSeasonListClass(): string {
    if (this.seasonInfoCount > 1) {
      return 'showMultiItemList';
    }
  }
  setNewsClass(): string {
    if (this.showSeasonInfo() || this.latestNewsCount > 0) {
      return 'col-sm-6 col-sm-offset-0 col-xs-12';
    } else {
      return 'col-sm-8 col-sm-offset-2  col-xs-12';
    }
  }
  showNews(): boolean {
    return this.latestNewsCount > 0;
  }
}
