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

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  const toggle = document.querySelector('[data-theme-toggle]')
  if (toggle) {
    const isDark = theme === 'dark'
    toggle.setAttribute('aria-pressed', String(isDark))
    toggle.setAttribute('aria-label', isDark ? 'Включить светлую тему' : 'Включить тёмную тему')
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

function init() {
  initTheme()
  initDemoForm()
  trackCtaClicks()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
