/**
 * Datagent landing — minimal JS
 * Theme toggle, form (MWG: required-field-feedback), Yandex Metrika
 */

const STORAGE_THEME = 'datagent-theme'

function getPreferredTheme() {
  const stored = localStorage.getItem(STORAGE_THEME)
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const THEME_ICON_SUN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`
const THEME_ICON_MOON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  const toggle = document.querySelector('[data-theme-toggle]')
  if (toggle) {
    const isDark = theme === 'dark'
    toggle.setAttribute('aria-pressed', String(isDark))
    toggle.setAttribute('aria-label', isDark ? 'Включить светлую тему' : 'Включить тёмную тему')
    toggle.innerHTML = isDark ? THEME_ICON_SUN : THEME_ICON_MOON
  }
}

function initTheme() {
  applyTheme(getPreferredTheme())

  const toggle = document.querySelector('[data-theme-toggle]')
  if (!toggle) return

  toggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'
    localStorage.setItem(STORAGE_THEME, next)
    applyTheme(next)
  })
}

/** MWG: required-field-feedback — sync aria-invalid with :user-invalid */
function syncAriaInvalid(input) {
  if (!input.checkValidity()) {
    input.setAttribute('aria-invalid', 'true')
  } else {
    input.removeAttribute('aria-invalid')
  }
}

function initDemoForm() {
  const form = document.querySelector('[data-demo-form]')
  if (!form) return

  const requiredInputs = form.querySelectorAll('input[required]')

  form.addEventListener(
    'blur',
    (event) => {
      if (event.target.matches('input[required]')) {
        syncAriaInvalid(event.target)
      }
    },
    true,
  )

  form.addEventListener('input', (event) => {
    if (event.target.matches('input[required]') && event.target.checkValidity()) {
      event.target.removeAttribute('aria-invalid')
    }
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    requiredInputs.forEach(syncAriaInvalid)

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const data = new FormData(form)
    const name = data.get('name')?.toString().trim() ?? ''
    const contact = data.get('contact')?.toString().trim() ?? ''

    const subject = encodeURIComponent('Заявка на демо Datagent')
    const body = encodeURIComponent(`Имя: ${name}\nКонтакт: ${contact}`)
    window.location.href = `mailto:hello@datagent.ru?subject=${subject}&body=${body}`

    if (typeof window.ym === 'function' && window.DATAGENT_METRIKA_ID) {
      window.ym(window.DATAGENT_METRIKA_ID, 'reachGoal', 'demo_request')
    }
  })
}

function trackCtaClicks() {
  document.querySelectorAll('[data-cta="demo"]').forEach((el) => {
    el.addEventListener('click', () => {
      if (typeof window.ym === 'function' && window.DATAGENT_METRIKA_ID) {
        window.ym(window.DATAGENT_METRIKA_ID, 'reachGoal', 'cta_demo_click')
      }
    })
  })
}

/** Sticky header shadow after scroll (MWG: shrinking-header pattern, lightweight) */
function initHeaderScroll() {
  const header = document.querySelector('[data-site-header]')
  if (!header) return

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 80)
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

function init() {
  initTheme()
  initHeaderScroll()
  initDemoForm()
  trackCtaClicks()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
