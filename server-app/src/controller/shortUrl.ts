import express from 'express';
import { urlModel } from '../model/shortUrl';

export const createUrl = async (req: express.Request, res: express.Response) => {
    try {
        const { fullUrl } = req.body;
        console.log("The Full URL received in request is: ", fullUrl);
        console.log("Going to check if URL exists in database!");
        const urlFound = await urlModel.find({ fullUrl: fullUrl });
        if (urlFound.length > 0) {
            console.log("URL already exist in database: ", urlFound, '\nSending response to client!');
            res.status(409).json({ message: "URL already exists", data: urlFound });
        }
        else {
            console.log("URL do not exist in database!\nCreating new URL in database!");
            const shortUrl = await urlModel.create({ fullUrl: fullUrl });
            console.log("URL stored in database!\nSending response to client!");
            res.status(201).json({ message: "URL created successfully", data: shortUrl });
        }
    } catch (error) {
        serverError(res, error);
    }
}
export const getAllUrl = async (req: express.Request, res: express.Response) => {
    try {
        console.log("Fetching all URLs from database!");
        const shortUrls = await urlModel.find();
        if (shortUrls.length > 0) {
            console.log("All URLs fetched from database!\nSending response to client!");
            res.status(200).json({ message: "All URLs", data: shortUrls });
        }
        else res.status(404).json({ message: "No URLs found", data: shortUrls });
    } catch (error) {
        serverError(res, error);
    }
}
export const getUrl = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const shortUrl = await urlModel.findOne({ shortUrl: id });
        if (!shortUrl) {
            console.log("URL not found in database!\nSending response to client!");
            const htmlResponse = `
            <div style="text-align: center; height: 100dvh; display: flex; flex-direction: column; justify-content: center; align-items: center; font-family: Arial, sans-serif;">
                <h1 style="font-size: 2em; color: #333; margin-bottom: 0.5em;">Oops! URL Not Found</h1>
                <p style="font-size: 1.2em; color: #777; margin-bottom: 1em;">The link you followed may be broken, or the page may have been removed.</p>
                <a href="#" style="background-color: #007BFF; color: white; padding: 0.75em 1.5em; text-decoration: none; border-radius: 5px; font-size: 1.1em;">Go Home</a>
            </div>`;
            res.status(404).send(htmlResponse);
        }
        else {
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`);
        }
    } catch (error) {
        serverError(res, error);
    }
}
export const deleteUrl = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if (!id) res.status(400).json({ message: "Invalid Request" });
        const shortUrl = await urlModel.findByIdAndDelete({ _id: id });
        if (shortUrl) {
            console.log("URL deleted from database!\nSending response to client!");
            res.status(200).json({ message: "URL deleted", data: shortUrl });
        }
        res.status(404).json({ message: "URL not found", data: shortUrl });
    } catch (error) {
        serverError(res, error);
    }
}


const serverError = (res: express.Response, error: any) => {
    console.error(error);
    res.status(500).json({ message: "Something went wrong!", error });
}