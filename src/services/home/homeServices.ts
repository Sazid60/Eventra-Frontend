/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";


export interface LandingPageStats {
    totalUsers?: number;
    totalHosts: number;
    totalEvents: number;
    totalCompletedEvents: number;
}

export async function getLandingPageStats() {
    try {
        const response = await serverFetch.get(`/meta/landing-page`, {
            cache: "force-cache",
            next: { tags: ["landing-page-stats"] }
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
