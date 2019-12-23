import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Standing } from 'app/domain/standing';

@Component({
  selector: 'csbc-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {
  public title: string;
  @Input() teams: any[];

  private _standings: Standing[];
  get standings () {
    return this._standings;
  }
  @Input()
  set standings (standings: Standing[]) {
    this._standings = standings;
    console.log(standings);
    this.dataSource = new MatTableDataSource(standings);
  }

  displayedColumns = [
    'teamName',
    'won',
    'lost',
    'pct',
    'streak',
  ];
  dataSource: MatTableDataSource<unknown>;
  constructor() {
    this.title = 'Standings';
    this.dataSource = new MatTableDataSource(this.standings);
  }

  ngOnInit() {
    // this.teams = this.getStandings();

    this.dataSource = new MatTableDataSource(this.standings);
    console.log(this.teams);
    console.log(this.standings);
  }

  getStandings() {
    // let standings = this.gameService.getStandings();
    // console.log(standings);
    return [
      {
        teamName: 'Blue(01)',
        wins: 2,
        losses: 1,
        pct: 66,
        gamesBehind: '1'
      },
      {
        teamName: 'Gray(02)',
        wins: 3,
        losses: 0,
        pct: 100,
        gamesBehind: '_'
      }
    ];
  }
}
