import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'
import { FLAVOR_AXES } from '../lib/storage'

export default function FlavorChart({ profile, title = 'Flavor Profile', subtitle }) {
  const data = FLAVOR_AXES.map(({ key, label }) => ({
    subject: label,
    value: profile?.[key] ?? 0,
  }))

  const hasData = profile && Object.values(profile).some((v) => v > 0)

  return (
    <div className="rounded-lg border border-amber-900/40 bg-zinc-900 p-6 shadow-xl shadow-black/40">
      <h3 className="font-serif text-xl tracking-wide text-amber-100">{title}</h3>
      {subtitle && <p className="mt-0.5 font-serif text-xs text-stone-400 italic">{subtitle}</p>}
      <div className="brass-rule my-3" />

      {hasData ? (
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#92400e" strokeOpacity={0.35} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#fef3c7', fontSize: 12, fontFamily: '"Merriweather", serif' }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 5]}
              tickCount={6}
              axisLine={false}
              tick={{ fill: '#78716c', fontSize: 9 }}
            />
            <Radar
              name="Whisky"
              dataKey="value"
              stroke="#d97706"
              strokeWidth={2}
              fill="#d97706"
              fillOpacity={0.4}
              isAnimationActive={false}
            />
          </RadarChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex h-[280px] items-center justify-center text-center">
          <p className="font-serif text-sm text-stone-500 italic">
            No dram yet holds this fingerprint.
            <br />
            Log a bottle to see its profile.
          </p>
        </div>
      )}
    </div>
  )
}
