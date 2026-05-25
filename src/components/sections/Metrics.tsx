import { metrics } from '../../data/site'

export function Metrics() {
  return (
    <section className="border-b border-border bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 md:px-6">
        {metrics.map((item) => (
          <div key={item.label} className="text-center sm:text-left">
            <p className="font-display text-3xl font-bold text-highlight md:text-4xl">
              {item.value}
            </p>
            <p className="mt-2 text-sm text-white/70">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
