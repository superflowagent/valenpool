import React, { useEffect, useRef } from "react";

interface LogoItem {
  src: string;
  alt: string;
}

interface Props {
  logos: LogoItem[];
  speed?: number; // px per second
}

const LogoMarquee: React.FC<Props> = ({ logos, speed = 80 }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const widthRef = useRef(0);
  const lastTs = useRef<number | null>(null);

  // Measure track width (one set of logos)
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      widthRef.current = trackRef.current.offsetWidth;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [logos]);

  // RAF loop to move the marquee smoothly and reset without jumps
  useEffect(() => {
    const step = (ts: number) => {
      if (lastTs.current == null) lastTs.current = ts;
      const dt = (ts - lastTs.current) / 1000;
      lastTs.current = ts;
      posRef.current += dt * speed;

      if (widthRef.current > 0 && posRef.current >= widthRef.current) {
        // wrap around by subtracting exactly the width of one set
        posRef.current -= widthRef.current;
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translateX(-${posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTs.current = null;
    };
  }, [speed, logos]);

  return (
    <div className="overflow-hidden">
      <div ref={containerRef} className="relative">
        <div
          ref={innerRef}
          className="flex items-center"
          style={{ willChange: "transform" }}
        >
          <div ref={trackRef} className="flex gap-6">
            {logos.map((logo, i) => {
              const extraClass =
                logo.src.endsWith("/7.png") || logo.src.endsWith("/8.png")
                  ? "bg-neutral-300"
                  : i === 7
                    ? "bg-black"
                    : "";
              return (
                <div
                  key={`logo-${i}`}
                  className={`w-75 h-42.5 md:w-82.5 md:h-47.5 rounded-xl overflow-hidden flex items-center justify-center shrink-0 ${extraClass}`}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    loading="lazy"
                    decoding="async"
                    className="max-h-36 max-w-72 object-contain block rounded-xl"
                  />
                </div>
              );
            })}
          </div>

          {/* duplicate for seamless loop, hidden from AT */}
          <div aria-hidden="true" className="flex gap-6">
            {logos.map((logo, i) => {
              const extraClass =
                logo.src.endsWith("/7.png") || logo.src.endsWith("/8.png")
                  ? "bg-neutral-300"
                  : i === 7
                    ? "bg-black"
                    : "";
              return (
                <div
                  key={`logo-dup-${i}`}
                  className={`w-75 h-42.5 md:w-82.5 md:h-47.5 rounded-xl overflow-hidden flex items-center justify-center shrink-0 ${extraClass}`}
                  aria-hidden="true"
                  role="presentation"
                >
                  <img
                    src={logo.src}
                    alt=""
                    role="presentation"
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    className="max-h-36 max-w-72 object-contain block rounded-xl"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LogoMarquee);
