import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csbc-standings',
  templateUrl: './csbc-standings.component.html',
  styleUrls: ['./csbc-standings.component.css']
})
export class CsbcStandingsComponent implements OnInit {
  public title: string;
  constructor() {
    this.title = 'Standings';
   }

  ngOnInit() {
  }

}
