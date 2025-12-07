"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { Payment } from "@/types/payment.interface";
import { paymentHistoryColumns } from "./PaymentHistoryColumns";

type Props = {
    payments: Payment[];
};

const PaymentHistoryTable = ({ payments }: Props) => {
    return (
        <ManagementTable
            data={payments}
            columns={paymentHistoryColumns}
            getRowKey={(payment) => payment.id}
        />
    );
};

export default PaymentHistoryTable;