import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from '../hooks';

const testimonials = [
    { text: 'Increíble el cambio de mi piscina en La Eliana tras el rejuntado. Profesionales 10/10.', author: 'Carlos M.' },
    { text: 'Llevan el mantenimiento de mi comunidad en Torre en Conill y nunca ha estado tan limpia.', author: 'Elena S.' },
    { text: 'Instalaron el clorador salino en un día. Servicio técnico rápido en Ribarroja.', author: 'Marc G.' },
    { text: 'Confianza total para mi casa en El Vedat. El agua siempre perfecta.', author: 'Ana R.' },
    { text: 'Grandes profesionales del mantenimiento en Colinas de San Antonio.', author: 'Juan F.' },
    { text: 'Servicio impecable en Bétera, muy recomendables.', author: 'David L.' },
    { text: 'Rapidez y limpieza en el servicio de borada en Campolivar.', author: 'Marta T.' },
    { text: 'Mantenimiento serio y puntual en toda Valencia.', author: 'Roberto P.' },
];

const AUTO_PLAY_DELAY = 4000;

const TestimonialsCarousel: React.FC = () => {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef<number | null>(null);
    const regionRef = useRef<HTMLDivElement | null>(null);
    const [ref, inView] = useInView();

    // Ensure the fade-in animation class is added when the section first becomes visible
    useEffect(() => {
        const el = ref.current;
        if (inView && el) {
            if (!el.classList.contains('fade-in-visible')) el.classList.add('fade-in-visible');
        }
    }, [inView, ref]);

    useEffect(() => {
        if (!inView) return; // pause autoplay when not visible
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
            setIndex((i) => (i + 1) % testimonials.length);
        }, AUTO_PLAY_DELAY);
        return () => {
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        };
    }, [index, inView]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % testimonials.length);
            if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    const goTo = useCallback((i: number) => setIndex(i), []);

    return (
        <section id="testimonials" ref={ref} className="py-16 bg-transparent fade-in-section">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-primary mb-8">Testimonios</h2>
                <div className="relative overflow-visible">
                    <div className="flex items-center justify-center gap-4">
                        <button
                            onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                            aria-label="Testimonio anterior"
                        >
                            <ChevronLeft className="w-6 h-6 text-primary" />
                        </button>

                        <div className="flex-1">
                            <AnimatePresence initial={false} mode="wait">
                                <motion.blockquote
                                    key={index}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-neutral-100 px-6 py-8 rounded-xl shadow-sm hover:shadow-md transition-shadow text-gray-700 text-base"
                                >
                                    <p>"{testimonials[index].text}"</p>
                                    <footer className="mt-4 text-base text-gray-700">- {testimonials[index].author}</footer>
                                </motion.blockquote>
                            </AnimatePresence>
                        </div>

                        <button
                            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                            aria-label="Siguiente testimonio"
                        >
                            <ChevronRight className="w-6 h-6 text-primary" />
                        </button>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2" role="tablist" aria-label="Indicadores de testimonios">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            role="tab"
                            aria-selected={i === index}
                            aria-label={`Ir al testimonio ${i + 1}`}
                            onClick={() => goTo(i)}
                            className={`w-3 h-3 rounded-full ${i === index ? 'bg-primary' : 'bg-gray-300'} focus:outline-none`}
                        />
                    ))}
                </div>

                <div className="sr-only" aria-live="polite" ref={regionRef}>{testimonials[index].text} — {testimonials[index].author}</div>
            </div>
        </section>
    );
};

export default TestimonialsCarousel;
