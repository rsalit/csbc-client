import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'csbc-home-center',
  templateUrl: './csbc-home-center.component.html',
  styleUrls: ['./home-center.component.scss']
})
export class CsbcHomeCenterComponent implements OnInit {
  coverImage: string;
  constructor() {
    this.coverImage = '../../../assets/images/sky.jpg';
   }

  ngOnInit() {
  }

}