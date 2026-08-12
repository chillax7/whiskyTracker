import { useEffect, useState } from 'react'
import LogDramForm from './components/LogDramForm'
import FlavorChart from './components/FlavorChart'
import BottleList from './components/BottleList'
import { useDramLedger } from './lib/storage'

export default function App() {
  const { entries, addEntry, removeEntry } = useDramLedger()
  const [selectedId, setSelectedId] = useState(null)

  const selected = entries.find((e) => e.id === selectedId) ?? entries[0] ?? null

  const handleSave = (entry) => {
    const record = addEntry(entry)
    setSelectedId(record.id)
  }

  const handleRemove = (id) => {
    removeEntry(id)
    if (selectedId === id) setSelectedId(null)
  }

  useEffect(() => {
    document.title = 'The Dram Ledger'
  }, [])

  return (
    <div className="min-h-screen text-stone-200">
      <header className="border-b border-amber-900/30 bg-stone-950/60">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="font-serif text-[11px] tracking-[0.3em] text-amber-600 uppercase">
            Est. in the digital age
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-wide text-amber-100 sm:text-5xl">
            The Dram Ledger
          </h1>
          <p className="mt-2 max-w-xl font-serif text-sm text-stone-400 italic">
            A private record of fine whiskies tasted, rated, and remembered — kept for members
            of discerning palate.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <section aria-label="Log a new dram">
            <LogDramForm onSave={handleSave} />
          </section>

          <section aria-label="Collection summary" className="space-y-8">
            <FlavorChart
              profile={selected?.flavor}
              title={selected ? `Flavor Profile — ${selected.name}` : 'Flavor Profile'}
              subtitle={selected ? 'Select any entry below to inspect its fingerprint' : undefined}
            />
            <BottleList
              entries={entries}
              selectedId={selected?.id}
              onSelect={setSelectedId}
              onRemove={handleRemove}
            />
          </section>
        </div>
      </main>

      <footer className="mx-auto max-w-7xl px-6 py-10 text-center">
        <p className="font-serif text-xs text-stone-600 italic">
          Kept privately in this browser. Nothing leaves the room.
        </p>
      </footer>
    </div>
  )
}
