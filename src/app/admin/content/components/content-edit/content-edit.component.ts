import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  ElementRef, Inject
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
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Content } from '../../../../domain/content';
import { ContentService } from '../../content.service';
import { RequestOptions } from '@angular/http';

@Component({
  selector: 'csbc-content-edit',
  templateUrl: './content-edit.component.html',
  styleUrls: ['./content-edit.component.scss']
})
export class ContentEditComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef })
  @Inject(MAT_DIALOG_DATA)
  formInputElements: ElementRef[];

  // @Input()
  content: Content;
  contentForm: FormGroup;
  private sub: Subscription;
  errorMessage: string;
  pageTitle: string;
  hideId: boolean;
  private baseUrl = 'api/products';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
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
      webContentTypeId: '',
      webContentId: '',
      expirationDate: ''
    });
    this.sub = this.route.params.subscribe(params => {
      let id = +params['webContentId'];
      console.log(id);
      this.getContent(id);
    });
    this.pageTitle = 'Initial';
    this.hideId = true;
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
  getContent(id: number): void {
    this.contentService
      .getContent(id)
      .subscribe(
        (content: Content) => this.onContentRetrieved(content),
        (error: any) => (this.errorMessage = <any>error)
      );
  }
  onContentRetrieved(content: Content): void {
    console.log(content);
    if (this.contentForm) {
      this.contentForm.reset();
    }
    this.content = content;
    console.log(this.content);
    if (this.content.webContentId === 0) {
      this.pageTitle = 'Add Content';
    } else {
      this.pageTitle = `Edit Content: ${this.content.title}`;
    }

    // // Update the data on the form
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

}
