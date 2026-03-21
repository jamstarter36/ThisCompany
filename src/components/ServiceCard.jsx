import { useEffect, useRef, useState } from "react";
import SERVICE_META from "../data/ServiceMeta";

export default function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-0 min-h-screen flex items-center" style={{ zIndex: 10 + index }}>
      <div
        ref={ref}
        className={`w-full min-h-screen ${service.bg} flex items-center px-6 transition-all duration-700 ease-out ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
        }`}
        style={{ transitionDelay: `${index * 60}ms` }}
      >
        <div className="max-w-6xl mx-auto w-full py-20 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left */}
          <div>
            <span className={`font-mono text-6xl md:text-8xl font-bold ${service.accent} leading-none select-none`}>
              {service.number}
            </span>
            <h2 className={`font-mono text-3xl md:text-5xl font-bold ${service.textPrimary} mt-2 mb-4 md:mb-6 leading-tight`}>
              {service.title}
            </h2>
            <p className={`${service.textMuted} text-base md:text-lg leading-relaxed mb-6 md:mb-8`}>
              {service.description}
            </p>
            <button className={`font-semibold text-sm border px-5 py-2.5 rounded transition-all duration-200 ${service.btnBorder}`}>
              Learn more →
            </button>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            <p className={`font-mono text-xs uppercase tracking-widest ${service.textMuted} mb-2`}>
              What's included
            </p>
            <div className={`border ${service.border} bg-white/70 rounded-2xl p-4 md:p-6 flex flex-wrap gap-2 md:gap-3`}>
              {service.tags.map((tag) => (
                <span key={tag} className={`text-xs md:text-sm px-3 py-1.5 rounded-full font-mono shadow-sm ${service.tagBg}`}>
                  {tag}
                </span>
              ))}
            </div>
            <div className={`border ${service.border} bg-white/70 rounded-2xl p-4 md:p-6`}>
              <p className={`font-mono text-xs ${service.textMuted} mb-1`}>Timeline</p>
              <p className={`font-semibold text-base md:text-lg ${service.textPrimary}`}>{SERVICE_META.timeline}</p>
              <p className={`font-mono text-xs ${service.textMuted} mt-3 mb-1`}>Stack</p>
              <p className={`font-semibold text-base md:text-lg ${service.textPrimary}`}>{SERVICE_META.stack}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}