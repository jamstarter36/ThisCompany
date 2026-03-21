import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID  = "service_3bs3292";
const EMAILJS_TEMPLATE_ID = "template_z9oinv5";
const EMAILJS_PUBLIC_KEY  = "6hTM5lFv2sIdY8p16";

const INITIAL_FORM = {
  name: "",
  role: "",
  company: "",
  quote: "",
  rating: "",
};

export default function TestimonialModal({ isOpen, onClose }) {
  const [form, setForm]       = useState(INITIAL_FORM);
  const [status, setStatus]   = useState("idle"); // idle | sending | success | error

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    form.name,
          from_role:    form.role,
          from_company: form.company,
          message:      form.quote,
          rating:       form.rating,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleClose = () => {
    setForm(INITIAL_FORM);
    setStatus("idle");
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pointer-events-none">
        <div
          className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 pointer-events-auto relative animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200 text-lg"
          >
            ✕
          </button>

          {status === "success" ? (
            // ── Success State ──────────────────────────────────────────
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-2xl">
                ✓
              </div>
              <h3 className="font-mono text-2xl font-bold text-slate-800">Thank you!</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Your feedback means a lot to us. We'll review it and may feature it on our site.
              </p>
              <button
                onClick={handleClose}
                className="mt-2 bg-slate-800 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-slate-700 transition-colors text-sm"
              >
                Close
              </button>
            </div>
          ) : (
            // ── Form State ─────────────────────────────────────────────
            <>
              <div className="mb-6">
                <p className="font-mono text-sky-500 text-xs tracking-widest uppercase mb-2">— Share Your Experience</p>
                <h3 className="font-mono text-2xl font-bold text-slate-800">How did we do?</h3>
                <p className="text-slate-400 text-sm mt-1">We'd love to hear what you think.</p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">
                    Full Name <span className="text-sky-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Juan dela Cruz"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
                  />
                </div>

                {/* Role & Company side by side */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      placeholder="HR Manager"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                      className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">
                    Rating <span className="text-sky-500">*</span>
                    <span className="normal-case tracking-normal font-sans text-slate-400 ml-1">(1.0 – 5.0)</span>
                  </label>
                  <input
                    type="number"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    required
                    min="1"
                    max="5"
                    step="0.1"
                    placeholder="e.g. 4.5"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all"
                  />
                </div>

                {/* Testimonial */}
                <div>
                  <label className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-1.5 block">
                    Your Testimonial <span className="text-sky-500">*</span>
                  </label>
                  <textarea
                    name="quote"
                    value={form.quote}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Working with CodeSucks was..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all resize-none"
                  />
                </div>

                {/* Error message */}
                {status === "error" && (
                  <p className="text-red-500 text-xs">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-slate-800 text-white font-semibold py-3 rounded-xl hover:bg-slate-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                >
                  {status === "sending" ? "Sending..." : "Send Testimonial →"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
      `}</style>
    </>
  );
}