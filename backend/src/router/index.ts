import { Router, Request, Response } from "express";
import userRouter from "./user";


const rootrouter:Router = Router();

rootrouter.use('/user',userRouter);



export default rootrouter;