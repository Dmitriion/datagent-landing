# datagent-landing

Публичный лендинг и маркетинговые страницы продукта **Datagent** — AI-оркестратор для автоматизации бизнес-процессов.

Репозиторий **приватный** и изолирован от продуктового monorepo. Деплой — **Docker-контейнер** (nginx + статика), без GitHub Pages: на бесплатном плане публичный Pages означал бы открытый исходник.

## Содержание

- [Цели репозитория](#цели-репозитория)
- [Структура проекта](#структура-проекта)
- [Технический стек](#технический-стек)
- [Начало работы](#начало-работы)
- [Деплой в контейнере](#деплой-в-контейнере)
- [Домен datagent.ru](#домен-datagentru)
- [CI](#ci)
- [Правила разработки](#правила-разработки)

## Цели репозитория

| Цель | Метрика успеха |
|------|----------------|
| Проверить спрос на Datagent | ≥ 10 заявок на демо за первые 30 дней |
| Конвертировать холодный трафик | CTR «Запросить демо» ≥ 5% |
| Быстрый цикл правок | Образ пересобран и выкатан за минуты |
| Независимость от продукта | Нулевые зависимости от datagent monorepo |

## Структура проекта

```
datagent-landing/
├── index.html
├── assets/              # css, js, img
├── docker/
│   └── nginx.conf
├── Dockerfile
├── docker-compose.yml
├── .github/workflows/container.yml
├── AGENTS.md
└── README.md
```

Весь лендинг — `index.html` + `assets/`. **Нет npm и сборщика** в рантайме; образ только упаковывает статику в nginx.

## Технический стек

| Слой | Инструмент |
|------|------------|
| HTML/CSS/JS | Vanilla, Baseline 2024 |
| Рантайм | **nginx:alpine** в Docker |
| Шрифты | Fontshare (Satoshi + Cabinet Grotesk) |
| Аналитика | Яндекс.Метрика (шаблон в `index.html`) |
| Деплой | Ваш VPS / облако / приватный registry |

**Не используем:** GitHub Pages, React, Vite, Tailwind, публичный хостинг кода.

## Начало работы

### Только вёрстка (без Docker)

```bash
git clone git@github.com:Dmitriion/datagent-landing.git
cd datagent-landing
# Открыть index.html в браузере или Live Server
```

### Локально в контейнере (рекомендуется)

```bash
cp .env.example .env
docker compose up --build
```

Сайт: [http://localhost:8080](http://localhost:8080) (порт задаётся `LANDING_PORT` в `.env`).

```bash
docker compose down
```

### Тестовая среда в Cursor Cloud

Dev-сервер слушает **все интерфейсы** (`0.0.0.0:8080`):

```bash
cp .env.example .env
chmod +x scripts/test-env.sh
./scripts/test-env.sh start    # выведет url_local и url_lan
./scripts/test-env.sh status
./scripts/test-env.sh stop
```

Примеры URL после `start`:
- `http://127.0.0.1:8080/` — localhost
- `http://<LAN-IP>:8080/` — IP из `hostname -I` (в Cursor — forwarded port)

В облаке агента Docker build/run может быть недоступен; скрипт переключится на **host nginx** (`docker/nginx.dev.conf`).

**Cursor Cloud Environment** (автозапуск при старте агента):

```bash
./scripts/cloud-dev-up.sh start      # фон (install/start hook)
./scripts/cloud-dev-up.sh foreground # терминал, держит процесс
./scripts/cloud-dev-up.sh status
```

Конфиг: `.cursor/environment.json` → `install` + `start` + терминал `datagent-landing`.

**Cloud Desktop (без проброса на ПК):** лендинг на `http://127.0.0.1:8080/` внутри облачного Chrome:

```bash
./scripts/open-cloud-browser.sh
```

### Агентная разработка (Cursor)

**Modern Web Guidance** (Google Chrome) установлен в репозиторий:

```bash
npx modern-web-guidance@latest install   # обновить skill
```

- Skill: `.agents/skills/modern-web-guidance/`
- Cursor: `.cursor/skills/modern-web-guidance`
- Правило: `.cursor/rules/modern-web-guidance.mdc`
- Перед HTML/CSS/JS: `search` → `retrieve` (см. `AGENTS.md`)

## Деплой в контейнере

### 1. Сборка образа

```bash
docker build -t datagent-landing:latest .
```

### 2. Запуск на сервере

```bash
docker run -d \
  --name datagent-landing \
  --restart unless-stopped \
  -p 127.0.0.1:8080:80 \
  datagent-landing:latest
```

Порт `8080` на loopback — снаружи доступ только через reverse proxy (Caddy, Traefik, nginx).

### 3. Обновление после правок

```bash
git pull
docker build -t datagent-landing:latest .
docker stop datagent-landing && docker rm datagent-landing
docker run -d --name datagent-landing --restart unless-stopped -p 127.0.0.1:8080:80 datagent-landing:latest
```

Или `docker compose up -d --build` на сервере, если лежит `docker-compose.yml`.

### 4. Приватный registry (опционально)

Соберите и пушьте в **GHCR / Docker Hub / Yandex CR** с приватной видимостью. В `.github/workflows/container.yml` есть закомментированный job `publish` — включите после настройки secrets.

На сервере:

```bash
docker login ghcr.io
docker pull ghcr.io/<org>/datagent-landing:latest
docker run -d ... ghcr.io/<org>/datagent-landing:latest
```

## Домен datagent.ru

GitHub Pages **не используется**. DNS указывает на **ваш сервер** с контейнером:

```
@    A     <IP вашего VPS>
www  A     <IP вашего VPS>
```

Пример фрагмента Caddy (`/etc/caddy/Caddyfile`):

```caddy
datagent.ru, www.datagent.ru {
    reverse_proxy 127.0.0.1:8080
}
```

Caddy сам выпустит TLS (Let's Encrypt). Аналогично — Traefik или nginx как TLS-терминация перед контейнером.

## CI

Workflow `container.yml`:

- на PR и push в `main` — сборка образа и smoke-тест (`curl` главной и CSS);
- **не** публикует сайт в открытый интернет GitHub.

## Правила разработки

### Коммиты

`feat:` · `fix:` · `copy:` · `perf:` · `style:` · `a11y:` · `ops:` (Docker/CI)

### Чеклист перед пушем

- [ ] `docker compose up --build` — страница открывается
- [ ] 375px и 1280px, CTA виден на мобиле
- [ ] Hero: `loading="eager"`, `fetchpriority="high"`
- [ ] Тёмная тема читаема

### Запрещено

- Включать GitHub Pages для этого репо (раскрывает код на free tier)
- Добавлять npm без обсуждения
- Менять Hero/Problem без кастдева или гипотезы

## Связанные репозитории

| Репозиторий | Назначение |
|-------------|------------|
| [Dmitriion/datagent](https://github.com/Dmitriion/datagent) | Продукт |
| [Dmitriion/datagent-landing](https://github.com/Dmitriion/datagent-landing) | Лендинг (этот репо) |

## Лицензия

Код — **MIT**. Тексты и брендинг Datagent — **All Rights Reserved**.

*май 2026 · Dmitrii Ionov*
