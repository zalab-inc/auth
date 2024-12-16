import type { Metadata } from "next";
import { RegisterForm } from "./register-form";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
	title: "Register",
};

export default function Register() {
	return (
		<Container>
			<RegisterForm />
		</Container>
	);
}
