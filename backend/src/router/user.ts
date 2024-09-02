import { Router } from "express";
import { errorMiddleware } from "../middleware/error";
import { errorHandler } from "../validation/error-handler";
import { login, logout, register } from "../controllers/user";


const userRouter:Router = Router();

userRouter.post('/register',errorHandler(register));
userRouter.post('/login',errorHandler(login));
userRouter.post('/logout',errorHandler(logout));

export default userRouter;