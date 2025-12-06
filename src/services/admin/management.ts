/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export async function getAllClients(queryString?: string) {
    try {
        const response = await serverFetch.get(`/admin/clients${queryString ? `?${queryString}` : ""}`, {
            cache: "force-cache",
            next: { tags: ["all-clients"] }
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

export async function suspendClient(clientId: string) {
    try {
        const response = await serverFetch.patch(`/admin/suspend-user/${clientId}`, {
            cache: "no-store"
        });
        const result = await response.json();

        if (result.success) {
            revalidateTag("all-clients", { expire: 0 });
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

export async function unsuspendClient(clientId: string) {
    try {
        const response = await serverFetch.patch(`/admin/unsuspend-user/${clientId}`, {
            cache: "no-store"
        });
        const result = await response.json();

        if (result.success) {
            revalidateTag("all-clients", { expire: 0 });
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
