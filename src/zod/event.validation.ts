import z from "zod";

export const createEventValidationZodSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    date: z.string().min(1, { message: "Date is required" }),
    capacity: z.coerce.number().min(1, { message: "Capacity must be at least 1" }),
    joiningFee: z.coerce.number().min(200, { message: "Joining fee Must be more than 200" }),
    description: z.string().min(1, { message: "Description is required" }),
    category: z.array(z.string()).min(1, { message: "At least one category is required" }),
    image: z.instanceof(File).optional(),
});

export const updateEventValidationZodSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    date: z.string().min(1, { message: "Date is required" }),
    capacity: z.coerce.number().min(1, { message: "Capacity must be at least 1" }),
    joiningFee: z.coerce.number().min(0, { message: "Joining fee cannot be negative" }),
    description: z.string().min(1, { message: "Description is required" }),
    category: z.array(z.string()).min(1, { message: "At least one category is required" }),
    image: z.instanceof(File).optional(),
});