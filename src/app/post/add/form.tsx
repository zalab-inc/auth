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
import { addPostSchema } from "./schema";
import { addPostAction } from "./actions";

export function AddPostForm() {
	const { form, handleSubmitWithAction } = useHookFormAction(
		addPostAction,
		zodResolver(addPostSchema),
		{
			actionProps: {
				onError: ({ error }) => {
					if (typeof error?.serverError === "string") {
						toast.error(error.serverError);
					}
				},
			},
			formProps: {
				defaultValues: {
					title: "",
					body: "",
				},
			},
			errorMapProps: {
				joinBy: " and ",
			},
		},
	);

	return (
		<Card className="mx-auto max-w-sm w-full">
			<CardHeader>
				<CardTitle className="text-2xl">Add New Post</CardTitle>
				<CardDescription>Create a new post below.</CardDescription>
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
											Creating...
										</>
									) : (
										"Create Post"
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
