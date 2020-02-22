import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  ElementRef,
  Inject
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  FormControlName
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { map, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Content } from '../../../../domain/content';
import { ContentService } from '../../content.service';
import { pipe } from 'rxjs';
import { Store, select } from '@ngrx/store';

import * as fromContent from '../../state';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'csbc-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.scss']
})
export class ContentEditComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  @Inject(MAT_DIALOG_DATA)
  // formInputElements: ElementRef[];

  // @Input()
  content: Content;
  contentForm: FormGroup;
  private sub: Subscription;
  errorMessage: string;
  pageTitle: string;
  hideId: boolean;
  private baseUrl = 'api/contents';
  selectedRecord$ = this.contentService.selectedContent$;
  selectedContent: Content;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromContent.State>,
    // private http: Http,
    private contentService: ContentService
  ) {}

  ngOnInit(): void {
    this.contentForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)]
      ],
      subTitle: '',
      body: '',
      location: '',
      dateAndTime: '',
      webContentId: '',
      webContentTypeId: 1,
      contentSequence: 1,
      expirationDate: new Date()
    });
    this.pageTitle = 'Edit Web Content Messages';
    this.hideId = true;
    this.getContent();
  }

  update(): void {
    this.contentForm.patchValue({
      title: this.content.title,
      subTitle: this.content.subTitle,
      body: this.content.body,
      dateAndTime: this.content.dateAndTime,
      location: this.content.location,
      expirationDate: this.content.expirationDate,
      webContentId: this.content.webContentId
    });
  }
  getContent(): void {
    this.store
      .pipe(select(fromContent.getSelectedContent))
      .subscribe(content => {
        this.selectedContent = content;
        this.onContentRetrieved(content);
      });
    // this.contentService
    //   .getContent(id)
    //   .subscribe(
    //     (content: Content) => this.onContentRetrieved(content),
    //     (error: any) => (this.errorMessage = <any>error)
    //   );
  }
  onContentRetrieved(content: Content): void {
    console.log(content);
    if (this.contentForm) {
      this.contentForm.reset();
    }
    // this.content = content;
    //console.log(this.content);
    if (content.webContentId === 0) {
      this.pageTitle = 'Add Content';
    } else {
      this.pageTitle = `Edit Content: ${content.title}`;
    }

    // // Update the data on the form
    this.contentForm.patchValue({
      title: content.title,
      subTitle: content.subTitle,
      body: content.body,
      dateAndTime: content.dateAndTime,
      location: content.location,
      expirationDate: content.expirationDate,
      webContentId: content.webContentId,
      webContentTypeId:
        content.webContentTypeId === null ? 1 : content.webContentTypeId
    });
  }
  saveContent() {
    console.log(this.contentForm.value);
    if (this.contentForm.dirty) {
      this.contentService.saveContent(this.contentForm.value);
      this.router.navigate(['/admin/content']);
    }
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.contentForm.controls[controlName].hasError(errorName);
  };
}
