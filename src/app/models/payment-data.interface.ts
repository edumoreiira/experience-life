export interface PaymentData {
    firstName: string;
    lastName: string;
    areaCode: number;
    phoneNumber: string;
    email: string;
    cpf: string;
    transactionAmount: number;
}

export interface PaymentResponse {
    id: number;
    date_of_expiration: string;
    status: string;
    transaction_amount: number;
    point_of_interaction: PointOfInteraction;
}

interface PointOfInteraction {
    transaction_data: TransactionData;
}

interface TransactionData {
    qr_code_base64: string;
    qr_code: string;
    ticket_url: string;
}



