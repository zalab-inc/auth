import { z } from "zod";

export const resetPasswordSchema = z.object({
	email: z.string().email("Masukkan email yang valid"),
});

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
