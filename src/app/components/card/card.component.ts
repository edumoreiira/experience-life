import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  title = input('Card Title');
  playerName = input('Player Name');
  info = input('Info');
  urlImage = input('', { 
    transform: (value: string) => `url("${value}")`
  });
}
