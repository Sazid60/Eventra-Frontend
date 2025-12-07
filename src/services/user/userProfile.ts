/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
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
        // Extract all form fields
        const profileData: any = {
            name: formData.get('name'),
            contactNumber: formData.get('contactNumber'),
            location: formData.get('location'),
            bio: formData.get('bio'),
        };

        // Get interests if they exist (for client)
        const interests = formData.getAll('interests');
        if (interests && interests.length > 0) {
            profileData.interests = interests;
        }

        // Remove undefined/null fields
        Object.keys(profileData).forEach(key => {
            if (profileData[key] === null || profileData[key] === '' || profileData[key] === 'null') {
                delete profileData[key];
            }
        });

        // Create new FormData with proper structure
        const newFormData = new FormData();
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
