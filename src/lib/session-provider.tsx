"use client";

import type { SessionData } from "@/lib/sessions";
import { createContext, useContext } from "react";

const defaultSession: SessionData = {
	isLoggedIn: false,
	userId: undefined,
	email: undefined,
};

interface SessionContextProps {
	session: SessionData;
}

const SessionContext = createContext<SessionContextProps>({
	session: defaultSession,
});

export function useSession() {
	const { session } = useContext(SessionContext);
	return session;
}

interface SessionProviderProps {
	children: React.ReactNode;
	initialSession?: SessionData;
}

export function SessionProvider({
	children,
	initialSession = defaultSession,
}: SessionProviderProps) {
	const session: SessionData = {
		isLoggedIn: Boolean(initialSession.isLoggedIn),
		userId: initialSession.userId ?? undefined,
		email: initialSession.email ?? undefined,
	};

	return (
		<SessionContext.Provider value={{ session }}>
			{children}
		</SessionContext.Provider>
	);
}
