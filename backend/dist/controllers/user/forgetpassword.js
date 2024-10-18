"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.verifyingOtpforget = exports.forgetPassword = void 0;
const __1 = require("../..");
const bcryptjs_1 = require("bcryptjs");
const otpgenerate_1 = require("../otpgenerate");
const frogetpassword_1 = require("../../validation/frogetpassword");
const bad_request_1 = require("../../exceptions/bad-request");
const root_1 = require("../../exceptions/root");
const forgetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const email = req.email as string
    const username = req.body.username;
    const user = yield __1.prisma.user.findFirstOrThrow({
        where: {
            username: username
        },
        select: {
            email: true
        }
    });
    const otp = yield (0, otpgenerate_1.generateOTP)(user.email);
    yield (0, otpgenerate_1.sendOTP)(user.email, otp);
    return res.status(200).json({ message: "otp sent" });
});
exports.forgetPassword = forgetPassword;
const verifyingOtpforget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const email = req.email as string
    // console.log(email);
    const username = req.body.username;
    const user = yield __1.prisma.user.findFirstOrThrow({
        where: {
            username: username
        },
        select: {
            email: true
        }
    });
    const storedOtp = yield (0, otpgenerate_1.verifyotpFunction)(user.email, req.body.otp);
    if (!storedOtp) {
        return next(new bad_request_1.BadRequestsException("Invalid or expired OTP", root_1.ErrorCodes.INVALID_OTP));
    }
    return res.status(200).json({ message: "otp verified" });
});
exports.verifyingOtpforget = verifyingOtpforget;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = frogetpassword_1.ForgetPasswordSchema.parse(req.body);
    // const email = req.email as string;
    // const userId = req.userId;
    const username = req.body.username;
    const users = yield __1.prisma.user.findFirstOrThrow({
        where: {
            username: username
        },
        select: {
            email: true
        }
    });
    const user = yield __1.prisma.user.update({
        data: {
            password: (0, bcryptjs_1.hashSync)(body.password, 10)
        },
        where: {
            email: users.email
        }
    });
    if (!user) {
        next(new bad_request_1.BadRequestsException("Can't changed password", root_1.ErrorCodes.PASSWORD_NOT_CREATED));
    }
    return res.status(200).json({
        message: "Password changed successfully"
    });
});
exports.changePassword = changePassword;
