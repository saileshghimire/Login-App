"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserSchema = exports.LoginSchema = exports.RegisterSchema = void 0;
const zod_1 = require("zod");
exports.RegisterSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    mobile: zod_1.z.string(),
    address: zod_1.z.string(),
    profile: zod_1.z.string()
});
exports.LoginSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.UpdateUserSchema = zod_1.z.object({
    username: zod_1.z.string().optional(),
    password: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    mobile: zod_1.z.string().optional(),
    address: zod_1.z.string().optional(),
    profile: zod_1.z.string().optional()
});
