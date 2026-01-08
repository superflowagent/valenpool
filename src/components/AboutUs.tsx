import { useIntersectionObserver } from "../hooks";

const AboutUs = () => {
  const ref = useIntersectionObserver();

  return (
    <section id="about" ref={ref} className="py-16 rounded-xl fade-in-section">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary mb-8">Quiénes somos</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-4">
              Más de 10 años redefiniendo el cuidado del agua.
            </h3>
            <p className="text-gray-700 mb-4">
              En Valenpool no solo limpiamos piscinas; gestionamos la salud de
              tu espacio de relax. Nacimos en Valencia con una misión clara:
              ofrecer un servicio técnico de élite donde la transparencia y la
              puntualidad no sean la excepción, sino la norma. Trabajamos solo
              con las mejores marcas del mercado (AstralPool, Zodiac, Hayward)
              para garantizar que cada intervención sea duradera. Ya sea una
              piscina privada o una instalación municipal, aplicamos el mismo
              estándar de excelencia.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/pool_photos/Gemini_Generated_Image_10fcwg10fcwg10fc.png"
              alt="Equipo técnico Valenpool"
              className="rounded-lg shadow-md w-4/5 md:w-3/4 lg:w-2/3 object-contain max-h-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
