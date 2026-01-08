import React from 'react'
import './App.css'
import { Navbar, Hero, ServicesGrid, AboutUs, TestimonialsCarousel, Gallery, ContactForm } from './components'
import { useIntersectionObserver } from './hooks'

function App() {
  const clientsRef = useIntersectionObserver();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      <main>
        <Hero />

        <ServicesGrid />
        <AboutUs />
        <Gallery />
        <TestimonialsCarousel />

        <ContactForm />

        {/* Logo Cloud */}
        <section id="clients" ref={clientsRef} className="py-8 fade-in-section">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-[#1a3d65] mb-8">Confían en nosotros</h2>
            <div className="overflow-hidden">
              <div className="flex gap-6 animate-marquee">
                {[
                  { src: '/pool_photos/clients/1.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/2.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/3.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/4.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/5.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/6.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/7.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/8.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/9.png', alt: 'Cliente' },
                ].map((logo, i) => (
                  <div key={i} className={`w-[300px] h-[170px] md:w-[330px] md:h-[190px] rounded flex items-center justify-center flex-shrink-0 ${i === 7 ? 'bg-black' : ''}`}>
                    <img src={logo.src} alt={logo.alt} className="max-h-36 max-w-72 object-contain" />
                  </div>
                ))}
                {[
                  { src: '/pool_photos/clients/1.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/2.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/3.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/4.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/5.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/6.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/7.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/8.png', alt: 'Cliente' },
                  { src: '/pool_photos/clients/9.png', alt: 'Cliente' },
                ].map((logo, i) => (
                  <div key={`dup-${i}`} className={`w-[270px] h-[150px] rounded flex items-center justify-center flex-shrink-0 ${i === 7 ? 'bg-black' : ''}`}>
                    <img src={logo.src} alt={logo.alt} className="max-h-32 max-w-64 object-contain" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-700">
          <div className="mb-4 md:mb-0">Tel: 614001326 | Email: <a href="mailto:info@valenpool.es" className="hover:text-[#1a3d65]">info@valenpool.es</a> | IG: <a href="https://www.instagram.com/valenpoolsl/" target="_blank" rel="noopener noreferrer" className="hover:text-[#1a3d65]">@valenpoolsl</a></div>
          <div>© 2026 Valenpool S.L. - Todos los derechos reservados.</div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .animate-marquee{display:flex;gap:1.5rem;animation:marquee 20s linear infinite}
      `}</style>
    </div>
  )
}

export default App
