export default function SquareCheckbox({ bgColor }: { bgColor?: string }) {
	return (
		<div
			className={`w-3.5 h-3.5 border border-black shrink-0 ${bgColor ? `bg-[${bgColor}]` : ""}`}
		/>
	);
}
