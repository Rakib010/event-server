
import { z } from "zod";
import { Role } from "./user.interface";


export const createUserZodSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().min(11, "Phone must be valid").optional(),
    location: z.string().min(2, "Location is required").optional(),
    profileImage: z.string().url("Profile image must be a valid URL").optional(),
    bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
    interests: z.array(z.string()).optional(),
    role: z.enum(Object.values(Role)),
    isActive: z.boolean().optional(),
});
