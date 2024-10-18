import { z } from "zod";

export const ForgetPasswordSchema = z.object({
    password : z.string(),
    confirmpassword : z.string()
});
