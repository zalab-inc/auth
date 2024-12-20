import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1, { message: "Kata sandi wajib diisi" }),
});

export type LoginType = z.infer<typeof loginSchema>;
