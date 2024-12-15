import { EditPostForm } from "./form";
import { getPost } from "./query";
import { Container } from "@/components/shared/twc";
import Link from "next/dist/client/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const id = (await params).id;
	const post = await getPost(id);

	if (!post) {
		return (
			<Container>
				<div>Post not found</div>
			</Container>
		);
	}
	return (
		<Container>
			<div className="flex flex-col gap-4 max-w-4xl w-full mx-auto">
				<Button asChild className="w-fit" variant="outline">
					<Link href="/post">
						<ChevronLeft className="w-4 h-4" />
						Back to list
					</Link>
				</Button>
				<EditPostForm post={post} />
			</div>
		</Container>
	);
}
