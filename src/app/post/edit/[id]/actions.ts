"use server";

import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { editPostSchema } from "./schema";
import { revalidatePath } from "next/cache";

export const editPostAction = actionClient
	.schema(editPostSchema)
	.action(async ({ parsedInput }) => {
		await prisma.post.update({
			where: {
				id: parsedInput.id,
			},
			data: {
				title: parsedInput.title,
				body: parsedInput.body,
			},
		});

		revalidatePath("/post/list");
		return {
			success: true,
		};
	});
