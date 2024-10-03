import { FormControl } from "@angular/forms";

export interface PurchaseForm {
    accountName: FormControl;
    purchaseAmount: FormControl;
    coupon?: FormControl;
    customerName: FormControl;
    customerCpf: FormControl;
    customerPhone: FormControl;
    customerEmail: FormControl;
}