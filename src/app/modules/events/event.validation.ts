import { z } from "zod";

export const createEventZodSchema = z.object({
    name: z.string({
        message: "Event name is required",
    }).min(3, "Event name must be at least 3 characters"),

    type: z.string({
        message: "Event type is required",
    }),

    date: z.string({
        message: "Date is required",
    }).refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),

    time: z.string({
        message: "Time is required",
    }),

    location: z.string({
        message: "Location is required",
    }),

    minParticipants: z.number({
        message: "Minimum participants required",
    }).min(1, "Minimum participants must be at least 1"),

    maxParticipants: z.number({
        message: "Maximum participants required",
    }).min(1, "Maximum participants must be at least 1"),

    description: z.string({
        message: "Description is required",
    }).min(10, "Description must be at least 10 characters"),

    profileImage: z.string().optional(),

    joiningFee: z.number({
        message: "Joining fee is required",
    }).min(0, "Joining fee cannot be negative"),

    status: z.enum(["open", "full", "cancelled", "completed"]).optional(),

    host: z.string({
        message: "Host ID is required",
    }).min(1),
})
    .refine((data) => data.minParticipants <= data.maxParticipants, {
        message: "Minimum participants cannot be greater than maximum participants",
        path: ["minParticipants"],
    });
