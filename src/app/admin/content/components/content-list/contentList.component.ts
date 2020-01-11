import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Store } from '@ngrx/store';

import { Content } from '../../../../domain/content';
import { ContentService } from '../../content.service';
import { ContentEditComponent } from '../content-edit/content-edit.component';

import * as fromContent from '../../state';
import * as contentActions from '../../state/content.actions';

@Component({
  selector: 'csbc-content-list',
  templateUrl: './contentList.component.html',
  styleUrls: ['./contentList.component.scss', '../../../admin.component.scss']
})
export class ContentListComponent implements OnInit {
  @Output() selectedContent = new EventEmitter<Content>();
  contents$: Observable<Content[]>;
  errorMessage: string;
  // selectedContent: Content;
  pageTitle: string;
  public dialog: MatDialog;
  displayedColumns = ['title', 'expirationDate', 'dateAndTime', 'actions'];
  dataSource: MatTableDataSource<Content>;
  constructor(
    private _contentService: ContentService,
    private router: Router,
    private store: Store<fromContent.State>
  ) {}

  ngOnInit() {
    this.pageTitle = 'Web Site Messages';
    this._contentService.getContents().subscribe(data => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
    });

    // .subscribe(contents => this.contents = contents,
    // error => this.errorMessage = <any>error);
  }

  onSelect(content: Content): void {
    console.log(content);
   //  this.selectedContent = content;
  }

  addContent() {
    const content = new Content();
    this.store.dispatch(new contentActions.SetSelectedContent(content));
    this.router.navigate(['./admin/content/edit']);
  }
  editContent(content: any) {
    console.log(content);
    this.store.dispatch(new contentActions.SetSelectedContent(content));
    this.router.navigate(['./admin/content/edit']);
    // this._contentService.selectedContent = content;
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ContentEditComponent, {
      height: '600px',
      width: '700px'
    });
  }
}
