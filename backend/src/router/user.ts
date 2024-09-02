import { Router } from "express";
import { errorMiddleware } from "../middleware/error";
import { errorHandler } from "../validation/error-handler";
import { login, logout, register } from "../controllers/user";
import { getUser, updateUser } from "../controllers/getuser";


const userRouter:Router = Router();

userRouter.post('/register',errorHandler(register));
userRouter.post('/login',errorHandler(login));
userRouter.post('/logout',errorHandler(logout));
userRouter.get('/:username',errorHandler(getUser));
userRouter.put('/update',errorHandler(updateUser));

export default userRouter;