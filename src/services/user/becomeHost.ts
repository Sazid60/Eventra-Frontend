"use server"

import { serverFetch } from "@/lib/server-fetch";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function becomeHost() {
    try {
        const response = await serverFetch.post(`/auth/apply-host`)
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