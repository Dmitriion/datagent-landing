import { navLinks, siteConfig } from '../../data/site'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface-elevated">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-display text-lg font-bold text-ink">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-ink-muted">{siteConfig.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-6" aria-label="Футер">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted transition hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p className="text-sm text-ink-muted">© {year} Datagent. Все права защищены.</p>
      </div>
    </footer>
  )
}
