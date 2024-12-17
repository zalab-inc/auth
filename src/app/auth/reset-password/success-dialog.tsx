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
					<CardTitle className="text-xl">Periksa Email Anda</CardTitle>
					<CardDescription>
						Silakan periksa kotak masuk atau folder spam untuk link reset kata
						sandi yang telah kami kirimkan.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-6">
						<Link href="/auth/login">
							<Button className="w-full">Kembali ke Halaman Login</Button>
						</Link>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
