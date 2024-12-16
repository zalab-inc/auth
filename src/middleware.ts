import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/sessions";

export async function middleware(request: NextRequest) {
	const session = await getSession();

	if (
		!session.isLoggedIn &&
		request.nextUrl.pathname.startsWith("/dashboard")
	) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
