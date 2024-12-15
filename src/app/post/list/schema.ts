import { z } from "zod";

// post schema
export const postSchema = z.object({
	id: z.string(),
	title: z.string(),
	body: z.string(),
});
export type Post = z.infer<typeof postSchema>;

// delete post schema
export const deletePostSchema = z.object({
	id: z.string(),
});
export type DeletePost = z.infer<typeof deletePostSchema>;
