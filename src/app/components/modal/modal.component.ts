import { AfterViewInit, Component, ElementRef, HostListener, input, output, ViewChild } from '@angular/core';
import { fadeInOut, parentAnimations, popUp } from '../../animations/transition-animations';
import { CommonModule } from '@angular/common';
import { FocusTrapDirective } from '../../directives/focus-trap/focus-trap.directive';

type SizeUnit = `${number}${'px' | 'em' | 'rem'}`;

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FocusTrapDirective],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  animations: [popUp, fadeInOut, parentAnimations]
})


export class ModalComponent implements AfterViewInit{
 onCloseModal = output();
 minWidth = input<SizeUnit>('350px');
 role = input.required<string>();
 ariaLabelledBy = input<string>();
 ariaDescribedBy = input<string>();
 ariaLabel = input<string>();

 @ViewChild('ModalCloseButton') modalCloseButton!: ElementRef;

 ngAfterViewInit(): void {
  // focus on the close button so the user get the focus on the modal and trapped inside it
    this.modalCloseButton.nativeElement.focus();
 }

 onKeydownClose(event: KeyboardEvent) {
    if(event.key === 'Enter' || event.key === ' ') {
      this.onCloseModal.emit();
    }
  } 

  @HostListener('document:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if(event.key === 'Escape') {
      this.onCloseModal.emit();
    }
  }
    
  
}
