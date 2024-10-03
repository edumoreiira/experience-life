import { FormControl } from "@angular/forms";

export interface PurchaseForm {
    accountName: FormControl;
    purchaseAmount: FormControl;
    coupon?: FormControl;
    customerName: FormControl;
    customerCpf: FormControl;
    customerEmail: FormControl;
    customerPhone: FormControl;
}