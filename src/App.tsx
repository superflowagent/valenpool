import React from "react";
import "./App.css";
import {
  Navbar,
  Hero,
  ServicesGrid,
  AboutUs,
  TestimonialsCarousel,
  Resultados,
  Gallery,
  ContactForm,
  LogoMarquee,
} from "./components";
import { useIntersectionObserver } from "./hooks";

function App() {
  const clientsRef = useIntersectionObserver();

  return (
    <div className="min-h-screen bg-neutral-50 text-primary">
      <Navbar />

      <main id="main">
        <Hero />

        <ServicesGrid />
        <Resultados />
        <Gallery />
        <AboutUs />
        <TestimonialsCarousel />

        {/* Logo Cloud */}
        <section id="clients" ref={clientsRef} className="py-8 bg-neutral-100 rounded-xl fade-in-section">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-primary mb-8">
              Confían en nosotros
            </h2>
            <div className="overflow-hidden">
              {/* Use a JS-driven marquee for a truly seamless infinite scroll */}
              <LogoMarquee
                logos={[
                  { src: "/pool_photos/clients/1.png", alt: "Cliente" },
                  { src: "/pool_photos/clients/2.png", alt: "Cliente" },
                  { src: "/pool_photos/clients/3.png", alt: "Cliente" },
                  { src: "/pool_photos/clients/4.png", alt: "Cliente" },
                  { src: "/pool_photos/clients/5.png", alt: "Cliente" },
                  { src: "/pool_photos/clients/6.png", alt: "Cliente" },
                  { src: "/pool_photos/clients/7.png", alt: "Cliente" },
                  { src: "/pool_photos/clients/8.png", alt: "Cliente" },
                  { src: "/pool_photos/clients/9.png", alt: "Cliente" },
                ]}
              />
            </div>
          </div>
        </section>

        <ContactForm />
      </main>

      <footer className="border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-700">
          <div className="mb-4 md:mb-0">
            Tel: 614001326 | Email:{" "}
            <a href="mailto:info@valenpool.es" className="hover:text-primary">
              info@valenpool.es
            </a>{" "}
            | IG:{" "}
            <a
              href="https://www.instagram.com/valenpoolsl/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              @valenpoolsl
            </a>
          </div>
          <div>© 2026 Valenpool S.L. - Todos los derechos reservados.</div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .animate-marquee{display:flex;gap:1.5rem;animation:marquee 20s linear infinite}
        @media (max-width: 640px) {
          /* En móvil aceleramos la animación */
          .animate-marquee{animation-duration:1.5s}
        }
      `}</style>
    </div>
  );
}

export default App;
