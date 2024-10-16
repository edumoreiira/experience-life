import { Component, input, OnInit, output } from '@angular/core';
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
import { Observable, of } from 'rxjs';
import { ClipboardCopyComponent } from "../clipboard-copy/clipboard-copy.component";
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-purchase-data-form',
  standalone: true,
  imports: [InputComponent, ButtonComponent, NgxMaskDirective, NgxMaskPipe, FormsModule, ReactiveFormsModule,
     ThousandSeparator, CommonModule, ClipboardCopyComponent, ModalComponent],
  templateUrl: './purchase-data-form.component.html',
  styleUrl: './purchase-data-form.component.scss',
  animations: [slideUpDown]
})
export class PurchaseDataFormComponent implements OnInit {
  skipFirstStep = input<boolean>(false);
  currentStep = output<number>()
  valueToPay: string = '';
  step = 2;
  isCouponModalVisible = false;
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
    this.currentStep.emit(this.step);
    const dft = of<PaymentResponse>({
      id: 12345,
      date_of_expiration: new Date().toISOString(),
      status: 'pending',
      transaction_amount: 100,
      point_of_interaction: { 
        transaction_data: {
          qr_code_base64: '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',
          qr_code: '00020126580014br.gov.bcb.pix0136b76aa9c2-2ec4-4110-954e-ebfe34f05b61520400005303986540558.005802BR5916ME173646909615516009BrsSPfiia62230519mpqrinter131989533263040FE8',
          ticket_url: ''
         } 
      }
    })
    this.paymentResponse$ = dft;
  }

  
  setStep(step: number) {
    this.step = step
    this.currentStep.emit(this.step);
  }

  onNextStep() {
    this.setStep(this.step + 1);
  }

  onPreviousStep() {
    this.setStep(this.step - 1);
  }
  
  firstStepValid() {
    return this.purchaseForm.get('accountName')?.valid;
  }

  secondStepValid() {
    return this.purchaseForm.get('purchaseAmount')?.valid;
  }

  validateFirstStep() {
    if(this.firstStepValid()) {
      this.onNextStep();
    }
  }

  validateSecondStep() {
    if(this.firstStepValid() && this.secondStepValid()) {
      this.onNextStep();
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
      };
      this.paymentService.createPixPayment(data).subscribe({ // call the payment service to asign data to paymentResponse$ if success
        next: (response) => {
          this.paymentResponse$ = of(response);
          this.onNextStep();
        },
        error: (error) => {
          console.error(error);
        }
      })
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
  
  avoidWhitespace(event: Event, avoidOnlyMultipleSpaces: boolean = true) {
    const element = event.target as HTMLInputElement;
    // Remover múltiplos espaços consecutivos
    avoidOnlyMultipleSpaces ? element.value = element.value.replace(/\s+/g, ' ') : element.value = element.value.trim();
  }
}
