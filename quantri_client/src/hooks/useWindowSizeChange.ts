import { useEffect, useState } from "react";

export const useWindowSizeChange = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight)
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;
    const isTablet = width > 768 && width <= 1024; // Assuming tablet width ranges from 769px to 1024px
    const isWindow = width > 1024; // Assuming window size if greater than 1024px width and 768px height
    return {
        isMobile,
        isTablet,
        isWindow
    }
}