import { Router } from "express";
import { errorHandler } from "../validation/error-handler";
import { login, logout, register } from "../controllers/user";
import { getUser, updateUser } from "../controllers/getuser";
import { authMiddleware } from "../middleware/authorization";


const userRouter:Router = Router();

userRouter.post('/register',errorHandler(register));
userRouter.post('/login',errorHandler(login));
userRouter.post('/logout',errorHandler(logout));
userRouter.get('/:username',errorHandler(getUser));
userRouter.put('/update',[authMiddleware],errorHandler(updateUser));

export default userRouter;