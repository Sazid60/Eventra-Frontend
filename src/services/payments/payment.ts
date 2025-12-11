/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

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
            message: error.message
        };
    }
}

