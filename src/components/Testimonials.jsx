import { useState, useEffect, useRef } from "react";
import TESTIMONIALS from "../data/Testimonials";
import TestimonialModal from "./TestimonialModal";
import StarRating from "./StarRating";

const SWIPER_THRESHOLD = 6;

const overallRating = (
  TESTIMONIALS.reduce((sum, t) => sum + t.rating, 0) / TESTIMONIALS.length
).toFixed(1);

// ─── Testimonial Card (shared) ────────────────────────────────────────────────

function TestimonialCard({ t }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200 h-full">
      <StarRating rating={t.rating} />
      <p className="text-slate-600 text-sm md:text-base leading-relaxed flex-1">
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm flex-shrink-0 ${t.color}`}>
          {t.initial}
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
          <p className="text-slate-400 text-xs">{t.role} · {t.company}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Grid Layout (< 6 testimonials) ──────────────────────────────────────────

function GridLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {TESTIMONIALS.map((t) => (
        <TestimonialCard key={t.id} t={t} />
      ))}
    </div>
  );
}

// ─── Swiper Layout (6+ testimonials) ─────────────────────────────────────────

function SwiperLayout() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const total = TESTIMONIALS.length;
  const visibleCount = 3;
  const maxIndex = total - visibleCount;

  const go = (dir) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => Math.max(0, Math.min(prev + dir, maxIndex)));
    setTimeout(() => setIsAnimating(false), 400);
  };

  return (
    <div>
      {/* Cards */}
      <div className="overflow-hidden">
        <div
          className="flex gap-6 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(calc(-${current} * (100% / ${visibleCount} + ${24 / visibleCount}px)))` }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              style={{ width: `calc((100% - ${(visibleCount - 1) * 24}px) / ${visibleCount})` }}
              className="flex-shrink-0"
            >
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-8">
        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-slate-800" : "w-1.5 bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => go(-1)}
            disabled={current === 0}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ←
          </button>
          <button
            onClick={() => go(1)}
            disabled={current === maxIndex}
            className="w-9 h-9 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Testimonials Section ────────────────────────────────────────────────

export default function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);
  const useSwiper = TESTIMONIALS.length > SWIPER_THRESHOLD;

  return (
    <section id="testimonials" className="bg-slate-50 border-t border-slate-200 py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-sky-500 text-xs tracking-widest uppercase mb-4">— What Clients Say</p>
            <h2 className="font-mono text-3xl md:text-5xl font-bold text-slate-800 leading-tight">
              Don't take our word for it.
            </h2>
          </div>

          {/* Overall Rating */}
          <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 flex flex-col gap-1 shrink-0">
            <p className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-1">Overall Rating</p>
            <div className="flex items-center gap-3">
              <span className="font-mono text-4xl font-bold text-slate-800">{overallRating}</span>
              <div className="flex flex-col gap-1">
                <StarRating rating={parseFloat(overallRating)} />
                <p className="text-xs text-slate-400 font-mono">Based on {TESTIMONIALS.length} reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Layout */}
        {useSwiper ? <SwiperLayout /> : <GridLayout />}

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="font-semibold text-sm border border-slate-300 text-slate-600 px-6 py-3 rounded-xl hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-all duration-200"
          >
            Share Your Experience →
          </button>
        </div>

      </div>

      {/* Modal */}
      <TestimonialModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}