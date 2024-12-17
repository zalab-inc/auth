"use client";

import { ErrorMessage } from "@/app/auth/_components/error-message";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { resetPasswordAction } from "./actions";
import { resetPasswordSchema } from "./schema";
import { SuccessDialog } from "./success-dialog";

export function ResetForm() {
	const { form, handleSubmitWithAction } = useHookFormAction(
		resetPasswordAction,
		zodResolver(resetPasswordSchema),
		{
			formProps: {
				defaultValues: {
					email: "",
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
					<CardTitle className="text-xl">Reset Kata Sandi</CardTitle>
					<CardDescription>
						Masukkan email Anda untuk reset kata sandi
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={handleSubmitWithAction} className="grid gap-6">
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
													placeholder="email@anda.com"
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
											Mengirim instruksi reset...
										</>
									) : (
										"Reset Kata Sandi"
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
		</div>
	);
}
