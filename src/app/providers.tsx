import { getSession } from "@/lib/sessions";
import { SessionProvider } from "@/lib/session-provider";

export async function ServerSessionProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getSession();

	// Create a new object with primitive values only
	const sessionData = {
		isLoggedIn: Boolean(session.isLoggedIn),
		userId: String(session.userId || ""),
		email: String(session.email || ""),
	};

	return (
		<SessionProvider initialSession={sessionData}>{children}</SessionProvider>
	);
}
