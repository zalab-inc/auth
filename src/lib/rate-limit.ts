import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Check Redis credentials
if (
	!process.env.UPSTASH_REDIS_REST_URL ||
	!process.env.UPSTASH_REDIS_REST_TOKEN
) {
	throw new Error("Redis credentials are not configured");
}

// Initialize Redis client
const redis = new Redis({
	url: process.env.UPSTASH_REDIS_REST_URL,
	token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Password reset: 1 attempts per 5 minutes
export const passwordResetLimiter = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(1, "5 m"),
	analytics: true,
	prefix: "password_reset",
});

// Login: 1 attempts per 5 minutes
export const loginLimiter = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(1, "5 m"),
	analytics: true,
	prefix: "login",
});

// Register: 1 attempts per 5 minutes
export const registerLimiter = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(1, "5 m"),
	analytics: true,
	prefix: "register",
});
