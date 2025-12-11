/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerClientValidationZodSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";
import { revalidateTag } from "next/cache";





export const registerClient = async (_currentState: any, formData: any): Promise<any> => {

    const validationPayload = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword'),
        contactNumber: formData.get('contactNumber'),
        location: formData.get('location'),
        bio: formData.get('bio'),
        interests: formData.getAll('interests'),
        profilePhoto: formData.get('profilePhoto'),
    }

    // if (zodValidator(payload, registerClientValidationZodSchema).success === false) {
    //     return zodValidator(payload, registerClientValidationZodSchema);
    // }

    const validatedPayload = zodValidator(validationPayload, registerClientValidationZodSchema);

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

    const clientData = {
        password : validatedPayload.data.password,
        client : {
            name: validatedPayload.data.name,
            email: validatedPayload.data.email,
            contactNumber: validatedPayload.data.contactNumber,
            location: validatedPayload.data.location,
            bio: validatedPayload.data.bio,
            interests: validatedPayload.data.interests,
        }
    }

    newFormData.append("data", JSON.stringify(clientData));
    newFormData.append("file", formData.get("profilePhoto") as Blob);

    try {

        const res = await serverFetch.post("/user/create-client", {
            body: newFormData,
        })

        const result = await res.json();


        if (result.success) {
            await loginUser(_currentState, formData);
            revalidateTag("landing-page-stats", { expire: 0 });
        }

        return result;



    } catch (error: any) {

        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: error.message};
    }
}