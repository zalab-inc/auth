"use server";

import { resetPasswordSchema } from "./schema";
import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { returnValidationErrors } from "next-safe-action";
import { VerificationType } from "@prisma/client";
import { nanoid } from "nanoid";
import { sendPasswordResetEmail } from "@/lib/send-email";
import { passwordResetLimiter } from "@/lib/rate-limit";

export const resetPasswordAction = actionClient
	.schema(resetPasswordSchema)
	.action(async ({ parsedInput }) => {
		const { email } = parsedInput;

		// Rate limit password reset attempts per email address
		// Allows 5 attempts per hour (configured in rate-limit.ts)
		const identifier = `password_reset_${email}`;
		const { success, reset, remaining } =
			await passwordResetLimiter.limit(identifier);

		if (!success) {
			const minutes = Math.ceil((reset - Date.now()) / 1000 / 60);
			return returnValidationErrors(resetPasswordSchema, {
				_errors: [
					`Terlalu banyak percobaan reset password. Silakan coba lagi dalam ${minutes} menit. `,
				],
			});
		}

		// Verify user exists and get minimal required data
		const user = await prisma.user.findUnique({
			where: { email },
			select: { id: true, email: true },
		});

		if (!user) {
			return returnValidationErrors(resetPasswordSchema, {
				_errors: ["Pengguna tidak ditemukan"],
			});
		}

		// Generate secure reset token with 1 hour expiry
		const TOKEN_EXPIRY_HOURS = 1;
		const expiresAt = new Date(
			Date.now() + 1000 * 60 * 60 * TOKEN_EXPIRY_HOURS,
		);
		const token = nanoid(32); // 32 character random token

		// Store reset token in database, updating existing token if one exists
		// This invalidates any previous reset tokens for this user
		await prisma.verification.upsert({
			where: {
				userId_type: {
					userId: user.id,
					type: VerificationType.RESET_PASSWORD,
				},
			},
			update: {
				token,
				expiresAt,
			},
			create: {
				userId: user.id,
				token,
				type: VerificationType.RESET_PASSWORD,
				expiresAt,
			},
		});

		try {
			await sendPasswordResetEmail(user.email, token);
		} catch (error) {
			return returnValidationErrors(resetPasswordSchema, {
				_errors: ["Gagal mengirim email reset password"],
			});
		}

		// Return success response with remaining attempts for user feedback
		return {
			message: "Instruksi reset kata sandi telah dikirim ke email Anda",
			remaining,
		};
	});
