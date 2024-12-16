import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
	message?: string;
	className?: string;
	size?: "sm" | "md" | "lg";
}

const sizeMap = {
	sm: "h-6 w-6",
	md: "h-8 w-8",
	lg: "h-10 w-10",
} as const;

export const Loader = forwardRef<HTMLDivElement, LoaderProps>(
	({ message = "Loading...", className, size = "lg", ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn(
					"flex flex-col min-h-[100vh] h-full w-full items-center justify-center px-4",
					className,
				)}
				{...props}
			>
				<div
					className="flex flex-col items-center gap-4"
					aria-label="Loading content"
				>
					<Loader2
						className={cn(sizeMap[size], "animate-spin")}
						aria-hidden="true"
					/>
					{message && (
						<p className="text-muted-foreground text-sm">{message}</p>
					)}
				</div>
			</div>
		);
	},
);

Loader.displayName = "Loader";
