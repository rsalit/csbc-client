import { Component, OnInit } from '@angular/core';
import { Content } from '../../domain/content';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-csbc-home-sidebar',
  //template: `<h1>TEts</h1>`,
  templateUrl: './csbc-home-sidebar.component.html',
  styleUrls: ['./csbc-home-sidebar.component.css']
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
