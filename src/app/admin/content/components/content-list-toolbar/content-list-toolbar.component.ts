import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Content } from '../../../../domain/content';
import { ContentService } from '../../content.service';

import * as fromContent from '../../state';
import * as contentActions from '../../state/content.actions';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'content-list-toolbar',
  templateUrl: './content-list-toolbar.component.html',
  styleUrls: ['./content-list-toolbar.component.css']
})
export class ContentListToolbarComponent implements OnInit {
  filterForm: FormGroup;

  constructor(
    private router: Router,
    private store: Store<fromContent.State>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.filterForm = this.fb.group({
      activeContent: true
    });
  }
  addContent() {
    const content = new Content();
    this.store.dispatch(new contentActions.SetSelectedContent(content));
    this.router.navigate([
      './admin/content/edit',
      '../../../admin.component.scss'
    ]);
  }
  filterContent() {
    console.log('getting info');
    console.log(this.filterForm.value);
    // console.log(this.fb.filterForm.control)
  }
}
