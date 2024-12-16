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

export function SuccessDialog() {
	return (
		<div className="w-full max-w-sm mx-auto flex flex-col gap-6">
			<Card className="w-full">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Pendaftaran Berhasil</CardTitle>
					<CardDescription>
						Akun Anda telah berhasil dibuat. Silakan masuk untuk melanjutkan.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6">
						<Link href="/auth/login">
							<Button className="w-full">Masuk ke Akun</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
