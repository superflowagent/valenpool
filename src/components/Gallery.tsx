import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks';

const gallery = [
    {
        src: '/pool_photos/galery/1.jpg',
        title: 'Reforma integral en Torre en Conill',
    },
    {
        src: '/pool_photos/galery/2.jpg',
        title: 'Mantenimiento en La Eliana',
    },
    {
        src: '/pool_photos/galery/3.jpg',
        title: 'Cloración salina avanzada',
    },
    {
        src: '/pool_photos/galery/4.jpg',
        title: 'Rejuntado profesional',
    },
    {
        src: '/pool_photos/galery/5.jpg',
        title: 'Servicio técnico de excelencia',
    },
    {
        src: '/pool_photos/galery/6.jpg',
        title: 'Puesta a punto de temporada',
    },
    {
        src: '/pool_photos/galery/7.jpg',
        title: 'Mantenimiento comunitario',
    },
    {
        src: '/pool_photos/galery/8.jpg',
        title: 'Agua cristalina garantizada',
    },
    {
        src: '/pool_photos/galery/9.jpg',
        title: 'Instalación profesional',
    },
];

const Gallery: React.FC = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const ref = useIntersectionObserver();

    return (
        <section id="gallery" className="py-16 bg-neutral-50 rounded-xl">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <h2 className="text-3xl font-bold text-primary mb-8">Galería</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.map((item, index) => (
                        <div
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 h-87.5 ${hoveredIndex !== null && hoveredIndex !== index ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
                                } ${hoveredIndex === index ? 'scale-110 z-10' : ''}`}
                        >
                            <img
                                src={item.src}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
