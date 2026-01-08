import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/60 border-b border-[#1a3d65]/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <a href="/" aria-label="Valenpool - Inicio">
                        <img src="/pool_photos/ValenPoolLogo.png" alt="Valenpool" className="h-10 w-auto" />
                    </a>

                    <nav className="hidden md:flex gap-8 text-lg font-semibold text-gray-700" aria-label="Menú principal">
                        <a href="#services" className="hover:text-[#1a3d65]">Servicios</a>
                        <a href="#about" className="hover:text-[#1a3d65]">Quiénes Somos</a>
                        <a href="#gallery" className="hover:text-[#1a3d65]">Galería</a>
                        <a href="#testimonials" className="hover:text-[#1a3d65]">Testimonios</a>
                        <a href="#clients" className="hover:text-[#1a3d65]">Confían en nosotros</a>
                        <a href="#contact" className="hover:text-[#1a3d65]">Contacto</a>
                    </nav>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 md:hidden"
                        aria-label="Abrir menú"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-[#1a3d65]/10">
                    <nav className="px-6 py-6 flex flex-col gap-4" aria-label="Menú móvil">
                        <a href="#services" onClick={() => setOpen(false)} className="text-lg font-medium text-gray-700">Servicios</a>
                        <a href="#about" onClick={() => setOpen(false)} className="text-lg font-medium text-gray-700">Quiénes Somos</a>
                        <a href="#gallery" onClick={() => setOpen(false)} className="text-lg font-medium text-gray-700">Galería</a>
                        <a href="#testimonials" onClick={() => setOpen(false)} className="text-lg font-medium text-gray-700">Testimonios</a>
                        <a href="#clients" onClick={() => setOpen(false)} className="text-lg font-medium text-gray-700">Confían en nosotros</a>
                        <a href="#contact" onClick={() => setOpen(false)} className="text-lg font-medium text-gray-700">Contacto</a>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;
