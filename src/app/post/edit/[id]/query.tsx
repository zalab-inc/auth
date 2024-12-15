import { prisma } from "@/lib/prisma";

export const getPost = async (id: string) => {
	const post = await prisma.post.findUnique({
		where: {
			id: id,
		},
	});
	return post;
};
