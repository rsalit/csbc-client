import { Component, OnInit, Input } from '@angular/core';
import { Content } from 'app/domain/content';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'csbc-content-shell',
  templateUrl: './content-shell.component.html',
  styleUrls: ['./content-shell.component.scss']
})
export class ContentShellComponent implements OnInit {
  @Input() content: Content;
  contentForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
      this.contentForm = this.fb.group({
          title: ['Test', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          subTitle: '',
          body: '',
          location: '',
          dateAndTime: '',
          webContentTypeId: ''
      });
  }

  update(): void {
      this.contentForm.patchValue({
          title: this.content.title,
          subTitle: this.content.subTitle,
          body: this.content.body
      });
  }

  save() {

  }
}
