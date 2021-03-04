import React from 'react'

export default function useWindowSize() {
  // if (typeof window !== "undefined") {
  // return { width: 1200, height: 800 };
  // }
  const [windowSize, setWindowSize] = React.useState({
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
  });

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWindowSize({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
      });
    };
  }, []);

  return windowSize
}
