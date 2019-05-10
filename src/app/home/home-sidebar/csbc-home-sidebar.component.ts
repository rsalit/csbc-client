import { Component, OnInit } from '@angular/core';
import { Content } from '../../domain/content';
import { ContentService } from '../../admin/content/content.service';

@Component({
  selector: 'csbc-home-sidebar',

  templateUrl: './csbc-home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.scss']
})
export class CsbcHomeSidebarComponent implements OnInit {
  boardMeetingMessage: string;
  activeWebContent: Content[];
    errorMessage: string;

  constructor(private _webContentService: ContentService) {
    this.boardMeetingMessage = "Board Meeting";

  }

  ngOnInit() {
    this.getWebContent();
  }

  getWebContent(): void {
     this._webContentService.getContents()
                .subscribe(webContents => this.activeWebContent = webContents,
                           error => this.errorMessage = <any>error);
  }
}
