import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="hero" className="relative h-[70vh] rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/pool_photos/galery/pexels-pixabay-221457.jpg')" }} />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        Expertos en el cuidado y mantenimiento de piscinas en <span className="text-primary">Valencia</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-100">
                        Servicio profesional y de confianza para que siempre disfrutes de tu piscina en perfectas condiciones
                    </p>
                    <div className="mt-6">
                        <a href="#contact" className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:opacity-95">
                            Solicitar Presupuesto Gratis
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
