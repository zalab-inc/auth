"use client";

import type { ReactNode } from "react";
import { Loader2, Trash2 } from "lucide-react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "react-day-picker";

const DialogTrigger = () => {
	return (
		<Button>
			<Trash2 className="h-4 w-4" />
		</Button>
	);
};

interface DialogConfirmProps {
	trigger: ReactNode;
	title: string;
	description: string;
	isSubmitting?: boolean;
	onConfirm: () => void;
}

export function DialogConfirm({
	trigger = <DialogTrigger />,
	title,
	description,
	isSubmitting = false,
	onConfirm,
}: DialogConfirmProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm} disabled={isSubmitting}>
						{isSubmitting ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Loading...
							</>
						) : (
							"Confirm"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
