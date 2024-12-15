"use client";

import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const InputPassword = React.forwardRef<
	HTMLInputElement,
	React.ComponentProps<"input">
>((props, ref) => {
	const [showPassword, setShowPassword] = React.useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div className="relative">
			<Input
				{...props}
				ref={ref}
				type={showPassword ? "text" : "password"}
				className={cn(
					"flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					props.className,
				)}
			/>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="absolute right-0 top-0 h-10 w-10 rounded-r-md bg-background p-2 hover:bg-muted"
				onClick={togglePasswordVisibility}
			>
				{showPassword ? (
					<EyeOffIcon className="h-4 w-4 text-muted-foreground" />
				) : (
					<EyeIcon className="h-4 w-4 text-muted-foreground" />
				)}
				<span className="sr-only">
					{showPassword ? "Hide password" : "Show password"}
				</span>
			</Button>
		</div>
	);
});

InputPassword.displayName = "InputPassword";
