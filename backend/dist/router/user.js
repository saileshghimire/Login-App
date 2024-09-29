"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const error_handler_1 = require("../validation/error-handler");
const user_1 = require("../controllers/user");
const getuser_1 = require("../controllers/getuser");
const authorization_1 = require("../middleware/authorization");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', (0, error_handler_1.errorHandler)(user_1.register));
userRouter.post('/login', (0, error_handler_1.errorHandler)(user_1.login));
userRouter.post('/logout', (0, error_handler_1.errorHandler)(user_1.logout));
userRouter.get('/:username', (0, error_handler_1.errorHandler)(getuser_1.getUser));
userRouter.post('/verifyOTP', (0, error_handler_1.errorHandler)(user_1.verifyOTP));
userRouter.put('/update', [authorization_1.authMiddleware], (0, error_handler_1.errorHandler)(getuser_1.updateUser));
exports.default = userRouter;
