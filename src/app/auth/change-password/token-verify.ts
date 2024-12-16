"use server";

import { prisma } from "@/lib/prisma";
import { VerificationType } from "@prisma/client";
import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { returnValidationErrors } from "next-safe-action";
import { passwordResetLimiter } from "@/lib/rate-limit";

// Validation schema
export const tokenSchema = z.object({
	token: z
		.string()
		.min(32, "Format token tidak valid")
		.max(256, "Format token tidak valid")
		.regex(/^[a-zA-Z0-9_-]+$/, "Format token tidak valid"),
});

export type TokenSchema = z.infer<typeof tokenSchema>;

const ERROR_MESSAGES = {
	RATE_LIMIT: "Silahkan coba lagi dalam 5 menit kedepan",
	INVALID_TOKEN: "Link reset kata sandi tidak valid atau sudah kadaluarsa",
	USER_NOT_FOUND: "Pengguna tidak ditemukan",
	SYSTEM_ERROR: "Terjadi kesalahan, silakan coba lagi nanti",
} as const;

export interface VerificationResult {
	id: string;
	userId: string;
	expiresAt: Date;
}

export const verifyResetToken = actionClient
	.schema(tokenSchema)
	.action(async ({ parsedInput }) => {
		const startTime = performance.now();

		try {
			// Rate limiting check
			const identifier = `reset_${parsedInput.token.slice(0, 16)}`;
			const { success, reset, remaining } =
				await passwordResetLimiter.limit(identifier);

			if (!success) {
				const minutes = Math.ceil((reset - Date.now()) / 1000 / 60);
				return returnValidationErrors(tokenSchema, {
					_errors: [
						`Terlalu banyak permintaan. Silakan coba lagi dalam ${minutes} menit. Sisa percobaan: ${remaining}`,
					],
				});
			}

			// Find verification record
			const verification = await prisma.verification.findFirst({
				where: {
					token: parsedInput.token,
					usedAt: null,
					expiresAt: { gt: new Date() },
					type: VerificationType.RESET_PASSWORD,
				},
				select: {
					id: true,
					userId: true,
					expiresAt: true,
				},
			});

			if (!verification) {
				console.warn("[TokenVerification] Invalid or expired token", {
					tokenLength: parsedInput.token.length,
					timestamp: new Date().toISOString(),
				});

				return returnValidationErrors(tokenSchema, {
					_errors: [ERROR_MESSAGES.INVALID_TOKEN],
				});
			}

			// Verify user exists
			const user = await prisma.user.findUnique({
				where: { id: verification.userId },
				select: { id: true },
			});

			if (!user) {
				console.error("[TokenVerification] User not found", {
					verificationId: verification.id,
					timestamp: new Date().toISOString(),
				});

				return returnValidationErrors(tokenSchema, {
					_errors: [ERROR_MESSAGES.USER_NOT_FOUND],
				});
			}

			return { success: true as const, verification };
		} catch (error) {
			console.error("[TokenVerification] Error:", {
				error: error instanceof Error ? error.message : "Unknown error",
				timestamp: new Date().toISOString(),
			});

			// Jika error adalah rate limit error
			if (
				error instanceof Error &&
				(error.message.includes("rate limit") ||
					error.message.includes("Too many requests"))
			) {
				return returnValidationErrors(tokenSchema, {
					_errors: [
						"Terlalu banyak permintaan. Silakan coba lagi dalam 5 menit kedepan",
					],
				});
			}

			return returnValidationErrors(tokenSchema, {
				_errors: [
					"Terlalu banyak permintaan. Silakan coba lagi dalam 5 menit kedepan",
				],
			});
		} finally {
			const duration = performance.now() - startTime;
			console.info("[TokenVerification] Performance", {
				durationMs: Math.round(duration),
				timestamp: new Date().toISOString(),
			});
		}
	});
