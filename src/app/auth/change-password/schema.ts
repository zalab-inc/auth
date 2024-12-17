import { z } from "zod";

export const changePasswordSchema = z
	.object({
		token: z.string().min(1, "Token tidak boleh kosong"),
		userId: z.string().min(1, "User ID tidak boleh kosong"),
		password: z
			.string()
			.min(6, "Kata sandi harus terdiri dari 6 karakter atau lebih")
			.regex(/[A-Z]/, "Kata sandi harus mengandung huruf kapital")
			.regex(/[a-z]/, "Kata sandi harus mengandung huruf kecil")
			.regex(/[0-9]/, "Kata sandi harus mengandung angka")
			.regex(/[^A-Za-z0-9]/, "Kata sandi harus mengandung karakter khusus"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Kata sandi dan konfirmasi kata sandi tidak cocok",
		path: ["confirmPassword"],
	});

export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
