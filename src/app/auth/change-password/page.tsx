import { ErrorDialog } from "./error-dialog";
import { notFound } from "next/navigation";
import { getUserIdByToken } from "./verify";
import type { Metadata } from "next";
import { ChangeForm } from "./change-form";

export const metadata: Metadata = {
	title: "Reset Password",
};

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ token: string }>;
}) {
	const token = (await searchParams).token;

	if (!token) {
		return notFound();
	}

	const userId = await getUserIdByToken({ token: token as string });

	if (!userId) {
		return (
			<ErrorDialog
				title="Token Kadaluarsa"
				description="Token yang Anda gunakan sudah kadaluarsa. Silakan melakukan reset password kembali untuk mendapatkan token baru."
			/>
		);
	}

	return (
		<div>
			<ChangeForm token={token} userId={userId} />
		</div>
	);
}
