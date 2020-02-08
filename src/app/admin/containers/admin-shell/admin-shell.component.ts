import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'csbc-admin-shell',
  templateUrl: './admin-shell.component.html',
  styleUrls: ['./admin-shell.component.scss']
})
export class AdminShellComponent implements OnInit {
  events: string[] = [];
  opened: boolean;

  shouldRun = true;
  
  constructor() { }

  ngOnInit() {
    // this.store.dispatch(new contentActions.Load());

  }

}
