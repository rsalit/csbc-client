import { Component, OnInit, Input } from '@angular/core';
import { GameActions } from './../../state/games.actions';
import { FormBuilder } from '@angular/forms';
import { Game } from '../../../domain/game';
import { Store, select } from '@ngrx/store';
import * as fromGames from '../../state';
import * as fromUser from '../../../user/state';
import * as gameActions from '../../state/games.actions';

import { MatTableDataSource, MatDialog } from '@angular/material';
import { groupBy, mergeMap, toArray, map } from 'rxjs/operators';
import { from, zip, of } from 'rxjs';
import * as moment from 'moment';
import { User } from 'app/domain/user';
import { GameScoreDialogComponent } from '../game-score-dialog/game-score-dialog.component';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'csbc-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  dataSource: MatTableDataSource<Game>;
  groupedGames: Game[];
  _gamesByDate: [Date, Game[]];
  divisionId: number;
  flexMediaWatcher: any;
  currentScreenWidth: any;
  get games() {
    return this._games;
  }
  @Input()
  set games(games: Game[]) {
    this._games = games;
    //    console.log(games);
    this.dataSource = new MatTableDataSource(games);
    //this.groupByDate(games).subscribe(grouped => {
    // this.groupedGames = grouped;
    //console.log(grouped);
    //});
  }
  private _games: Game[];
  @Input() canEdit: boolean;

  errorMessage: string;
  public title: string;
  private user: User;

  displayedColumns = [
    'gameDate',
    'gameTime',
    'locationName',
    'homeTeamName',
    'visitingTeamName',
    'homeTeamScore',
    'visitingTeamScore'
  ];
  constructor(
    private store: Store<fromGames.State>,
    private userStore: Store<fromUser.State>,
    public dialog: MatDialog,
    private media: MediaObserver
  ) {
    this.title = 'Schedule!';
    this.flexMediaWatcher = media.media$.subscribe(change => {
      if (change.mqAlias !== this.currentScreenWidth) {
        this.currentScreenWidth = change.mqAlias;
        this.setupTable();
      }
    });
    console.log(this.games);
    this.dataSource = new MatTableDataSource(this.games);
  }

  ngOnInit() {
    // console.log(this.games);
    // console.log(this.displayedColumns.find(t => t === 'actions'));
    if (this.canEdit === true) {
      this.displayedColumns.push('actions');
    }
    this.userStore.pipe(select(fromUser.getCurrentUser)).subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
    this.store
      .pipe(select(fromGames.getCurrentDivision))
      .subscribe(division => {
        console.log(division);
        if (division !== null && division !== undefined) {
          this.divisionId = division.divisionID;
          console.log(this.divisionId);
          this.canEdit = false;
          if (this.user !== null && this.user !== undefined) {
            for (let i = 0; i < this.user.divisions.length; i++) {
              if (this.user.divisions[i].divisionID === this.divisionId) {
                this.canEdit = true;
                console.log('Found division');
                break;
              }
            }
          }
        }
      });
    // this.dataSource = new MatTableDataSource(this.games);
    this.store.pipe(select(fromGames.getFilteredGames)).subscribe(games => {
      this.games = games;
      this.dataSource.data = games;
    });
    this.store.pipe(select(fromGames.getCanEdit)).subscribe(canEdit => {
      this.canEdit = canEdit;
      if (canEdit) {
        this.displayedColumns.push('actions');
      }
    });

    this.dataSource = new MatTableDataSource(this.games);
    this.store.pipe(select(fromGames.getFilteredGames)).subscribe(games => {
      this.games = games;
      this.dataSource.data = games;
    });
  }

  setupTable() {
    this.displayedColumns = [
      'gameDate',
      'gameTime',
      'locationName',
      'homeTeamName',
      'visitingTeamName',
      'homeTeamScore',
      'visitingTeamScore'
    ];
    if (this.currentScreenWidth === 'xs') {
      // only display internalId on larger screens
      //this.displayedColumns.shift(); // remove 'internalId'
      this.displayedColumns = [
        'gameDate',
        'gameTime',
        'locationName',
        'homeTeamName',
        'visitingTeamName'
      ];
    }
  }
  groupByDate(games: Game[]) {
    const source = from(games);
    const gDate = source.pipe(
      map(s => (s.gameDate = moment(s.gameDate).toDate()))
    );

    const gamesByDate = source.pipe(
      // map(s => s.gameDate = moment(s.gameDate).toDate()),
      groupBy(
        game => game.gameDate,
        g => g
      ),
      // return each item in group as array
      mergeMap(group => zip(of(group.key), group.pipe(toArray())))
    );
    console.log(gamesByDate);
    return gamesByDate;
  }
  editGame(game) {
    this.store.dispatch(new gameActions.SetCurrentGame(game));
    const dialogRef = this.dialog.open(GameScoreDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
