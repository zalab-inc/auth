"use server";

import { prisma } from "@/lib/prisma";
import { VerificationType } from "@prisma/client";
import { TokenError } from "./type";

interface VerifyProps {
	token: string;
}

export type VerifyResult =
	| {
			userId: string;
	  }
	| {
			error: TokenError;
	  };

export async function getUserIdByToken(
	props: VerifyProps,
): Promise<VerifyResult> {
	const { token } = props;

	// Validasi format token
	if (!token || typeof token !== "string") {
		return { error: TokenError.TOKEN_INVALID };
	}

	try {
		const verification = await prisma.verification.findFirst({
			where: {
				token,
				type: VerificationType.RESET_PASSWORD,
				expiresAt: { gt: new Date() },
				usedAt: null,
			},
			select: {
				userId: true,
			},
		});

		if (!verification) {
			return { error: TokenError.TOKEN_NOTFOUND };
		}

		return { userId: verification.userId };
	} catch (error) {
		console.error("[TokenVerification] Error:", error);
		return { error: TokenError.TOKEN_INVALID };
	}
}
