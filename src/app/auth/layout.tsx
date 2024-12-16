import { Container } from "@/components/shared/container";
export default function AuthLayout({
	children,
}: { children: React.ReactNode }) {
	return <Container>{children}</Container>;
}
