import { Component, input, output } from '@angular/core';
import { fadeInOut, parentAnimations, popUp } from '../../animations/transition-animations';
import { CommonModule } from '@angular/common';

type SizeUnit = `${number}${'px' | 'em' | 'rem'}`;

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  animations: [popUp, fadeInOut, parentAnimations]
})


export class ModalComponent {
 onCloseModal = output();
 minWidth = input<SizeUnit>('350px');
}
