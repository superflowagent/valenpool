import React, { useEffect, useState } from "react";
import { useIntersectionObserver } from "../hooks";

// Graceful dynamic-load of `react-compare-slider` so the dev server doesn't fail when
// the package is not installed in the environment (npm install can fail on some machines).
const Resultados: React.FC = () => {
    const ref = useIntersectionObserver();
    const [Cmp, setCmp] = useState<any | null>(null);
    const [loadError, setLoadError] = useState(false);
    const [showAfter, setShowAfter] = useState(false); // fallback toggle

    useEffect(() => {
        let mounted = true;
        // Import dynamically on client only
        if (typeof window === 'undefined') return;
        import('react-compare-slider')
            .then((mod) => {
                if (!mounted) return;
                setCmp({
                    ReactCompareSlider: mod.ReactCompareSlider,
                    ReactCompareSliderImage: mod.ReactCompareSliderImage,
                });
            })
            .catch(() => {
                if (!mounted) return;
                setLoadError(true);
            });
        return () => { mounted = false; };
    }, []);

    return (
        <section id="results" ref={ref} className="py-16">
            <div className="max-w-7xl mx-auto px-6 py-8 shadow-2xl rounded-xl bg-white overflow-hidden">
                <h2 className="text-3xl font-bold text-primary mb-8">Resultados</h2>

                <div className="flex justify-center">
                    <div className="w-full max-w-4xl">
                        {Cmp && Cmp.ReactCompareSlider && Cmp.ReactCompareSliderImage && !loadError ? (
                            <Cmp.ReactCompareSlider
                                itemOne={
                                    <Cmp.ReactCompareSliderImage
                                        src="/pool_photos/results/before.png"
                                        alt="Antes"
                                        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                    />
                                }
                                itemTwo={
                                    <Cmp.ReactCompareSliderImage
                                        src="/pool_photos/results/after.png"
                                        alt="Después"
                                        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                    />
                                }
                            />
                        ) : (
                            // Fallback simple accessible implementation: toggle between Before/After
                            <div className="relative w-full bg-gray-50 rounded-md overflow-hidden">
                                <img src="/pool_photos/results/before.png" alt="Antes" className={`w-full h-auto transition-opacity duration-300 ${showAfter ? 'opacity-0' : 'opacity-100'}`} />
                                <img src="/pool_photos/results/after.png" alt="Después" className={`absolute inset-0 w-full h-auto top-0 left-0 transition-opacity duration-300 ${showAfter ? 'opacity-100' : 'opacity-0'}`} />
                                <div className="p-4 flex items-center justify-between">
                                    <div className="text-sm text-gray-600">Comparador no disponible</div>
                                    <div className="flex gap-2">
                                        <button type="button" onClick={() => setShowAfter(false)} className={`px-3 py-1 rounded-md ${!showAfter ? 'bg-primary text-white' : 'bg-white border'}`}>Antes</button>
                                        <button type="button" onClick={() => setShowAfter(true)} className={`px-3 py-1 rounded-md ${showAfter ? 'bg-primary text-white' : 'bg-white border'}`}>Después</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Resultados);
