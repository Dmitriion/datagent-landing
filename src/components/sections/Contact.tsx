import { siteConfig } from '../../data/site'
import { SectionHeading } from '../ui/SectionHeading'

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-ink text-white">
          <div className="grid gap-10 p-8 md:grid-cols-2 md:p-12">
            <div>
              <SectionHeading
                align="left"
                eyebrow="Контакты"
                title="Готовы обсудить пилот?"
                description="Оставьте заявку — команда продукта свяжется с вами и покажет сценарии под ваш стек данных."
              />
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <label className="text-sm font-medium text-white/80">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-accent"
                />
              </label>
              <label className="text-sm font-medium text-white/80">
                Компания
                <input
                  type="text"
                  name="company"
                  placeholder="Название"
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-accent"
                />
              </label>
              <button
                type="submit"
                className="mt-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
              >
                {siteConfig.ctaPrimary}
              </button>
              <p className="text-xs text-white/50">
                Или напишите на{' '}
                <a href={`mailto:${siteConfig.contactEmail}`} className="underline">
                  {siteConfig.contactEmail}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
