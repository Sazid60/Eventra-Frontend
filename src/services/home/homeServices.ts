/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { contactFormValidationZodSchema } from "@/zod/auth.validation";
import { zodValidator } from "@/lib/zodValidator";


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

export async function sendContactEmail(_currentState: any, formData: FormData) {
    try {
        const payload = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            contactNumber: formData.get('contactNumber') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string,
        };

        // Validate with Zod
        const validationResult = zodValidator(payload, contactFormValidationZodSchema);
        if (!validationResult.success) {
            return {
                success: false,
                message: "Validation failed",
                errors: validationResult.errors,
                formData: payload
            };
        }

        const response = await serverFetch.post(`/user/send-email`, {
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to send message. Please try again.'}`
        };
    }
}
