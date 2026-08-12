export default function FlavorSlider({ label, value, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="font-serif text-sm text-stone-300">{label}</label>
        <span className="font-serif text-sm text-amber-500">{value}</span>
      </div>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="ledger-focus mt-1 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-stone-800 accent-amber-600"
      />
    </div>
  )
}
