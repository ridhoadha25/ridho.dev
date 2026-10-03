import { useEffect, useRef } from "react";

/**
 * useReveal — attaches an IntersectionObserver to the returned ref
 * and adds the "visible" class when the element enters the viewport.
 *
 * @param {object} options
 * @param {number}  options.threshold  – 0-1 fraction visible before trigger (default 0.12)
 * @param {string}  options.rootMargin – CSS margin for observer (default "-40px 0px")
 * @param {number}  options.delay      – ms delay before adding "visible" (default 0)
 */
export function useReveal({ threshold = 0.12, rootMargin = "-40px 0px", delay = 0 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, delay]);

  return ref;
}
