"use server";

import { actionClient } from "@/lib/safe-action";
import { prisma } from "@/lib/prisma";
import { addPostSchema } from "./schema";
import { redirect } from "next/navigation";

export const addPostAction = actionClient
	.schema(addPostSchema)
	.action(async ({ parsedInput }) => {
		const post = await prisma.post.create({
			data: {
				title: parsedInput.title,
				body: parsedInput.body,
			},
		});
		redirect(`/post/edit/${post.id}`);
	});
