import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'dram-ledger.entries.v1'

export const FLAVOR_AXES = [
  { key: 'peat', label: 'Peat & Smoke' },
  { key: 'sweetness', label: 'Sweetness' },
  { key: 'oak', label: 'Oak & Wood' },
  { key: 'spice', label: 'Spice' },
  { key: 'fruit', label: 'Fruit' },
]

export function emptyFlavorProfile() {
  return { peat: 3, sweetness: 3, oak: 3, spice: 3, fruit: 3 }
}

function readEntries() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useDramLedger() {
  const [entries, setEntries] = useState(readEntries)

  useEffect(() => {
    writeEntries(entries)
  }, [entries])

  const addEntry = useCallback((entry) => {
    const record = {
      id: crypto.randomUUID(),
      loggedAt: new Date().toISOString(),
      ...entry,
    }
    setEntries((prev) => [record, ...prev])
    return record
  }, [])

  const removeEntry = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }, [])

  return { entries, addEntry, removeEntry }
}
