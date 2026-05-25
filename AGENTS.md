# AGENTS.md

**Baseline target:** Baseline 2024 (Widely Available features by default; Newly Available with light fallbacks only when noted).

## Modern Web Guidance (обязательно)

Перед правками HTML, CSS или клиентского JS:

1. Прочитать skill: `.agents/skills/modern-web-guidance/SKILL.md`
2. Поиск паттерна:
   ```bash
   npx -y modern-web-guidance@latest search "<что делаем>" --skill-version 2026_05_16-c5e7870
   ```
3. Получить гайд:
   ```bash
   npx -y modern-web-guidance@latest retrieve "<id>" --skill-version 2026_05_16-c5e7870
   ```

**Browser support:** Baseline 2024. Без polyfill-библиотек; кастомный fallback ≤ ~20 строк, если гайд требует.

## Stack

- Semantic HTML5 + `assets/` (no build step for content)
- **Deploy:** Docker + nginx (`Dockerfile`, `docker-compose.yml`)
- No React, Vite, Tailwind, npm for the landing runtime

## Rules

- **Do not** use GitHub Pages — private repo
- `ops:` Docker/CI · `copy:` marketing · `a11y:` accessibility · `perf:` CWV
- Hero LCP image: `fetchpriority="high"`, **no** `loading="lazy"`
- Forms: `:user-invalid` / `:user-valid`, sync `aria-invalid` (see `required-field-feedback`)
- Verify: `docker compose up --build` or `./scripts/test-env.sh start`

## Deploy

```bash
docker compose up --build
./scripts/test-env.sh start   # Cursor / локально
```

Production: VPS container + reverse proxy → datagent.ru.
