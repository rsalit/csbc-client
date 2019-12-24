import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Game } from '../../../domain/game';
import { Store, select } from '@ngrx/store';
import * as fromGames from '../../state';
import * as fromUser from '../../../user/state';

import { MatTableDataSource } from '@angular/material';
import { groupBy, mergeMap, toArray, map } from 'rxjs/operators';
import { from, zip, of } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'csbc-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  dataSource: MatTableDataSource<Game>;
  groupedGames: Game[];
  _gamesByDate: [Date, Game[]];
  get games() {
    return this._games;
  }
  @Input()
  set games(games: Game[]) {
    this._games = games;
    console.log(games);
    this.dataSource = new MatTableDataSource(games);
    // this.groupByDate(games).subscribe(grouped => {
    //   this.groupedGames = grouped;
    //   console.log(grouped);
    // });
  }
  private _games: Game[];
  @Input() canEdit: boolean;

  errorMessage: string;
  public title: string;

  // games: Game[];
  displayedColumns = [
    'gameDate',
    'gameTime',
    'locationName',
    'homeTeamName',
    'visitingTeamName',
    'homeTeamScore',
    'visitingTeamScore'
  ];
  constructor(private store: Store<fromGames.State>) {
    this.title = 'Schedule!';
    console.log(this.games);
    this.dataSource = new MatTableDataSource(this.games);
  }

  ngOnInit() {
    console.log(this.games);
    // if (this.canEdit === true) {
    //   this.displayedColumns.push('actions');
    // }
    // this.userStore.pipe(select(fromUser.getCurrentUser)).subscribe(user => {
    //   this.user = user;
    //   console.log(this.user);
    // });
    // this.store
    //   .pipe(select(fromGames.getCurrentDivision))
    //   .subscribe(division => {
    //     console.log(division);
    //     if (division !== null) {
    //       this.divisionId = division.divisionID;
    //       console.log(this.divisionId);
    //     }
    //   });
    // this.dataSource = new MatTableDataSource(this.games);
    this.store.pipe(select(fromGames.getFilteredGames)).subscribe(games => {
      console.log(games);
      this.games = games;
      // this.canEdit = this.gameService.getCanEdit(this.user, this.divisionId);
      this.dataSource.data = games;
    });

    this.dataSource = new MatTableDataSource(this.games);
    this.store.pipe(select(fromGames.getFilteredGames)).subscribe(games => {
      console.log(games);
      this.games = games;
      
      this.dataSource.data = games;
    });
  }
  groupByDate(games: Game[]) {
    const source = from(games);
    const gDate = source.pipe(
      map(s => (s.gameDate = moment(s.gameDate).toDate()))
    );

    const gamesByDate = source.pipe(
      // map(s => s.gameDate = moment(s.gameDate).toDate()),
      groupBy(game => game.gameDate, g => g),
      // return each item in group as array
      mergeMap(group => zip(of(group.key), group.pipe(toArray())))
    );
    console.log(gamesByDate);
    return gamesByDate;
  }
}
