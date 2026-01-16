"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ScalableFormContainerProps {
	children: React.ReactNode;
	/** The original width of the content that should be scaled down */
	baseWidth?: number;
	className?: string;
}

/**
 * A container that automatically scales its content to fit the available width.
 * Useful for displaying large, fixed-layout forms (like A4 documents) on mobile.
 */
export const ScalableFormContainer = ({
	children,
	baseWidth = 1280,
	className,
}: ScalableFormContainerProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(1);
	const [containerHeight, setContainerHeight] = useState<number | undefined>(
		undefined,
	);

	useEffect(() => {
		const updateScale = () => {
			if (!containerRef.current || !contentRef.current) return;

			const containerWidth = containerRef.current.offsetWidth;
			// Only scale down, never up
			const newScale = Math.min(containerWidth / baseWidth, 1);

			setScale(newScale);

			// Adjust container height to match scaled content
			const contentHeight = contentRef.current.scrollHeight;
			setContainerHeight(contentHeight * newScale);
		};

		const resizeObserver = new ResizeObserver(updateScale);
		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		// If the content itself changes height (e.g. dynamic sections expanding)
		if (contentRef.current) {
			resizeObserver.observe(contentRef.current);
		}

		updateScale();

		return () => {
			resizeObserver.disconnect();
		};
	}, [baseWidth]);

	return (
		<div
			ref={containerRef}
			className={cn("w-full overflow-hidden flex justify-center", className)}
			style={{
				height: containerHeight !== undefined ? `${containerHeight}px` : "auto",
				transition: "height 0.1s ease-out",
			}}
		>
			<div
				ref={contentRef}
				style={{
					width: `${baseWidth}px`,
					minWidth: `${baseWidth}px`,
					transform: `scale(${scale})`,
					transformOrigin: "top center",
					transition: "transform 0.1s ease-out",
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default ScalableFormContainer;
