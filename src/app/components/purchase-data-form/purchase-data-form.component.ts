import { Component } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-purchase-data-form',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './purchase-data-form.component.html',
  styleUrl: './purchase-data-form.component.scss'
})
export class PurchaseDataFormComponent {

}
