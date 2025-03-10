import express from 'express';

export const customDomain = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const allowedHost = 'short.ly'; // Your custom domain
    if (req.headers.host !== allowedHost) {
        return res.status(403).send('Access forbidden. Please use the correct domain.');
    }
    next();
}