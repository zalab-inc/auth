"use server";

import { returnValidationErrors } from "next-safe-action";
import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { deletePostSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const deletePostAction = actionClient
	.schema(deletePostSchema)
	.action(async ({ parsedInput }) => {
		const deletedPost = await prisma.post.delete({
			where: {
				id: parsedInput.id,
			},
		});

		if (!deletedPost?.id) {
			return returnValidationErrors(deletePostSchema, {
				_errors: ["Failed to delete post"],
			});
		}

		revalidatePath("/post/list");
		return {
			success: true,
		};
	});
