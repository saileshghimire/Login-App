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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPassword = exports.logout = exports.login = exports.verifyOTP = exports.register = void 0;
const index_1 = require("../index");
const users_1 = require("../validation/users");
const bcryptjs_1 = require("bcryptjs");
const bad_request_1 = require("../exceptions/bad-request");
const root_1 = require("../exceptions/root");
const not_found_1 = require("../exceptions/not-found");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: secrets_1.EMAIL_USER,
        pass: secrets_1.EMAIL_PASS
    }
});
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = users_1.RegisterSchema.parse(req.body);
    let existingUser = yield index_1.prisma.user.findFirst({
        where: {
            OR: [
                { email: body.email },
                { username: body.username }
            ]
        }
    });
    if (existingUser) {
        next(new bad_request_1.BadRequestsException(existingUser.email === body.email ? "Email already exists" : "Username already exists", existingUser.email === body.email ? root_1.ErrorCodes.USER_ALREADY_EXISTS : root_1.ErrorCodes.USERNAME_ALREADY_EXISTS));
    }
    else {
        const otp = crypto_1.default.randomInt(100000, 999999).toString();
        yield index_1.prisma.otp.create({
            data: {
                email: body.email,
                otp: otp,
                expiresAt: new Date(Date.now() + 1 * 60 * 1000)
            }
        });
        yield transporter.sendMail({
            from: secrets_1.EMAIL_USER,
            to: body.email,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otp}. It is valid for 1 minutes.`
        });
        return res.status(200).json({ message: "OTP has been sent to your email." });
        // const user = await prisma.user.create({
        //     data:{
        //         username:body.username,
        //         password: hashSync(body.password,10),
        //         email: body.email,
        //         firstName: body.firstName,
        //         lastname:body.lastName,
        //         mobile: body.mobile,
        //         address: body.address,
        //         profile: body.profile
        //     }
        // })
        // return res.status(200).json(user);      
    }
});
exports.register = register;
const verifyOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = users_1.VerifyOtpSchema.parse(req.body);
    const storedOtp = yield index_1.prisma.otp.findFirst({
        where: {
            email: body.email,
            otp: body.otp,
            expiresAt: {
                gte: new Date()
            }
        }
    });
    if (!storedOtp) {
        return next(new bad_request_1.BadRequestsException("Invalid or expired OTP", root_1.ErrorCodes.INVALID_OTP));
    }
    else {
        const user = yield index_1.prisma.user.create({
            data: {
                username: body.username,
                password: (0, bcryptjs_1.hashSync)(body.password, 10),
                email: body.email
            }
        });
        yield index_1.prisma.otp.delete({
            where: {
                email: body.email
            }
        });
        return res.status(201).json({ message: "Account created successfully", user });
    }
});
exports.verifyOTP = verifyOTP;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = users_1.LoginSchema.parse(req.body);
    let user = yield index_1.prisma.user.findFirst({
        where: {
            username: body.username
        },
        select: {
            id: true,
            password: true
        }
    });
    if (!user) {
        return next(new not_found_1.NotFoundException('User Doesnot exist', root_1.ErrorCodes.USER_NOT_FOUND));
    }
    if (!(0, bcryptjs_1.compareSync)(body.password, user.password)) {
        return next(new bad_request_1.BadRequestsException('Incorrect password', root_1.ErrorCodes.INCORRECT_PASSWORD));
    }
    const token = jsonwebtoken_1.default.sign({
        userId: user.id
    }, secrets_1.JWT_SECRET);
    res.cookie("token", token).json({
        message: "Logged in!"
    });
});
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("token").json({
        message: "Logged out!"
    });
};
exports.logout = logout;
const forgetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.forgetPassword = forgetPassword;
