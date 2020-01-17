import { Component, OnInit, OnChanges, Input } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Subscription';

import { SeasonService } from '../../services/season.service';
import { DivisionService } from '../../services/division.service';
import { Division } from '../../domain/division';
import { Season } from '../../domain/season';
import { MatTableDataSource } from '@angular/material';
import { Store, select } from '@ngrx/store';
// import { CsbcSeasonSelectComponent } from '../../shared/season-select/csbc-season-select.component';
import * as fromAdmin from '../state';

@Component({
  selector: 'csbc-division-list',
  templateUrl: './divisionList.component.html',
  styleUrls: ['../admin.component.scss'],
  providers: [SeasonService]
})
export class DivisionListComponent implements OnInit, OnChanges {
  @Input() selectedSeason: Season;
  //  set selectedSeason(value: Season) {
  //     console.log(value);
  //     if (value !== undefined) {
  //         //this.seasonService.selectedSeason$.subscribe(season =>
  //         this._divisionService.getSeasonDivisions(value).subscribe(
  //             (divisions) => this.divisions = divisions
  //         );
  //     }
  //  }
  // @Input() selectedSeason: Season;
  divisions: Division[];
  // subscription: Subscription;
  errorMessage: string;
  selectedDivision: Division;
  seasonId: number;
  displayedColumns = ['div_Desc', 'divisionID'];
  dataSource: MatTableDataSource<unknown>;
  constructor(
    private _divisionService: DivisionService,
    public seasonService: SeasonService,
    private store: Store<fromAdmin.State>
  ) {
    //  seasonService.selectedSeason$.subscribe(
    //      season => {
    //          this._divisionService.getSeasonDivisions(season).subscribe(
    //          (divisions) => this.divisions = divisions);
    //          console.log(season);
    //      }
    //  );
  }

  ngOnInit() {
    this.store
      .pipe(select(fromAdmin.getCurrentSeasonId))
      .subscribe(seasonId => {
        this.seasonId = seasonId;
        console.log(this.seasonId);
        //this.setDivisionData()
        // this.store.pipe(select(fromAdmin..divisions)).subscribe(
        //   divisions => this.divisions = divisions);
        if (this.seasonId !== undefined) {
          this._divisionService
            .getDivisions(this.seasonId)
            .subscribe(divisions => {
              this.divisions = divisions;
              console.log(divisions);
              this.dataSource = new MatTableDataSource(this.divisions);
            });
        }
      });
  }
  ngOnChanges(): void {
    if (this.selectedSeason !== undefined) {
      // this._divisionService.getSeasonDivisions(this.selectedSeason).subscribe(
      //    (divisions) => this.divisions = divisions);
      // this.seasonService.selectedSeason$.subscribe(
    }
  }

  onSelectedSeason() {
    // this.selectedSeason = season;
    console.log('Help');
    //    this.seasonService.selectedSeason$.subscribe(

    //          () => console.log('Help'));
  }
  onSelect(division: Division): void {
    this.selectedDivision = division;
  }
  setDivisionData(data: any[]): Division[] {
    let divisions: Division[] = [];
    console.log(data);
    for (let i = 0; i <= data.length; i++) {
      console.log(data[i]);
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
      console.log(divisions);
    }
    return divisions;
  }
}
