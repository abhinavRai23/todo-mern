import rateLimit from 'express-rate-limit';

const expressRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export default expressRateLimiter;