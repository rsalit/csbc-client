import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'app/domain/game';
import { DataSource } from '@angular/cdk/table';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { MediaObserver } from '@angular/flex-layout';
import { GameScoreDialogComponent } from '../game-score-dialog/game-score-dialog.component';

import * as fromGames from '../../state';
import * as fromUser from '../../../user/state';
import * as gameActions from '../../state/games.actions';

@Component({
  selector: 'daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.scss', '../../containers/games-shell/games-shell.component.scss']
})
export class DailyScheduleComponent implements OnInit {
  @Input() games: Game[];
  @Input() data: MatTableDataSource<Game>;
  displayedColumns = [
    'gameTime',
    'locationName',
    'homeTeamName',
    'visitingTeamName',
    'homeTeamScore',
    'visitingTeamScore'
  ];
  dataSource: MatTableDataSource<Game>;
  @Input() canEdit: boolean;
  gameDate: Date;
  flexMediaWatcher: any;
  currentScreenWidth: string;
  constructor( private store: Store<fromGames.State>,
    private userStore: Store<fromUser.State>,
    public dialog: MatDialog,
    private media: MediaObserver) {
      this.flexMediaWatcher = media.media$.subscribe(change => {
        if (change.mqAlias !== this.currentScreenWidth) {
          this.currentScreenWidth = change.mqAlias;
          this.setupTable();
        }
      });
  
    }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.games);
this.gameDate = this.games[0].gameDate
    this.dataSource.data = this.games;
  }
  setupTable() {
    this.displayedColumns = [
      'visitingTeamName',
      'homeTeamName',
      'gameTime',
      'locationName',
      'visitingTeamScore',
      'homeTeamScore',
    ];
    if (this.currentScreenWidth === 'xs') {
      // only display internalId on larger screens
      //this.displayedColumns.shift(); // remove 'internalId'
      this.displayedColumns = [
        'visitingTeamName',
        'homeTeamName',
        'gameTime',
        'locationName'
      ];
    }
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
