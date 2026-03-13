"use client";

import { useEffect } from "react";

export function RevealInit() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.delay ?? "0", 10);
            setTimeout(() => el.setAttribute("data-revealed", "true"), delay);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
