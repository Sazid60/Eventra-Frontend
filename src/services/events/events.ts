/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createEventValidationZodSchema, updateEventValidationZodSchema } from "@/zod/event.validation";
import { revalidateTag } from "next/cache";

export async function getRecentEvents() {
    try {
        const response = await serverFetch.get(`/event/recent-events`, {
            cache: "force-cache",
            next: { tags: ["recent-events"] }
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
            revalidateTag('event-participants', { expire: 0 });
            revalidateTag('single-event', { expire: 0 });
            revalidateTag('landing-page-stats', { expire: 0 });
            revalidateTag('recent-events', { expire: 0 })
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

export async function getEventApplications(queryString?: string) {
    try {
        const response = await serverFetch.get(`/admin/event-applications${queryString ? `?${queryString}` : ""}`, {
            cache: "force-cache",
            next: { tags: ["event-applications"] }
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

export async function getSingleEvent(id: string) {
    try {
        const response = await serverFetch.get(`/event/${id}`, {
            cache: "force-cache",
            next: { tags: ["single-event"] }
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

export async function getEventParticipants(id: string, queryString?: string) {
    try {
        const response = await serverFetch.get(`/event/participants/${id}${queryString ? `?${queryString}` : ""}`, {
            cache: "force-cache",
            next: { tags: ["event-participants"] }
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


export async function joinEvent(id: string) {
    try {
        const response = await serverFetch.post(`/event/join/${id}`, {
            cache: "no-store"
        });
        const result = await response.json();
        if (result.success) {
            revalidateTag('my-booked-events', { expire: 0 });
            revalidateTag('all-events', { expire: 0 });
            revalidateTag('event-participants', { expire: 0 });
            revalidateTag('single-event', { expire: 0 });
            revalidateTag('landing-page-stats', { expire: 0 });
            revalidateTag('recent-events', { expire: 0 })
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


export async function approveEventApplication(id: string) {
    try {
        const response = await serverFetch.patch(`/admin/event-application/${id}/approve`, {
            cache: "no-store"
        });
        const result = await response.json();
        if (result.success) {
            revalidateTag('event-applications', { expire: 0 });
            revalidateTag('all-events', { expire: 0 });
            revalidateTag('single-event', { expire: 0 });
            revalidateTag('landing-page-stats', { expire: 0 });
            revalidateTag('analytics', { expire: 0 });
            revalidateTag('recent-events', { expire: 0 })
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


export async function rejectEventApplication(id: string) {
    try {
        const response = await serverFetch.patch(`/admin/event-application/${id}/reject`, {
            cache: "no-store"
        });
        const result = await response.json();
        if (result.success) {
            revalidateTag('event-applications', { expire: 0 });
            revalidateTag('analytics', { expire: 0 });
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

export async function deleteEvent(id: string) {
    try {
        const response = await serverFetch.delete(`/host/event/${id}`, {
            cache: "no-store"
        });
        const result = await response.json();
        if (result.success) {
            revalidateTag('my-hosted-events', { expire: 0 });
            revalidateTag('analytics', { expire: 0 });
            revalidateTag('landing-page-stats', { expire: 0 });
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
            revalidateTag('all-events', { expire: 0 });
            revalidateTag('single-event', { expire: 0 });
            revalidateTag('event-participants', { expire: 0 });
            revalidateTag('analytics', { expire: 0 });
            revalidateTag('landing-page-stats', { expire: 0 });
            revalidateTag('recent-events', { expire: 0 })
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




export const createEvent = async (_currentState: any, formData: any) => {
    const validationPayload = {
        title: formData.get('title'),
        location: formData.get('location'),
        date: formData.get('date'),
        capacity: formData.get('capacity'),
        joiningFee: formData.get('joiningFee'),
        description: formData.get('description'),
        category: formData.getAll('category'),
        image: formData.get('image'),
    }

    const validatedPayload = zodValidator(validationPayload, createEventValidationZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        }
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        }
    }

    const newFormData = new FormData();

    const eventData = {
        title: validatedPayload.data.title,
        location: validatedPayload.data.location,
        date: validatedPayload.data.date,
        capacity: validatedPayload.data.capacity,
        joiningFee: validatedPayload.data.joiningFee,
        description: validatedPayload.data.description,
        category: validatedPayload.data.category,
    }

    newFormData.append("data", JSON.stringify(eventData));
    newFormData.append("file", formData.get("image") as Blob);

    try {
        const res = await serverFetch.post("/host/create-event", {
            body: newFormData,
        })

        const result = await res.json();

        if (result.success) {
            revalidateTag('my-hosted-events', { expire: 0 });
            revalidateTag('all-events', { expire: 0 });
            revalidateTag('landing-page-stats', { expire: 0 });
            revalidateTag('analytics', { expire: 0 });
            revalidateTag('recent-events', { expire: 0 })

        }

        return result

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : "Event creation failed. Please try again."}`
        };
    }
}


export const updateEvent = async (eventId: string, _currentState: any, formData: any) => {
    const validationPayload = {
        title: formData.get('title'),
        location: formData.get('location'),
        date: formData.get('date'),
        capacity: formData.get('capacity'),
        joiningFee: formData.get('joiningFee'),
        description: formData.get('description'),
        category: formData.getAll('category'),
        image: formData.get('image'),
    }
    

    const validatedPayload = zodValidator(validationPayload, updateEventValidationZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        }
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        }
    }

    const newFormData = new FormData();

    const eventData = {
        title: validatedPayload.data.title,
        location: validatedPayload.data.location,
        date: validatedPayload.data.date,
        capacity: validatedPayload.data.capacity,
        joiningFee: validatedPayload.data.joiningFee,
        description: validatedPayload.data.description,
        category: validatedPayload.data.category,
    }

    newFormData.append("data", JSON.stringify(eventData));

    // Only append file if it exists
    const imageFile = formData.get("image") as Blob;
    if (imageFile && imageFile.size > 0) {
        newFormData.append("file", imageFile);
    }

    try {
        const res = await serverFetch.patch(`/host/event/${eventId}`, {
            body: newFormData,
        })

        const result = await res.json();

        if (result.success) {
            revalidateTag('my-hosted-events', { expire: 0 });
            revalidateTag('all-events', { expire: 0 });
            revalidateTag('event-participants', { expire: 0 });
            revalidateTag('single-event', { expire: 0 });
            revalidateTag('landing-page-stats', { expire: 0 });
            revalidateTag('analytics', { expire: 0 });
            revalidateTag('recent-events', { expire: 0 })

        }

        return result

    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : "Event update failed. Please try again."}`
        };
    }
}

export async function addReview(transactionId: string, payload: { rating: number; comment: string }) {
    try {
        const response = await serverFetch.post(`/review/${transactionId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            cache: "no-store"
        });
        const result = await response.json();
        if (result.success) {
            revalidateTag('my-booked-events', { expire: 0 });
            revalidateTag('all-events', { expire: 0 });
            revalidateTag('single-event', { expire: 0 });
            revalidateTag('event-participants', { expire: 0 });
            revalidateTag('landing-page-stats', { expire: 0 });
            revalidateTag('latest-reviews', { expire: 0 })
        }
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to add review. Please try again.'}`
        };
    }
}




