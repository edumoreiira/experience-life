import { Component } from '@angular/core';

@Component({
  selector: 'button[rounded-button]',
  standalone: true,
  template:`
    <ng-content></ng-content>
  `,
  imports: [],
  styleUrl: './rounded-button.component.scss'
})
export class RoundedButtonComponent {

}
