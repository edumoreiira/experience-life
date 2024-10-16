import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentData, PaymentResponse } from '../../models/payment-data.interface';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly apiUrl = '/api/v1/payments';
  // private readonly apiUrl = 'https://api.mercadopago.com/v1/payments';
  private readonly accessToken = 'TEST-3822325863128027-101216-3d26c333f4e67f7c4a4a75c4d0730e82-289181285'

  constructor(private http: HttpClient) { }

  createPixPayment(data: PaymentData): Observable<PaymentResponse> {
    const uniqueId = uuidv4();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Idempotency-Key': uniqueId,
      'Authorization': 'Bearer ' + this.accessToken
    });
    const body = {
      payer: {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: {
          area_code: data.areaCode,
          number: data.phoneNumber
        },
        email: data.email,
        identification: {
          type: 'CPF',
          number: data.cpf
        }
    },
    payment_method_id: 'pix',
    transaction_amount: data.transactionAmount
    }

    return this.http.post<PaymentResponse>(this.apiUrl, body, { headers });
  }
}
