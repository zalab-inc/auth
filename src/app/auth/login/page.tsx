import type { Metadata } from "next";
import { LoginForm } from "./login-form";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
	title: "Login",
};

export default function Login() {
	return (
		<Container>
			<LoginForm />
		</Container>
	);
}
