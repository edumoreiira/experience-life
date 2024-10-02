import { Component } from '@angular/core';

@Component({
  selector: 'button[gradient-button]',
  standalone: true,
  template:`
    <ng-content></ng-content>
  `,
  imports: [],
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

}
