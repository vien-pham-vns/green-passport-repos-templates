import { useEffect, useRef, useState } from "react";

const useFullScreen = () => {
  const [full, setFull] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      ref.current?.requestFullscreen();
      setFull(true);
    } else {
      document.exitFullscreen();
    }
  };

  // Need to listen to exit fullscreen
  useEffect(() => {
    const handleExitFullScreen = () => {
      if (!document.fullscreenElement) {
        setFull(false);
      }
    };
    document.addEventListener("fullscreenchange", handleExitFullScreen);
    return () => {
      document.removeEventListener("fullscreenchange", handleExitFullScreen);
    };
  }, []);
  return { toggleFullScreen, ref, full };
};

export default useFullScreen;
