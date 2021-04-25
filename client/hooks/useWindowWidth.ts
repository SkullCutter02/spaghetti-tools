import { useState, useEffect } from "react";

export default function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<number>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkSize = () => setWindowWidth(window.innerWidth);

      window.addEventListener("resize", checkSize);

      checkSize();

      return () => {
        window.removeEventListener("resize", checkSize);
      };
    }
  }, []);

  return windowWidth;
}
