import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csbc-home-center',
  templateUrl: './csbc-home-center.component.html',
  styleUrls: ['./csbc-home-center.component.scss']
})
export class CsbcHomeCenterComponent implements OnInit {
  coverImage: string;
  constructor() {
    this.coverImage = 'images/sky.jpg';
   }

  ngOnInit() {
  }

}
