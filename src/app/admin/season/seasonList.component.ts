import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SeasonService } from '../../services/season.service';
import { Season } from '../../domain/season';

@Component({
    selector: 'csbc-season-list',
    templateUrl: './seasonList.component.html',
    styleUrls: [
    '../admin.component.scss']
})
export class SeasonListComponent implements OnInit {
    seasons: Observable<Season[]>;
    errorMessage: string;
    selectedSeason: Season;

    constructor(private _seasonService: SeasonService) { }

    ngOnInit() {
        this.seasons = this._seasonService.getSeasons();
            // .subscribe(seasons => this.seasons = seasons,
            // error => this.errorMessage = <any>error);
    }

    onSelect(season: Season): void {
        this.selectedSeason = season;
    }
}
