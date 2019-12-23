import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

import { Content } from '../../../../domain/content';
import { ContentService } from '../../content.service';
import { ContentEditComponent } from '../content-edit/content-edit.component';

@Component({
  selector: 'csbc-content-list',
  templateUrl: './contentList.component.html',
  styleUrls: ['./contentList.component.scss', '../../../admin.component.scss']
})
export class ContentListComponent implements OnInit {
  contents: Observable<Content[]>;
  errorMessage: string;
  selectedContent: Content;
  pageTitle: string;
  public dialog: MatDialog;

  constructor(
    private _contentService: ContentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pageTitle = 'Web Site Messages';
    this.contents = this._contentService.getContents();
    // .subscribe(contents => this.contents = contents,
    // error => this.errorMessage = <any>error);
  }

  onSelect(content: Content): void {
    console.log(content);
    this.selectedContent = content;
  }

  addContent() {}
  editContent(item: any) {
    console.log(item);
   //  this.router.navigate(['/admin/contentEdit']);
   this._contentService.selectedContent = item;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ContentEditComponent, {
      height: '600px',
      width: '700px'
    });
  }
}
