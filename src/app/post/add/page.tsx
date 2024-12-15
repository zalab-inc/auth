import { AddPostForm } from "./form";
import { Container } from "@/components/shared/twc";
import Link from "next/dist/client/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function Page() {
	return (
		<Container>
			<div className="flex flex-col gap-4 max-w-4xl w-full mx-auto">
				<Button asChild className="w-fit" variant="outline">
					<Link href="/post">
						<ChevronLeft className="w-4 h-4" />
						Back to list
					</Link>
				</Button>
				<AddPostForm />
			</div>
		</Container>
	);
}
