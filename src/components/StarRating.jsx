export default function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const partial = !filled && rating > star - 1;
        const fillPercent = partial ? Math.round((rating - (star - 1)) * 100) : 0;

        return (
          <span key={star} className="relative inline-block text-lg leading-none">
            {/* Empty star */}
            <span className="text-slate-200">★</span>
            {/* Filled overlay */}
            {(filled || partial) && (
              <span
                className="absolute inset-0 overflow-hidden text-amber-400"
                style={{ width: filled ? "100%" : `${fillPercent}%` }}
              >
                ★
              </span>
            )}
          </span>
        );
      })}
      <span className="ml-1.5 text-xs font-mono text-slate-400">{rating.toFixed(1)}</span>
    </div>
  );
}