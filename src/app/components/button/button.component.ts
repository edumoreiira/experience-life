import { Component, input } from '@angular/core';

type buttonsType = 'primary' | 'secondary';
@Component({
  selector: 'button[gradient-button]',
  standalone: true,
  host: {
    '[class.secondary]': 'group() == "secondary"'
  },
  template:`
    <ng-content></ng-content>
  `,
  imports: [],
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  group = input<buttonsType>("primary");
}
