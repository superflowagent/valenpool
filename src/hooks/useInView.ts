import { useEffect, useRef, useState, useMemo } from "react";

export const useInView = (options: IntersectionObserverInit = {}) => {
    const ref = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);
    const optionsKey = useMemo(() => JSON.stringify(options), [options]);
    const optionsRef = useRef(options);
    useEffect(() => {
        optionsRef.current = options;
    }, [options]);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof window === "undefined") return;
        const obs = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.2, ...optionsRef.current },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [optionsKey]);

    return [ref, inView] as const;
};
