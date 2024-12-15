import { DashboardHeader } from "@/components/dashboard/header";

export default function Page() {
	return (
		<>
			<DashboardHeader
				breadcrumbItems={[
					{ label: "Dashboard", href: "/dashboard" },
					{ label: "Main", href: "" },
				]}
			/>
			<div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full ">
				<div className="w-full mx-auto max-w-6xl pt-16 h-full">
					<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
						<div className="flex flex-col space-y-1.5 p-6">
							<h3 className="text-2xl font-semibold leading-none tracking-tight">
								Card Title
							</h3>
							<p className="text-sm text-muted-foreground">Card Description</p>
						</div>
						<div className="p-6 pt-0">
							<p>Card Content</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
