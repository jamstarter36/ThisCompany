import SERVICES from "../data/Services.js";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-100 border-t border-slate-200 py-12 md:py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">

        <div>
          <span className="font-mono text-2xl font-bold text-slate-800">
            Dev<span className="text-sky-500">Weave</span>
            <span className="text-slate-300">.</span>
          </span>
          <p className="text-slate-500 text-sm mt-3 max-w-xs">
            We build the web systems your business actually runs on.
          </p>
        </div>

        <div className="flex gap-10 md:gap-16 flex-wrap">
          <div>
            <p className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-4">Services</p>
            {SERVICES.map((s) => (
              <p key={s.id} className="text-slate-500 text-sm mb-2 hover:text-slate-900 cursor-pointer transition-colors">
                {s.title}
              </p>
            ))}
          </div>
          <div>
            <p className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-4">Contact</p>
            <p className="text-slate-500 text-sm mb-2">hello@codesucks.dev</p>
            <p className="text-slate-500 text-sm mb-2">Cebu City, PH</p>
          </div>
        </div>

      </div>
      <div className="max-w-6xl mx-auto mt-10 md:mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <p className="font-mono text-xs text-slate-400">© 2026 CodeSucks. All rights reserved.</p>
        <p className="font-mono text-xs text-slate-300">Built with ☕ and mild suffering.</p>
      </div>
    </footer>
  );
}