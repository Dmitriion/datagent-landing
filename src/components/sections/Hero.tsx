import { ArrowRight, Sparkles } from 'lucide-react'
import { siteConfig } from '../../data/site'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, var(--color-accent-soft) 0%, transparent 45%), radial-gradient(circle at 80% 0%, rgba(245,158,11,0.12) 0%, transparent 40%)',
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:items-center md:px-6 md:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium text-ink-muted">
            <Sparkles className="text-accent" size={14} />
            {siteConfig.tagline}
          </div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
            Данные, агенты и пайплайны — в одной платформе
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
            {siteConfig.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
            >
              {siteConfig.ctaPrimary}
              <ArrowRight size={16} />
            </a>
            <a
              href="#architecture"
              className="inline-flex items-center rounded-full border border-border bg-surface-elevated px-6 py-3 text-sm font-semibold text-ink transition hover:border-accent/40"
            >
              {siteConfig.ctaSecondary}
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-[0_24px_60px_-30px_rgba(11,18,32,0.35)]">
          <p className="font-mono text-xs text-ink-muted">agent.session / live</p>
          <div className="mt-4 space-y-3 font-mono text-sm">
            <div className="rounded-lg bg-surface px-3 py-2 text-ink-muted">
              <span className="text-accent">&gt;</span> Подключить Snowflake + CRM
            </div>
            <div className="rounded-lg bg-surface px-3 py-2 text-ink">
              <span className="text-highlight">✓</span> Схема синхронизирована · 142 таблицы
            </div>
            <div className="rounded-lg bg-surface px-3 py-2 text-ink">
              <span className="text-accent">&gt;</span> SQL Agent: cohort retention Q1
            </div>
            <div className="rounded-lg border border-accent/30 bg-accent-soft/40 px-3 py-2 text-ink">
              Отчёт готов · lineage сохранён · policy: finance-read
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
