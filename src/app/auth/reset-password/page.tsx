import type { Metadata } from "next";
import { ResetForm } from "./reset-form";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
	title: "Reset Password",
};

export default function ResetPassword() {
	return (
		<Container>
			<ResetForm />
		</Container>
	);
}
