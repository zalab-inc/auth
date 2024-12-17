import { Resend } from "resend";
import { EmailTemplate } from "@/components/shared/email-template";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

if (!RESEND_API_KEY) {
	throw new Error("Missing required environment variable: RESEND_API_KEY");
}
if (!APP_URL) {
	throw new Error("Missing required environment variable: NEXT_PUBLIC_APP_URL");
}

function buildResetLink(token: string): string {
	return `${APP_URL}/auth/change-password?token=${token}`;
}

export async function sendPasswordResetEmail(email: string, token: string) {
	const resend = new Resend(RESEND_API_KEY);
	const resetLink = buildResetLink(token);

	try {
		const { error } = await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to: [email],
			subject: "Reset Password",
			react: EmailTemplate({
				resetLink,
			}),
		});

		if (error) {
			throw error;
		}
	} catch (error) {
		console.error("Failed to send reset password email:", error);
		throw new Error("Failed to send reset password email");
	}
}
