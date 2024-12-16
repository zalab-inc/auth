import { X } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ErrorMessageProps {
	show: boolean;
	message?: string;
	onClose?: () => void;
}

export function ErrorMessage({ show, message, onClose }: ErrorMessageProps) {
	if (!message) return null;

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.2 }}
					className="relative"
				>
					<div className="flex items-center justify-between gap-2 rounded-md bg-destructive/15 p-3 text-destructive">
						<div className="flex items-center gap-2">
							<AlertCircle className="h-5 w-5" aria-hidden="true" />
							<p className="text-sm font-medium">{message}</p>
						</div>
						{onClose && (
							<button
								type="button"
								onClick={onClose}
								className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
								aria-label="Close error message"
							>
								<X className="h-4 w-4" aria-hidden="true" />
							</button>
						)}
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
