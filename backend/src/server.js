import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import notesRoutes from './routes/notesRoutes.js';
import redisRateLimitingMiddleware from './middleware/redisMiddleware.js';

dotenv.config();

const app = express();
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'local') {
    app.use(cors({
        origin: 'http://localhost:5173'
    })); // Enable CORS for all routes
}
// app.use(expressRateLimiter); // Apply rate limiting middleware to all routes
app.use(redisRateLimitingMiddleware); // Apply Redis rate limiting middleware to all routes

app.use(express.json()); // Middleware to parse JSON request bodies

app.use('/api/notes', notesRoutes);

if (process.env.NODE_ENV === 'production') {

    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
