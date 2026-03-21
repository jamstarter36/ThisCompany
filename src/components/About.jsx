const VALUES = [
  { icon: "bg-sky-400",     title: "We move fast",    desc: "No 6-month timelines for a simple system. We ship working software in weeks, not months." },
  { icon: "bg-emerald-400", title: "We build to fit",  desc: "No templates, no bloat. Every system is designed around how your team actually operates." },
  { icon: "bg-violet-400",  title: "We stay around",   desc: "We don't disappear after launch. We support, iterate, and grow with your business." },
  { icon: "bg-slate-400",   title: "We talk straight", desc: "No jargon, no BS. You'll always know what we're building and why." },
];

export default function About() {
  return (
    <section id="about" className="bg-white py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Left */}
        <div>
          <p className="font-mono text-sky-500 text-xs tracking-widest uppercase mb-4">— Who We Are</p>
          <h2 className="font-mono text-3xl md:text-5xl font-bold text-slate-800 leading-tight mb-6">
            We hate bad software
            <br />
            <span className="text-sky-500">as much as you do.</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-4">
            CodeSucks is a web development studio based in Cebu City, Philippines. We specialize in building internal business systems — the kind that actually get used, not abandoned after a week.
          </p>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            We work with small to mid-sized companies who are tired of off-the-shelf software that almost fits. We build exactly what you need, nothing more, nothing less.
          </p>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">
          {VALUES.map((item) => (
            <div key={item.title} className="flex gap-4 items-start p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all duration-200">
              <span className={`w-3 h-3 rounded-full flex-shrink-0 mt-1.5 ${item.icon}`} />
              <div>
                <p className="font-semibold text-slate-800 mb-1">{item.title}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}