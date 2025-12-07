import { Column } from "@/components/shared/ManagementTable";
import { Payment } from "@/types/payment.interface";
import { formatDateTime } from "@/lib/formatters";

export const paymentHistoryColumns: Column<Payment>[] = [
    {
        header: "Transaction ID",
        accessor: (payment) => payment.transactionId,
    },
    {
        header: "Event Title",
        accessor: (payment) => payment.event.title,
    },
    {
        header: "Client Name",
        accessor: (payment) => payment.client.name,
    },
    {
        header: "Client Email",
        accessor: (payment) => payment.client.email,
    },
    {
        header: "Amount",
        accessor: (payment) => `${payment.amount} BDT`,
    },
    {
        header: "Status",
        accessor: (payment) => payment.paymentStatus,
    },
    {
        header: "Event Date",
        accessor: (payment) => formatDateTime(payment.event.date),
    },
    {
        header: "Payment Date",
        accessor: (payment) => formatDateTime(payment.createdAt),
    },
];
