import { Droplets, Waves, Grid, Wrench, Sun, Users } from 'lucide-react';
import { useIntersectionObserver } from '../hooks';

const services = [
    {
        title: 'Limpieza y Desinfección',
        text: 'Tratamientos de choque, control de pH y mantenimiento regular para un agua cristalina.',
        icon: Droplets,
    },
    {
        title: 'Cloración Salina',
        text: 'Instalación, reparación y calibración de equipos de sal de última generación.',
        icon: Waves,
    },
    {
        title: 'Rejuntado y Gresito',
        text: 'Renovación estética y funcional: reparación de chapado y borada de alta resistencia.',
        icon: Grid,
    },
    {
        title: 'Servicio Técnico',
        text: 'Diagnóstico y reparación urgente de bombas, filtros, cuadros eléctricos y depuradoras.',
        icon: Wrench,
    },
    {
        title: 'Puesta a Punto',
        text: 'Apertura de temporada: limpieza profunda y revisión técnica para un baño seguro.',
        icon: Sun,
    },
    {
        title: 'Mantenimiento Comunitario',
        text: 'Planes personalizados para comunidades de vecinos y centros deportivos en Valencia.',
        icon: Users,
    },
];

const ServicesGrid = () => {
    const ref = useIntersectionObserver();

    return (
        <section id="services" ref={ref} className="py-16 bg-neutral-50 rounded-xl fade-in-section">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-[#1a3d65] mb-8">Servicios</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((s) => {
                        const Icon = s.icon;
                        return (
                            <article key={s.title} className="bg-white rounded-lg p-6 border border-transparent hover:shadow-lg hover:border-[#1a3d65] transition-transform transform hover:-translate-y-1 cursor-default select-none">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-md bg-[#1a3d65]/10 text-[#1a3d65]">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-semibold">{s.title}</h3>
                                </div>
                                <p className="mt-3 text-gray-600">{s.text}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
