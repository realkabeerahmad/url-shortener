"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shortUrl_1 = require("../controller/shortUrl");
const router = express_1.default.Router();
router.post("/", shortUrl_1.createUrl);
router.get("/", shortUrl_1.getAllUrl);
router.get("/:id", shortUrl_1.getUrl);
router.delete("/:id", shortUrl_1.deleteUrl);
exports.default = router;
