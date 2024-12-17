import { ErrorDialog } from "./error-dialog";
import { notFound } from "next/navigation";
import { getUserIdByToken } from "./verify";
import { TokenError } from "./type";
import type { Metadata } from "next";
import { ChangeForm } from "./change-form";

export const metadata: Metadata = {
	title: "Reset Password",
};

const ERROR_MESSAGES = {
	[TokenError.TOKEN_EXPIRED]: {
		title: "Token Kadaluarsa",
		description:
			"Token yang Anda gunakan sudah kadaluarsa. Silakan melakukan reset password kembali untuk mendapatkan token baru.",
	},
	[TokenError.TOKEN_NOTFOUND]: {
		title: "Token Tidak Ditemukan",
		description:
			"Token yang Anda gunakan tidak valid. Silakan periksa kembali link yang Anda gunakan.",
	},
	[TokenError.TOKEN_INVALID]: {
		title: "Token Tidak Valid",
		description:
			"Format token tidak valid. Silakan periksa kembali link yang Anda gunakan.",
	},
} as const;

type ValidationResult =
	| { isValid: true; userId: string }
	| {
			isValid: false;
			error: (typeof ERROR_MESSAGES)[keyof typeof ERROR_MESSAGES];
	  };

async function validateToken(token: string): Promise<ValidationResult> {
	const result = await getUserIdByToken({ token });

	if ("error" in result) {
		const error = ERROR_MESSAGES[result.error as TokenError];
		return { isValid: false, error };
	}

	return { isValid: true, userId: result.userId };
}

interface PageProps {
	searchParams: { token?: string };
}

export default async function Page({ searchParams }: PageProps) {
	const { token } = searchParams;

	if (!token) {
		return notFound();
	}

	const validation = await validateToken(token);

	if (!validation.isValid) {
		return (
			<ErrorDialog
				title={validation.error.title}
				description={validation.error.description}
			/>
		);
	}

	return (
		<div className="w-full max-w-sm mx-auto flex flex-col gap-6">
			<ChangeForm token={token} userId={validation.userId} />
		</div>
	);
}
