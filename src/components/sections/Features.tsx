import { Bot, Database, Shield, Workflow } from 'lucide-react'
import { features } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'

const iconMap = {
  database: Database,
  bot: Bot,
  workflow: Workflow,
  shield: Shield,
} as const

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Возможности"
          title="От сырых источников до решений на данных"
          description="Платформа закрывает полный цикл: подключение, качество, агенты и публикация результатов в продукты и отчёты."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon]
            return (
              <article
                key={feature.title}
                className="group rounded-2xl border border-border bg-surface-elevated p-6 transition hover:border-accent/40 hover:shadow-[0_20px_40px_-28px_rgba(13,148,136,0.45)]"
              >
                <div className="mb-4 inline-flex rounded-xl bg-accent-soft p-3 text-accent">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl font-bold text-ink">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                  {feature.description}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
