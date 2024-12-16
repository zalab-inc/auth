"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface ErrorDialogProps {
	title: string;
	description: string;
}

export function ErrorDialog({
	title = "Terjadi Kesalahan",
	description = "Terjadi kesalahan saat memproses permintaan Anda",
}: ErrorDialogProps) {
	return (
		<div
			className="w-full max-w-sm mx-auto flex flex-col gap-6"
			role="alert"
			aria-labelledby="error-title"
			aria-live="polite"
		>
			<Card className="w-full">
				<CardHeader className="text-center">
					<CardTitle id="error-title" className="text-xl">
						{title}
					</CardTitle>
					<CardDescription className="mt-2">{description}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6">
						<Link href="/auth/reset-password" className="w-full">
							<Button
								className="w-full"
								aria-label="Coba Reset Password Lagi"
								type="button"
							>
								Reset Password
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
