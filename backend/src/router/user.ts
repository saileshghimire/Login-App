import { Router } from "express";
import { errorMiddleware } from "../middleware/error";
import { errorHandler } from "../validation/error-handler";
import { register } from "../controllers/user";


const userRouter:Router = Router();

userRouter.post('/signin',errorHandler(register));

export default userRouter;