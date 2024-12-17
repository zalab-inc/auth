"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { GoogleLogo } from "@/components/shared/google-logo";
import { registerAction } from "./actions";
import { loginSchema } from "./schema";
import { ErrorMessage } from "@/app/auth/_components/error-message";
import { InputPassword } from "@/components/shared/input-password";
import { useState } from "react";
import { SuccessDialog } from "@/app/auth/register/success-dialog";

export function RegisterForm() {
	const { form, handleSubmitWithAction } = useHookFormAction(
		registerAction,
		zodResolver(loginSchema),
		{
			formProps: {
				defaultValues: {
					name: "",
					email: "",
					password: "",
				},
			},
			actionProps: {
				onSuccess: () => {
					setIsSuccess(true);
					toast.success("Akun berhasil dibuat");
				},
				onError: ({ error }) => {
					form.resetField("password");
					if (typeof error?.serverError === "string") {
						toast.error(error.serverError);
					}
				},
			},
			errorMapProps: {
				joinBy: " dan ",
			},
		},
	);
	const [isSuccess, setIsSuccess] = useState(false);

	form.watch(() => {
		if (form.formState.isDirty && form.formState.errors.root) {
			form.clearErrors("root");
		}
	});

	if (isSuccess) {
		return <SuccessDialog />;
	}

	return (
		<div className="w-full max-w-sm mx-auto flex flex-col gap-6">
			<Card className="w-full">
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Buat akun baru</CardTitle>
					<CardDescription>
						Daftar dengan akun Apple atau Google Anda
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={handleSubmitWithAction} className="grid gap-6">
							<div className="flex flex-col gap-4">
								<Button variant="outline" className="w-full">
									<GoogleLogo />
									Daftar dengan Google
								</Button>
							</div>
							<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
								<span className="relative z-10 bg-background px-2 text-muted-foreground">
									Atau lanjutkan dengan
								</span>
							</div>
							<div className="grid gap-6">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="grid gap-0">
											<FormLabel htmlFor="email">Email</FormLabel>
											<FormControl>
												<Input
													id="email"
													type="email"
													placeholder=""
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem className="grid gap-0">
											<FormLabel htmlFor="name">Nama</FormLabel>
											<FormControl>
												<Input
													id="name"
													type="text"
													placeholder=""
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="grid gap-0">
											<div className="flex items-center">
												<FormLabel htmlFor="password">Kata Sandi</FormLabel>
											</div>
											<FormControl>
												<InputPassword id="password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<ErrorMessage
									show={!!form.formState.errors.root}
									message={form.formState.errors.root?.message}
									onClose={() => form.clearErrors("root")}
								/>

								<Button
									type="submit"
									className="w-full"
									disabled={form.formState.isSubmitting}
								>
									{form.formState.isSubmitting ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Membuat akun...
										</>
									) : (
										"Buat akun"
									)}
								</Button>
							</div>
							<div className="text-center text-sm">
								Sudah punya akun?{" "}
								<Link
									href="/auth/login"
									className="underline underline-offset-4"
								>
									Masuk
								</Link>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				Dengan mengklik lanjutkan, Anda menyetujui{" "}
				<Link href="#">Ketentuan Layanan</Link> dan{" "}
				<Link href="#">Kebijakan Privasi</Link> kami.
			</div>
		</div>
	);
}
