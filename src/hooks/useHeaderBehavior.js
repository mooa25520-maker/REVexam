import { useState, useEffect } from "react";

export default function useHeaderBehavior() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 80);

      if (currentScrollY <= 80) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY - 5) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY + 5) {
        setVisible(false);
      }

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { visible, scrolled };
}