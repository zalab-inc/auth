"use server";
import { changePasswordSchema } from "@/app/auth/change-password/schema";
import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { returnValidationErrors } from "next-safe-action";
import { VerificationType } from "@prisma/client";
import { hash } from "bcrypt-ts";
import { passwordResetLimiter } from "@/lib/rate-limit";

export const changePasswordAction = actionClient
	.schema(changePasswordSchema)
	.action(async ({ parsedInput }) => {
		const { token, password, userId } = parsedInput;

		// Rate limit password change attempts per user
		const identifier = `password_change_${userId}`;
		const { success, reset, remaining } =
			await passwordResetLimiter.limit(identifier);

		if (!success) {
			const minutes = Math.ceil((reset - Date.now()) / 1000 / 60);
			return returnValidationErrors(changePasswordSchema, {
				_errors: [
					`Terlalu banyak percobaan mengubah password. Silakan coba lagi dalam ${minutes} menit.`,
				],
			});
		}

		// Find verification record with matching token2
		const user = await prisma.verification.findFirst({
			where: {
				token,
				type: VerificationType.RESET_PASSWORD,
				expiresAt: {
					gt: new Date(),
				},
			},
			select: {
				id: true,
				userId: true,
			},
		});

		if (!user) {
			return returnValidationErrors(changePasswordSchema, {
				_errors: ["Token tidak valid atau sudah kedaluwarsa"],
			});
		}

		// Hash new password
		const hashedPassword = await hash(password, 10);

		// Update user password and delete verification
		await prisma.$transaction([
			prisma.user.update({
				where: { id: user.userId },
				data: { password: hashedPassword },
			}),
			prisma.verification.delete({
				where: { id: user.id },
			}),
		]);

		return {
			success: true,
			remaining,
		};
	});
