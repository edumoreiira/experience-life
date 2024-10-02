import { Component } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { slideUpDown } from '../../animations/transition-animations';
import { PurchaseForm } from '../../models/purchase-form.interface';
import {  ThousandSeparator } from '../../pipes/currency-format.pipe';

@Component({
  selector: 'app-purchase-data-form',
  standalone: true,
  imports: [InputComponent, ButtonComponent, NgxMaskDirective, NgxMaskPipe, FormsModule, ReactiveFormsModule, ThousandSeparator],
  templateUrl: './purchase-data-form.component.html',
  styleUrl: './purchase-data-form.component.scss',
  animations: [slideUpDown]
})
export class PurchaseDataFormComponent {
  valueToPay: string = '';
  step = 1;

  purchaseForm!: FormGroup<PurchaseForm>;

  constructor() {
    this.purchaseForm = new FormGroup<PurchaseForm>({
      accountName: new FormControl('', [Validators.required]),
      purchaseAmount: new FormControl('', [Validators.required]),
      coupom: new FormControl(''),
      customerName: new FormControl('', [Validators.required]),
      customerCpf: new FormControl('', [Validators.required]),
      customerEmail: new FormControl('', [Validators.required]),
      customerPhone: new FormControl('', [Validators.required])
    });
  }

  
  goToNextStep() {
    this.step++;
  }

  goToPreviousStep() {
    this.step--;
  }

  finishPurchase() {
    if(this.purchaseForm.valid) {
      console.log(this.purchaseForm.value);
    }
  }



  calculateCoins() {
    const value = this.purchaseForm.get('purchaseAmount')?.value;
    // Remove 'R$', espaços, pontos e vírgulas
    let cleanedValue = value.replace(/R\$|\s|,|\./g, '')
    // Verifica se o cleanedValue não está vazio
    if (cleanedValue.length > 2) {
        // Remove os últimos dois caracteres
        cleanedValue = cleanedValue.slice(0, -2);
    } else {
        cleanedValue = '0'; // Se o valor for muito pequeno, garantir que não seja vazio
    }

    // Converte a string em numero e multiplica pelo valor de mv desejado
    return parseFloat(cleanedValue) * 1000 || 0; 
  }
  
}
