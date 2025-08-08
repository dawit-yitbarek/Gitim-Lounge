import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const scrollToHash = () => {
                const el = document.querySelector(hash);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    const offset = rect.top + window.scrollY;
                    const middley = offset - window.innerHeight / 2 + rect.height / 2;

                    window.scrollTo({ top: middley, behavior: 'smooth' });
                } else {
                    // Retry in next frame if element not found
                    requestAnimationFrame(scrollToHash);
                }
            };

            scrollToHash();
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [pathname, hash]);

    return null;
};