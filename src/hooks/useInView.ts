import { useEffect, useRef, useState } from 'react';

export const useInView = (options: IntersectionObserverInit = {}) => {
    const ref = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof window === 'undefined') return;
        const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2, ...options });
        obs.observe(el);
        return () => obs.disconnect();
    }, [options]);

    return [ref, inView] as const;
};
