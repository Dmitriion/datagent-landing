# Datagent Landing

Публичная страница **Datagent** — AI-платформа управления данными. Репозиторий подготовлен для разработки лендинга и последующей публикации (GitHub Pages, Vercel, Netlify и т.д.).

## Стек

| Слой | Технология |
|------|------------|
| Сборка | [Vite](https://vite.dev/) 8 |
| UI | React 19 + TypeScript |
| Стили | Tailwind CSS 4 |
| Иконки | lucide-react |

## Быстрый старт

```bash
# Требования: Node.js 20+
npm install
cp .env.example .env
npm run dev
```

Откройте [http://localhost:5173](http://localhost:5173).

## Скрипты

| Команда | Назначение |
|---------|------------|
| `npm run dev` | Локальная разработка с HMR |
| `npm run build` | Production-сборка в `dist/` |
| `npm run preview` | Просмотр production-сборки |
| `npm run lint` | ESLint |
| `npm run typecheck` | Проверка типов без сборки |

## Структура проекта

```
src/
  components/
    layout/     # Header, Footer
    sections/   # Hero, Features, Architecture, …
    ui/         # Общие UI-блоки
  data/
    site.ts     # Тексты, метрики, слои архитектуры
docs/
  reference/    # Сюда положить datagent-architecture.html из макета
public/
  favicon.svg
```

Контент лендинга централизован в `src/data/site.ts` — удобно править копирайт и метрики без правок вёрстки.

## Макет и архитектура

Файлы с локальной машины (`README.md`, `datagent-architecture.html` из Downloads) в облачной среде недоступны. Чтобы синхронизировать публичную страницу с вашим макетом:

1. Скопируйте `datagent-architecture.html` в `docs/reference/`.
2. Сверьте слои и подписи с блоком **Архитектура** (`src/data/site.ts` и `src/components/sections/Architecture.tsx`).
3. При необходимости вынесите статичную диаграмму в отдельный компонент или iframe.

## Переменные окружения

Скопируйте `.env.example` в `.env`:

- `VITE_CONTACT_EMAIL` — email в блоке контактов.

## Деплой

Статический хостинг после `npm run build`:

- **GitHub Pages**: `base: '/datagent-landing/'` в `vite.config.ts`, workflow `npm run build` → `dist/`.
- **Vercel / Netlify**: корень репозитория, build `npm run build`, output `dist`.

## Дальнейшие шаги (продукт / фронтенд)

- [ ] Подставить финальные тексты и бренд из product README.
- [ ] Импортировать точную схему из `datagent-architecture.html`.
- [ ] Подключить форму заявки (API / HubSpot / Formspree).
- [ ] Добавить аналитику (Plausible, GA4).
- [ ] i18n (RU / EN), если нужен экспорт.

## Лицензия

Проприетарный проект Datagent. Уточните лицензию у владельца репозитория.
