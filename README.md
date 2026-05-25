# datagent-landing

Публичный лендинг и маркетинговые страницы продукта **Datagent** — AI-оркестратор для автоматизации бизнес-процессов.

Репозиторий изолирован от продукта. Деплой лендинга не затрагивает продуктовый CI/CD datagent. Любая правка текста, офферов или структуры страницы — коммит сюда, пуш, и через ~30 секунд на [datagent.ru](https://datagent.ru).

## Содержание

- [Цели репозитория](#цели-репозитория)
- [Структура проекта](#структура-проекта)
- [Технический стек](#технический-стек)
- [Дизайн-система](#дизайн-система)
- [Начало работы](#начало-работы)
- [Деплой](#деплой)
- [Настройка домена](#настройка-домена)
- [Правила разработки](#правила-разработки)
- [Связанные репозитории](#связанные-репозитории)

## Цели репозитория

| Цель | Метрика успеха |
|------|----------------|
| Проверить спрос на Datagent | ≥ 10 заявок на демо за первые 30 дней |
| Конвертировать холодный трафик | CTR кнопки «Запросить демо» ≥ 5% |
| Поддерживать быстрый цикл правок | Время от коммита до прода &lt; 2 минут |
| Независимость от продуктового деплоя | Нулевые зависимости от datagent monorepo |

Лендинг — инструмент кастдева, не витрина. Тексты, оффер и структура меняются по результатам интервью с клиентами, а не по вкусу разработчика.

## Структура проекта

```
datagent-landing/
│
├── index.html                  # Главная страница (datagent.ru)
├── assets/
│   ├── css/
│   │   ├── tokens.css          # Дизайн-токены
│   │   ├── base.css            # Сброс, базовые стили
│   │   └── main.css            # Компоненты
│   ├── js/
│   │   └── main.js             # Тема, форма, цели Метрики
│   └── img/                    # SVG / WebP / AVIF
├── CNAME                       # GitHub Pages: datagent.ru
├── .github/workflows/deploy.yml
├── AGENTS.md                   # Правила для Cursor / агентов
└── README.md
```

**Правило одного файла.** Весь лендинг — `index.html` + внешние `assets/`. Нет фреймворков, нет сборщиков. Открывается в браузере напрямую без `npm install`.

## Технический стек

### Принципы

- **Нет сборщика** — Vite/Webpack избыточны для одностраничного лендинга.
- **Нет фреймворка** — React/Vue не нужны для статичной маркетинговой страницы.
- **Baseline 2024** — только возможности с широкой поддержкой; прогрессивное улучшение.

### Используем

| Слой | Инструмент |
|------|------------|
| HTML | Semantic HTML5 (`<dialog>`, `<details>`, …) |
| CSS | oklch(), clamp(), nesting |
| JS | Vanilla ES2024, `defer` |
| Шрифты | [Fontshare](https://fontshare.com) — Satoshi + Cabinet Grotesk |
| Иконки | Inline SVG |
| Аналитика | Яндекс.Метрика (шаблон в `index.html`) |
| Деплой | GitHub Pages при пуше в `main` |
| Домен | datagent.ru (`CNAME`) |

### Не используем

❌ React / Vue / Svelte · ❌ Tailwind · ❌ Bootstrap · ❌ jQuery · ❌ Google Fonts

## Дизайн-система

Токены: `assets/css/tokens.css`. Тёмная тема: `[data-theme="dark"]` + `prefers-color-scheme`.

Типографика: Cabinet Grotesk (hero), Satoshi (тело и UI) — размеры через `clamp()`.

### Блоки лендинга

```
[Nav]          — логотип + CTA + переключатель темы
[Hero]         — оффер + CTA + визуал продукта
[Problem]      — боли из кастдева
[Solution]     — 3 сценария
[Social proof] — кейс (после пилота)
[Pricing]      — КП по запросу
[FAQ]          — <details> без JS
[CTA]          — форма имя + контакт
[Footer]
```

⚠️ **Hero** и **Problem** переписываются после каждых 5 интервью.

## Начало работы

**Требования:** Git, браузер. Опционально: VS Code + Live Server.

```bash
git clone https://github.com/Dmitriion/datagent-landing.git
cd datagent-landing
# Открыть index.html в браузере
```

Нет `npm install`. Нет `npm run dev` — намеренно.

### Агентная разработка (Cursor)

```bash
npx modern-web-guidance@latest install
```

Конфигурация для агента — в `AGENTS.md`.

## Деплой

При пуше в `main` — GitHub Actions (`.github/workflows/deploy.yml`). Время до обновления сайта: ~30–60 секунд.

```bash
git add .
git commit -m "copy: update hero after custdev round 1"
git push origin main
```

## Настройка домена

1. Файл `CNAME` в корне: `datagent.ru`
2. DNS у регистратора:

```
@   A     185.199.108.153
@   A     185.199.109.153
@   A     185.199.110.153
@   A     185.199.111.153
www CNAME Dmitriion.github.io.
```

3. GitHub → Settings → Pages → Custom domain → datagent.ru → Enforce HTTPS

## Правила разработки

### Коммиты

- `feat:` — новый блок
- `fix:` — баг вёрстки/скрипта
- `copy:` — тексты
- `perf:` — оптимизация
- `style:` — дизайн без смены смысла
- `a11y:` — доступность

### Чеклист перед пушем

- [ ] 375px и 1280px, без горизонтального скролла
- [ ] CTA above the fold на мобиле
- [ ] `alt`, `width`, `height` на изображениях; LCP — `loading="eager"`
- [ ] Форма работает (mailto-заглушка или API)
- [ ] Тёмная тема читаема
- [ ] `<title>` и meta description актуальны

### Запрещено

- Менять лендинг вместе с продуктовым репо в одном коммите
- Добавлять npm-зависимости без обсуждения
- Менять тексты без кастдева или явной гипотезы

### Аналитика

Цели в Метрике: `cta_demo_click`, `demo_request`. После 10 заявок — пересмотр Hero и Problem.

## Связанные репозитории

| Репозиторий | Назначение |
|-------------|------------|
| [Dmitriion/datagent](https://github.com/Dmitriion/datagent) | Продукт — Node.js monorepo |
| [Dmitriion/datagent-landing](https://github.com/Dmitriion/datagent-landing) | Этот репозиторий |

## Лицензия

Код лендинга — **MIT**. Тексты, логотип и брендинг Datagent — **All Rights Reserved**.

*Последнее обновление: май 2026 · Dmitrii Ionov / CDTO → Founder, Datagent*
