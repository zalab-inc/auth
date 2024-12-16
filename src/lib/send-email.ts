import { Resend } from "resend";
import { EmailTemplate } from "@/components/shared/email-template";

export async function sendPasswordResetEmail(email: string, token: string) {
	if (!process.env.RESEND_API_KEY || !process.env.NEXT_PUBLIC_APP_URL) {
		throw new Error("Missing required environment variables");
	}

	const resend = new Resend(process.env.RESEND_API_KEY);
	const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/change-password?token=${token}`;

	const { error } = await resend.emails.send({
		from: "Acme <onboarding@resend.dev>",
		to: [email],
		subject: "Reset Password",
		react: EmailTemplate({
			resetLink,
		}),
	});

	if (error) {
		console.error("Failed to send reset password email:", error);
		throw new Error("Failed to send reset password email");
	}
}
