import { Component, OnInit, Input } from '@angular/core';
import { SeasonService } from 'app/services/season.service';
import { DivisionService } from 'app/services/division.service';
import { TeamService } from 'app/services/team.service';
import { GameService } from '../../game.service';
import { Store, select } from '@ngrx/store';
import * as fromGames from '../../state';
import * as gameActions from '../../state/games.actions';
import { Game } from 'app/domain/game';
import { Team } from 'app/domain/team';
import { Division } from 'app/domain/division';
import { Season } from 'app/domain/season';
import { Observable } from 'rxjs';

@Component({
  selector: 'csbc-games-shell',
  templateUrl: './games-shell.component.html',
  styleUrls: ['./games-shell.component.css']
})
export class GamesShellComponent implements OnInit {
  @Input() showAllTeams: boolean;
  @Input() currentTeam: string;
  teamList: any[];
  games$:  Observable<Game[]>;
  filteredGames$:  Observable<Game[]>;
  teams: any;
  allGames$: Observable<Game[]>;
  errorMessage: any;
  currentSeason$: Observable<Season>;
  divisions$: Observable<Division[]>;
  selectedDivisionId$: Observable<number>;
  teams$: Observable<Team[]>;
  selectedTeam$: Observable<Team>;
  errorMessage$: Observable<string>;
  selectedDivision$: Observable<any>;

  constructor(
    private seasonService: SeasonService,
    private _divisionService: DivisionService,
    private _teamService: TeamService,
    private _gameService: GameService,
    private store: Store<fromGames.State>
  ) {}

  ngOnInit() {
    this.setStateSubscriptions();
    this.seasonService.getCurrent().subscribe(season => {
      //     // this.currentSeason = season;
      console.log(season);
      this.store.dispatch(new gameActions.SetCurrentSeason(season));
      this.store.dispatch(new gameActions.LoadDivisions());
      console.log(fromGames.getDivisions);
      if (fromGames.getDivisions.length > 0) {
        this.store.dispatch(
          new gameActions.SetCurrentDivision(fromGames.getDivisions[0])
        );
      }
      this.store.dispatch(new gameActions.LoadTeams());
      this.store.dispatch(new gameActions.Load());
      this.store.dispatch(new gameActions.LoadFilteredGames());
    });
  }
  setStateSubscriptions() {
    this.currentSeason$ = this.store.pipe(select(fromGames.getCurrentSeason));
    this.selectedDivisionId$ = this.store.pipe(
      select(fromGames.getCurrentDivisionId)
    );
    console.log(this.selectedDivisionId$);
    console.log(this.selectedTeam$);
    this.selectedDivision$ = this.store.pipe(
      select(fromGames.getCurrentDivision)
    );
    console.log(this.selectedDivisionId$);
    this.selectedTeam$ = this.store.pipe(select(fromGames.getCurrentTeam));
    this.allGames$ = this.store.pipe(select(fromGames.getGames));
    this.divisions$ = this.store.pipe(select(fromGames.getDivisions));
    this.games$ = this.store.pipe(select(fromGames.getGames));
    this.filteredGames$ = this.store.pipe(select(fromGames.getFilteredGames));
  }
  public filterByDivision(divisionId: number): void {
    console.log(divisionId);
    this.teamList = [];
  }

  divisionSelected(division: Division): void {
    this.store.dispatch(new gameActions.SetCurrentDivision(division));
    console.log(division);
    this.store.dispatch(new gameActions.LoadFilteredGames());
  }
  teamSelected(team: Team): void {
    this.store.dispatch(new gameActions.SetCurrentTeam(team));
  }
  setDivisionData(data: any[]): Division[] {
    let divisions: Division[] = [];
    // console.log(data);
    for (let i = 0; i <= data.length; i++) {
      // console.log(data[i]);
      if (data[i] !== undefined) {
        let division: Division = {
          seasonID: data[i].seasonID,
          divisionID: data[i].divisionID,
          div_Desc: data[i].div_Desc,
          minDate: data[i].minDate,
          maxDate: data[i].maxDate
        };
        divisions.push(division);
      }
      // console.log(divisions);
    }
    return divisions;
  }
  setTeamData(data: any[]): Team[] {
    let teams: Team[] = [];
    for (let i = 0; i <= data.length; i++) {
      // console.log(data[i]);
      if (data[i] !== undefined) {
        let team: Team = new Team();
        team.id = data[i].teamID;
        team.name = data[i].teamNumber;
        team.color = data[i].colorID;
        team.divisionId = data[i].divisionID;
        teams.push(team);
      }
      console.log(teams);
    }
    return teams;
  }
}
