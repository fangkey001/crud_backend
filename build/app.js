"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const personRoutes_1 = __importDefault(require("./routes/personRoutes"));
const provincesRoutes_1 = __importDefault(require("./routes/provincesRoutes"));
const localesRoutes_1 = __importDefault(require("./routes/localesRoutes"));
// Load environment variables from .env file
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware morgan dev
app.use((0, morgan_1.default)("dev"));
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json({ limit: "1mb" }));
// Use cors middleware
app.use((0, cors_1.default)());
// Use routers
app.use("/api/persons", personRoutes_1.default);
app.use("/api/provinces", provincesRoutes_1.default);
app.use("/api/locales", localesRoutes_1.default);
// Start the server
app.listen(3001, () => {
    console.log(`connected successfully on port 3001`);
});
