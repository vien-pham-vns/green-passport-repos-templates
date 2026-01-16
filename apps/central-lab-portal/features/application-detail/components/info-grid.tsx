export default function ApplicationDetailInfoGrid({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="grid grid-cols-12 border-t border-l border-black">
			{children}
		</div>
	);
}
