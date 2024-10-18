import { Router, Request, Response } from "express";
import userRouter from "./user";
import forgetPasswordRoute from "./forgetpassword";


const rootrouter:Router = Router();

rootrouter.use('/user',userRouter);
rootrouter.use('/password',forgetPasswordRoute);



export default rootrouter;