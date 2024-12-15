import { Loader2 } from "lucide-react";

export const Loader = () => {
	return (
		<div className="flex flex-col min-h-[vh] h-full w-full items-center justify-center px-4">
			<div className="flex flex-col items-center gap-4">
				<Loader2 className="h-10 w-10 animate-spin" />
				<p>Redirecting to dashboard...</p>
			</div>
		</div>
	);
};
