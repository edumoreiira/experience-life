import { Component } from '@angular/core';
import { PurchaseDataFormComponent } from '../../../components/purchase-data-form/purchase-data-form.component';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [PurchaseDataFormComponent],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {

}
