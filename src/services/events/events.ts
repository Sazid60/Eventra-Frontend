/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

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


export async function leaveEvent(id: string) {
    try {
        const response = await serverFetch.post(`/event/leave/${id}`, {
            cache: "no-store"
        });
        const result = await response.json();
        if (result.success) {
            revalidateTag('my-booked-events', { expire: 0 });
            revalidateTag('all-events', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}


export async function getMyHostedEvents(queryString?: string) {
    try {
        const response = await serverFetch.get(`/host/my-hosted-events${queryString ? `?${queryString}` : ""}`, {
            cache: "force-cache",
            next: { tags: ["my-hosted-events"] }
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

export async function deleteEvent(id: string) {
    try {
        const response = await serverFetch.delete(`/host/event/${id}`, {
            cache: "no-store"
        });
        const result = await response.json();
        if (result.success) {
            revalidateTag('my-hosted-events', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function completeEvent(id: string) {
    try {
        const response = await serverFetch.patch(`/host/event-complete/${id}`, {
            cache: "no-store"
        });
        const result = await response.json();
        if (result.success) {
            revalidateTag('my-hosted-events', { expire: 0 });
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}