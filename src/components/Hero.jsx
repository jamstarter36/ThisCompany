export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 45%, #ede9fe 100%)" }}
    >
      <div className="absolute top-24 right-4 md:right-16 w-48 h-48 md:w-96 md:h-96 rounded-full opacity-40 pointer-events-none"
        style={{ background: "radial-gradient(circle, #bae6fd, transparent 70%)" }} />
      <div className="absolute bottom-24 left-4 md:left-16 w-40 h-40 md:w-72 md:h-72 rounded-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, #ddd6fe, transparent 70%)" }} />
      <div className="absolute top-1/2 left-1/2 w-40 h-40 md:w-64 md:h-64 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #bbf7d0, transparent 70%)", transform: "translate(-50%,-50%)" }} />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <p className="font-mono text-sky-500 text-xs md:text-sm tracking-widest uppercase mb-4 md:mb-6">
          — Web Development Studio
        </p>
        <h1 className="font-mono text-4xl sm:text-6xl md:text-8xl font-bold text-slate-800 leading-none tracking-tighter mb-4 md:mb-6">
          We build
          <br />
          <span className="text-sky-500">what</span> you
          <br />
          actually need.
        </h1>
        <p className="text-slate-500 text-base md:text-xl max-w-xl leading-relaxed mb-8 md:mb-10">
          HRIS, Payroll, Custom Web Apps, Portals — we turn your messy
          spreadsheets and manual processes into clean, fast web systems.
        </p>
        <div className="flex flex-row items-center gap-3 sm:gap-4 mb-16 md:mb-0 flex-wrap">
          <button className="bg-slate-800 text-white font-semibold px-6 py-3 rounded hover:bg-slate-700 transition-colors">
            See Our Services ↓
          </button>
          {/* <button className="text-slate-500 hover:text-slate-800 text-sm transition-colors">
            View past work →
          </button> */}
        </div>
        {/* <div className="hidden sm:flex absolute bottom-10 left-0 items-center gap-3 text-slate-400 text-xs font-mono animate-bounce">
          <span>↓</span>
          <span>scroll to explore</span>
        </div> */}
      </div>
    </section>
  );
}