"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgetPasswordSchema = void 0;
const zod_1 = require("zod");
exports.ForgetPasswordSchema = zod_1.z.object({
    password: zod_1.z.string(),
    confirmpassword: zod_1.z.string()
});
