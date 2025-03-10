import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbConfig';
import shortUrl from './routes/shortUrl';

dotenv.config();
connectDB();

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// app.use((req: Request, res: Response, next: NextFunction) => {
//     if (req.headers.host !== ALLOWED_HOST) {
//         return res.status(403).send('Access forbidden. Please use the correct domain.');
//     }
//     next();
// });


app.use('/', shortUrl);

app.get("/echo", (req, res) => {
    try {
        res.status(200).send("Hello World");
    } catch (error) {
        res.status(500).send("Internal Server Error");
        console.error(error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});