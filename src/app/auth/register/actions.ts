"use server";
import { loginSchema } from "./schema";
import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { returnValidationErrors } from "next-safe-action";
import { hash } from "bcrypt-ts";
import { registerLimiter } from "@/lib/rate-limit";

export const registerAction = actionClient
	.schema(loginSchema)
	.action(async ({ parsedInput }) => {
		const { email, password } = parsedInput;

		// Check rate limit for registration attempts
		const identifier = `register_${email}`;
		const { success, reset, remaining } =
			await registerLimiter.limit(identifier);

		if (!success) {
			const minutes = Math.ceil((reset - Date.now()) / 1000 / 60);
			return returnValidationErrors(loginSchema, {
				_errors: [
					`Terlalu banyak percobaan. Silakan coba lagi dalam ${minutes} menit.`,
				],
			});
		}

		// Verify email is not already registered
		const userExists = await prisma.user.findFirst({
			where: {
				email: email,
			},
		});
		if (userExists) {
			return returnValidationErrors(loginSchema, {
				_errors: ["Email sudah terdaftar"],
			});
		}

		// Create new user with hashed password
		const hashedPassword = await hash(password, 10);
		await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		return {
			message: "Akun berhasil dibuat",
			remaining,
		};
	});
