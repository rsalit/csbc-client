import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SeasonService } from '../../services/season.service';
import { Season } from '../../domain/season';

@Component({
  selector: 'csbc-season-select',
  templateUrl: './csbc-season-select.component.html',
  styleUrls: ['./csbc-season-select.component.css']
})
export class CsbcSeasonSelectComponent implements OnInit {
  @Input() selectedSeason: Season = new Season();
  @Output() setSeason = new EventEmitter<Season>(); // : Season;
  seasons: Observable<Season[]>;
  season: Season = new Season();
  constructor(private _seasonService: SeasonService) {

  }

  ngOnInit() {
    // this.seasons = this._seasonService.getSeasons();
    console.log(this.seasons);
    // this.selectedSeason = this.seasons[0];

  }
  onClick(selectedSeason: Season): void {
    console.log(selectedSeason);
    if (selectedSeason.seasonID !== undefined) {
      this.selectedSeason = selectedSeason;
      // this._seasonService.selectedSeason$ = Observable.of(selectedSeason);
      // this._seasonService.setSelectedSeason(Observable.of(selectedSeason));
      // this.setSeason.emit(selectedSeason);
      console.log(selectedSeason);
    }
  }
}
