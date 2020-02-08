import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../domain/content';
import { Store, select } from '@ngrx/store';

import * as fromGames from '../../games/state';
import * as gameActions from './../../games/state/games.actions';
import { Observable } from 'rxjs';
import { Season } from 'app/domain/season';
import { Division } from 'app/domain/division';

@Component({
  selector: 'csbc-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  currentSeason: void | Season;
  divisions: Division[];
  constructor(private store: Store<fromGames.State>) {}

  ngOnInit() {
    this.store.dispatch(new gameActions.LoadCurrentSeason());
    this.store.dispatch(new gameActions.LoadDivisions());
    this.setStateSubscriptions();
  }
  setStateSubscriptions() {
    this.store
      .pipe(select(fromGames.getCurrentSeason))
      .subscribe(season => (this.currentSeason = season));
    this.store
      .pipe(select(fromGames.getDivisions))
      .subscribe(divisions => (this.divisions = divisions));
  }
}
