import { z } from "zod";

export const changePasswordSchema = z
	.object({
		token: z.string().min(1, "Token tidak boleh kosong"),
		password: z
			.string()
			.min(8, "Kata sandi harus terdiri dari 8 karakter atau lebih"),
		confirmPassword: z
			.string()
			.min(8, "Kata sandi harus terdiri dari 8 karakter atau lebih"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Kata sandi dan konfirmasi kata sandi tidak cocok",
		path: ["confirmPassword"],
	});

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
