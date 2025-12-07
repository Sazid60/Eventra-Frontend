/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Payment {
    id: string;
    transactionId: string;
    paymentGatewayData: any | null;
    amount: number;
    paymentStatus: "PENDING" | "PAID" | "FAILED" | "CANCELLED";
    invoiceUrl: string | null;
    eventId: string;
    clientId: string;
    hostId: string;
    participantId: string;
    createdAt: string;
    event: {
        id: string;
        title: string;
        date: string;
    };
    client: {
        id: string;
        name: string;
        email: string;
    };
}

export interface PaymentMeta {
    page: number;
    limit: number;
    total: number;
}

export interface PaymentResponse {
    meta: PaymentMeta;
    data: Payment[];
}
