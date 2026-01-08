import React, { useCallback, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen((v) => !v), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  const links = useMemo(
    () => [
      { href: "#services", label: "Servicios" },
      { href: "#about", label: "Quiénes Somos" },
      { href: "#gallery", label: "Galería" },
      { href: "#testimonials", label: "Testimonios" },
      { href: "#clients", label: "Confían en nosotros" },
      { href: "#contact", label: "Contacto" },
    ],
    [],
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/60 border-b border-primary/10 rounded-b-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" aria-label="Valenpool - Inicio">
            <img
              src="/pool_photos/ValenPoolLogo.png"
              alt="Valenpool"
              className="h-10 w-auto"
            />
          </a>
        </div>

        <div className="flex items-center gap-3">
          <nav
            className="hidden md:flex gap-8 text-lg font-semibold text-primary"
            aria-label="Menú principal"
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-primary">
                {l.label}
              </a>
            ))}
          </nav>

          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-primary md:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={toggleOpen}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-primary/10 rounded-b-xl overflow-hidden">
          <nav
            className="px-6 py-6 flex flex-col gap-4"
            aria-label="Menú móvil"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="text-lg font-medium text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
