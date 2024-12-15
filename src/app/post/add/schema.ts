import { z } from "zod";

export const addPostSchema = z.object({
	title: z.string().min(1, "Title is required"),
	body: z.string().min(1, "Body is required"),
});

export type AddPost = z.infer<typeof addPostSchema>;
