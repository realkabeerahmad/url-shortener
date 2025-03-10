"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const shortUrl_1 = __importDefault(require("./routes/shortUrl"));
dotenv_1.default.config();
(0, dbConfig_1.default)();
const port = process.env.PORT || 5001;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use('/', shortUrl_1.default);
app.get("/echo", (req, res) => {
    try {
        res.status(200).send("Hello World");
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error);
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
