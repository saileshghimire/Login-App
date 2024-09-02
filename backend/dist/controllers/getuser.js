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
exports.updateUser = exports.getUser = void 0;
const __1 = require("..");
const not_found_1 = require("../exceptions/not-found");
const root_1 = require("../exceptions/root");
const users_1 = require("../validation/users");
const bcryptjs_1 = require("bcryptjs");
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.params.username;
        const user = yield __1.prisma.user.findFirst({
            where: { username: username }
        });
        if (!user) {
            return next(new not_found_1.NotFoundException("User Not Found", root_1.ErrorCodes.USER_NOT_FOUND));
        }
        return res.json(user);
    }
    catch (error) {
        return next(new not_found_1.NotFoundException("An error occurred while fetching the user", root_1.ErrorCodes.USER_NOT_FOUND));
    }
});
exports.getUser = getUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = users_1.UpdateUserSchema.parse(req.body);
    const data = {
        username: body.username,
        email: body.email,
        firstName: body.firstName,
        lastname: body.lastName,
        mobile: body.mobile,
        address: body.address,
        profile: body.profile
    };
    if (body.password) {
        data.password = (0, bcryptjs_1.hashSync)(body.password, 10);
    }
    const updatedUser = yield __1.prisma.user.update({
        where: {
            id: req.userId,
        },
        data: data,
    });
    return res.json({
        message: "updated",
        updatedUser
    });
});
exports.updateUser = updateUser;
