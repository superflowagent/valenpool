import React from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIntersectionObserver } from "../hooks";

const RCS: any = ReactCompareSlider;

const Resultados: React.FC = () => {
    const ref = useIntersectionObserver();

    return (
        <section id="results" ref={ref} className="py-16 bg-neutral-100 rounded-xl fade-in-section">
            <div className="max-w-5xl mx-auto px-4">
                <div className="text-center mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-2">Resultados</h2>
                    <p className="text-gray-600 mt-1">Transformación inmediata con nuestro servicio de puesta a punto</p>
                </div>

                <div className="overflow-hidden rounded-2xl shadow-2xl">
                    <div className="w-full h-80 sm:h-96 md:h-130 relative">
                        <RCS
                            itemOne={
                                <ReactCompareSliderImage
                                    src="/pool_photos/results/after.png"
                                    alt="Después"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            }
                            itemTwo={
                                <ReactCompareSliderImage
                                    src="/pool_photos/results/before.png"
                                    alt="Antes"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            }
                            handle={<div className="handle-outer w-12 h-full flex items-center justify-center cursor-col-resize" tabIndex={0} role="slider" aria-label="Barra comparador">
                                <div className="chev chev-left absolute w-12 h-12 flex items-center justify-center">
                                    <ChevronLeft className="w-8 h-8 text-white" aria-hidden />
                                </div>
                                <div className="handle-inner w-2 bg-white h-full rounded-sm shadow-2xl transition-transform duration-200" />
                                <div className="chev chev-right absolute w-12 h-12 flex items-center justify-center">
                                    <ChevronRight className="w-8 h-8 text-white" aria-hidden />
                                </div> 
                            </div>}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Resultados);
