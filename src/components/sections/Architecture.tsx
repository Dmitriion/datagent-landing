import { architectureLayers } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'

export function Architecture() {
  return (
    <section
      id="architecture"
      className="scroll-mt-24 border-b border-border bg-surface py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Архитектура"
          title="Слои платформы Datagent"
          description="Базовая схема для публичной страницы. Детали из datagent-architecture.html можно перенести в docs/reference/ и синхронизировать с этим блоком."
        />

        <div className="mt-14 flex flex-col gap-4">
          {architectureLayers.map((layer, index) => (
            <div
              key={layer.id}
              className="grid gap-4 rounded-2xl border border-border bg-surface-elevated p-5 md:grid-cols-[220px_1fr] md:items-center"
              style={{
                marginInline: `${index * 8}px`,
                maxWidth: `calc(100% - ${index * 16}px)`,
              }}
            >
              <div>
                <p className="font-mono text-[10px] tracking-widest text-accent uppercase">
                  {layer.subtitle}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-ink">{layer.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-xs text-ink-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-muted">
          Нужна точная диаграмма из макета? Положите{' '}
          <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-xs">
            datagent-architecture.html
          </code>{' '}
          в <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-xs">docs/reference/</code>.
        </p>
      </div>
    </section>
  )
}
