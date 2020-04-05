import { Component, OnInit, Input } from '@angular/core';
import { Content } from 'app/domain/content';

@Component({
  selector: 'csbc-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {
@Input() info: Content;
  constructor() { }

  ngOnInit(): void {
  }

}
