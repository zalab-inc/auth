"use client";

import type { SessionData } from "@/lib/sessions";
import { createContext, useContext } from "react";

const defaultSession: SessionData = {
	isLoggedIn: false,
	userId: undefined,
	email: undefined,
};

const SessionContext = createContext<SessionData>(defaultSession);

export function useSession() {
	return useContext(SessionContext);
}

export function SessionProvider({
	children,
	initialSession = defaultSession,
}: {
	children: React.ReactNode;
	initialSession: SessionData;
}) {
	// Ensure we're working with a plain object
	const sessionValue: SessionData = {
		isLoggedIn: !!initialSession.isLoggedIn,
		userId: initialSession.userId || undefined,
		email: initialSession.email || undefined,
	};

	return (
		<SessionContext.Provider value={sessionValue}>
			{children}
		</SessionContext.Provider>
	);
}
