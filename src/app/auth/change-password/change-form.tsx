"use client";

import { useState } from "react";
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
import Link from "next/link";
import { ErrorMessage } from "@/app/auth/_components/error-message";
import { changePasswordAction } from "./actions";
import { changePasswordSchema } from "./schema";
import { SuccessDialog } from "./success-dialog";
import { InputPassword } from "@/components/shared/input-password";

interface ChangeFormProps {
	userId: string;
	token: string;
}

export function ChangeForm({ token, userId }: ChangeFormProps) {
	const [isSuccess, setIsSuccess] = useState(false);
	const { form, handleSubmitWithAction } = useHookFormAction(
		changePasswordAction,
		zodResolver(changePasswordSchema),
		{
			formProps: {
				defaultValues: {
					token,
					userId,
					password: "",
					confirmPassword: "",
				},
			},
			actionProps: {
				onSuccess: () => {
					setIsSuccess(true);
				},
				onError: ({ error }) => {
					const serverError = error?.serverError;
					if (typeof serverError === "string") {
						toast.error(serverError);
					}
				},
			},
			errorMapProps: {
				joinBy: " dan ",
			},
		},
	);

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
					<CardTitle className="text-xl">Ubah Kata Sandi</CardTitle>
					<CardDescription>Masukkan kata sandi baru Anda</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={handleSubmitWithAction} className="grid gap-6">
							<input type="hidden" name="token" value={token} />
							<input type="hidden" name="userId" value={userId} />
							<div className="grid gap-6">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="grid gap-0">
											<FormLabel htmlFor="password">Kata Sandi Baru</FormLabel>
											<FormControl>
												<InputPassword
													id="password"
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
									name="confirmPassword"
									render={({ field }) => (
										<FormItem className="grid gap-0">
											<FormLabel htmlFor="confirmPassword">
												Konfirmasi Kata Sandi
											</FormLabel>
											<FormControl>
												<InputPassword
													id="confirmPassword"
													placeholder=""
													{...field}
												/>
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
											Mengubah kata sandi...
										</>
									) : (
										"Ubah Kata Sandi"
									)}
								</Button>
							</div>
							<div className="text-center text-sm">
								Ingat kata sandi?{" "}
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
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
				Dengan mengklik lanjutkan, Anda menyetujui{" "}
				<Link href="#">Ketentuan Layanan</Link> dan{" "}
				<Link href="#">Kebijakan Privasi</Link> kami.
			</div>
		</div>
	);
}
