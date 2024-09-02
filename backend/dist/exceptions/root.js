"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCodes = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, errorCode, statusCode, errors) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}
exports.HttpException = HttpException;
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes[ErrorCodes["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCodes[ErrorCodes["USER_ALREADY_EXISTS"] = 1002] = "USER_ALREADY_EXISTS";
    ErrorCodes[ErrorCodes["USERNAME_ALREADY_EXISTS"] = 1003] = "USERNAME_ALREADY_EXISTS";
    ErrorCodes[ErrorCodes["INCORRECT_PASSWORD"] = 1004] = "INCORRECT_PASSWORD";
    ErrorCodes[ErrorCodes["Unprocessable_ENTITY"] = 2001] = "Unprocessable_ENTITY";
    ErrorCodes[ErrorCodes["INTERNAL_EXCEPTION"] = 3001] = "INTERNAL_EXCEPTION";
})(ErrorCodes || (exports.ErrorCodes = ErrorCodes = {}));
