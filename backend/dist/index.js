"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const secrets_1 = require("./secrets");
const router_1 = __importDefault(require("./router"));
const client_1 = require("@prisma/client");
const error_1 = require("./middleware/error");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use((0, morgan_1.default)('tiny'));
app.disable('x-powered-by');
app.use('/api', router_1.default);
exports.prisma = new client_1.PrismaClient();
app.get('/', (req, res) => {
    res.json("Hello ..");
});
app.use(error_1.errorMiddleware);
app.listen(secrets_1.PORT, () => {
    console.log(`Server is running on port http://localhost:${secrets_1.PORT}`);
});
