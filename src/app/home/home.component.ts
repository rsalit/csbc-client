import { Component, OnInit } from '@angular/core';

import { Content } from '../domain/content';
import { ContentService } from '../admin/content/content.service';
import { SeasonService } from '../services/season.service';

@Component({
  selector: 'csbc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements IHomeComponent, OnInit {
    coverImage: string;
    seasonInfoCount: number;
    latestNewsCount: number;
    meetingNoticeCount: number;
    topImage: string;
    errorMessage: string;
    // getWebContent: any;
    // getContentCounts: number;

    activeWebContent: any[];
    webContents: Content[];

    // seasonInfo: any[];

    static $inject = ['datacontext', 'common'];

    constructor(private _contentService: ContentService, private seasonService: SeasonService) {
        this.seasonInfoCount = 1;
        this.latestNewsCount = 0;
        this.meetingNoticeCount = 0;
        this.coverImage = 'images/sky.jpg';
        this.topImage = '../../assets/images/CSBCTopImage.jpg';

    }

    ngOnInit (): void {
        this.seasonService.getCurrent();
        this._contentService.getContents()
                .subscribe(webContents => this.webContents = webContents,
                           error => this.errorMessage = <any>error);
     }

    showSidebar(): boolean {
        return (this.meetingNoticeCount > 0);
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

    setSeasonInfoClass() {
        if (this.showNews()) {
            return 'col-sm-6 col-xs-12';
        } else {
            return 'col-sm-10 col-sm-offset-1 col-xs-12';
        }
    }

    setMeetingNoticeClass(): string {
        if (this.showSidebar()) {
            return 'col-sm-3 col-xs-12';
        }
        else {
            return 'col-sm-0 col-xs-0';
        }
    }

    setSeasonListClass(): string {
        if (this.seasonInfoCount > 1) {
            return 'showMultiItemList';
        }
    }
    setNewsClass(): string {
        if (this.showSeasonInfo() || this.latestNewsCount > 0) {
            return 'col-sm-6 col-sm-offset-0 col-xs-12';
        }
        else {
            return 'col-sm-8 col-sm-offset-2  col-xs-12';
        }
    }
    showNews(): boolean {
        return this.latestNewsCount > 0;
    }


    getContentCounts(): void {
        // var count = data.length;
        // angular.forEach(data, function (item) {
        //     var test = item;
        //     //seasonInfoCount += (item.webContentTypeId === 1) ? 1 : 0;
        //     if (item.webContentTypeId === 1) {
        //         this.seasonInfoCount += 1;
        //     }
        //     if (item.webContentTypeId === 2) {
        //         this.latestNewsCount += 1;
        //     }
        //     if (item.webContentTypeId === 3) {
        //         this.meetingNoticeCount += 1;
        //     }

        // });
    }
}


export interface IHomeComponent {
    showSidebar(): boolean;
    setImageClass(): string;
    showNews(): boolean;
    // showSeasonInfo(): boolean;
    setNewsClass(): string;
    // setMeetingNoticeClass(): string;
    // setSeasonInfoClass(): string;
    setSeasonListClass(): string;
    // coverImage: string;
    // seasonInfoCount: number;
    // latestNewsCount: number;
    // meetingNoticeCount: number;

    // getWebContent: any;
    getContentCounts(): void;

    // activeWebContent: any[];

    // seasonInfo: any[];

}
