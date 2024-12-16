import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="flex flex-row gap-4">
				<Button asChild>
					<Link href="/auth/login">Login</Link>
				</Button>
				<Button asChild>
					<Link href="/auth/register">Register</Link>
				</Button>
			</div>
		</div>
	);
}
