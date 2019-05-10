import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Season } from '../../../domain/season';
import { Division } from '../../../domain/division';
import { Team } from '../../../domain/team';
import { Game } from '../../../domain/game';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromGames from '../../state';
import * as gameActions from '../../state/games.actions';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'csbc-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
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
  constructor(
    private fb: FormBuilder,
    private store: Store<fromGames.State>
  ) {
    this.title = 'Schedule!';
  }

  ngOnInit() {
    console.log(this.games);
    this.dataSource.data = this.games;
    // this._gameService.getGames()
    //   .subscribe(games => {
    //     this.games = games;
    //     console.log(this.games);
    //     this.dataSource.data = games;
    //   });
    // this.store.pipe(select(fromGames.getGames)).subscribe(games => {
    //   console.log(games);
    //   this.games = games;
    //   console.log(this.games);
    //   this.dataSource.data = games;
    // });

    // error => this.errorMessage = <any>error);
    // this.store
    //    .pipe(select(fromGame.GameActionTypes....reducer(state, action).show....showListView))
    // //   .subscribe(showProdu
    // ctCode => (this.displayCode = showProductCode));
  }
}
