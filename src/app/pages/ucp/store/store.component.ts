import { Component } from '@angular/core';
import { PurchaseDataFormComponent } from '../../../components/forms/purchase-data-form/purchase-data-form.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [PurchaseDataFormComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {
  currentStep = 1;

}
