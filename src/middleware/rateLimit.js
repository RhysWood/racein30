import rateLimit from 'express-rate-limit';

export const rateLimiter = {
  throttle: rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 votes per 15 minutes
    message: { error: 'Too many votes, please try again later.' },
    headers: true,
  })
};
