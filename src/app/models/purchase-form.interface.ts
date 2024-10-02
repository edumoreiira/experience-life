import { FormControl } from "@angular/forms";

export interface PurchaseForm {
    accountName: FormControl;
    purchaseAmount: FormControl;
    coupom?: FormControl;
    customerName: FormControl;
    customerCpf: FormControl;
    customerEmail: FormControl;
    customerPhone: FormControl;
}