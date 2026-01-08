import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        // Respect user preference for reduced motion
        if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            if (ref.current) ref.current.classList.add('fade-in-visible');
            return;
        }

        let observer: IntersectionObserver | null = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        }, {
            threshold: 0.1,
            ...options,
        });

        const el = ref.current;
        if (el && observer) {
            observer.observe(el);
        }

        return () => {
            if (observer && el) {
                observer.unobserve(el);
            }
            observer = null;
        };
    }, [options]);

    return ref;
};
