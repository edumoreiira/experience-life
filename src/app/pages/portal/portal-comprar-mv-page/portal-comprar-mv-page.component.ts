import { Component } from '@angular/core';
import { PurchaseDataFormComponent } from "../../../components/purchase-data-form/purchase-data-form.component";

@Component({
  selector: 'app-portal-comprar-mv-page',
  standalone: true,
  imports: [PurchaseDataFormComponent],
  templateUrl: './portal-comprar-mv-page.component.html',
  styleUrl: './portal-comprar-mv-page.component.scss'
})
export class PortalComprarMvPageComponent {
  currentStep = 0;
}
