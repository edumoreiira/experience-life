export interface PaymentData {
    firstName: string;
    lastName: string;
    areaCode: number;
    phoneNumber: number;
    email: string;
    cpf: number;
    transactionAmount: number;
}

export interface PaymentResponse {
    id: number;
    date_of_expiration: string;
    status: string;
    transaction_amount: number;
}
