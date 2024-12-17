import type { SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

export interface SessionData {
	userId?: string;
	email?: string;
	isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
	isLoggedIn: false,
};

if (!process.env.IRON_SESSION_SECRET) {
	throw new Error("IRON_SESSION_SECRET is not set");
}

if (!process.env.IRON_SESSION_COOKIE_NAME) {
	throw new Error("IRON_SESSION_COOKIE_NAME is not set");
}

export const sessionOptions: SessionOptions = {
	// You need to create a secret key at least 32 characters long.
	password: process.env.IRON_SESSION_SECRET,
	cookieName: process.env.IRON_SESSION_COOKIE_NAME,
	cookieOptions: {
		httpOnly: true,
		// Secure only works in `https` environments. So if the environment is `https`, it'll return true.
		secure: process.env.NODE_ENV === "production",
	},
};

export async function getSession() {
	const cookieStore = await cookies();
	const session = await getIronSession<SessionData>(
		cookieStore,
		sessionOptions,
	);

	if (!session.isLoggedIn) {
		session.isLoggedIn = defaultSession.isLoggedIn;
	}

	return session;
}
