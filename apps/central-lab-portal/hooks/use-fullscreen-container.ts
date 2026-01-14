import { useEffect, useState } from 'react';

/**
 * Hook that automatically detects the fullscreen element and returns it as a container
 * for portals (Popover, Menu, Modal, etc.)
 *
 * This ensures that portaled components appear correctly when their parent is in fullscreen mode.
 *
 * @returns The fullscreen element if active, otherwise undefined (portals to body)
 *
 * @example
 * ```tsx
 * const container = useFullscreenContainer();
 *
 * return (
 *   <Popover container={container} ...otherProps>
 *     Content
 *   </Popover>
 * );
 * ```
 */
export const useFullscreenContainer = (): HTMLElement | undefined => {
  const [container, setContainer] = useState<HTMLElement | undefined>(undefined);

  useEffect(() => {
    const handleFullscreenChange = () => {
      // document.fullscreenElement is the element currently in fullscreen
      // or null if nothing is fullscreen
      const fullscreenEl = document.fullscreenElement as HTMLElement | null;
      setContainer(fullscreenEl || undefined);
    };

    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // Check initial state
    handleFullscreenChange();

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return container;
};
