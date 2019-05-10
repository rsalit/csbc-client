import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Division } from '../../domain/division';

@Component({
  selector: 'csbc-admin-games',
  templateUrl: './admin-games.component.html',
 styleUrls: [
    '../admin.component.scss']
})
export class AdminGamesComponent implements OnInit {
 @Input() divisionId: number;
  constructor() { }

  ngOnInit() {
  }
  setDivision(division: Division) {
    console.log(division);
    this.divisionId = division.divisionID;
 }

}
