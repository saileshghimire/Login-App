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
exports.deleteOTP = exports.verifyotpFunction = exports.sendOTP = exports.generateOTP = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const secrets_1 = require("../secrets");
const crypto_1 = __importDefault(require("crypto"));
const __1 = require("..");
const generateOTP = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const OTP = crypto_1.default.randomInt(100000, 999999).toString();
        yield __1.prisma.otp.create({
            data: {
                email: email,
                otp: OTP,
                expiresAt: new Date(Date.now() + 1 * 60 * 1000)
            }
        });
        return OTP;
    }
    catch (error) {
        return error;
    }
});
exports.generateOTP = generateOTP;
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
const sendOTP = (email, otp, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield transporter.sendMail({
            from: secrets_1.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otp}. It is valid for 1 minutes.`
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendOTP = sendOTP;
const verifyotpFunction = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    return yield __1.prisma.otp.findFirst({
        where: {
            email: email,
            otp: otp,
            expiresAt: {
                gte: new Date()
            }
        }
    });
});
exports.verifyotpFunction = verifyotpFunction;
const deleteOTP = (email) => __awaiter(void 0, void 0, void 0, function* () {
    yield __1.prisma.otp.delete({
        where: {
            email: email
        }
    });
});
exports.deleteOTP = deleteOTP;
