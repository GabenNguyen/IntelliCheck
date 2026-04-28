import { useState, useEffect } from "react";

/**

 * A custom React hook that tracks and returns the current
 * browser window dimensions (width and height).
 * @returns {{ width: number, height: number }}
 * An object containing the current window width and height.
 *
 * @example
 * const { width, height } = useWindowSize();
 * if (width < 768) {
 *   // Apply mobile layout
 * }
 */
export default function useWindowSize(): { width: number; height: number; } {
    const [size, setSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0
    });

    useEffect(() => {
        function handleResize() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return size;
}