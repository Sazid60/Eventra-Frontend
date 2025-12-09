/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { updateAdminProfileValidationZodSchema, updateHostProfileValidationZodSchema, updateProfileValidationZodSchema } from "@/zod/auth.validation";
import { revalidateTag } from "next/cache";

export async function getMe() {
    try {
        const response = await serverFetch.get("/auth/me", {
            cache: "force-cache",
            next: { tags: ["user-profile"] }
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

export async function updateMyProfile(_currentState: any, formData: FormData): Promise<any> {
    try {
        const role = (formData.get("role") as string) || "CLIENT";

        const validationPayload = {
            name: formData.get("name"),
            contactNumber: formData.get("contactNumber"),
            location: formData.get("location"),
            bio: formData.get("bio"),
            interests: formData.getAll("interests"),
            profilePhoto: formData.get("profilePhoto"),
        };

        const schema = role === "HOST"
            ? updateHostProfileValidationZodSchema
            : role === "ADMIN"
                ? updateAdminProfileValidationZodSchema
                : updateProfileValidationZodSchema;

        const validatedPayload = zodValidator(validationPayload, schema);

        if (!validatedPayload.success && validatedPayload.errors) {
            return {
                success: false,
                message: "Validation failed",
                formData: validationPayload,
                errors: validatedPayload.errors,
            };
        }

        if (!validatedPayload.data) {
            return {
                success: false,
                message: "Validation failed",
                formData: validationPayload,
            };
        }

        const newFormData = new FormData();
        const profileData = role === "ADMIN"
            ? {
                contactNumber: validatedPayload.data.contactNumber,
            }
            : role === "HOST"
                ? {
                    name: validatedPayload.data.name,
                    contactNumber: validatedPayload.data.contactNumber,
                    location: validatedPayload.data.location,
                    bio: validatedPayload.data.bio,
                }
                : {
                    name: validatedPayload.data.name,
                    contactNumber: validatedPayload.data.contactNumber,
                    location: validatedPayload.data.location,
                    bio: validatedPayload.data.bio,
                    interests: validatedPayload.data.interests,
                };

        newFormData.append("data", JSON.stringify(profileData));

        // Add file if exists
        const file = formData.get("profilePhoto");
        if (file && file instanceof File && file.size > 0) {
            newFormData.append("file", file);
        }

        const response = await serverFetch.patch("/user/update-my-profile", {
            body: newFormData,
            cache: "no-store"
        });

        const result = await response.json();

        if (result.success) {
            revalidateTag("user-profile", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}
