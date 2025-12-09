/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";


export interface LandingPageStats {
    totalClients?: number;
    totalHosts: number;
    totalEvents: number;
    totalCompletedEvents: number;
}

export interface Review {
    id: string;
    transactionId: string;
    rating: number;
    comment: string;
    eventId: string;
    clientId: string;
    hostId: string;
    createdAt: string;
    client: {
        id: string;
        name: string;
        email: string;
        profilePhoto: string;
    };
    event: {
        id: string;
        title: string;
    };
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

export async function getLatestReviews() {
    try {
        const response = await serverFetch.get(`/review`, {
            cache: "force-cache",
            next: { tags: ["latest-reviews"] }
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
