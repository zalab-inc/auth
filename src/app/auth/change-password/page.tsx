import type { Metadata } from "next";
import { ResetForm } from "./reset-form";
import { Container } from "@/components/shared/container";
import { ErrorDialog } from "./error-dialog";
import { verifyResetToken } from "./token-verify";
import { Suspense } from "react";

export const metadata: Metadata = {
	title: "Change Password",
	description: "Reset your password securely",
};

interface PageProps {
	searchParams: {
		token?: string;
	};
}

interface VerifyTokenProps {
	token: string;
}

// First, define the success response type
interface VerificationSuccess {
	success: true;
	verification: {
		id: string;
	};
}

// Define the validation error type
interface ValidationError {
	validationErrors: {
		_errors: string[];
	};
}

// Define the possible response types
type VerifyResetResponse = VerificationSuccess | ValidationError;

function LoadingState() {
	return (
		<Container>
			<div
				className="flex items-center justify-center min-h-[200px]"
				aria-label="Memverifikasi permintaan Anda"
			>
				<div className="text-gray-500">
					<span className="mr-2">Memverifikasi permintaan...</span>
					<span className="sr-only">Loading</span>
				</div>
			</div>
		</Container>
	);
}

async function VerifyToken({ token }: VerifyTokenProps) {
	try {
		const result = (await verifyResetToken({ token })) as VerifyResetResponse;

		// Handle validation errors (including rate limit)
		if ("validationErrors" in result) {
			const errorMessage = result.validationErrors._errors[0];
			const isRateLimit = errorMessage.includes("5 menit");

			return (
				<ErrorDialog
					title={isRateLimit ? "Terlalu Banyak Percobaan" : "Verifikasi Gagal"}
					actionText={isRateLimit ? "Kembali" : "Minta Reset Password Baru"}
					actionHref="/auth/reset-password"
				>
					{errorMessage}
				</ErrorDialog>
			);
		}

		// Handle successful verification
		if (result.success && result.verification) {
			return (
				<Container>
					<ResetForm verificationId={result.verification.id} token={token} />
				</Container>
			);
		}

		// Handle unexpected response format
		return (
			<ErrorDialog
				title="Verifikasi Gagal"
				actionText="Minta Reset Password Baru"
				actionHref="/auth/reset-password"
			>
				Token verifikasi tidak valid atau sudah kadaluarsa
			</ErrorDialog>
		);
	} catch (error) {
		console.error("[PasswordReset] Error:", {
			error: error instanceof Error ? error.message : "Unknown error",
			timestamp: new Date().toISOString(),
		});

		// Pastikan pesan error berupa string
		const errorMessage = error instanceof Error ? error.message : String(error);

		// Cek apakah error disebabkan oleh rate limit
		const isRateLimit =
			errorMessage.includes("5 menit") ||
			errorMessage.includes("Terlalu Banyak Permintaan") ||
			errorMessage.includes("rate limit");

		if (isRateLimit) {
			return (
				<ErrorDialog
					title="Terlalu Banyak Percobaan"
					actionText="Kembali"
					actionHref="/auth/reset-password"
				>
					Silahkan coba lagi dalam 5 menit kedepan
				</ErrorDialog>
			);
		}

		return (
			<ErrorDialog
				title="Terjadi Kesalahan"
				actionText="Kembali ke Reset Password"
				actionHref="/auth/reset-password"
			>
				Terjadi kesalahan saat memproses permintaan. Silakan coba lagi nanti.
			</ErrorDialog>
		);
	}
}

export default function ChangePasswordPage({ searchParams }: PageProps) {
	const { token } = searchParams;

	if (!token) {
		return (
			<ErrorDialog
				title="Token Tidak Ditemukan"
				actionText="Minta Reset Password"
				actionHref="/auth/reset-password"
			>
				Token reset password diperlukan untuk melanjutkan.
			</ErrorDialog>
		);
	}

	return (
		<Suspense fallback={<LoadingState />}>
			<VerifyToken token={token} />
		</Suspense>
	);
}
