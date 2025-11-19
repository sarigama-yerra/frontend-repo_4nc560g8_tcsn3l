export default function OpportunityCard({ item, onVerify }) {
  const chip = (text) => (
    <span className="px-2 py-0.5 text-xs rounded-full bg-slate-700 text-blue-200 border border-slate-600">
      {text}
    </span>
  );

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-blue-100">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold text-lg">{item.title}</h3>
          <p className="text-sm text-blue-200/80 mt-1 line-clamp-3">{item.description}</p>
        </div>
        {item.status !== "published" && (
          <button
            className="text-xs px-2 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
            onClick={() => onVerify?.(item.id)}
          >
            Verify
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {chip(item.category)}
        {item.city && chip(item.city)}
        {chip(item.mode)}
        {chip(item.is_paid ? "Paid" : "Free")}
        {item.tags?.slice(0, 4).map((t) => chip(t))}
      </div>

      <div className="mt-3 text-xs text-blue-300/70">
        <a className="underline hover:text-white" href={item.url} target="_blank" rel="noreferrer">
          Official page
        </a>
      </div>
    </div>
  );
}
