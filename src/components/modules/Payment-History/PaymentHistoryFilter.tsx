"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";

const PaymentHistoryFilter = () => {
    return (
        <div className="space-y-3 mb-6">
            <div className="flex flex-col md:flex-row justify-between md:gap-3">
                <div className="flex items-center gap-2">
                    <SearchFilter paramName="searchTerm" placeholder="TransactionId / Client Name..." />
                    <RefreshButton />
                </div>

                <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
                    <SelectFilter
                        paramName="paymentStatus"
                        placeholder="Payment Status"
                        defaultValue="All Status"
                        options={[
                            { label: "Pending", value: "PENDING" },
                            { label: "Paid", value: "PAID" },
                            { label: "Cancelled", value: "CANCELLED" },
                        ]}
                    />
                    <ClearFiltersButton />
                </div>
            </div>
        </div>
    );
};

export default PaymentHistoryFilter;