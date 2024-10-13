import { Component, input, OnInit } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { slideUpDown } from '../../animations/transition-animations';
import { PurchaseForm } from '../../models/purchase-form.interface';
import { ThousandSeparator } from '../../pipes/currency-format.pipe';
import { completeNameRequired, cpfValidator, currencyValidator, noSpecialCharacters} from '../../validators/purchase-form.validators';
import { CommonModule } from '@angular/common';
import { PaymentData, PaymentResponse } from '../../models/payment-data.interface';
import { PaymentService } from '../../services/Payment/payment.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-purchase-data-form',
  standalone: true,
  imports: [InputComponent, ButtonComponent, NgxMaskDirective, NgxMaskPipe, FormsModule, ReactiveFormsModule, ThousandSeparator, CommonModule],
  templateUrl: './purchase-data-form.component.html',
  styleUrl: './purchase-data-form.component.scss',
  animations: [slideUpDown]
})
export class PurchaseDataFormComponent implements OnInit {
  skipFirstStep = input<boolean>(false);
  valueToPay: string = '';
  step = 1;
  purchaseForm!: FormGroup<PurchaseForm>;
  pageHasLoaded = false;
  paymentResponse$ = new Observable<PaymentResponse>();

  constructor(private paymentService: PaymentService) {
    this.purchaseForm = new FormGroup<PurchaseForm>({
      accountName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      purchaseAmount: new FormControl('', [Validators.required, currencyValidator()]),
      coupon: new FormControl(''),
      customerName: new FormControl('', [Validators.required, noSpecialCharacters, completeNameRequired(), Validators.minLength(7)]),
      customerCpf: new FormControl('', [Validators.required, cpfValidator()]),
      customerPhone: new FormControl('', [Validators.required]),
      customerEmail: new FormControl('', [Validators.required, Validators.email])
    });
  }


  ngOnInit(): void {
    if(this.skipFirstStep()) {
      this.step = 2;
      this.getForm('accountName')?.setValue('accountName');
    }
    setTimeout(() => {
      this.pageHasLoaded = true;
    });
  }


  
  goToNextStep() {
    this.step++;
  }

  goToPreviousStep() {
    this.step--;
  }
  
  firstStepValid() {
    return this.purchaseForm.get('accountName')?.valid;
  }

  secondStepValid() {
    return this.purchaseForm.get('purchaseAmount')?.valid;
  }

  checkFirstStep() {
    if(this.firstStepValid()) {
      this.goToNextStep();
    }
  }

  checkSecondStep() {
    if(this.firstStepValid() && this.secondStepValid()) {
      this.goToNextStep();
    }
  }

  
  finishPurchase() {
    if(this.purchaseForm.valid) {
      const form = this.purchaseForm.value;
      const fullName = form.customerName.trim();
      const nameParts = fullName.split(' ');
      const cleanedPhone = form.customerPhone.replace(/\D/g, '');
      
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      const cpf = form.customerCpf.replace(/\D/g, '');
      const areaCode = cleanedPhone.slice(0, 2);
      const phoneNumber = cleanedPhone.slice(2);
      const email = form.customerEmail;
      const purchaseAmount = parseInt(form.purchaseAmount.replace(/\D/g, '').slice(0, -2), 10);
      
      const data: PaymentData = {
        firstName,
        lastName,
        areaCode,
        phoneNumber,
        email,
        cpf,
        transactionAmount: purchaseAmount
      }

      this.paymentResponse$ = this.paymentService.createPixPayment(data) // call the payment service to asign data to paymentResponse$
      
      
    }
  }

  getForm(formControlName: string) {
    return this.purchaseForm.get(formControlName);
  }


  calculateCoins() {
    const value = this.getForm('purchaseAmount')?.value;
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
  
  avoidWhitespace(event: Event) {
    const element = event.target as HTMLInputElement;
    // Remover múltiplos espaços consecutivos
    element.value = element.value.replace(/\s+/g, ' ');
  }
}
