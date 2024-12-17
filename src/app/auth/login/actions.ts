"use server";
import { prisma } from "@/lib/prisma";
import { loginLimiter } from "@/lib/rate-limit";
import { actionClient } from "@/lib/safe-action";
import { getSession } from "@/lib/sessions";
import { compare } from "bcrypt-ts";
import { returnValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { loginSchema } from "./schema";

export const loginAction = actionClient
	.schema(loginSchema)
	.action(async ({ parsedInput }) => {
		const { email, password } = parsedInput;

		// Rate limit login attempts
		const identifier = `login_${email}`;
		const { success, reset } = await loginLimiter.limit(identifier);

		// If rate limit is exceeded, return error message
		if (!success) {
			const minutes = Math.ceil((reset - Date.now()) / 1000 / 60);
			return returnValidationErrors(loginSchema, {
				_errors: [
					`Terlalu banyak percobaan login. Silakan coba lagi dalam ${minutes} menit. `,
				],
			});
		}

		// Check if user exists with provided email
		const user = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});
		if (!user) {
			return returnValidationErrors(loginSchema, {
				_errors: ["Email atau kata sandi salah"],
			});
		}

		// Verify password matches stored hash
		const isPasswordValid = await compare(password, user.password);
		if (!isPasswordValid) {
			return returnValidationErrors(loginSchema, {
				_errors: ["Email atau kata sandi salah"],
			});
		}

		// Create authenticated session
		const session = await getSession();
		session.userId = user.id;
		session.isLoggedIn = true;
		session.email = user.email;
		await session.save();

		redirect("/dashboard");
	});

export const logoutAction = async () => {
	// Destroy session
	const session = await getSession();
	session.destroy();
	redirect("/");
};
