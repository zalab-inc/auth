"use server";
import { changePasswordSchema } from "@/app/auth/change-password/schema";
import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { returnValidationErrors } from "next-safe-action";
import { VerificationType } from "@prisma/client";
import { hash } from "bcrypt-ts";

export const changePasswordAction = actionClient
	.schema(changePasswordSchema)
	.action(async ({ parsedInput }) => {
		const { token, password } = parsedInput;

		// Find verification record with matching token2
		const verification = await prisma.verification.findFirst({
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

		if (!verification) {
			return returnValidationErrors(changePasswordSchema, {
				_errors: ["Token tidak valid atau sudah kedaluwarsa"],
			});
		}

		// Hash new password
		const hashedPassword = await hash(password, 10);

		// Update user password and delete verification
		await prisma.$transaction([
			prisma.user.update({
				where: { id: verification.userId },
				data: { password: hashedPassword },
			}),
			prisma.verification.delete({
				where: { id: verification.id },
			}),
		]);

		return {
			message: "Kata sandi berhasil diubah",
		};
	});
