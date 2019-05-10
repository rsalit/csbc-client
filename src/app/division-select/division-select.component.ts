import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Division } from '../domain/division';
import { DivisionService } from '../services/division.service';

@Component({
  selector: 'csbc-division-select',
  templateUrl: './division-select.component.html',
  styleUrls: ['./division-select.component.css'],
  providers: [DivisionService]
})
export class DivisionSelectComponent implements OnInit {
   // @Output() setDivision: EventEmitter<Division> = new EventEmitter();
  divisions: Division[];
  errorMessage: string;
  selectedDivision: Division;
  constructor(private _divisionService: DivisionService) { }

  ngOnInit() {
    this._divisionService.getDivisions(2090)
      .subscribe(divisions => this.divisions = this.setDivisionData(divisions),
      error => this.errorMessage = <any>error);
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
        // let division: Division = {
        //   seasonId: data[i].seasonID,
        //   divisionId: data[i].divisionID,
        //   divisionName: data[i]..div_Desc,
        //   minDate: data[i].minDate,
        //   maxDate: data[i].maxDate
        // };
        // divisions.push(division);
      }
      console.log(divisions);
    }
    return divisions;
  }
}
