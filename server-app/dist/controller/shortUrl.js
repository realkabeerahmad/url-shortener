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
exports.deleteUrl = exports.getUrl = exports.getAllUrl = exports.createUrl = void 0;
const shortUrl_1 = require("../model/shortUrl");
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullUrl } = req.body;
        console.log("The Full URL received in request is: ", fullUrl);
        console.log("Going to check if URL exists in database!");
        const urlFound = yield shortUrl_1.urlModel.find({ fullUrl: fullUrl });
        if (urlFound.length > 0) {
            console.log("URL already exist in database: ", urlFound, '\nSending response to client!');
            res.status(409).json({ message: "URL already exists", data: urlFound });
        }
        else {
            console.log("URL do not exist in database!\nCreating new URL in database!");
            const shortUrl = yield shortUrl_1.urlModel.create({ fullUrl: fullUrl });
            console.log("URL stored in database!\nSending response to client!");
            res.status(201).json({ message: "URL created successfully", data: shortUrl });
        }
    }
    catch (error) {
        serverError(res, error);
    }
});
exports.createUrl = createUrl;
const getAllUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Fetching all URLs from database!");
        const shortUrls = yield shortUrl_1.urlModel.find();
        if (shortUrls.length > 0) {
            console.log("All URLs fetched from database!\nSending response to client!");
            res.status(200).json({ message: "All URLs", data: shortUrls });
        }
        else
            res.status(404).json({ message: "No URLs found", data: shortUrls });
    }
    catch (error) {
        serverError(res, error);
    }
});
exports.getAllUrl = getAllUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const shortUrl = yield shortUrl_1.urlModel.findOne({ shortUrl: id });
        if (!shortUrl) {
            console.log("URL not found in database!\nSending response to client!");
            res.status(404).json({ message: "URL not found", data: shortUrl });
        }
        else {
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`);
        }
    }
    catch (error) {
        serverError(res, error);
    }
});
exports.getUrl = getUrl;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id)
            res.status(400).json({ message: "Invalid Request" });
        const shortUrl = yield shortUrl_1.urlModel.findByIdAndDelete({ _id: id });
        if (shortUrl) {
            console.log("URL deleted from database!\nSending response to client!");
            res.status(200).json({ message: "URL deleted", data: shortUrl });
        }
        const htmlResponse = `<h1>Requested URL not found.</h1>`;
        res.status(404).json({ message: "URL not found", data: shortUrl }).send(htmlResponse);
    }
    catch (error) {
        serverError(res, error);
    }
});
exports.deleteUrl = deleteUrl;
const serverError = (res, error) => {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!", error });
};
