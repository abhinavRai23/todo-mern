import redisRateLimiter from '../config/upstash.js';

// Middleware to apply rate limiting using Redis
const redisRateLimitingMiddleware = async (req, res, next) => {
    try {
        // Rate limit per IP, prefixed with app name for readable Redis keys
        // Key format in Redis: @upstash/ratelimit:todo-app:<ip>
        const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
        const identifier = `todo-app:${ip}`;
        const { success } = await redisRateLimiter.limit(identifier);

        if (!success) {
            return res.status(429).json({ message: "Too many requests. Please try again later." });
        }
        next();
    } catch (error) {
        console.error("Error in Redis rate limiting middleware:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export default redisRateLimitingMiddleware;