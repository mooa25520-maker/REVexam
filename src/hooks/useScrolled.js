/* ============================================================
   useScrolled — returns true when user has scrolled past a
   given threshold (default 80px). Used for sticky header
   styling and back-to-top visibility.
   ============================================================ */
import { useState, useEffect } from 'react';

export default function useScrolled(threshold = 80) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > threshold);
        };

        /* Check initial position */
        onScroll();

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [threshold]);

    return scrolled;
}
