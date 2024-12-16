export const Container: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => (
	<div className="container mx-auto flex items-center justify-center h-screen">
		{children}
	</div>
);

Container.displayName = "Container";
