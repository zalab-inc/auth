import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Pencil, PlusCircle } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";
import { getAllPosts } from "./query";

const EmptyState = () => {
	return (
		<div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
			<div className="flex flex-col items-center space-y-2">
				<h1 className="text-2xl font-bold text-gray-900">No posts found</h1>
				<p className="text-gray-500">Get started by creating your first post</p>
			</div>

			<Link href="/post/create">
				<Button className="flex items-center space-x-2">
					<PlusCircle className="h-4 w-4" />
					<span>Create Post</span>
				</Button>
			</Link>
		</div>
	);
};

export default async function PostListPage() {
	const posts = await getAllPosts();

	if (posts.length < 1) {
		return <EmptyState />;
	}
	return (
		<div className="w-full max-w-7xl mx-auto">
			<div className="flex justify-end mb-4">
				<Button asChild className="w-fit" variant="outline">
					<Link href="/post/add">
						<PlusCircle className="w-4 h-4" />
						Add Post
					</Link>
				</Button>
			</div>
			<Table className="border rounded-md">
				<TableHeader>
					<TableRow>
						<TableHead>Title</TableHead>
						<TableHead>Content</TableHead>
						<TableHead className="w-[100px]">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{posts.map((post) => (
						<TableRow key={post.id}>
							<TableCell className="font-medium">{post.title}</TableCell>
							<TableCell>{post.body}</TableCell>
							<TableCell>
								<Link href={`/post/edit/${post.id}`}>
									<Button variant="ghost" size="icon">
										<Pencil className="h-4 w-4" />
									</Button>
								</Link>
								<DeleteButton id={post.id} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
