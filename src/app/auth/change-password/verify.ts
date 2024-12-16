"use server";
import { prisma } from "@/lib/prisma";
import { VerificationType } from "@prisma/client";

interface VerifyProps {
	token: string;
}

export const getUserIdByToken = async ({ token }: VerifyProps) => {
	const user = await prisma.verification.findFirst({
		where: {
			token,
			type: VerificationType.RESET_PASSWORD,
			expiresAt: {
				gt: new Date(),
			},
		},
		select: {
			userId: true,
		},
	});

	if (!user) {
		return false;
	}

	return user.userId;
};
