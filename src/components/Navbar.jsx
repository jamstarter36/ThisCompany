import { useEffect, useState } from "react";

const NAV_LINKS = ["About", "Services", "Testimonials", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/90 backdrop-blur border-b border-slate-200 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-3xl font-bold tracking-tight text-slate-800">
          Dev<span className="text-sky-500">Weave</span>
          <span className="text-slate-300">.</span>
        </span>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 tracking-wide"
            >
              {link}
            </a>
          ))}
          <button className="text-sm bg-slate-800 text-white font-semibold px-4 py-2 rounded hover:bg-slate-700 transition-colors duration-200">
            Get a Quote
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-slate-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-6 flex flex-col gap-4 bg-white/95 border-t border-slate-100">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={handleLinkClick}
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors py-1"
            >
              {link}
            </a>
          ))}
          <button className="text-sm bg-slate-800 text-white font-semibold px-4 py-2 rounded hover:bg-slate-700 transition-colors w-full">
            Get a Quote
          </button>
        </div>
      </div>
    </nav>
  );
}