/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

export async function getAllEvents(queryString?: string) {
    try {
        const response = await serverFetch.get(`/event/all-events${queryString ? `?${queryString}` : ""}`, {
            cache: "force-cache",
            next: { tags: ["all-events"] }
        })
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


export async function getMyBookedEvents(queryString?: string) {
    try {
        const response = await serverFetch.get(`/event/my-events${queryString ? `?${queryString}` : ""}`, {
            cache: "force-cache",
            next: { tags: ["my-booked-events"] }
        })
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