import React from "react";
import {
	Breadcrumb,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbItem,
} from "@/components/ui/breadcrumb";

interface DashboardBreadcrumbProps {
	items?: {
		label: string;
		href: string;
	}[];
}

export const DashboardBreadcrumb = ({
	items = [{ label: "Dashboard", href: "/dashboard" }],
}: DashboardBreadcrumbProps) => {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{items.map((item, index) => (
					<React.Fragment key={item.href}>
						<BreadcrumbItem className="hidden md:block">
							{index === items.length - 1 ? (
								<BreadcrumbPage>{item.label}</BreadcrumbPage>
							) : (
								<BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
							)}
						</BreadcrumbItem>
						{index < items.length - 1 && (
							<BreadcrumbSeparator className="hidden md:block" />
						)}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

DashboardBreadcrumb.displayName = "DashboardBreadcrumb";
