import { z } from "zod";

export const RegisterSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    mobile: z.string(),
    address:z.string(),
    profile:z.string()
})