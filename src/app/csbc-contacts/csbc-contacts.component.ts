import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csbc-contacts',
  templateUrl: './csbc-contacts.component.html',
  styleUrls: ['./csbc-contacts.component.css']
})
export class CsbcContactsComponent implements OnInit {
  title: string;
  constructor() {
    this.title = 'Contacts';
   }

  ngOnInit() {
  }

}
