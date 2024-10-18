import { Router } from "express";
import { errorHandler } from "../validation/error-handler";
import { authMiddleware } from "../middleware/authorization";
import { changePassword, forgetPassword, verifyingOtpforget } from "../controllers/user/forgetpassword";

const forgetPasswordRoute:Router = Router();

forgetPasswordRoute.post('/forgetPassword',errorHandler(forgetPassword));
forgetPasswordRoute.post('/verifyingOtpforget',errorHandler(verifyingOtpforget));
forgetPasswordRoute.post('/changePassword',errorHandler(changePassword));


export default forgetPasswordRoute;