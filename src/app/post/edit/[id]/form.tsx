"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editPostSchema } from "./schema";
import { editPostAction } from "./actions";

export function EditPostForm({
	post,
}: { post: { id: string; title: string; body: string } }) {
	const { form, handleSubmitWithAction } = useHookFormAction(
		editPostAction,
		zodResolver(editPostSchema),
		{
			actionProps: {
				onSuccess: () => {
					toast.success("Post updated successfully");
				},
				onError: ({ error }) => {
					if (typeof error?.serverError === "string") {
						toast.error(error.serverError);
					}
				},
			},
			formProps: {
				defaultValues: {
					id: post.id,
					title: post.title,
					body: post.body,
				},
			},
			errorMapProps: {
				joinBy: " and ",
			},
		},
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-2xl">Edit Post</CardTitle>
				<CardDescription>Make changes to your post below.</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={handleSubmitWithAction} className="space-y-8">
						<div className="grid gap-4">
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel htmlFor="title">Title</FormLabel>
										<FormControl>
											<Input
												id="title"
												placeholder="Enter post title"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="body"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel htmlFor="body">Content</FormLabel>
										<FormControl>
											<Textarea
												id="body"
												placeholder="Enter post content"
												className="min-h-[200px]"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex justify-end space-x-2">
								<Link href="/post/list">
									<Button variant="outline" type="button">
										Cancel
									</Button>
								</Link>
								<Button type="submit" disabled={form.formState.isSubmitting}>
									{form.formState.isSubmitting ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Saving...
										</>
									) : (
										"Save Changes"
									)}
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
