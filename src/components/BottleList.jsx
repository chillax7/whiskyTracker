export default function BottleList({ entries, selectedId, onSelect, onRemove }) {
  return (
    <div className="rounded-lg border border-amber-900/40 bg-zinc-900 p-6 shadow-xl shadow-black/40">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl tracking-wide text-amber-100">The Cellar Book</h3>
        <span className="font-serif text-[11px] tracking-widest text-stone-500 uppercase">
          {entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}
        </span>
      </div>
      <div className="brass-rule my-3" />

      {entries.length === 0 ? (
        <p className="py-8 text-center font-serif text-sm text-stone-500 italic">
          The ledger is empty. Log your first dram to begin the collection.
        </p>
      ) : (
        <ul className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
          {entries.map((entry) => (
            <li key={entry.id}>
              <div
                role="button"
                tabIndex={0}
                onClick={() => onSelect(entry.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelect(entry.id)
                }}
                className={`w-full cursor-pointer rounded border px-4 py-3 text-left transition ${
                  selectedId === entry.id
                    ? 'border-amber-600 bg-amber-900/20'
                    : 'border-stone-800 bg-stone-950/60 hover:border-amber-900/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-serif text-base text-amber-100">{entry.name}</p>
                    <p className="mt-0.5 truncate font-serif text-xs text-stone-400">
                      {[entry.distillery, entry.region, entry.age].filter(Boolean).join(' · ') ||
                        'No details recorded'}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="font-serif text-xs text-amber-500">
                      {'★'.repeat(entry.rating || 0)}
                      <span className="text-stone-700">{'★'.repeat(5 - (entry.rating || 0))}</span>
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemove(entry.id)
                      }}
                      className="text-[11px] text-stone-600 hover:text-red-400"
                    >
                      remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
