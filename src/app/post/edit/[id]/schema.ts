import { z } from "zod";

export const editPostSchema = z.object({
	id: z.string(),
	title: z.string().min(1, "Title is required"),
	body: z.string().min(1, "Body is required"),
});

export type EditPost = z.infer<typeof editPostSchema>;
