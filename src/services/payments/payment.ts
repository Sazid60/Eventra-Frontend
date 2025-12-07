/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export async function getUserPayments(queryString?: string) {
    try {
        const response = await serverFetch.get(`/payment${queryString ? `?${queryString}` : ""}`, {
            cache: "force-cache",
            next: { tags: ["user-payments"] }
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function revalidatePaymentData() {
    try {
        revalidateTag('user-payments', { expire: 0 });
        return { success: true };
    } catch (error: any) {
        console.log(error);
        return { success: false };
    }
}