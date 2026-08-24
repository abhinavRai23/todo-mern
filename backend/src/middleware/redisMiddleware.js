import redisRateLimiter from '../config/upstash.js';

// Middleware to apply rate limiting using Redis
const redisRateLimitingMiddleware = async (req, res, next) => {
    try {
        // Use a constant string to limit all requests with a single ratelimit
        // Or use a userID, apiKey or ip address for individual limits.
        const identifier = "todo-app-rate-limit";
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