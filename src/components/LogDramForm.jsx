import { useState } from 'react'
import BarcodeScanner from './BarcodeScanner'
import FlavorSlider from './FlavorSlider'
import { FLAVOR_AXES, emptyFlavorProfile } from '../lib/storage'

const initialForm = {
  name: '',
  distillery: '',
  region: '',
  age: '',
  abv: '',
  barcode: '',
  rating: 3,
  notes: '',
  flavor: emptyFlavorProfile(),
}

export default function LogDramForm({ onSave }) {
  const [form, setForm] = useState(initialForm)
  const [justSaved, setJustSaved] = useState(false)

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const setFlavor = (key, value) =>
    setForm((f) => ({ ...f, flavor: { ...f.flavor, [key]: value } }))

  const handleBarcodeDetected = (code) => setField('barcode', code)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return

    onSave({
      name: form.name.trim(),
      distillery: form.distillery.trim(),
      region: form.region.trim(),
      age: form.age.trim(),
      abv: form.abv.trim(),
      barcode: form.barcode.trim(),
      rating: Number(form.rating),
      notes: form.notes.trim(),
      flavor: form.flavor,
    })

    setForm(initialForm)
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 2500)
  }

  return (
    <div className="space-y-6">
      <BarcodeScanner onDetected={handleBarcodeDetected} />

      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-amber-900/40 bg-zinc-900 p-6 shadow-xl shadow-black/40"
      >
        <h3 className="font-serif text-xl tracking-wide text-amber-100">Log a New Dram</h3>
        <p className="mt-0.5 font-serif text-xs text-stone-400 italic">
          Commit this bottle to the ledger, for posterity.
        </p>
        <div className="brass-rule my-3" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Bottle Name" required span2>
            <input
              value={form.name}
              onChange={(e) => setField('name', e.target.value)}
              placeholder="e.g. Lagavulin 16"
              required
              className={inputClass}
            />
          </Field>

          <Field label="Distillery">
            <input
              value={form.distillery}
              onChange={(e) => setField('distillery', e.target.value)}
              placeholder="e.g. Lagavulin"
              className={inputClass}
            />
          </Field>

          <Field label="Region">
            <input
              value={form.region}
              onChange={(e) => setField('region', e.target.value)}
              placeholder="e.g. Islay"
              className={inputClass}
            />
          </Field>

          <Field label="Age Statement">
            <input
              value={form.age}
              onChange={(e) => setField('age', e.target.value)}
              placeholder="e.g. 16 Years"
              className={inputClass}
            />
          </Field>

          <Field label="ABV %">
            <input
              value={form.abv}
              onChange={(e) => setField('abv', e.target.value)}
              placeholder="e.g. 43%"
              className={inputClass}
            />
          </Field>

          <Field label="Barcode Number" span2>
            <input
              value={form.barcode}
              onChange={(e) => setField('barcode', e.target.value)}
              placeholder="Scan above, or enter manually"
              className={`${inputClass} tracking-widest`}
            />
          </Field>

          <Field label="Personal Rating">
            <select
              value={form.rating}
              onChange={(e) => setField('rating', e.target.value)}
              className={inputClass}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {'★'.repeat(n)}
                  {'☆'.repeat(5 - n)}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-6">
          <h4 className="font-serif text-sm tracking-widest text-amber-500 uppercase">
            Flavor Fingerprint
          </h4>
          <div className="mt-3 space-y-3">
            {FLAVOR_AXES.map(({ key, label }) => (
              <FlavorSlider
                key={key}
                label={label}
                value={form.flavor[key]}
                onChange={(v) => setFlavor(key, v)}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="font-serif text-sm text-stone-300">Tasting Notes</label>
          <textarea
            value={form.notes}
            onChange={(e) => setField('notes', e.target.value)}
            rows={3}
            placeholder="Notes on nose, palate, and finish..."
            className={`${inputClass} mt-1 resize-none`}
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded border border-amber-700/60 bg-amber-900/30 py-2.5 font-serif text-sm tracking-widest text-amber-100 uppercase transition hover:border-amber-500 hover:bg-amber-900/50"
        >
          {justSaved ? 'Entered in the Ledger ✓' : 'Add to Ledger'}
        </button>
      </form>
    </div>
  )
}

const inputClass =
  'ledger-focus w-full rounded border border-stone-700 bg-stone-950 px-3 py-2 font-serif text-sm text-stone-100 placeholder:text-stone-600'

function Field({ label, required, span2, children }) {
  return (
    <div className={span2 ? 'sm:col-span-2' : ''}>
      <label className="font-serif text-sm text-stone-300">
        {label}
        {required && <span className="text-amber-600"> *</span>}
      </label>
      <div className="mt-1">{children}</div>
    </div>
  )
}
