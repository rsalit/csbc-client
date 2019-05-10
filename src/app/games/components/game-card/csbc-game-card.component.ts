import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../../domain/game';

@Component({
  selector: 'app-csbc-game-card',
  templateUrl: './csbc-game-card.component.html',
  styleUrls: ['./csbc-game-card.component.scss']
})
export class CsbcGameCardComponent implements OnInit {
  @Input() game: Game;
  constructor() { }

  ngOnInit() {
  }

}
