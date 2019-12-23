import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'app/domain/game';
import { MatTableDataSource } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromGames from '../../state';

@Component({
  selector: 'csbc-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  get games () {
    return this._games;
  }
  @Input()
  set games (games: Game[]) {
    this._games = games;
    console.log(games);
    this.dataSource.data = games;
  }
  private _games: Game[];
  // datasource: Observable<Game[]>;
  errorMessage: string;
  public title: string;
  dataSource = new MatTableDataSource();

  // games: Game[];
  displayedColumns = [
    'gameDate',
    'gameTime',
    'locationName',
    'homeTeamName',
    'visitingTeamName',
    // 'homeTeamScore',
    // 'visitingTeamScore'
  ];
  constructor( private fb: FormBuilder,
    private store: Store<fromGames.State>
  ) {
    this.title = 'Schedule!';
  }

  ngOnInit() {
    console.log(this.games);
    this.dataSource.data = this.games;
  }

}
