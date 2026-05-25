# AGENTS.md

Baseline target: **Baseline 2024**.

## Stack

- Semantic HTML5 + `assets/` (no build step for content)
- **Deploy:** Docker + nginx (see `Dockerfile`, `docker-compose.yml`)
- No React, Vite, Tailwind, npm for the landing itself

## Rules

- **Do not** add GitHub Pages or `CNAME` for Pages — repo stays private
- `ops:` commits for Docker/nginx/CI changes; `copy:` for marketing text
- Performance: LCP &lt; 1.5s, hero `loading="eager"` + `fetchpriority="high"`
- Verify with `docker compose up --build` before claiming deploy works

## Deploy

```bash
docker compose up --build   # local :8080
docker build -t datagent-landing .   # production image
```

Production: container on VPS + reverse proxy (Caddy/Traefik) for datagent.ru.
