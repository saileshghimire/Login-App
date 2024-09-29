import { z } from "zod";

export const RegisterSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    mobile: z.string().optional(),
    address:z.string().optional(),
    profile:z.string().optional()
})

export const LoginSchema = z.object({
    username: z.string(),
    password: z.string()
})

export const UpdateUserSchema = z.object({
    username: z.string().optional(),
    password: z.string().optional(),
    email: z.string().email().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    mobile: z.string().optional(),
    address:z.string().optional(),
    profile:z.string().optional()
})

export const VerifyOtpSchema = z.object({
    email: z.string().email(),
    otp: z.string(),
    username: z.string(),
    password: z.string()
})