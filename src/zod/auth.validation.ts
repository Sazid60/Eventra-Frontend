/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod";

export const registerClientValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    contactNumber: z.string().min(1, { message: "Contact Number is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    bio: z.string().min(1, { message: "Bio is required" }),
    interests: z.array(z.string()).min(1, { message: "At least one interest is required" }),
    email: z.email({ message: "Valid email is required" }),
    profilePhoto: z
        .instanceof(File).optional(),
    password: z.string().min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
    confirmPassword: z.string().min(6, {
        error: "Confirm Password is required and must be at least 6 characters long",
    }),
}).refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
});

export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});

export const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z
            .string()
            .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

