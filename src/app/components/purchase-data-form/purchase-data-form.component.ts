import { Component } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchase-data-form',
  standalone: true,
  imports: [InputComponent, ButtonComponent, NgxMaskDirective, NgxMaskPipe, FormsModule],
  templateUrl: './purchase-data-form.component.html',
  styleUrl: './purchase-data-form.component.scss'
})
export class PurchaseDataFormComponent {
  valueToPay: string = '';
  calculateCoins( value: string ) {
        // Remove 'R$', espaços e vírgulas
        console.log(value)
        let cleanedValue = value.replace(/R\$|\s|,|\./g, '');

        // Verifica se o cleanedValue não está vazio
        if (cleanedValue.length > 2) {
            // Remove os últimos dois caracteres
            cleanedValue = cleanedValue.slice(0, -2);
        } else {
            cleanedValue = '0'; // Se o valor for muito pequeno, garantir que não seja vazio
        }
    
        // Converte a string limpa em número
        return parseFloat(cleanedValue) * 1000 || 0; 
  }
  
}
