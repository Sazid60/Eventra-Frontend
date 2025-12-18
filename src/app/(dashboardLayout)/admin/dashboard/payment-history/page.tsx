import { getUserPayments } from "@/services/payments/payment";
import { queryStringFormatter } from "@/lib/formatters";
import Pagination from "@/components/shared/Pagination";
import PaymentHistoryFilter from "@/components/modules/Payment-History/PaymentHistoryFilter";
import PaymentHistoryTable from "@/components/modules/Payment-History/PaymentHistoryTable";

const PaymentHistoryPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }>; }) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const paymentsData = await getUserPayments(queryString);

    const totalPages = Math.ceil(
        (paymentsData?.data?.meta?.total || 1) / (paymentsData?.data?.meta?.limit || 1)
    );

    return (
        <>
            <div className="px-4 py-8">
                <h1 className="text-2xl font-semibold mb-6">Payment History</h1>
                <p className="text-sm text-muted-foreground mb-6">
                    View and manage all payment transactions. Filter by status or search by transaction ID.
                </p>

                <PaymentHistoryFilter />

                {Array.isArray(paymentsData?.data?.data) && paymentsData.data.data.length > 0 ? (
                    <PaymentHistoryTable payments={paymentsData.data.data} />
                ) : (
                    <div className="text-center text-sm text-muted-foreground py-12 border rounded-lg">
                        No payment records found.
                    </div>
                )}
            </div>
            <Pagination
                currentPage={paymentsData?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </>
    );
};

export default PaymentHistoryPage;