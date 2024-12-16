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
	children: React.ReactNode;
	title?: string;
	actionText?: string;
	actionHref?: string;
}

export function ErrorDialog({
	children,
	title = "Error Occurred",
	actionText = "Try Password Reset Again",
	actionHref = "/auth/reset-password",
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
					<CardDescription className="mt-2">{children}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6">
						<Link href={actionHref} className="w-full">
							<Button className="w-full" aria-label={actionText} type="button">
								{actionText}
							</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
