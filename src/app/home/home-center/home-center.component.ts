import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'csbc-home-center',
  templateUrl: './home-center.component.html',
  styleUrls: ['./home-center.component.scss']
})
export class HomeCenterComponent implements OnInit {
  coverImage: string;
  constructor() {
    this.coverImage = '../../../assets/images/sky.jpg';
   }

  ngOnInit() {
  }

}