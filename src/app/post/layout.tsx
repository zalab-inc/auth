import { Container } from "@/components/shared/twc";
import type { ReactNode } from "react";
import React from "react";

export default function PostLayout({ children }: { children: ReactNode }) {
	return <Container>{children}</Container>;
}
