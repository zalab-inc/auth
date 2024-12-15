import { prisma } from "@/lib/prisma";

export const getAllPosts = async () => {
	const posts = await prisma.post.findMany();
	return posts;
};
