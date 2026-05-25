import { steps } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Процесс"
          title="Как команды запускают Datagent"
          description="Четыре шага от подключения источников до промышленного использования агентов и API."
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-2">
          {steps.map((item) => (
            <li
              key={item.step}
              className="relative rounded-2xl border border-border bg-surface-elevated p-6 pl-16"
            >
              <span className="absolute top-6 left-6 font-display text-2xl font-bold text-accent/80">
                {item.step}
              </span>
              <h3 className="font-display text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted md:text-base">
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
